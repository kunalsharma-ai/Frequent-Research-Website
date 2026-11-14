// Page addresses (build 67). The site uses normal addresses (/services/market-research) with React Router's
// BrowserRouter. Only the one-file offline preview, opened from file://, keeps hash addresses (#/services/…) because a
// file has no server to answer other paths. Old #/ links are turned into normal addresses by the boot script in
// index.html before the app starts.
// build 82.2: any address that is not http(s) counts as the preview (file://, and content:// when an Android phone
// opens the downloaded file), so the file always starts on the home page instead of the 404 page.
const NAV_HASH = typeof location !== "undefined" && !/^https?:$/.test(location.protocol);
// On such addresses the router builds links with new URL(path, location.href), which throws when the address cannot
// be a base (blob:, some content:// providers). Fall back to a neutral base there so every link still works.
if (NAV_HASH && typeof URL === "function") {
  let ok = true;
  try { new URL("/", location.href); } catch (e) { ok = false; }
  if (!ok) {
    const O = URL;
    const U = function URL(u, b) {
      if (arguments.length < 2 || b === undefined) return new O(u);
      try { return new O(u, b); } catch (e) { return new O(u, "http://localhost/"); }
    };
    U.prototype = O.prototype;
    Object.getOwnPropertyNames(O).forEach((k) => { if (!(k in U) || k === "canParse" || k === "parse") try { U[k] = O[k]; } catch (e) {} });
    ["createObjectURL", "revokeObjectURL"].forEach((k) => { if (O[k]) U[k] = O[k].bind(O); });
    try { window.URL = U; } catch (e) {}
  }
}

// the current route path ("/services/x"), whichever mode is active
const navPath = () => {
  if (typeof location === "undefined") return "/";
  if (NAV_HASH) return (location.hash || "#/").replace(/^#/, "").split("?")[0] || "/";
  return location.pathname || "/";
};

// go to a route from code outside React Router's components (search box, old-link redirects)
const navGo = (to, replace = false) => {
  if (NAV_HASH) {
    if (replace) location.replace("#" + to);
    else location.hash = to;
    return;
  }
  if (replace) history.replaceState(null, "", to);
  else history.pushState(null, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

// an address for an <a href> that works in both modes
const navHref = (to) => (NAV_HASH ? "#" + to : to);

export { NAV_HASH, navGo, navHref, navPath };
