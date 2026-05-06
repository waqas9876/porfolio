import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCES = [
  { role: 'Senior Web Developer', company: 'CabCall Experts',   period: 'Present · Full-time', cat: 'Current',   img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80' },
  { role: 'Web Developer',        company: 'SoftCrust Digital', period: '2024 – 2025',          cat: 'Agency',    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80' },
  { role: 'Backend Developer',    company: 'FITSCO',            period: '2022 – 2023',          cat: 'Backend',   img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80' },
  { role: 'WordPress Developer',  company: 'Fecto Digital',     period: '2021 – 2022',          cat: 'WordPress', img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=400&q=80' },
  { role: 'Frontend Developer',   company: 'Fecto Digital',     period: '2021 – 2022',          cat: 'Frontend',  img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=400&q=80' },
]

export default function Experience() {
  const pinRef  = useRef(null)
  const maskRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const pinEl  = pinRef.current
    const maskEl = maskRef.current
    const ringEl = ringRef.current
    if (!pinEl || !maskEl || !ringEl) return

    const N = EXPERIENCES.length
    let entranceTween = null
    let rotationTween = null

    const getRadius   = () => window.innerWidth < 768 ? 280 : 440
    const getCardSize = () => window.innerWidth < 768 ? { w: 210, h: 300 } : { w: 260, h: 350 }

    function buildRing() {
      ringEl.innerHTML = ''
      const radius  = getRadius()
      const card    = getCardSize()
      const diam    = radius * 2
      const hidden  = 0.55

      maskEl.style.height = (diam * (1 - hidden) + card.h * 0.75) + 'px'

      ringEl.style.cssText = 'position:absolute;list-style:none;margin:0;padding:0;will-change:transform;left:50%;'
      ringEl.style.width   = diam + 'px'
      ringEl.style.height  = diam + 'px'
      ringEl.style.bottom  = (-diam * hidden) + 'px'
      gsap.set(ringEl, { xPercent: -50 })

      const startAngle = Math.PI * 1.5

      EXPERIENCES.forEach((exp, i) => {
        const angle  = (i / N) * 2 * Math.PI + startAngle
        const x      = radius * Math.cos(angle)
        const y      = radius * Math.sin(angle)
        const rotDeg = (angle * 180 / Math.PI) + 90

        const li = document.createElement('li')
        li.className = 'radial-gallery-item'
        li.style.cssText = `position:absolute;top:50%;left:50%;z-index:10;transform:translate(-50%,-50%) translate3d(${x}px,${y}px,0) rotate(${rotDeg}deg);`
        li.innerHTML = `
          <div class="exp-card-wrap" tabindex="0" aria-label="${exp.role} at ${exp.company}">
            <div class="exp-card">
              <div class="exp-card-img">
                <img src="${exp.img}" alt="${exp.role} at ${exp.company}" loading="lazy">
                <div class="exp-card-img-overlay"></div>
              </div>
              <div class="exp-card-content">
                <div class="exp-card-header">
                  <span class="exp-card-badge">${exp.cat}</span>
                  <div class="exp-card-arrow">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                  </div>
                </div>
                <div class="exp-card-bottom">
                  <div class="exp-card-role">${exp.role}</div>
                  <div class="exp-card-company">${exp.company} · ${exp.period}</div>
                  <div class="exp-card-line"></div>
                </div>
              </div>
            </div>
          </div>`
        ringEl.appendChild(li)
      })

      const wraps = Array.from(ringEl.querySelectorAll('.exp-card-wrap'))
      wraps.forEach((wrap, idx) => {
        const activate   = () => { wraps.forEach((w, j) => { if (j !== idx) { w.style.filter = 'blur(2px) grayscale(1)'; w.style.opacity = '0.4' } else { w.style.filter = ''; w.style.opacity = '1' } }); wrap.classList.add('is-hovered') }
        const deactivate = () => { wraps.forEach(w => { w.style.filter = ''; w.style.opacity = '1'; w.classList.remove('is-hovered') }) }
        wrap.addEventListener('mouseenter', activate)
        wrap.addEventListener('mouseleave', deactivate)
        wrap.addEventListener('focus',      activate)
        wrap.addEventListener('blur',       deactivate)
      })
    }

    function initAnimations() {
      if (entranceTween) { entranceTween.kill(); entranceTween = null }
      if (rotationTween) { rotationTween.kill(); rotationTween = null }
      const items = Array.from(ringEl.children)
      if (!items.length) return
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        entranceTween = gsap.fromTo(items,
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'back.out(1.2)', stagger: 0.05,
            scrollTrigger: { trigger: pinEl, start: 'top 80%', toggleActions: 'play none none reverse' } })
        rotationTween = gsap.to(ringEl, {
          rotation: 360, ease: 'none',
          scrollTrigger: { trigger: pinEl, pin: true, start: 'center center', end: '+=2000', scrub: 1, invalidateOnRefresh: true }
        })
      }
    }

    buildRing()
    initAnimations()

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (entranceTween) { entranceTween.kill(); entranceTween = null }
        if (rotationTween) { rotationTween.kill(); rotationTween = null }
        buildRing()
        ScrollTrigger.refresh()
        initAnimations()
      }, 200)
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      if (entranceTween) entranceTween.kill()
      if (rotationTween) rotationTween.kill()
    }
  }, [])

  return (
    <section id="experience">
      <div className="exp-gallery-header">
        <div className="exp-gallery-heading">
          <span className="exp-gallery-label">Work History</span>
          <h2 className="exp-gallery-title">Experience</h2>
        </div>
        <p className="exp-gallery-scroll-hint">↓ Scroll</p>
      </div>
      <div className="radial-gallery-outer" ref={pinRef}>
        <div className="radial-gallery-mask" ref={maskRef}>
          <ul className="radial-gallery-ring" ref={ringRef} />
        </div>
      </div>
    </section>
  )
}
