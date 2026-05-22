import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GradientButton from '../components/ui/button-1'
import Magnetic from '../components/ui/Magnetic'

gsap.registerPlugin(ScrollTrigger)

const INSTAGRAM_URL = 'https://www.instagram.com/keikis_cakes'

export default function Contact() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero > *', {
        opacity: 0, y: 20, duration: 0.75, stagger: 0.1, delay: 0.2, ease: 'power3.out',
      })

      /* Scroll-triggered text reveal */
      const textElements = gsap.utils.toArray('h2, h3, p')
      textElements.forEach((el: any) => {
        gsap.from(el, {
          opacity: 0,
          y: 15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: 'var(--dark)' }}>
      <div className="flex flex-col items-center justify-center min-h-screen pt-[72px] pb-20 px-6 lg:px-10">

        {/* Hero — CTA + Instagram DM guidance */}
        <div className="contact-hero max-w-2xl mx-auto text-center mb-20">
          <p
            className="font-body mb-6"
            style={{
              color: 'var(--accent)',
              fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Book Your Order
          </p>

          <h1
            className="font-display font-light italic mb-6"
            style={{
              color: 'var(--on-dark)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.1,
            }}
          >
            Let's make your celebration unforgettable.
          </h1>

          <p
            className="font-body mb-10"
            style={{
              color: 'rgba(250, 247, 242, 0.75)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              maxWidth: '480px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.82,
            }}
          >
            All orders are placed through Instagram DM. Tap the button below to send us your event details and we'll get started.
          </p>

          <Magnetic strength={0.3}>
            <GradientButton
              width="220px"
              height="56px"
              bgColor="#1C1008"
              onClick={() => window.open(INSTAGRAM_URL, '_blank')}
            >
              DM on Instagram
            </GradientButton>
          </Magnetic>

          <p
            className="font-body mt-6"
            style={{
              color: 'rgba(250, 247, 242, 0.45)',
              fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
            }}
          >
            Opens Instagram · @keikis_cakes
          </p>
        </div>

        {/* Order Details — 3-column grid */}
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

            {/* What to Include */}
            <div className="space-y-4">
              <h3
                className="font-body font-medium text-lg"
                style={{ color: 'var(--accent)' }}
              >
                What to Include in Your DM
              </h3>
              <div className="space-y-3">
                {[
                  'Your event date',
                  'How many guests you\'re feeding',
                  'A photo of the design you have in mind',
                  'Any flavor preferences or allergies',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: 'rgba(250, 247, 242, 0.8)' }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deposits & Booking */}
            <div className="space-y-4">
              <h3
                className="font-body font-medium text-lg"
                style={{ color: 'var(--accent)' }}
              >
                Deposits & Booking
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'rgba(250, 247, 242, 0.8)' }}
              >
                Orders under $100 must be prepaid in full. Orders exceeding $100 require a 50% non-refundable deposit to secure your event date.
              </p>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'rgba(250, 247, 242, 0.8)' }}
              >
                We require a minimum of 3–5 days notice for all custom orders. Rush orders may be accommodated with an additional $15 fee.
              </p>
            </div>

            {/* Accepted Payments */}
            <div className="space-y-4">
              <h3
                className="font-body font-medium text-lg"
                style={{ color: 'var(--accent)' }}
              >
                Accepted Payments
              </h3>
              <div className="space-y-3">
                {[
                  'Venmo: @keikis_cakes',
                  'Zelle: Saleena Rey · (626) 251-0973',
                  'Apple Pay: (626) 251-0973',
                  'CashApp: $keikilanirey',
                ].map((method, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    <p
                      className="font-body text-sm"
                      style={{ color: 'rgba(250, 247, 242, 0.9)' }}
                    >
                      {method}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Policy disclaimer */}
          <p
            className="font-body mt-14 text-center"
            style={{
              color: 'var(--muted-deco)',
              fontSize: '11px',
              letterSpacing: '0.05em',
            }}
          >
            * ALL PAYMENTS AND DEPOSITS ARE NON-REFUNDABLE.
          </p>
        </div>

      </div>
    </div>
  )
}
