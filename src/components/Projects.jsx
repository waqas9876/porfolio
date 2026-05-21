import { useCallback, useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { HeroParallax } from '@/components/ui/hero-parallax'

const PROJECTS = [
  {
    title: 'E-Commerce Fashion Store',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
    tag: 'Shopify',
  },
  {
    title: 'Real Estate Platform',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
    tag: 'WordPress',
  },
  {
    title: 'SaaS Dashboard UI',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    tag: 'React',
  },
  {
    title: 'Restaurant Booking App',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80',
    tag: 'Laravel',
  },
  {
    title: 'Digital Marketing Agency',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efbc07?auto=format&fit=crop&w=600&q=80',
    tag: 'WordPress',
  },
  {
    title: 'Online Learning Platform',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80',
    tag: 'Laravel + React',
  },
  {
    title: 'Fitness & Wellness Store',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    tag: 'Shopify',
  },
  {
    title: 'Corporate Portfolio Site',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    tag: 'WordPress',
  },
  {
    title: 'Inventory Management System',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    tag: 'PHP + MySQL',
  },
  {
    title: 'Travel Booking Website',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    tag: 'WordPress',
  },
  {
    title: 'Healthcare Patient Portal',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    tag: 'Laravel',
  },
  {
    title: 'Jewellery E-Commerce',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    tag: 'Shopify',
  },
  {
    title: 'Tech Startup Landing Page',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    tag: 'React',
  },
  {
    title: 'Blog & News Magazine',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    tag: 'WordPress',
  },
  {
    title: 'Events Management Platform',
    link: '#projects',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    tag: 'Laravel + React',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const lenis = useLenis()
  const locked = useRef(false)
  const exiting = useRef(false)

  const lock = useCallback(() => {
    if (locked.current) return
    locked.current = true
    lenis?.stop()
    if (sectionRef.current) {
      // snap to section top
      const top = sectionRef.current.offsetTop
      window.scrollTo({ top, behavior: 'instant' })
    }
  }, [lenis])

  const unlock = useCallback(() => {
    locked.current = false
    exiting.current = true
    lenis?.start()
    setTimeout(() => { exiting.current = false }, 1500)
  }, [lenis])

  // Lock when section enters viewport from below (scrolling down into it)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !exiting.current) {
          const fromBottom = entry.boundingClientRect.top > 0
          if (fromBottom) lock()
        } else if (!entry.isIntersecting) {
          locked.current = false
          lenis?.start()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => { observer.disconnect(); lenis?.start() }
  }, [lenis, lock])

  // Wheel handler: while locked, manually advance scroll through the section
  const handleWheel = useCallback((e) => {
    if (!locked.current) return

    const el = sectionRef.current
    if (!el) return

    const sectionTop = el.offsetTop
    const sectionHeight = el.offsetHeight
    const viewportHeight = window.innerHeight
    const currentScroll = window.scrollY

    // Scrolling up at section top → release upward
    if (e.deltaY < 0 && currentScroll <= sectionTop + 10) {
      unlock()
      return
    }

    // Scrolling down past section bottom → release downward
    const sectionEnd = sectionTop + sectionHeight
    if (e.deltaY > 0 && currentScroll >= sectionEnd - viewportHeight - 50) {
      unlock()
      return
    }

    // Trap: manually drive scroll within the section
    e.preventDefault()
    e.stopPropagation()

    const next = Math.max(sectionTop, Math.min(sectionEnd - viewportHeight, currentScroll + e.deltaY * 0.9))
    window.scrollTo({ top: next, behavior: 'instant' })
  }, [unlock])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: 0, background: 'var(--bg)', marginTop: '4rem' }}
    >
      <HeroParallax products={PROJECTS} />
    </section>
  )
}
