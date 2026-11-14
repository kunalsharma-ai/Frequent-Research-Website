// A glassy browser window around a screenshot.
export default function BrowserFrame({ children, url = 'app.samptrek.com', className = '', tone = 'dark' }) {
  return (
    <div className={`browser ${tone} ${className}`}>
      <div className="browser-bar">
        <span className="dot r" /><span className="dot y" /><span className="dot g" />
        <span className="browser-url"><span className="lock">●</span>{url}</span>
      </div>
      <div className="browser-body">{children}</div>
    </div>
  )
}
