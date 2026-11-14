/*
 * Site-wide copy protection — build 63. Runs once when the bundle loads (no React component).
 * Blocks text selection, copy, cut, drag and the context menu everywhere EXCEPT form fields (input, textarea, select,
 * contenteditable) so visitors can still type, paste and correct their own enquiries. Styles: src/styles/theme.css
 * (user-select rules). This is a deterrent for casual copying only: page text is still delivered to the browser (and must
 * be, for search engines and screen readers), so it cannot stop someone determined from reading the source.
 */
(function frProtect() {
  if (typeof document === "undefined" || window.__FR_PROTECT) return;
  window.__FR_PROTECT = 1;
  const ok = (t) => {
    const el = t && t.nodeType === 1 ? t : t && t.parentElement;
    return !!(el && el.closest && el.closest("input,textarea,select,[contenteditable=''],[contenteditable='true'],.fr-copy-ok"));
  };
  const stop = (e) => {
    if (ok(e.target)) return;
    if (e.type === "copy" || e.type === "cut") {
      const sel = document.getSelection && document.getSelection();
      const a = document.activeElement;
      if (a && ok(a) && sel && String(sel)) return; /* copying out of a field the visitor typed in */
    }
    e.preventDefault();
  };
  ["copy", "cut", "contextmenu", "selectstart", "dragstart"].forEach((t) => document.addEventListener(t, stop, true));
  document.documentElement.classList.add("fr-protect");
})();
