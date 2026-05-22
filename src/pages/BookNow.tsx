import { useEffect } from 'react'
import { gsap } from 'gsap'
import GradientButton from '../components/ui/button-1'

const INSTAGRAM_URL = 'https://www.instagram.com/keikis_cakes'

export default function BookNow() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.book-left > *', {
        opacity: 0, y: 20, duration: 0.75, stagger: 0.12, delay: 0.2, ease: 'power3.out',
      })
      gsap.from('.book-right > *', {
        opacity: 0, y: 20, duration: 0.75, stagger: 0.12, delay: 0.5, ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-enter min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left half — cream background: The Process */}
        <div className="book-left w-full md:w-1/2 flex items-center" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="w-full max-w-lg mx-auto px-8 lg:px-12 py-24 md:py-0">
            <h1
              className="font-display font-semibold mb-10"
              style={{
                color: 'var(--on-bg)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
              }}
            >
              Here's how to get started.
            </h1>

            {/* Step 01 */}
            <div className="mb-10">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-display font-light" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--accent)', lineHeight: 1 }}>01</span>
                <h3 className="font-body font-medium" style={{ color: 'var(--on-bg)', fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)' }}>
                  Send a DM on Instagram
                </h3>
              </div>
              <p className="text-body text-muted" style={{ paddingLeft: '2.75rem' }}>
                Include your event date, how many people you're feeding, and a photo that captures the design you have in mind.
              </p>
            </div>

            {/* Step 02 */}
            <div className="mb-10">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-display font-light" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--accent)', lineHeight: 1 }}>02</span>
                <h3 className="font-body font-medium" style={{ color: 'var(--on-bg)', fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)' }}>
                  Secure your date with a deposit
                </h3>
              </div>
              <p className="text-body text-muted" style={{ paddingLeft: '2.75rem' }}>
                Orders under $100 are prepaid in full. Orders over $100 require a 50% deposit. Your date is not confirmed until payment is received — a DM alone won't hold your spot.
              </p>
            </div>

            {/* Step 03 */}
            <div className="mb-12">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-display font-light" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--accent)', lineHeight: 1 }}>03</span>
                <h3 className="font-body font-medium" style={{ color: 'var(--on-bg)', fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)' }}>
                  Pick up and celebrate
                </h3>
              </div>
              <p className="text-body text-muted" style={{ paddingLeft: '2.75rem' }}>
                3–5 days minimum notice. Rush orders may be available with a $15 fee. Balance is due the day of your event.
              </p>
            </div>

            {/* CTA */}
            <div className="mb-4">
              <GradientButton
                width="200px"
                height="54px"
                bgColor="#FAF7F2"
                onClick={() => window.open(INSTAGRAM_URL, '_blank')}
              >
                Book Now
              </GradientButton>
            </div>
            <p className="font-body text-muted" style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)', fontWeight: 300 }}>
              Tapping this button opens Instagram. Send a DM to @keikis_cakes to begin your order.
            </p>
          </div>
        </div>

        {/* Right half — dark espresso background: Payment info */}
        <div className="book-right w-full md:w-1/2 flex items-center" style={{ backgroundColor: 'var(--dark)' }}>
          <div className="w-full max-w-lg mx-auto px-8 lg:px-12 py-20 md:py-0">
            <h2
              className="font-display font-light italic mb-10"
              style={{
                color: 'var(--on-dark)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                lineHeight: 1.1,
              }}
            >
              How to pay
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <p className="font-body" style={{ color: 'var(--on-dark)', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                  Venmo: @keikis_cakes
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <p className="font-body" style={{ color: 'var(--on-dark)', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                  Zelle: Saleena Rey · (626) 251-0973
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <p className="font-body" style={{ color: 'var(--on-dark)', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                  Apple Pay: (626) 251-0973
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <p className="font-body" style={{ color: 'var(--on-dark)', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                  CashApp: $keikilanirey
                </p>
              </div>
            </div>

            <p
              className="font-body mt-12"
              style={{
                color: 'var(--muted-deco)',
                fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
                fontWeight: 300,
              }}
            >
              All payments and deposits are non-refundable.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
