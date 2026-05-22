import { useState } from 'react'
import GradientButton from './button-1'
import Magnetic from './Magnetic'

interface AccordionPanel {
  src: string
  alt: string
  label: string
}

interface AccordionSliderProps {
  panels: AccordionPanel[]
  variant?: 'horizontal' | 'vertical'
}

export default function AccordionSlider({ panels, variant = 'horizontal' }: AccordionSliderProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  if (variant === 'vertical') {
    return (
      <section className="py-10 px-6 max-w-3xl mx-auto pb-28">
        <div className="text-center text-xs font-normal tracking-[0.15em] uppercase text-[var(--muted)] mb-10">
          Vertical variant — click or hover
        </div>
        <div className="flex flex-col gap-1.5">
          {panels.map((panel, i) => {
            const isActive = activeIndex === i

            return (
              <div
                key={i}
                className={`relative overflow-hidden rounded-[14px] cursor-pointer transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? 'h-[240px]' : 'h-[60px] hover:h-[240px]'
                } group`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIndex(i)
                  }
                }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${panel.src}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(28,16,8,0.8)] via-[rgba(28,16,8,0.3)] to-transparent" />
                
                <div
                  className={`absolute top-1/2 left-6 -translate-y-1/2 text-sm font-medium tracking-[0.02em] z-10 transition-opacity duration-300 ${
                    isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                  }`}
                  style={{ color: 'var(--on-dark)' }}
                >
                  {String(i + 1).padStart(2, '0')} — {panel.label}
                </div>

                <div
                  className={`absolute bottom-6 left-6 z-10 transition-all duration-400 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}
                >
                  <h3 className="text-[22px] font-semibold mb-1.5 text-[var(--on-dark)]">{panel.label}</h3>
                  <p className="text-[13px] leading-relaxed max-w-[40ch]" style={{ color: 'rgba(250,247,242,0.7)' }}>
                    {panel.alt}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  // Horizontal variant (default)
  return (
    <section className="py-[5rem] px-6 max-w-7xl mx-auto pb-[6rem] bg-[var(--bg)]">
      <div className="text-center mb-10 flex flex-col gap-2">
        <span className="font-sans text-[clamp(0.625rem,1vw,0.75rem)] tracking-[0.18em] uppercase text-[var(--muted)]">
          From the Kitchen
        </span>
        <h2 className="font-display font-semibold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-[var(--on-bg)] m-0">
          Recent Work
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-2 h-auto md:h-[70vh] md:min-h-[400px] md:max-h-[600px] w-full max-w-screen-xl mx-auto overflow-x-auto md:overflow-y-hidden snap-x">
        {panels.map((panel, i) => {
          const isActive = activeIndex === i

          return (
            <div
              key={i}
              className={`relative overflow-hidden rounded-[16px] cursor-pointer transition-[min-width,height,flex] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group snap-start shrink-0 md:shrink-1 basis-auto hover:basis-auto ${
                isActive
                  ? 'flex-[5] min-w-[280px] md:min-w-[320px] h-[280px] md:h-auto'
                  : 'flex-1 min-w-[60px] h-[60px] md:h-auto hover:flex-[5] hover:min-w-[280px] md:hover:min-w-[320px] hover:h-[280px] md:hover:h-auto'
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveIndex(i)
                }
              }}
            >
              <div
                className={`absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? 'scale-105' : 'scale-100 group-hover:scale-105'
                }`}
                style={{ backgroundImage: `url('${panel.src}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,16,8,0.85)] via-[rgba(28,16,8,0.2)] to-transparent transition-opacity duration-300" />

              {/* Vertical Title (Horizontal on mobile) */}
              <div
                className={`hidden md:block absolute bottom-7 left-4 text-[11px] font-semibold tracking-[0.08em] uppercase transition-opacity duration-300 transform rotate-180 style-[writing-mode:vertical-rl] text-[var(--on-dark)] ${
                  isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                }`}
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                {panel.label}
              </div>

              {/* Mobile Collapsed Title */}
              <div
                className={`md:hidden absolute inset-x-0 inset-y-0 flex items-center px-5 font-semibold text-sm uppercase tracking-wider text-[var(--on-dark)] transition-opacity duration-300 ${
                  isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                }`}
              >
                {panel.label}
              </div>

              {/* Expanded Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10">
                <div
                  className={`text-[11px] tracking-[0.1em] uppercase text-[var(--accent)] mb-2 font-normal transition-all duration-[400ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  className={`text-[24px] font-semibold tracking-[-0.015em] mb-1.5 text-[var(--on-dark)] transition-all duration-[400ms] delay-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}
                >
                  {panel.label}
                </h3>
                <p
                  className={`text-[14px] leading-relaxed max-w-[30ch] text-[rgba(250,247,242,0.7)] transition-all duration-[400ms] delay-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}
                >
                  {panel.alt}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Below accordion — Book Now CTA */}
      <div className="max-w-7xl mx-auto mt-14 px-10 flex justify-center">
        <Magnetic strength={0.3}>
          <GradientButton
            width="200px"
            height="54px"
            bgColor="#FAF7F2"
            onClick={() => window.open('https://www.instagram.com/keikis_cakes', '_blank')}
          >
            Book Now
          </GradientButton>
        </Magnetic>
      </div>
    </section>
  )
}
