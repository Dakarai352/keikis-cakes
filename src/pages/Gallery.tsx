import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GradientButton from '../components/ui/button-1'
import ShinyText from '../components/ui/ShinyText'
import Magnetic from '../components/ui/Magnetic'

gsap.registerPlugin(ScrollTrigger)

const INSTAGRAM_URL = 'https://www.instagram.com/keikis_cakes'

type FilterCategory = 'all' | 'cakes' | 'treats' | 'tables'

interface GalleryImage {
  src: string
  alt: string
  label: string
  category: FilterCategory
  tall?: boolean
}

const remainingFiles = [
  'image0 (18).webp', 'image1 (7).webp', 'image2 (6).webp', 'image3 (4).webp', 
  'image0.webp', 'image1.webp', 'image10 (1).webp', 'image10.webp', 
  'image11 (1).webp', 'image11.webp', 'image12.webp', 'image13.webp', 
  'image14.webp', 'image15.webp', 'image16.webp', 'image17.webp', 
  'image19.webp', 'image2.webp', 'image20.webp', 'image3 (3).webp', 
  'image3.webp', 'image4 (4).webp', 'image5 (4).webp', 
  'image5.webp', 'image6 (4).webp', 'image6.webp', 'image7.webp', 
  'image8.webp', 'image9.webp'
]

const specialtyTreats = [
  'image0 (18).webp', 'image1 (7).webp', 'image2 (6).webp', 'image3 (4).webp',
  'image3.webp', 'image5.webp', 'image7.webp', 'image8.webp', 
  'image10.webp', 'image11.webp', 'image3 (3).webp', 'image6 (4).webp'
]
const dessertTables = ['image17.webp']
const weddingDesigns = ['image9.webp']

const images: GalleryImage[] = remainingFiles.map((filename, i) => {
  let label = 'Custom Birthday Design'
  let category: FilterCategory = 'cakes'

  if (specialtyTreats.includes(filename)) {
    label = 'Specialty Treat'
    category = 'treats'
  } else if (dessertTables.includes(filename)) {
    label = 'Dessert Table'
    category = 'tables'
  } else if (weddingDesigns.includes(filename)) {
    label = 'Custom Wedding Design'
    category = 'cakes'
  }

  return {
    src: `/images/keikiscakesassets/${filename}`,
    alt: `Keiki's Cakes Gallery Work: ${label}`,
    label,
    category,
    tall: i % 3 === 0
  }
})

const filters: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'cakes', label: 'Cakes' },
  { key: 'treats', label: 'Specialty Treats' },
  { key: 'tables', label: 'Dessert Tables' },
]

export default function Gallery() {
  const [active, setActive] = useState<FilterCategory>('all')
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = active === 'all' ? images : images.filter(img => img.category === active)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-page-title', {
        opacity: 0, scale: 0.98, duration: 1, delay: 0.2, ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      })

      /* Global text reveal — targeting specific sections to avoid header conflict */
      const textElements = gsap.utils.toArray('.gallery-filter-bar, h2, p, button')
      textElements.forEach((el: any) => {
        gsap.from(el, {
          opacity: 0,
          y: 15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        })
      })
    })
    return () => ctx.revert()
  }, [active])

  return (
    <div className="page-enter" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Page header */}
      <div className="pt-[120px] pb-8 max-w-7xl mx-auto px-6 lg:px-10">
        <p className="gallery-page-title text-label text-muted mb-3">The Work</p>
        <h1 className="gallery-page-title text-page-headline" style={{ color: 'var(--on-bg)' }}>
          <ShinyText
            text="Every Cake Tells a Story"
            speed={2.5}
            color="#1C1008"
            shineColor="#B8935A"
            spread={90}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
          />
        </h1>
      </div>

      {/* Filter bar */}
      <div className="gallery-filter-bar max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        <div className="flex gap-6 flex-wrap">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className="font-body relative pb-1 transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center"
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                color: active === f.key ? 'var(--on-bg)' : 'var(--muted)',
                borderBottom: active === f.key ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="columns-2 md:columns-3 lg:columns-3 gap-6">
          {filtered.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="gallery-item mb-6 break-inside-avoid relative overflow-hidden rounded-[12px] shadow-ambient"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="keiki-photo w-full object-cover"
                style={{ height: img.tall ? '440px' : '320px' }}
                loading={i > 5 ? 'lazy' : undefined}
              />
              <div className="gallery-label">{img.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section style={{ backgroundColor: 'var(--dark)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
          <h2
            className="font-display font-light italic mb-6"
            style={{
              color: 'var(--on-dark)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              lineHeight: 1.2,
            }}
          >
            Don't see what you're looking for?
          </h2>
          <p
            className="font-body mb-10"
            style={{
              color: 'rgba(250, 247, 242, 0.75)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
            }}
          >
            Every cake is made to order. Send a reference photo and I'll build it.
          </p>
          <div className="flex justify-center">
            <Magnetic strength={0.3}>
              <GradientButton
                width="200px"
                height="54px"
                bgColor="#1C1008"
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
