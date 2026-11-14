import * as ee from 'react';
import { cmsList } from '../cms.jsx';

const BR_IMG = {
  lockup: "/assets/core/i.162fb93506.jpg",
  "iso-27001": "/assets/core/i.d6ac673caa.png",
  "iso-20252": "/assets/core/i.01001ea7b2.png",
  "iso-9001": "/assets/core/i.0287244219.png",
  esomar: "/assets/core/i.bbf8a7f16c.png",
  msme: "/assets/core/i.9f8c288655.png",
};
BR_IMG.full = BR_IMG.lockup;
const BR_MASK = (src) => ({
  WebkitMaskImage: `url(${src})`,
  maskImage: `url(${src})`,
});
function BR_Cert({ c, dark }) {
  const key = c.code.includes("27001") ? "iso-27001" : c.code.includes("20252") ? "iso-20252" : "iso-9001";
  /* build 78.2: a certificate added or re-uploaded in the super admin shows its own picture */
  const own = c.logo || (c.file && !String(c.file).startsWith("/badges/") ? c.file : "");
  return (
    <figure className={"cert br-cert" + (dark ? " cert--dark" : "")} title={`${c.code} \u2013 ${c.title}`}>
      <span className="br-seal">
        <img src={own || BR_IMG[key]} alt={`${c.code} certified \u2013 ${c.title}`} width="75" height="75" />
        <span className="br-sheen" style={BR_MASK(own || BR_IMG[key])} aria-hidden="true" />
        <i className="br-seal__ring" aria-hidden="true" />
      </span>
      <figcaption>
        <strong>{c.code}</strong>
        <span>{c.title}</span>
      </figcaption>
    </figure>
  );
}
function BR_Esomar({ dark }) {
  return (
    <a
      className={"esomar br-aff" + (dark ? " esomar--dark" : "")}
      href="https://esomar.org/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ESOMAR member (opens esomar.org in a new tab)"
    >
      <img src={BR_IMG.esomar} alt="ESOMAR member" width="175" height="61" />
      <span className="br-sheen" style={BR_MASK(BR_IMG.esomar)} aria-hidden="true" />
    </a>
  );
}
function BR_Msme({ dark }) {
  return (
    <span className={"br-msme br-aff" + (dark ? " br-msme--dark" : "")}>
      <img src={BR_IMG.msme} alt="MSME — Micro, Small & Medium Enterprises" width="182" height="66" />
      <span className="br-sheen" style={BR_MASK(BR_IMG.msme)} aria-hidden="true" />
    </span>
  );
}

/* build 78.2: associations and memberships (ESOMAR, MSME, and any the super admin adds), Admin › Associations */
const ASSOCIATIONS = cmsList("associations", [
  { id: "esomar", name: "ESOMAR", logo: "", url: "https://esomar.org/", text: "Member of ESOMAR, the global association for the data, research and insights community." },
  { id: "msme", name: "MSME", logo: "", url: "", text: "Registered MSME (Micro, Small & Medium Enterprise)." },
], "id");
function BR_Assoc({ a, dark }) {
  if (a.id === "esomar" && !a.logo) return <BR_Esomar dark={dark} />;
  if (a.id === "msme" && !a.logo) return <BR_Msme dark={dark} />;
  if (!a.logo) return null;
  const img = <><img src={a.logo} alt={a.name || ""} style={{ height: 61, width: "auto", maxWidth: 190, objectFit: "contain" }} /><span className="br-sheen" style={BR_MASK(a.logo)} aria-hidden="true" /></>;
  return a.url
    ? <a className="br-aff" href={a.url} target="_blank" rel="noopener noreferrer" aria-label={(a.name || "Association") + " (opens in a new tab)"}>{img}</a>
    : <span className="br-aff">{img}</span>;
}

export { ASSOCIATIONS, BR_Assoc, BR_Cert, BR_Esomar, BR_IMG, BR_MASK, BR_Msme };
