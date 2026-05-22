import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
let lenisInstance: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenisInstance = lenis

    ScrollTrigger.config({ limitCallbacks: true })
    
    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateRaf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

export function scrollToTop(immediate = true) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' })
}
