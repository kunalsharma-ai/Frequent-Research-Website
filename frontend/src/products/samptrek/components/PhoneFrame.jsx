export default function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-notch" />
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  )
}
