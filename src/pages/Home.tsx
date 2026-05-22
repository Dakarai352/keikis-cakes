import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CinematicHero from '../components/CinematicHero'
import AccordionSlider from '../components/ui/AccordionSlider'
import GradientButton from '../components/ui/button-1'
import Magnetic from '../components/ui/Magnetic'

gsap.registerPlugin(ScrollTrigger)

const INSTAGRAM_URL = 'https://www.instagram.com/keikis_cakes'

const GALLERY_PANELS = [
  { src: '/images/keikiscakesassets/image7 (3).webp', alt: 'Recent Custom Cake 1', label: 'Recent Work 1' },
  { src: '/images/keikiscakesassets/image8 (2).webp', alt: 'Recent Custom Cake 2', label: 'Recent Work 2' },
  { src: '/images/keikiscakesassets/image2 (5).webp', alt: 'Recent Custom Cake 3', label: 'Recent Work 3' },
  { src: '/images/keikiscakesassets/image21.webp', alt: 'Recent Custom Cake 4', label: 'Recent Work 4' },
  { src: '/images/keikiscakesassets/image18.webp', alt: 'Recent Custom Cake 5', label: 'Recent Work 5' }
]

export default function Home() {
  const specialtiesRef = useRef<HTMLDivElement>(null)
  const recentRef = useRef<HTMLDivElement>(null)
  const howRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Specialties section */
      gsap.from('.specialty-card', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: specialtiesRef.current, start: 'top 80%' },
      })

      /* The Specialties typewriter text */
      gsap.from('.specialties-word', {
        y: '110%',
        opacity: 0,
        duration: 1.2,
        stagger: 0.35,
        ease: 'power4.out',
        scrollTrigger: { trigger: specialtiesRef.current, start: 'top 75%' },
      })

      /* Recent work images */
      gsap.from('.recent-img', {
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: recentRef.current, start: 'top 80%' },
      })

      /* How it works */
      gsap.from('.how-step', {
        opacity: 0,
        y: 20,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: howRef.current, start: 'top 80%' },
      })

      /* All remaining text elements — Subtle Fade In + Rise (Excluding staggered cards) */
      const textElements = gsap.utils.toArray('h2, .btn-book, .how-step p')
      textElements.forEach((el: any) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        })
      })

      /* Specialties Images — Soft Reveal */
      gsap.from('.specialty-img-wrap', {
        opacity: 0,
        scale: 0.98,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2, // Offset if multiple in view
        scrollTrigger: {
          trigger: '.specialty-img-wrap',
          start: 'top 85%',
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="page-enter">
      <CinematicHero />

      {/* ============================================================
          SECTION A — The Specialties
          ============================================================ */}
      <section ref={specialtiesRef} className="relative">
        {/* Card 1: Banana Pudding — light background */}
        <div className="specialty-card relative grain" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
            <div className="flex flex-col md:flex-row md:items-stretch items-center gap-10 md:gap-16">
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="specialty-img-wrap overflow-hidden rounded-[12px] shadow-ambient">
                  <img
                    src="/images/keikiscakesassets/image1 (7).webp"
                    alt="Banana Pudding by Keiki's Cakes"
                    className="keiki-photo w-full h-[400px] md:h-[500px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                <h2 className="text-section-heading flex flex-wrap gap-[0.25em]" style={{ color: 'var(--on-bg)' }}>
                  <span className="overflow-hidden inline-block py-1 -my-1"><span className="specialties-word inline-block">The</span></span>
                  <span className="overflow-hidden inline-block py-1 -my-1"><span className="specialties-word inline-block">Specialties</span></span>
                </h2>
                <h3 className="text-subheading" style={{ color: 'var(--on-bg)' }}>
                  Banana Pudding
                </h3>
                <p className="text-body" style={{ color: 'var(--muted)', maxWidth: '420px' }}>
                  The signature comfort dessert. Rich, layered, and the reason people keep coming back before they even think about cake.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Dookie Bars — dark background */}
        <div className="specialty-card relative" style={{ backgroundColor: 'var(--dark)' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
            <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-section-heading" style={{ color: 'var(--on-dark)' }}>
                  DOOKIE BARS
                </h2>
                <p className="text-body" style={{ color: 'rgba(250, 247, 242, 0.75)', maxWidth: '420px' }}>
                  Graham Cracker Crust layered with sweetened condensed milk, walnuts, two types of chocolate chips & topped with coconut flakes.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="specialty-img-wrap overflow-hidden rounded-[12px] shadow-ambient">
                  <img
                    src="/images/keikiscakesassets/image7.webp"
                    alt="Dookie Bars — chocolate brownie treats by Keiki's Cakes"
                    className="keiki-photo w-full h-[400px] md:h-[500px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION B — Recent Work (Accordion Gallery)
          ============================================================ */}
      <AccordionSlider panels={GALLERY_PANELS} />

      {/* ============================================================
          SECTION C — How It Works
          ============================================================ */}
      <section ref={howRef} className="relative grain" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="text-center mb-16">
            <h2 className="text-section-heading" style={{ color: 'var(--on-surface)' }}>How It Works</h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-12">
            <div className="how-step flex gap-6 items-start">
              <span
                className="font-display font-light shrink-0"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--accent)', lineHeight: 1 }}
              >
                01
              </span>
              <div>
                <p className="text-body" style={{ color: 'var(--on-surface)' }}>
                  Send a DM on Instagram with your event date, guest count, and a design reference photo.
                </p>
              </div>
            </div>

            <div className="how-step flex gap-6 items-start">
              <span
                className="font-display font-light shrink-0"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--accent)', lineHeight: 1 }}
              >
                02
              </span>
              <div>
                <p className="text-body" style={{ color: 'var(--on-surface)' }}>
                  Secure your date with a deposit. Your date isn't confirmed until payment is received.
                </p>
              </div>
            </div>

            <div className="how-step flex gap-6 items-start">
              <span
                className="font-display font-light shrink-0"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--accent)', lineHeight: 1 }}
              >
                03
              </span>
              <div>
                <p className="text-body" style={{ color: 'var(--on-surface)' }}>
                  Pick up your order and show it off. You earned this moment.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-14">
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

