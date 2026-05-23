import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import KeikiLogo from './KeikiLogo'
import GradientButton from './ui/button-1'
import Magnetic from './ui/Magnetic'

const INSTAGRAM_URL = 'https://www.instagram.com/keikis_cakes'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const threshold = isHome ? window.innerHeight * 2.8 : 60
      setScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Visual states ───────────────────────────────────────── */
  const showFrost = !isHome || scrolled
  const iconColor = showFrost ? 'var(--on-bg)' : '#FAF7F2'

  return (
    <>
      {/* Pill wrapper — fixed, centered, floats with margin from edges */}
      <div
        className="fixed top-0 left-0 right-0 z-[110] flex justify-center pointer-events-none"
        style={{ padding: '14px 16px 0' }}
      >
        <nav
          className="pointer-events-auto transition-all duration-500"
          style={{
            width: '100%',
            maxWidth: '860px',
            borderRadius: '9999px',
            padding: '0 24px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            /* Frosted white pill or transparent */
            background: showFrost
              ? 'rgba(255, 255, 255, 0.72)'
              : 'rgba(255, 255, 255, 0)',
            backdropFilter: showFrost ? 'blur(18px) saturate(1.6)' : 'none',
            WebkitBackdropFilter: showFrost ? 'blur(18px) saturate(1.6)' : 'none',
            border: showFrost
              ? '1px solid rgba(255, 255, 255, 0.45)'
              : '1px solid transparent',
            boxShadow: showFrost
              ? '0 4px 24px rgba(44, 26, 14, 0.08), 0 1px 3px rgba(44, 26, 14, 0.04)'
              : 'none',
          }}
        >
          {/* Logo */}
          <Link to="/" className="relative z-10 shrink-0" aria-label="Keiki's Cakes Home">
            <KeikiLogo light={isHome && !scrolled} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/gallery"
              className="nav-link"
              style={{ color: showFrost ? 'var(--on-bg)' : '#FAF7F2' }}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="nav-link"
              style={{ color: showFrost ? 'var(--on-bg)' : '#FAF7F2' }}
            >
              About
            </Link>
          </div>

          {/* Book Now — desktop */}
          <div className="hidden md:inline-flex shrink-0">
            <Magnetic strength={0.2}>
              <GradientButton
                width="130px"
                height="40px"
                bgColor={showFrost ? '#FFFFFF' : 'transparent'}
                onClick={() => navigate('/contact')}
              >
                Book Now
              </GradientButton>
            </Magnetic>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-[110] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <X size={24} color="var(--on-bg)" />
            ) : (
              <Menu size={24} color={iconColor} />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          <Link to="/gallery" className="font-display font-semibold text-espresso" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Gallery
          </Link>
          <Link to="/about" className="font-display font-semibold text-espresso" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            About
          </Link>
          <Link to="/book" className="font-display font-semibold text-espresso" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Book Now
          </Link>
          <div className="mt-4">
            <GradientButton
              width="180px"
              height="50px"
              bgColor="#FAF7F2"
              onClick={() => navigate('/contact')}
            >
              Book Now
            </GradientButton>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="mt-6 text-espresso/70 hover:text-espresso transition-colors font-body text-sm uppercase tracking-wider flex items-center gap-2"
          >
            <span>← Back to Website</span>
          </button>
        </div>
      )}
    </>
  )
}

