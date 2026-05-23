import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import { gsap } from 'gsap'

/**
 * CinematicHero.tsx — Keiki's Cakes (CORRECTED BUILD)
 * Optimized for ezgif-frame-XXX naming convention.
 */

// ─── CONFIG ──────────────────────────────────────────────────────
const TOTAL_FRAMES = 212       // Total number of frames found in zip
const FILE_EXT = 'webp'
const FRAMES_DIR = '/frames' // Inside /public
const ZOOM_FACTOR = 1.0
const PARALLAX_STR = 18
// ─────────────────────────────────────────────────────────────────

function framePath(index: number): string {
  const padded = String(index + 1).padStart(3, '0')
  return `${FRAMES_DIR}/ezgif-frame-${padded}.${FILE_EXT}`
}

export default function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrame = useRef<number>(0)
  const rafRef = useRef<number | null>(null)
  const isDrawing = useRef<boolean>(false)

  // Text Animation Refs
  const hlTopRef = useRef<HTMLSpanElement>(null)
  const hlBottomRef = useRef<HTMLSpanElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)

  const [loadProgress, setLoadProgress] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isPastHero, setIsPastHero] = useState<boolean>(false)

  const getCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[index]
    if (!img || !img.complete) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // ── object-fit: cover ─────────────────────────────────────
    // Fills the entire viewport. Crops only the soft bokeh edges
    // which are expendable. The cake stays centered and sharp.
    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    ctx.drawImage(img, dx, dy, dw, dh)

  }, [])

  useEffect(() => {
    let loaded = 0
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES)

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = framePath(i)

      const onComplete = () => {
        loaded++
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = images
          setIsLoaded(true)
        }
      }

      img.onload = onComplete
      img.onerror = onComplete
      images[i] = img
    }

    imagesRef.current = images
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    getCanvasSize()
    drawFrame(0)
  }, [isLoaded, getCanvasSize, drawFrame])

  useEffect(() => {
    getCanvasSize()
    const handleResize = () => {
      getCanvasSize()
      drawFrame(currentFrame.current)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getCanvasSize, drawFrame])

  useEffect(() => {
    if (!isLoaded) return

    const handleScroll = () => {
      const container = containerRef.current
      const canvas = canvasRef.current
      const overlay = overlayRef.current
      if (!container || !canvas || !overlay) return

      const containerTop = container.getBoundingClientRect().top + window.scrollY
      const containerHeight = container.offsetHeight - window.innerHeight
      const relativeScroll = window.scrollY - containerTop
      const containerBottom = container.getBoundingClientRect().bottom

      // Once the container is fully above the viewport, kill compositing
      setIsPastHero(containerBottom <= 0)
      if (containerBottom <= 0) {
        canvas.style.opacity = '0'
        overlay.style.opacity = '0'
        canvas.style.pointerEvents = 'none'
        overlay.style.pointerEvents = 'none'
        return
      }

      const scrollFraction = Math.max(
        0,
        Math.min(1, relativeScroll / containerHeight)
      )

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollFraction * TOTAL_FRAMES)
      )

      // ── Post-completion fade ─────────────────────────────────
      // After the last frame, dissolve the canvas over ~55% of a
      // viewport so content below smoothly reveals.
      if (scrollFraction >= 1) {
        const overscroll = relativeScroll - containerHeight
        const fadeProgress = Math.min(1, overscroll / (window.innerHeight * 0.55))
        const opacity = String(1 - fadeProgress)
        canvas.style.opacity = opacity
        overlay.style.opacity = opacity
      } else {
        canvas.style.opacity = '1'
        overlay.style.opacity = '1'
      }
      overlay.style.pointerEvents = 'none'

      if (frameIndex === currentFrame.current) return
      currentFrame.current = frameIndex

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (isDrawing.current) return

      rafRef.current = requestAnimationFrame(() => {
        isDrawing.current = true
        drawFrame(currentFrame.current)
        isDrawing.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isLoaded, drawFrame])

  useEffect(() => {
    if (!isLoaded) return

    const handleMouseMove = (e: MouseEvent) => {
      // Short-circuit parallax if out of view to preserve resources for Specialities render
      if (isPastHero) return

      const canvas = canvasRef.current
      if (!canvas) return

      const xOffset = -((e.clientX / window.innerWidth - 0.5) * PARALLAX_STR * 2)
      const yOffset = -((e.clientY / window.innerHeight - 0.5) * PARALLAX_STR * 2)

      gsap.to(canvas, {
        x: xOffset,
        y: yOffset,
        duration: 0.8,
        ease: 'power2.out',
        scale: 1.05,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isLoaded])

  useEffect(() => {
    if (!isLoaded) return

    // Sequence completes organically within 1.2s utilizing steep decelerating ease
    gsap.to([hlTopRef.current, hlBottomRef.current], {
      y: '0%',
      duration: 1.0,
      stagger: 0.1,
      ease: 'expo.out',
      delay: 0.1
    })

    gsap.to(bodyRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: 'power3.out',
      delay: 0.2
    })
  }, [isLoaded])

  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: '280vh',
          position: 'relative',
          background: '#3B2B1A',
        }}
      >
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1C1008',
            transition: 'opacity 0.8s ease, visibility 0.8s ease',
            opacity: isLoaded ? 0 : 1,
            visibility: isLoaded ? 'hidden' : 'visible',
            pointerEvents: isLoaded ? 'none' : 'all',
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: '#FAF7F2',
              letterSpacing: '0.04em',
              marginBottom: '2.5rem',
            }}
          >
            Keiki's Cakes
          </span>

          <div
            style={{
              width: '200px',
              height: '1px',
              background: 'rgba(250,247,242,0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${loadProgress}%`,
                background: '#B8935A',
                transition: 'width 0.2s ease',
              }}
            />
          </div>

          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.55)',
              marginTop: '1rem',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {loadProgress}%
          </span>
        </div>

        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            display: isPastHero ? 'none' : 'block', // Kill compositor overhead when scrolled past
            zIndex: 1,
            transformOrigin: 'center center',
            background: '#3B2B1A',
            opacity: isLoaded && !isPastHero ? 1 : 0,
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none',
          }}
        />

        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            opacity: isLoaded && !isPastHero ? 1 : 0,
            visibility: isPastHero ? 'hidden' : 'visible',
            transition: 'opacity 0.8s ease 0.2s, visibility 0.8s ease',
          }}
        >
          {/* Seamless, full-width bottom vignette gradient to naturally darken the video area behind the text without box outlines */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(28, 16, 8, 0.6) 0%, rgba(28, 16, 8, 0.25) 45%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(3rem, 8vh, 6rem)',
              left: 'clamp(1.5rem, 5vw, 5rem)',
              maxWidth: '560px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              zIndex: 2,
            }}
          >
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 0.95,
                color: '#FAF7F2',
                margin: 0,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 12px rgba(28, 16, 8, 0.5), 0 1px 3px rgba(28, 16, 8, 0.3)',
              }}
            >
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <span ref={hlTopRef} style={{ display: 'block', transform: 'translateY(110%)' }}>MADE FOR YOUR</span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <span ref={hlBottomRef} style={{ display: 'block', transform: 'translateY(110%)' }}>CELEBRATION.</span>
              </span>
            </h1>

            <p
              ref={bodyRef}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                lineHeight: 1.82,
                color: 'rgba(250, 247, 242, 0.88)',
                margin: 0,
                textShadow: '0 1px 8px rgba(28, 16, 8, 0.5), 0 1px 2px rgba(28, 16, 8, 0.3)',
                opacity: 0,
                transform: 'translateY(15px)',
              }}
            >
              Every cake is built from scratch around your event —
              your date, your people, your design.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
