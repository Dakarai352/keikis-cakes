import { Link } from 'react-router-dom'
import GradientButton from '../components/ui/button-1'
import Magnetic from '../components/ui/Magnetic'

const INSTAGRAM_URL = 'https://www.instagram.com/keikis_cakes'

export default function NotFound() {
  return (
    <div className="page-enter min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="text-center px-6 max-w-lg">
        <span
          className="font-display font-light block mb-4"
          style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'var(--accent)', lineHeight: 1 }}
        >
          404
        </span>

        <h1
          className="font-display font-semibold mb-4"
          style={{
            color: 'var(--on-bg)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.1,
          }}
        >
          This page doesn't exist.
        </h1>

        <p
          className="font-body mb-10"
          style={{
            color: 'var(--muted)',
            fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          }}
        >
          The page you're looking for may have been moved or no longer exists.
          Let's get you back to the good stuff.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link to="/">
            <Magnetic strength={0.2}>
              <GradientButton width="180px" height="48px" bgColor="#FAF7F2">
                Back Home
              </GradientButton>
            </Magnetic>
          </Link>

          <Magnetic strength={0.2}>
            <GradientButton
              width="180px"
              height="48px"
              bgColor="#FAF7F2"
              onClick={() => window.open(INSTAGRAM_URL, '_blank')}
            >
              Book a Cake
            </GradientButton>
          </Magnetic>
        </div>
      </div>
    </div>
  )
}
