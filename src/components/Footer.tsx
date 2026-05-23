import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import GradientButton from './ui/button-1'
import Magnetic from './ui/Magnetic'

function InstagramIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const INSTAGRAM_URL = 'https://www.instagram.com/keikis_cakes'

export default function Footer() {
  return (
    <footer className="relative" style={{ backgroundColor: 'var(--dark)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left column — Identity + Location */}
          <div className="space-y-6">
            <h3
              className="font-display font-semibold"
              style={{
                color: 'var(--on-dark)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                lineHeight: 1.1,
              }}
            >
              Keiki's Cakes & Treats
            </h3>
            <p
              className="font-body"
              style={{
                color: 'var(--on-dark)',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              La Puente, CA
            </p>
            <p
              className="font-body"
              style={{
                color: 'rgba(250, 247, 242, 0.7)',
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              }}
            >
              Serving West Covina and the Inland Empire!
            </p>
          </div>

          {/* Right column — Contact + CTA */}
          <div className="space-y-6 md:text-right">
            <div className="flex items-center gap-3 md:justify-end">
              <Phone size={18} color="var(--accent)" />
              <a
                href="tel:+16262510973"
                className="font-body hover:opacity-80 transition-opacity"
                style={{
                  color: 'var(--on-dark)',
                  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                  textDecoration: 'none',
                }}
              >
                (626) 251-0973
              </a>
            </div>

            <div className="flex items-center gap-3 md:justify-end">
              <InstagramIcon size={18} color="var(--accent)" />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body hover:opacity-80 transition-opacity"
                style={{
                  color: 'var(--on-dark)',
                  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                  textDecoration: 'none',
                }}
              >
                @keikis_cakes
              </a>
            </div>

            <div className="pt-4 md:flex md:justify-end">
              <Magnetic strength={0.3}>
                <GradientButton
                  width="160px"
                  height="46px"
                  bgColor="#1C1008"
                  onClick={() => window.open(INSTAGRAM_URL, '_blank')}
                >
                  Book Now
                </GradientButton>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(250, 247, 242, 0.1)' }}
        >
          <p
            className="font-body text-center sm:text-left"
            style={{
              color: 'rgba(250, 247, 242, 0.4)',
              fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
            }}
          >
            All payments and deposits are non-refundable.
          </p>
          <p
            className="font-body text-center sm:text-right"
            style={{
              color: 'rgba(250, 247, 242, 0.4)',
              fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
            }}
          >
            © {new Date().getFullYear()} Keiki's Cakes & Treats
          </p>
        </div>
      </div>
    </footer>
  )
}
