import { useState, useEffect, useRef } from 'react'

export default function ScrollAdventure({ pages }) {
  const [currentPage, setCurrentPage] = useState(1)
  const numOfPages = pages.length
  const animTime = 1000
  const scrolling = useRef(false)
  const isInView = useRef(false)
  const sectionRef = useRef(null)

  const navigateUp = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1)
  }
  const navigateDown = () => {
    if (currentPage < numOfPages) setCurrentPage(p => p + 1)
  }

  const handleWheel = (e) => {
    if (!isInView.current) return
    const atFirst = currentPage === 1
    const atLast  = currentPage === numOfPages
    const goingUp   = e.deltaY < 0
    const goingDown = e.deltaY > 0
    if ((atFirst && goingUp) || (atLast && goingDown)) return
    if (scrolling.current) return
    e.preventDefault()
    scrolling.current = true
    goingDown ? navigateDown() : navigateUp()
    setTimeout(() => (scrolling.current = false), animTime)
  }

  const handleKeyDown = (e) => {
    if (!isInView.current || scrolling.current) return
    if (e.key === 'ArrowUp') {
      scrolling.current = true
      navigateUp()
      setTimeout(() => (scrolling.current = false), animTime)
    } else if (e.key === 'ArrowDown') {
      scrolling.current = true
      navigateDown()
      setTimeout(() => (scrolling.current = false), animTime)
    }
  }

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { isInView.current = entry.isIntersecting },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentPage])

  return (
    <div ref={sectionRef} className="relative overflow-hidden h-screen bg-black">

      {/* Page counter */}
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

      {/* Arrow hints */}
      {currentPage < numOfPages && (
        <button
          onClick={() => { if (!scrolling.current) { scrolling.current = true; navigateDown(); setTimeout(() => (scrolling.current = false), animTime) } }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 text-white/50 hover:text-white transition-colors animate-bounce"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      )}

      {pages.map((page, i) => {
        const idx = i + 1
        const isActive = currentPage === idx
        const leftTrans  = isActive ? 'translateY(0)'    : 'translateY(100%)'
        const rightTrans = isActive ? 'translateY(0)'    : 'translateY(-100%)'

        return (
          <div key={idx} className="absolute inset-0">
            {/* Left Half */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-[1000ms] ease-in-out"
              style={{ transform: leftTrans }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: page.leftBgImage ? `url(${page.leftBgImage})` : undefined,
                         backgroundColor: page.leftBgImage ? undefined : '#0d0d0d' }}
              >
                <div className="flex flex-col items-center justify-center h-full text-white p-10">
                  {page.leftContent && (
                    <div className="max-w-sm text-center">
                      {page.leftContent.label && (
                        <p className="text-xs font-bold tracking-[3px] uppercase text-white/50 mb-4">
                          {page.leftContent.label}
                        </p>
                      )}
                      <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-5 tracking-tight">
                        {page.leftContent.heading}
                      </h2>
                      <p className="text-base text-white/70 leading-relaxed">
                        {page.leftContent.description}
                      </p>
                      {page.leftContent.cta && (
                        <a
                          href={page.leftContent.cta.href}
                          onClick={(e) => { e.preventDefault(); document.querySelector(page.leftContent.cta.href)?.scrollIntoView({ behavior: 'smooth' }) }}
                          className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-white/90 transition"
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

            {/* Right Half */}
            <div
              className="absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-[1000ms] ease-in-out"
              style={{ transform: rightTrans }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: page.rightBgImage ? `url(${page.rightBgImage})` : undefined,
                         backgroundColor: page.rightBgImage ? undefined : '#111111' }}
              >
                <div className="flex flex-col items-center justify-center h-full text-white p-10">
                  {page.rightContent && (
                    <div className="max-w-sm text-center">
                      {page.rightContent.label && (
                        <p className="text-xs font-bold tracking-[3px] uppercase text-white/50 mb-4">
                          {page.rightContent.label}
                        </p>
                      )}
                      <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-5 tracking-tight">
                        {page.rightContent.heading}
                      </h2>
                      <p className="text-base text-white/70 leading-relaxed">
                        {page.rightContent.description}
                      </p>
                      {page.rightContent.cta && (
                        <a
                          href={page.rightContent.cta.href}
                          onClick={(e) => { e.preventDefault(); document.querySelector(page.rightContent.cta.href)?.scrollIntoView({ behavior: 'smooth' }) }}
                          className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-white/90 transition"
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
