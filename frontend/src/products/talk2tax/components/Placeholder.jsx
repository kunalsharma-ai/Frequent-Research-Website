/** Marks a value that must be set before going live. Visible on purpose. */
export default function Placeholder({ what }) {
  return (
    <span className="placeholder-tag" title={`Placeholder: set ${what} in src/content/site.js`}>
      Placeholder · set {what} in src/content/site.js
    </span>
  );
}
