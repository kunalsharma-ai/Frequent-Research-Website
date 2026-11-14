/*
 * Country-code picker with flags (build 41) — used by every phone field on the site:
 * the generic enquiry form (g5), the Let's Talk form, the DM/IT service forms (FM_Phone) and the review popup.
 * Data: `PHONE_COUNTRIES` (the site's country list; generated from src/config/countries.json by scripts/build_dm.js —
 * every country/territory with an E.164 calling code). Flags: one sprite, public/images/flags/flags-sprite.webp
 * (rendered from Noto Color Emoji, SIL OFL 1.1, by tools/cc/make_flags.py), referenced from CSS.
 * Accessible: button (aria-haspopup="listbox") opens a search box + listbox; ↑/↓, Home/End, Enter, Esc, Tab.
 * The list is rendered in a portal on <body> so it is not clipped by `overflow:hidden` form fields.
 * Prefix CC_ ; styles in src/styles/country-picker.css (prefix cc-).
 */
import * as ee from 'react';
import * as ci from 'react-dom';
import { PHONE_COUNTRIES } from '../../app/data/phoneCountries.jsx';

const CC_COLS = 16;
const CC_W = 20;
const CC_H = 15;
let ccSeq = 0;

const ccPortal = (node) => {
  try {
    if (typeof ci !== "undefined" && ci && ci.createPortal && typeof document !== "undefined") return ci.createPortal(node, document.body);
  } catch (e) {
    /* fall back to inline rendering */
  }
  return node;
};

function CC_Flag({ fi }) {
  if (fi == null || fi < 0)
    return (
      <span className="cc-flag cc-flag--globe" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
        </svg>
      </span>
    );
  return <span className="cc-flag" aria-hidden="true" style={{ backgroundPosition: `-${(fi % CC_COLS) * CC_W}px -${Math.floor(fi / CC_COLS) * CC_H}px` }} />;
}

const ccNorm = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function CC_Picker({ value, onChange, className = "", label = "Country code" }) {
  const list = PHONE_COUNTRIES;
  const cur = list.find((o) => o.iso === value) || list[0] || { iso: "XX", name: "Other", code: "", fi: -1, other: true };
  const [open, setOpen] = ee.useState(false);
  const [q, setQ] = ee.useState("");
  const [act, setAct] = ee.useState(0);
  const [pos, setPos] = ee.useState(null);
  const uid = ee.useRef(null);
  if (uid.current === null) uid.current = "cc" + ++ccSeq;
  const btn = ee.useRef(null);
  const pop = ee.useRef(null);
  const inp = ee.useRef(null);
  const listRef = ee.useRef(null);

  const items = ee.useMemo(() => {
    const n = ccNorm(q.trim()).replace(/^\+/, "");
    if (!n) {
      const top = list.filter((o) => o.top);
      const rest = list.filter((o) => !o.top);
      return [{ head: "Popular" }, ...top, { head: "All countries" }, ...rest];
    }
    const digits = /^\d+$/.test(n);
    const hit = list.filter((o) => !o.other && (digits ? (o.code || "").replace("+", "").startsWith(n) : ccNorm(o.name).includes(n) || o.iso.toLowerCase() === n));
    const other = list.find((o) => o.other);
    return other ? [...hit, other] : hit;
  }, [q, list]);
  const opts = items.filter((x) => !x.head);

  const place = ee.useCallback(() => {
    const b = btn.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const vw = window.innerWidth,
      vh = window.innerHeight;
    const w = Math.min(320, vw - 24);
    const left = Math.max(12, Math.min(r.left, vw - w - 12));
    const below = vh - r.bottom;
    const h = Math.min(360, Math.max(below, r.top) - 16);
    const up = below < 260 && r.top > below;
    setPos({ left, width: w, maxHeight: Math.max(180, h), top: up ? undefined : r.bottom + 6, bottom: up ? vh - r.top + 6 : undefined });
  }, []);

  const openIt = () => {
    place();
    setQ("");
    setOpen(true);
  };
  const closeIt = (focusBtn) => {
    setOpen(false);
    if (focusBtn && btn.current) btn.current.focus();
  };
  const choose = (o) => {
    onChange(o.iso);
    closeIt(true);
  };

  /* reset highlight to the current country whenever the list changes */
  ee.useEffect(() => {
    if (!open) return;
    const i = opts.findIndex((o) => o.iso === cur.iso);
    setAct(q ? 0 : Math.max(0, i));
  }, [open, q]);

  ee.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inp.current && inp.current.focus(), 10);
    const away = (e) => {
      if (pop.current && pop.current.contains(e.target)) return;
      if (btn.current && btn.current.contains(e.target)) return;
      setOpen(false);
    };
    const re = () => place();
    document.addEventListener("mousedown", away, true);
    document.addEventListener("touchstart", away, true);
    window.addEventListener("resize", re);
    window.addEventListener("scroll", re, true);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", away, true);
      document.removeEventListener("touchstart", away, true);
      window.removeEventListener("resize", re);
      window.removeEventListener("scroll", re, true);
    };
  }, [open, place]);

  /* keep the active option in view */
  ee.useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector('[data-i="' + act + '"]');
    if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }, [act, open]);

  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAct((a) => Math.min(opts.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAct((a) => Math.max(0, a - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setAct(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setAct(opts.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (opts[act]) choose(opts[act]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) e.nativeEvent.stopImmediatePropagation();
      closeIt(true);
    } else if (e.key === "Tab") {
      e.preventDefault();
      closeIt(true);
    }
  };

  let n = -1;
  const lid = uid.current + "-list";
  return (
    <>
      <button
        ref={btn}
        type="button"
        className={"cc-btn " + className}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${cur.other ? "Other country" : cur.name + " " + cur.code}. Change`}
        onClick={() => (open ? closeIt(false) : openIt())}
        onKeyDown={(e) => {
          if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) {
            e.preventDefault();
            openIt();
          }
        }}
      >
        <CC_Flag fi={cur.fi} />
        <b className="cc-btn__code">{cur.other ? "+" : cur.code}</b>
        <i className="cc-btn__caret" aria-hidden="true" />
      </button>
      {open &&
        pos &&
        ccPortal(
          <div ref={pop} className="cc-pop" style={{ left: pos.left, width: pos.width, top: pos.top, bottom: pos.bottom, maxHeight: pos.maxHeight }} onKeyDown={onKey}>
            <div className="cc-pop__search">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
              <input
                ref={inp}
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search country or code"
                aria-label="Search country or code"
                role="combobox"
                aria-expanded="true"
                aria-controls={lid}
                aria-autocomplete="list"
                aria-activedescendant={opts[act] ? uid.current + "-o-" + opts[act].iso : undefined}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <ul ref={listRef} id={lid} className="cc-pop__list" role="listbox" aria-label="Countries">
              {items.map((o, i) => {
                if (o.head)
                  return (
                    <li key={"h" + i} className="cc-pop__head" role="presentation">
                      {o.head}
                    </li>
                  );
                n++;
                const idx = n;
                return (
                  <li
                    key={o.iso}
                    id={uid.current + "-o-" + o.iso}
                    data-i={idx}
                    role="option"
                    aria-selected={o.iso === cur.iso}
                    className={"cc-opt" + (idx === act ? " is-act" : "") + (o.iso === cur.iso ? " is-sel" : "")}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      choose(o);
                    }}
                    onMouseEnter={() => setAct(idx)}
                  >
                    <CC_Flag fi={o.fi} />
                    <span className="cc-opt__name">{o.name}</span>
                    <span className="cc-opt__code">{o.other ? "Enter code" : o.code}</span>
                  </li>
                );
              })}
              {q.trim() && opts.length <= 1 && (
                <li className="cc-pop__none" role="presentation">
                  No country matches “{q}”. Choose “Other country” to type a code.
                </li>
              )}
            </ul>
          </div>
        )}
    </>
  );
}

export { CC_COLS, CC_Flag, CC_H, CC_Picker, CC_W, ccPortal };
