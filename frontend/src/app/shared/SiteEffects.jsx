import { phoneError } from '../data/phoneCountries.jsx';
import { hgMarkScroll } from './Globe.jsx';
import { SR_STATE, srClose, srOpen } from './Search.jsx';
import { FM_DISPOSABLE } from './Forms.jsx';

const FMV = {
  name: (v) => {
    const n = (v || "").trim();
    if (n.length < 2) return "Enter your full name.";
    if (n.length > 60) return "Keep this under 60 characters.";
    if (!/^[\p{L}][\p{L} .'-]*$/u.test(n)) return "Use letters only (spaces, dots, apostrophes and hyphens are fine).";
    return "";
  },
  email: (v) => {
    const e = (v || "").trim();
    if (!e) return "Enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) return "Enter a valid email, like name@company.com.";
    if (FM_DISPOSABLE.test(e)) return "Please use a permanent work or personal email.";
    return "";
  },
  phone: (p) => phoneError(p.country, p.number || "", p.otherCode || ""),
  org: (v) => {
    const o = (v || "").trim();
    if (o.length < 2) return "Enter your company or organisation.";
    if (o.length > 100) return "Keep this under 100 characters.";
    return "";
  },
  title: (v) => {
    const o = (v || "").trim();
    if (o.length < 2) return "Enter your job title.";
    if (o.length > 80) return "Keep this under 80 characters.";
    return "";
  },
  pick: (label) => (v) => (v && (!Array.isArray(v) || v.length) ? "" : `Choose ${label}.`),
  text: (min, max, label) => (v) => {
    const t = (v || "").trim();
    if (t.length < min) return `${label} \u2014 at least ${min} characters (${t.length}/${min}).`;
    if (t.length > max) return `Keep this under ${max} characters.`;
    return "";
  },
  url: (v) => {
    const u = (v || "").trim();
    if (!u) return "";
    return /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(u)
      ? ""
      : "Enter a valid web address, like www.example.com.";
  },
  consent: (v) => (v ? "" : "Please tick the box to continue."),
};
if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (SR_STATE.open) srClose();
      else srOpen();
    } else if (
      e.key === "/" &&
      !SR_STATE.open &&
      !/input|textarea|select/i.test((document.activeElement || {}).tagName || "") &&
      !(document.activeElement || {}).isContentEditable
    ) {
      e.preventDefault();
      srOpen();
    }
  });
}
(function fxPointer() {
  if (typeof window === "undefined" || !window.matchMedia) return;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CARD =
    ".hcard,.svc-card,.pillar,.why__card,.included__item,.ind-tile,.cs-card,.bcard,.dl-card,.policy-card,.portal-card,.product-card,.pstrip__item,.qc__item,.aud__item,.timeline__card,.rewards__card,.guide-card,.rc-svc__card,.rc-tk__mod,.rc-ind__item,.rc-why__mod,.rc-cap__col,.od-rec__tile,.od-meth__card,.od-use__card,.od-cap__item,.od-ind__tile,.od-panel,.ca-card,.ca-esomar,.bp-use__card,.bp-who__card,.hp-use__card,.hp-spec__card,.val__detail";
  if (fine) {
    let lq = false,
      le = null;
    document.addEventListener(
      "pointermove",
      (e) => {
        le = e;
        if (lq) return;
        lq = true;
        requestAnimationFrame(() => {
          lq = false;
          const c = le.target && le.target.closest ? le.target.closest(CARD) : null;
          if (!c) return;
          const r = c.getBoundingClientRect();
          c.style.setProperty("--sx", le.clientX - r.left + "px");
          c.style.setProperty("--sy", le.clientY - r.top + "px");
        });
      },
      {
        passive: true,
      },
    );
  }
  if (!fine) return;
  const start = () => {
    const dot = document.createElement("div"),
      ring = document.createElement("div");
    dot.className = "cur-dot";
    ring.className = "cur-ring";
    dot.setAttribute("aria-hidden", "true");
    ring.setAttribute("aria-hidden", "true");
    document.body.append(ring, dot);
    const INTER = "a,button,[role=button],[role=tab],[role=option],summary,select,label";
    const TEXT =
      "input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]),textarea,select,[contenteditable=true],iframe";
    let x = -100,
      y = -100,
      queued = false,
      lastT = null,
      mode = "",
      shown = false,
      mag = null;
    const paint = () => {
      queued = false;
      const tr = `translate3d(${x}px,${y}px,0)`;
      dot.style.transform = tr;
      ring.style.transform = tr;
    };
    const setMode = (m) => {
      if (m !== mode) {
        mode = m;
        ring.className = "cur-ring" + (m ? " is-" + m : "");
        dot.className = "cur-dot" + (m === "text" ? " is-text" : "");
      }
    };
    document.addEventListener(
      "pointermove",
      (e) => {
        // the super admin (/admin) keeps the normal mouse pointer
        if (e.pointerType && e.pointerType !== "mouse" || document.documentElement.classList.contains("adm-mode")) {
          if (shown) {
            shown = false;
            document.documentElement.classList.remove("has-cur");
          }
          return;
        }
        x = e.clientX;
        y = e.clientY;
        if (!shown) {
          shown = true;
          document.documentElement.classList.add("has-cur");
        }
        if (!queued) {
          queued = true;
          requestAnimationFrame(paint);
        }
        const t = e.target;
        if (t !== lastT) {
          lastT = t;
          if (!t || !t.closest) setMode("");
          else if (t.closest(TEXT)) setMode("text");
          else if (t.closest(INTER)) setMode("hover");
          else setMode("");
          const b = t.closest ? t.closest(".btn") : null;
          if (mag && mag !== b) {
            mag.style.translate = "";
            mag = null;
          }
          mag = b;
        }
      },
      {
        passive: true,
      },
    );
    document.addEventListener("pointerdown", () => ring.classList.add("is-down"), {
      passive: true,
    });
    document.addEventListener("pointerup", () => ring.classList.remove("is-down"), {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", () => document.documentElement.classList.add("cur-out"));
    document.documentElement.addEventListener("mouseenter", () => document.documentElement.classList.remove("cur-out"));
    window.addEventListener("blur", () => document.documentElement.classList.add("cur-out"));
    window.addEventListener("focus", () => document.documentElement.classList.remove("cur-out"));
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
(function fxPerf() {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => e.target.classList.toggle("is-offscreen", !e.isIntersecting)),
    {
      rootMargin: "200px 0px",
    },
  );
  const seen = new WeakSet();
  const scan = () => {
    document.querySelectorAll("main section, footer").forEach((s) => {
      if (!seen.has(s)) {
        seen.add(s);
        io.observe(s);
      }
    });
  };
  const start = () => {
    scan();
    const main = document.querySelector("main") || document.body;
    let q = false;
    new MutationObserver(() => {
      if (q) return;
      q = true;
      setTimeout(() => {
        q = false;
        scan();
      }, 120);
    }).observe(main, {
      childList: true,
      subtree: true,
    });
    document.addEventListener("visibilitychange", () =>
      document.documentElement.classList.toggle("is-hidden-tab", document.hidden),
    );
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
(function () {
  if (typeof window === "undefined") return;
  var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  var SEL = ".nav__link,.mega__product,.mega__head,.mega__col li a,.drawer__link,.drawer__sub a";
  document.addEventListener(
    "pointerdown",
    function (e) {
      if (rm && rm.matches) return;
      var el = e.target.closest && e.target.closest(SEL);
      if (!el) return;
      var r = el.getBoundingClientRect(),
        d = Math.max(r.width, r.height) * 2.2;
      var s = document.createElement("span");
      s.className = "nx-rip";
      s.style.cssText =
        "width:" +
        d +
        "px;height:" +
        d +
        "px;left:" +
        (e.clientX - r.left - d / 2) +
        "px;top:" +
        (e.clientY - r.top - d / 2) +
        "px";
      if (getComputedStyle(el).position === "static") el.style.position = "relative";
      el.appendChild(s);
      setTimeout(function () {
        s.remove();
      }, 650);
    },
    {
      passive: true,
    },
  );
})();
const SF_FLAGS = {
  ae: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWFlIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iIzAwNzMyZiIgZD0iTTAgMGg2NDB2MTYwSDB6Ii8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMTYwaDY0MHYxNjBIMHoiLz4KICA8cGF0aCBmaWxsPSIjMDAwMDAxIiBkPSJNMCAzMjBoNjQwdjE2MEgweiIvPgogIDxwYXRoIGZpbGw9InJlZCIgZD0iTTAgMGgyMjB2NDgwSDB6Ii8+Cjwvc3ZnPgo=",
  au: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWF1IiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iIzAwMDA4QiIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0ibTM3LjUgMCAxMjIgOTAuNUwyODEgMGgzOXYzMWwtMTIwIDg5LjUgMTIwIDg5VjI0MGgtNDBsLTEyMC04OS41TDQwLjUgMjQwSDB2LTMwbDExOS41LTg5TDAgMzJWMHoiLz4KICA8cGF0aCBmaWxsPSJyZWQiIGQ9Ik0yMTIgMTQwLjUgMzIwIDIyMHYyMGwtMTM1LjUtOTkuNXptLTkyIDEwIDMgMTcuNS05NiA3Mkgwek0zMjAgMHYxLjVsLTEyNC41IDk0IDEtMjJMMjk1IDB6TTAgMGwxMTkuNSA4OGgtMzBMMCAyMXoiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTIwLjUgMHYyNDBoODBWMHpNMCA4MHY4MGgzMjBWODB6Ii8+CiAgPHBhdGggZmlsbD0icmVkIiBkPSJNMCA5Ni41djQ4aDMyMHYtNDh6TTEzNi41IDB2MjQwaDQ4VjB6Ii8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0ibTUyNyAzOTYuNy0yMC41IDIuNiAyLjIgMjAuNS0xNC44LTE0LjQtMTQuNyAxNC41IDItMjAuNS0yMC41LTIuNCAxNy4zLTExLjItMTAuOS0xNy41IDE5LjYgNi41IDYuOS0xOS41IDcuMSAxOS40IDE5LjUtNi43LTEwLjcgMTcuNnptLTMuNy0xMTcuMiAyLjctMTMtOS44LTkgMTMuMi0xLjUgNS41LTEyLjEgNS41IDEyLjEgMTMuMiAxLjUtOS44IDkgMi43IDEzLTExLjYtNi42em0tMTA0LjEtNjAtMjAuMyAyLjIgMS44IDIwLjMtMTQuNC0xNC41LTE0LjggMTQuMSAyLjQtMjAuMy0yMC4yLTIuNyAxNy4zLTEwLjgtMTAuNS0xNy41IDE5LjMgNi44TDM4NyAxNzhsNi43IDE5LjMgMTkuNC02LjMtMTAuOSAxNy4zIDE3LjEgMTEuMlpNNjIzIDE4Ni43bC0yMC45IDIuNyAyLjMgMjAuOS0xNS4xLTE0LjctMTUgMTQuOCAyLjEtMjEtMjAuOS0yLjQgMTcuNy0xMS41LTExLjEtMTcuOSAyMCA2LjcgNy0xOS44IDcuMiAxOS44IDE5LjktNi45LTExIDE4em0tOTYuMS04My41LTIwLjcgMi4zIDEuOSAyMC44LTE0LjctMTQuOC0xNS4xIDE0LjQgMi40LTIwLjctMjAuNy0yLjggMTcuNy0xMUw0NjcgNzMuNWwxOS43IDYuOSA3LjMtMTkuNSA2LjggMTkuNyAxOS44LTYuNS0xMS4xIDE3LjZ6TTIzNCAzODUuN2wtNDUuOCA1LjQgNC42IDQ1LjktMzIuOC0zMi40LTMzIDMyLjIgNC45LTQ1LjktNDUuOC01LjggMzguOS0yNC44LTI0LTM5LjQgNDMuNiAxNSAxNS44LTQzLjQgMTUuNSA0My41IDQzLjctMTQuNy0yNC4zIDM5LjIgMzguOCAyNS4xWiIvPgo8L3N2Zz4K",
  ca: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWNhIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE1MC4xIDBoMzM5Ljd2NDgwSDE1MHoiLz4KICA8cGF0aCBmaWxsPSIjZDUyYjFlIiBkPSJNLTE5LjcgMGgxNjkuOHY0ODBILTE5Ljd6bTUwOS41IDBoMTY5Ljh2NDgwSDQ4OS45ek0yMDEgMjMybC0xMy4zIDQuNCA2MS40IDU0YzQuNyAxMy43LTEuNiAxNy44LTUuNiAyNWw2Ni42LTguNC0xLjYgNjcgMTMuOS0uMy0zLjEtNjYuNiA2Ni43IDhjLTQuMS04LjctNy44LTEzLjMtNC0yNy4ybDYxLjMtNTEtMTAuNy00Yy04LjgtNi44IDMuOC0zMi42IDUuNi00OC45IDAgMC0zNS43IDEyLjMtMzggNS44bC05LjItMTcuNS0zMi42IDM1LjhjLTMuNS45LTUtLjUtNS45LTMuNWwxNS03NC44LTIzLjggMTMuNHEtMy4yIDEuMy01LjItMi4ybC0yMy00Ni0yMy42IDQ3LjhxLTIuOCAyLjUtNSAuN0wyNjQgMTMwLjhsMTMuNyA3NC4xYy0xLjEgMy0zLjcgMy44LTYuNyAyLjJsLTMxLjItMzUuM2MtNCA2LjUtNi44IDE3LjEtMTIuMiAxOS41cy0yMy41LTQuNS0zNS42LTdjNC4yIDE0LjggMTcgMzkuNiA5IDQ3LjciLz4KPC9zdmc+Cg==",
  ch: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWNoIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjFwdCI+CiAgICA8cGF0aCBmaWxsPSJyZWQiIGQ9Ik0wIDBoNjQwdjQ4MEgweiIvPgogICAgPGcgZmlsbD0iI2ZmZiI+CiAgICAgIDxwYXRoIGQ9Ik0xNzAgMTk1aDMwMHY5MEgxNzB6Ii8+CiAgICAgIDxwYXRoIGQ9Ik0yNzUgOTBoOTB2MzAwaC05MHoiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=",
  de: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWRlIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2ZjMCIgZD0iTTAgMzIwaDY0MHYxNjBIMHoiLz4KICA8cGF0aCBmaWxsPSIjMDAwMDAxIiBkPSJNMCAwaDY0MHYxNjBIMHoiLz4KICA8cGF0aCBmaWxsPSJyZWQiIGQ9Ik0wIDE2MGg2NDB2MTYwSDB6Ii8+Cjwvc3ZnPgo=",
  eg: "/assets/core/i.3f85d1d2bd.svg",
  es: "/assets/core/i.f9cfaff858.svg",
  fr: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWZyIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMDA5MSIgZD0iTTAgMGgyMTMuM3Y0ODBIMHoiLz4KICA8cGF0aCBmaWxsPSIjZTEwMDBmIiBkPSJNNDI2LjcgMEg2NDB2NDgwSDQyNi43eiIvPgo8L3N2Zz4K",
  gb: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWdiIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iIzAxMjE2OSIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iI0ZGRiIgZD0ibTc1IDAgMjQ0IDE4MUw1NjIgMGg3OHY2Mkw0MDAgMjQxbDI0MCAxNzh2NjFoLTgwTDMyMCAzMDEgODEgNDgwSDB2LTYwbDIzOS0xNzhMMCA2NFYweiIvPgogIDxwYXRoIGZpbGw9IiNDODEwMkUiIGQ9Im00MjQgMjgxIDIxNiAxNTl2NDBMMzY5IDI4MXptLTE4NCAyMCA2IDM1TDU0IDQ4MEgwek02NDAgMHYzTDM5MSAxOTFsMi00NEw1OTAgMHpNMCAwbDIzOSAxNzZoLTYwTDAgNDJ6Ii8+CiAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTI0MSAwdjQ4MGgxNjBWMHpNMCAxNjB2MTYwaDY0MFYxNjB6Ii8+CiAgPHBhdGggZmlsbD0iI0M4MTAyRSIgZD0iTTAgMTkzdjk2aDY0MHYtOTZ6TTI3MyAwdjQ4MGg5NlYweiIvPgo8L3N2Zz4K",
  hk: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0iZmxhZy1pY29ucy1oayIgdmlld0JveD0iMCAwIDY0MCA0ODAiPgogIDxwYXRoIGZpbGw9IiNFQzFCMkUiIGQ9Ik0wIDBoNjQwdjQ4MEgwIi8+CiAgPHBhdGggaWQ9ImhrLWEiIGZpbGw9IiNmZmYiIGQ9Ik0zNDYuMyAxMDMuMUMyNjcgOTggMjMwLjYgMjAxLjkgMzA1LjYgMjQwLjNjLTI2LTIyLjQtMjAuNi01NS4zLTEwLjEtNzIuNGwxLjkgMS4xYy0xMy44IDIzLjUtMTEuMiA1Mi43IDExLjEgNzEtMTIuNy0xMi4zLTkuNS0zOSAxMi4xLTQ4LjlzMjMuNi0zOS4zIDE2LjQtNDkuMXEtMTQuNy0yNS42IDkuMy0zOC45TTMwNy45IDE2NGwtNC43IDcuNC0xLjgtOC42LTguNi0yLjMgNy44LTQuMy0uNi04LjkgNi41IDYuMSA4LjMtMy4zLTMuNyA4LjEgNS42IDYuOHoiLz4KICA8dXNlIHhsaW5rOmhyZWY9IiNoay1hIiB0cmFuc2Zvcm09InJvdGF0ZSg3MiAzMTIuNSAyNDMuNSkiLz4KICA8dXNlIHhsaW5rOmhyZWY9IiNoay1hIiB0cmFuc2Zvcm09InJvdGF0ZSgxNDQgMzEyLjUgMjQzLjUpIi8+CiAgPHVzZSB4bGluazpocmVmPSIjaGstYSIgdHJhbnNmb3JtPSJyb3RhdGUoMjE2IDMxMi41IDI0My41KSIvPgogIDx1c2UgeGxpbms6aHJlZj0iI2hrLWEiIHRyYW5zZm9ybT0icm90YXRlKDI4OCAzMTIuNSAyNDMuNSkiLz4KPC9zdmc+Cg==",
  id: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWlkIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2U3MDAxMSIgZD0iTTAgMGg2NDB2MjQwSDBaIi8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMjQwaDY0MHYyNDBIMFoiLz4KPC9zdmc+Cg==",
  in: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0iZmxhZy1pY29ucy1pbiIgdmlld0JveD0iMCAwIDY0MCA0ODAiPgogIDxwYXRoIGZpbGw9IiNmOTMiIGQ9Ik0wIDBoNjQwdjE2MEgweiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDE2MGg2NDB2MTYwSDB6Ii8+CiAgPHBhdGggZmlsbD0iIzEyODgwNyIgZD0iTTAgMzIwaDY0MHYxNjBIMHoiLz4KICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgzLjIgMCAwIDMuMiAzMjAgMjQwKSI+CiAgICA8Y2lyY2xlIHI9IjIwIiBmaWxsPSIjMDA4Ii8+CiAgICA8Y2lyY2xlIHI9IjE3LjUiIGZpbGw9IiNmZmYiLz4KICAgIDxjaXJjbGUgcj0iMy41IiBmaWxsPSIjMDA4Ii8+CiAgICA8ZyBpZD0iaW4tZCI+CiAgICAgIDxnIGlkPSJpbi1jIj4KICAgICAgICA8ZyBpZD0iaW4tYiI+CiAgICAgICAgICA8ZyBpZD0iaW4tYSIgZmlsbD0iIzAwOCI+CiAgICAgICAgICAgIDxjaXJjbGUgcj0iLjkiIHRyYW5zZm9ybT0icm90YXRlKDcuNSAtOC44IDEzMy41KSIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMCAxNy41LjYgNyAwIDJsLS42IDV6Ii8+CiAgICAgICAgICA8L2c+CiAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNpbi1hIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB0cmFuc2Zvcm09InJvdGF0ZSgxNSkiLz4KICAgICAgICA8L2c+CiAgICAgICAgPHVzZSB4bGluazpocmVmPSIjaW4tYiIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdHJhbnNmb3JtPSJyb3RhdGUoMzApIi8+CiAgICAgIDwvZz4KICAgICAgPHVzZSB4bGluazpocmVmPSIjaW4tYyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdHJhbnNmb3JtPSJyb3RhdGUoNjApIi8+CiAgICA8L2c+CiAgICA8dXNlIHhsaW5rOmhyZWY9IiNpbi1kIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgICA8dXNlIHhsaW5rOmhyZWY9IiNpbi1kIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB0cmFuc2Zvcm09InJvdGF0ZSgtMTIwKSIvPgogIDwvZz4KPC9zdmc+Cg==",
  it: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWl0IiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjFwdCI+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDY0MHY0ODBIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDkyNDYiIGQ9Ik0wIDBoMjEzLjN2NDgwSDB6Ii8+CiAgICA8cGF0aCBmaWxsPSIjY2UyYjM3IiBkPSJNNDI2LjcgMEg2NDB2NDgwSDQyNi43eiIvPgogIDwvZz4KPC9zdmc+Cg==",
  jp: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWpwIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPGRlZnM+CiAgICA8Y2xpcFBhdGggaWQ9ImpwLWEiPgogICAgICA8cGF0aCBmaWxsLW9wYWNpdHk9Ii43IiBkPSJNLTg4IDMyaDY0MHY0ODBILTg4eiIvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+CiAgPGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjFwdCIgY2xpcC1wYXRoPSJ1cmwoI2pwLWEpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OCAtMzIpIj4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tMTI4IDMyaDcyMHY0ODBoLTcyMHoiLz4KICAgIDxjaXJjbGUgY3g9IjUyMy4xIiBjeT0iMzQ0LjEiIHI9IjE5NC45IiBmaWxsPSIjYmMwMDJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTY4LjQgOC42KXNjYWxlKC43NjU1NCkiLz4KICA8L2c+Cjwvc3ZnPgo=",
  ma: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLW1hIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2MxMjcyZCIgZD0iTTY0MCAwSDB2NDgwaDY0MHoiLz4KICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDYyMzMiIHN0cm9rZS13aWR0aD0iMTEuNyIgZD0iTTMyMCAxNzkuNCAyODQuNCAyODlsOTMuMi02Ny42SDI2Mi40bDkzLjIgNjcuNnoiLz4KPC9zdmc+Cg==",
  my: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLW15IiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPGcgY2xpcC1wYXRoPSJ1cmwoI215LWEpIj4KICAgIDxwYXRoIGZpbGw9IiNDMDAiIGQ9Ik0wIDBoNjQwdjQ4MEgweiIvPgogICAgPHBhdGggZmlsbD0iI0MwMCIgZD0iTTAgMGg2NDB2MzQuM0gweiIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMzQuM2g2NDB2MzQuM0gweiIvPgogICAgPHBhdGggZmlsbD0iI0MwMCIgZD0iTTAgNjguNmg2NDB2MzQuM0gweiIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMTAyLjloNjQwVjEzN0gweiIvPgogICAgPHBhdGggZmlsbD0iI0MwMCIgZD0iTTAgMTM3LjFoNjQwdjM0LjNIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDE3MS40aDY0MHYzNC4zSDB6Ii8+CiAgICA8cGF0aCBmaWxsPSIjQzAwIiBkPSJNMCAyMDUuN2g2NDBWMjQwSDB6Ii8+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAyNDBoNjQwdjM0LjNIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiNDMDAiIGQ9Ik0wIDI3NC4zaDY0MHYzNC4zSDB6Ii8+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAzMDguNmg2NDB2MzQuM0gweiIvPgogICAgPHBhdGggZmlsbD0iI0MwMCIgZD0iTTAgMzQyLjloNjQwVjM3N0gweiIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMzc3LjFoNjQwdjM0LjNIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiNDMDAiIGQ9Ik0wIDQxMS40aDY0MHYzNC4zSDB6Ii8+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCA0NDUuN2g2NDBWNDgwSDB6Ii8+CiAgICA8cGF0aCBmaWxsPSIjMDA2IiBkPSJNMCAuNWgzMjB2Mjc0LjNIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiNGQzAiIGQ9Im0yMDcuNSA3My44IDYgNDAuNyAyMy0zNC0xMi40IDM5LjIgMzUuNS0yMC44LTI4LjEgMzAgNDEtMy4yLTM4LjMgMTQuOCAzOC4zIDE0LjgtNDEtMy4yIDI4LjEgMzAtMzUuNS0yMC44IDEyLjMgMzkuMy0yMy0zNC4xLTYgNDAuNy01LjktNDAuNy0yMyAzNCAxMi40LTM5LjItMzUuNSAyMC44IDI4LTMwLTQxIDMuMiAzOC40LTE0LjgtMzguMy0xNC44IDQxIDMuMi0yOC4xLTMwIDM1LjUgMjAuOC0xMi40LTM5LjMgMjMgMzQuMXptLTMzLjMgMS43YTcxIDcxIDAgMCAwLTEwMCA2NSA3MSA3MSAwIDAgMCAxMDAgNjUgODAgODAgMCAwIDEtODMuMiA2LjIgODAgODAgMCAwIDEtNDMuNC03MS4yIDgwIDgwIDAgMCAxIDEyNi42LTY1Ii8+CiAgPC9nPgogIDxkZWZzPgogICAgPGNsaXBQYXRoIGlkPSJteS1hIj4KICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgICA8L2NsaXBQYXRoPgogIDwvZGVmcz4KPC9zdmc+Cg==",
  nz: "/assets/core/i.794a2c8c09.svg",
  qa: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLXFhIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iIzhkMWIzZCIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMHY0ODBoMTU4LjRsOTcuOC0yNi43LTk3LjgtMjYuNiA5Ny43LTI2LjctOTcuNy0yNi43IDk3LjctMjYuNi05Ny43LTI2LjcgOTcuOC0yNi43LTk3LjgtMjYuNiA5Ny43LTI2LjctOTcuNy0yNi43IDk3LjctMjYuNi05Ny43LTI2LjcgOTcuOC0yNi43LTk3LjgtMjYuNkwyNTYuMSA4MGwtOTcuNy0yNi43IDk3LjgtMjYuNkwxNTguMyAweiIvPgo8L3N2Zz4K",
  sa: "/assets/core/i.5738c8cfca.svg",
  tw: "/assets/core/i.931757f06b.svg",
  us: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLXVzIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2JkM2Q0NCIgZD0iTTAgMGg2NDB2NDgwSDAiLz4KICA8cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMzciIGQ9Ik0wIDU1LjNoNjQwTTAgMTI5aDY0ME0wIDIwM2g2NDBNMCAyNzdoNjQwTTAgMzUxaDY0ME0wIDQyNWg2NDAiLz4KICA8cGF0aCBmaWxsPSIjMTkyZjVkIiBkPSJNMCAwaDM2NC44djI1OC41SDAiLz4KICA8bWFya2VyIGlkPSJ1cy1hIiBtYXJrZXJIZWlnaHQ9IjMwIiBtYXJrZXJXaWR0aD0iMzAiPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0ibTE0IDAgOSAyN0wwIDEwaDI4TDUgMjd6Ii8+CiAgPC9tYXJrZXI+CiAgPHBhdGggZmlsbD0ibm9uZSIgbWFya2VyLW1pZD0idXJsKCN1cy1hKSIgZD0ibTAgMCAxNiAxMWg2MSA2MSA2MSA2MSA2MEw0NyAzN2g2MSA2MSA2MCA2MUwxNiA2M2g2MSA2MSA2MSA2MSA2MEw0NyA4OWg2MSA2MSA2MCA2MUwxNiAxMTVoNjEgNjEgNjEgNjEgNjBMNDcgMTQxaDYxIDYxIDYwIDYxTDE2IDE2Nmg2MSA2MSA2MSA2MSA2MEw0NyAxOTJoNjEgNjEgNjAgNjFMMTYgMjE4aDYxIDYxIDYxIDYxIDYweiIvPgo8L3N2Zz4K",
  za: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLXphIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPGRlZnM+CiAgICA8Y2xpcFBhdGggaWQ9InphLWEiPgogICAgICA8cGF0aCBmaWxsLW9wYWNpdHk9Ii43IiBkPSJNLTcxLjkgMGg2ODIuN3Y1MTJILTcxLjl6Ii8+CiAgICA8L2NsaXBQYXRoPgogIDwvZGVmcz4KICA8ZyBjbGlwLXBhdGg9InVybCgjemEtYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY3LjQpc2NhbGUoLjkzNzQ4KSI+CiAgICA8ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS13aWR0aD0iMXB0Ij4KICAgICAgPHBhdGggZmlsbD0iIzAwMDAwMSIgZD0iTS03MS45IDQwNy44VjEwNC40TDE1NCAyNTYuMXoiLz4KICAgICAgPHBhdGggZmlsbD0iIzAwMGM4YSIgZD0ibTgyLjIgNTEyLjEgMjUzLjYtMTcwLjZINjk2VjUxMkg4Mi4yeiIvPgogICAgICA8cGF0aCBmaWxsPSIjZTEzOTJkIiBkPSJNNjYgMGg2MzB2MTcwLjhIMzM1LjdTNjkuMy0xLjcgNjYgMCIvPgogICAgICA8cGF0aCBmaWxsPSIjZmZiOTE1IiBkPSJNLTcxLjkgNjR2NDAuNEwxNTQgMjU2LTcyIDQwNy44djQwLjNsMjg0LjUtMTkyeiIvPgogICAgICA8cGF0aCBmaWxsPSIjMDA3ODQ3IiBkPSJNLTcxLjkgNjRWMGg5NWwzMDEuMiAyMDRoMzcxLjh2MTA0LjJIMzI0LjNMMjMgNTEyaC05NC45di02My45bDI4NC40LTE5MkwtNzEuOCA2NHoiLz4KICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTIzIDBoNTkuMmwyNTMuNiAxNzAuN0g2OTZWMjA0SDMyNC4zem0wIDUxMi4xaDU5LjJsMjUzLjYtMTcwLjZINjk2di0zMy4ySDMyNC4zTDIzIDUxMnoiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=",
};
if (typeof window !== "undefined")
  window.addEventListener(
    "scroll",
    () => {
      hgMarkScroll();
    },
    {
      passive: true,
    },
  );
(function sfReveal() {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
  if (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches))
    return;
  const SEL =
    ".section__head,.split__title,.svc-card,.pillar,.why__card,.included__item,.ind-tile,.cs-card,.bcard,.dl-card,.policy-card,.portal-card,.product-card,.product-tile,.pstrip__item,.qc__item,.aud__item,.timeline__card,.rewards__card,.guide-card,.vm__card,.meth__item,.contact__box,.enquire__intro,.card-form";
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        el.classList.add("fx-in");
        setTimeout(() => el.classList.remove("fx", "fx-in"), 1100);
      });
    },
    {
      rootMargin: "0px 0px -6% 0px",
      threshold: 0.05,
    },
  );
  const scan = () => {
    document.querySelectorAll(SEL).forEach((el) => {
      if (el.dataset.fx || el.closest(".rc,.hero,.modal__box")) return;
      el.dataset.fx = "1";
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) return;
      const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      el.style.setProperty("--fx-d", (sib % 6) * 70 + "ms");
      el.classList.add("fx");
      io.observe(el);
    });
  };
  let tm;
  const start = () => {
    scan();
    new MutationObserver(() => {
      clearTimeout(tm);
      tm = setTimeout(scan, 80);
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else setTimeout(start, 0);
})();

export { FMV, SF_FLAGS };
