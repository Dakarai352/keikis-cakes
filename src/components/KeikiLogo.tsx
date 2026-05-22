export default function KeikiLogo({ className = '', light = false }: { className?: string, light?: boolean }) {
  return (
    <span
      className={`font-display font-semibold tracking-tight select-none transition-colors duration-500 ${light ? 'text-[#FAF7F2]' : 'text-espresso'} ${className}`}
      style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.1 }}
    >
      Keiki's Cakes
    </span>
  )
}
