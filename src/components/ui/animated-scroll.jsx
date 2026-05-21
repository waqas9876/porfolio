import { useState, useEffect, useRef, useCallback } from 'react'
import { useLenis } from 'lenis/react'

export default function ScrollAdventure({ pages }) {
  const [currentPage, setCurrentPage] = useState(1)
  const numOfPages = pages.length
  const animTime = 1000
  const scrolling = useRef(false)
  const locked = useRef(false)
  const exiting = useRef(false)
  const sectionRef = useRef(null)
  const lenis = useLenis()

  // ── lock / unlock Lenis ──────────────────────────────
  const lock = useCallback(() => {
    if (locked.current) return
    locked.current = true
    lenis?.stop()
    // snap section to viewport top
    if (sectionRef.current) {
      lenis?.scrollTo(sectionRef.current, { immediate: true, offset: 0 })
    }
  }, [lenis])

  const unlock = useCallback(() => {
    locked.current = false
    exiting.current = true
    lenis?.start()
    // prevent re-lock for 1.5s while page scrolls away
    setTimeout(() => { exiting.current = false }, 1500)
  }, [lenis])

  // ── IntersectionObserver ─────────────────────────────
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !exiting.current) {
          // positive top → section entering from below (scrolling down) → start at page 1
          // negative top → section entering from above (scrolling up) → start at last page
          const fromBottom = entry.boundingClientRect.top > 0
          setCurrentPage(fromBottom ? 1 : numOfPages)
          lock()
        } else if (!entry.isIntersecting) {
          locked.current = false
          lenis?.start()
        }
      },
      { threshold: 0.85 }
    )
    observer.observe(el)
    return () => { observer.disconnect(); lenis?.start() }
  }, [lenis, lock, numOfPages])

  // ── Wheel handler ────────────────────────────────────
  const handleWheel = useCallback((e) => {
    if (!locked.current) return
    const atFirst  = currentPage === 1
    const atLast   = currentPage === numOfPages
    const goingUp  = e.deltaY < 0
    const goingDown = e.deltaY > 0

    // boundary → release the lock and let Lenis scroll the page
    if (atFirst && goingUp) { unlock(); return }
    if (atLast && goingDown) { unlock(); return }

    // mid-section → trap the scroll
    e.preventDefault()
    e.stopPropagation()
    if (scrolling.current) return
    scrolling.current = true
    goingDown
      ? setCurrentPage(p => Math.min(numOfPages, p + 1))
      : setCurrentPage(p => Math.max(1, p - 1))
    setTimeout(() => (scrolling.current = false), animTime)
  }, [currentPage, numOfPages, unlock])

  // ── Keyboard handler ─────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (!locked.current || scrolling.current) return
    if (e.key === 'ArrowDown') {
      if (currentPage === numOfPages) { unlock(); return }
      e.preventDefault()
      scrolling.current = true
      setCurrentPage(p => Math.min(numOfPages, p + 1))
      setTimeout(() => (scrolling.current = false), animTime)
    } else if (e.key === 'ArrowUp') {
      if (currentPage === 1) { unlock(); return }
      e.preventDefault()
      scrolling.current = true
      setCurrentPage(p => Math.max(1, p - 1))
      setTimeout(() => (scrolling.current = false), animTime)
    }
  }, [currentPage, numOfPages, unlock])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleWheel, handleKeyDown])

  // ── Render ────────────────────────────────────────────
  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-black" style={{ height: '100svh' }}>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentPage === i + 1 ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      {currentPage < numOfPages && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 text-white/40 animate-bounce pointer-events-none">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      )}

      {/* Slide counter */}
      <div className="absolute top-6 right-6 z-50 text-white/30 text-xs font-mono tracking-widest">
        {String(currentPage).padStart(2,'0')} / {String(numOfPages).padStart(2,'0')}
      </div>

      {pages.map((page, i) => {
        const idx = i + 1
        const isActive = currentPage === idx
        const leftTrans  = isActive ? 'translateY(0)' : 'translateY(100%)'
        const rightTrans = isActive ? 'translateY(0)' : 'translateY(-100%)'

        return (
          <div key={idx} className="absolute inset-0">

            {/* Left Half — full-width on mobile if it has content, hidden if it's decorative-only */}
            <div
              className={`absolute top-0 left-0 h-full transition-transform duration-[1000ms] ease-in-out ${page.leftContent ? 'w-full sm:w-1/2' : 'hidden sm:block sm:w-1/2'}`}
              style={{ transform: leftTrans }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: page.leftBgImage ? `url(${page.leftBgImage})` : undefined,
                  backgroundColor: page.leftBgImage ? undefined : '#0d0d0d',
                }}
              >
                <div className="flex flex-col items-center justify-center h-full text-white p-8 sm:p-10">
                  {page.leftContent && (
                    <div className="max-w-sm text-center">
                      {page.leftContent.label && (
                        <p className="text-xs font-bold tracking-[3px] uppercase text-white/50 mb-4">
                          {page.leftContent.label}
                        </p>
                      )}
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight mb-4 tracking-tight">
                        {page.leftContent.heading}
                      </h2>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                        {page.leftContent.description}
                      </p>
                      {page.leftContent.cta && (
                        <a
                          href={page.leftContent.cta.href}
                          target={page.leftContent.cta.external ? '_blank' : undefined}
                          rel={page.leftContent.cta.external ? 'noreferrer' : undefined}
                          onClick={page.leftContent.cta.external ? undefined : (e) => { e.preventDefault(); unlock(); setTimeout(() => document.querySelector(page.leftContent.cta.href)?.scrollIntoView({ behavior: 'smooth' }), 600) }}
                          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-black font-bold text-xs sm:text-sm rounded-lg hover:bg-white/90 transition"
                        >
                          {page.leftContent.cta.label}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half — full-width on mobile if it has content, hidden if it's decorative-only */}
            <div
              className={`absolute top-0 h-full transition-transform duration-[1000ms] ease-in-out ${page.rightContent ? 'w-full left-0 sm:left-1/2 sm:w-1/2' : 'hidden sm:block w-1/2 left-1/2'}`}
              style={{ transform: rightTrans }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: page.rightBgImage ? `url(${page.rightBgImage})` : undefined,
                  backgroundColor: page.rightBgImage ? undefined : '#111111',
                }}
              >
                <div className="flex flex-col items-center justify-center h-full text-white p-8 sm:p-10">
                  {page.rightContent && (
                    <div className="max-w-sm text-center">
                      {page.rightContent.label && (
                        <p className="text-xs font-bold tracking-[3px] uppercase text-white/50 mb-4">
                          {page.rightContent.label}
                        </p>
                      )}
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight mb-4 tracking-tight">
                        {page.rightContent.heading}
                      </h2>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                        {page.rightContent.description}
                      </p>
                      {page.rightContent.cta && (
                        <a
                          href={page.rightContent.cta.href}
                          target={page.rightContent.cta.external ? '_blank' : undefined}
                          rel={page.rightContent.cta.external ? 'noreferrer' : undefined}
                          onClick={page.rightContent.cta.external ? undefined : (e) => { e.preventDefault(); unlock(); setTimeout(() => document.querySelector(page.rightContent.cta.href)?.scrollIntoView({ behavior: 'smooth' }), 600) }}
                          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-black font-bold text-xs sm:text-sm rounded-lg hover:bg-white/90 transition"
                        >
                          {page.rightContent.cta.label}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}
