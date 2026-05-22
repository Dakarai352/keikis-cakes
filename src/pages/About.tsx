import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VanillaTilt from 'vanilla-tilt'
import GradientButton from '../components/ui/button-1'
import ShinyText from '../components/ui/ShinyText'
import Magnetic from '../components/ui/Magnetic'

gsap.registerPlugin(ScrollTrigger)

const INSTAGRAM_URL = 'https://www.instagram.com/keikis_cakes'

export default function About() {
  const heroImgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const specialtiesRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement & { vanillaTilt?: any }>(null)

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 12,
        speed: 400,
        glare: true,
        'max-glare': 0.15,
        scale: 1.03
      })
    }
    return () => tiltRef.current?.vanillaTilt?.destroy()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-hero-img', {
        opacity: 0, duration: 0.9, delay: 0.2, ease: 'power3.out',
      })
      gsap.from('.about-hero-text', {
        opacity: 0, scale: 0.95, duration: 1, delay: 0.5, ease: 'power3.out',
      })
      /* Subtle Reveal for all text elements — Centralized to prevent conflicts */
      const textElements = gsap.utils.toArray('h2, h3, p, .about-specialty-item')
      textElements.forEach((el: any) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true // Ensure it never resets once visible
          }
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-enter" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Hero — full-width cake photo with overlay text */}
      <div ref={heroImgRef} className="about-hero-img relative w-full overflow-hidden" style={{ height: '65vh', minHeight: '400px' }}>
        <img
          src="/images/gallery-3.webp"
          alt="Detailed amethyst geode cake — Keiki's Cakes signature craftsmanship"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.95) brightness(0.98)' }}
        />
        <div className="absolute inset-0" style={{ background: 'var(--photo-veil)' }} />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1
            className="about-hero-text font-display font-light italic text-center text-over-photo"
            style={{
              color: 'var(--on-dark)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.1,
              maxWidth: '700px',
            }}
          >
            Made with more than most people think.
          </h1>
        </div>
      </div>

      {/* Two-column: sticky left image + scrolling right copy */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left column — sticky portrait */}
          <div className="w-full md:w-5/12">
            <div className="md:sticky md:top-[100px]">
              <div className="overflow-hidden rounded-image shadow-ambient">
                <div ref={tiltRef}>
                  <img
                    src="/images/gallery-4.webp"
                    alt="Saleena's handcrafted purple floral cake"
                    className="keiki-photo w-full h-[400px] md:h-[520px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column — scrolling about copy */}
          <div className="w-full md:w-7/12 space-y-6">
            <p className="text-label text-muted mb-4">About Saleena</p>

            <p className="text-body" style={{ color: 'var(--on-bg)' }}>
              I didn't start baking because it seemed easy. I started because the result was worth everything the process demanded.
            </p>

            <p className="text-body" style={{ color: 'var(--on-bg)' }}>
              Most people see a finished cake and think: beautiful. What they don't see is the hours of planning, the precision of every layer, the weight of knowing this cake will be the center of someone's celebration — and that it has to be right.
            </p>

            <p className="text-body" style={{ color: 'var(--on-bg)' }}>
              I fell in love with that responsibility. I still do.
            </p>

            <p className="text-body" style={{ color: 'var(--on-bg)' }}>
              Every order I take is built from scratch, around your event and nobody else's. Your date. Your people. Your design. That's the whole point.
            </p>

            <p className="text-body" style={{ color: 'var(--on-bg)' }}>
              I'm based in La Puente, and I serve the West Covina and Inland Empire communities because these are my people. I want to be the person you call every time there's something worth celebrating.
            </p>

            <p className="font-display font-semibold italic" style={{ color: 'var(--accent)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', marginTop: '2rem' }}>
              — Saleena
            </p>
          </div>
        </div>
      </div>

      {/* Specialties callout */}
      <section ref={specialtiesRef} className="relative grain" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 py-20 md:py-24 text-center">
          <p className="text-label text-muted mb-6">The specialties people keep coming back for</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 mb-12">
            <div>
              <h3 className="font-display font-semibold" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--on-surface)', lineHeight: 1.1 }}>
                Banana Pudding
              </h3>
              <p className="text-body text-muted mt-2">
                <ShinyText
                  text="The signature comfort dessert"
                  speed={3}
                  color="#6B4F3A"
                  shineColor="#B8935A"
                  pauseOnHover={false}
                />
              </p>
            </div>
            <div
              style={{
                width: '1px',
                height: '60px',
                backgroundColor: 'rgba(184, 147, 90, 0.3)',
              }}
              className="hidden md:block"
            />
            <div>
              <h3 className="font-display font-semibold" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--on-surface)', lineHeight: 1.1 }}>
                Dookie Bars
              </h3>
              <p className="text-body text-muted mt-2">
                <ShinyText
                  text="Peanut butter, chocolate brownie, coconut flakes"
                  speed={3}
                  color="#6B4F3A"
                  shineColor="#B8935A"
                  pauseOnHover={false}
                  delay={1.5}
                />
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Magnetic strength={0.3}>
              <GradientButton
                width="200px"
                height="54px"
                bgColor="#FAF7F2"
                onClick={() => window.open(INSTAGRAM_URL, '_blank')}
              >
                Book Now
              </GradientButton>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  )
}
