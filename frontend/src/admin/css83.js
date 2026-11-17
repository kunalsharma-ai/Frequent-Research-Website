/* Build 83: the styles of the build-83 admin parts (styles/admin83.css), injected once like admin82.css. */
import ADM83_CSS from '../styles/admin83.css?inline';
if (typeof document !== "undefined" && !document.getElementById("adm83-css")) { const st = document.createElement("style"); st.id = "adm83-css"; st.textContent = ADM83_CSS; document.head.appendChild(st); }
export const ADM83_CSS_READY = true;
