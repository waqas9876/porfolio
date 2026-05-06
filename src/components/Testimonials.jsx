import { useState, useEffect, useRef } from 'react'

const TESTIMONIALS = [
  { img: 'https://i.pravatar.cc/128?img=47', name: 'Sarah M.', role: 'CEO @ GreenLeaf Studio', quote: '"Waqas delivered our WordPress site ahead of schedule. Clean code, great communication, and he genuinely understood our brand vision from day one."' },
  { img: 'https://i.pravatar.cc/128?img=12', name: 'Ahmed K.', role: 'CTO @ TechBridge Solutions', quote: '"We hired Waqas to rebuild our outdated PHP backend. The new system is blazing fast and has been rock-solid for over a year with zero downtime."' },
  { img: 'https://i.pravatar.cc/128?img=32', name: 'Priya S.', role: 'Product Manager @ DigitalFlow', quote: '"Outstanding frontend work. The responsive design Waqas built looks flawless on every device. He pays close attention to detail and delivers quality."' },
]

const POSITIONS = ['pos-front', 'pos-middle', 'pos-back']
const DRAG_THRESHOLD = 150

export default function Testimonials() {
  const [order, setOrder] = useState([0, 1, 2])
  const [dragging, setDragging] = useState(false)
  const [marginLeft, setMarginLeft] = useState(0)
  const dragStartX = useRef(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const shuffle = () => setOrder(([a, b, c]) => [b, c, a])

  const onMouseDown = (e) => {
    if (order[0] !== parseInt(e.currentTarget.dataset.index)) return
    dragStartX.current = e.clientX
    setDragging(true)
  }
  const onMouseMove = (e) => {
    if (!dragging) return
    setMarginLeft((e.clientX - dragStartX.current) * 0.25)
  }
  const onMouseUp = (e) => {
    if (!dragging) return
    setDragging(false)
    setMarginLeft(0)
    if (dragStartX.current - e.clientX > DRAG_THRESHOLD) shuffle()
  }
  const onTouchStart = (e) => {
    if (order[0] !== parseInt(e.currentTarget.dataset.index)) return
    dragStartX.current = e.touches[0].clientX
    setDragging(true)
  }
  const onTouchMove = (e) => {
    if (!dragging) return
    setMarginLeft((e.touches[0].clientX - dragStartX.current) * 0.25)
  }
  const onTouchEnd = (e) => {
    if (!dragging) return
    setDragging(false)
    setMarginLeft(0)
    if (dragStartX.current - e.changedTouches[0].clientX > DRAG_THRESHOLD) shuffle()
  }

  return (
    <section id="testimonials" ref={sectionRef}>
      <div className="container">
        <p className="section-label reveal" style={{textAlign:'center'}}>Client Feedback</p>
        <h2 className="section-title reveal" style={{textAlign:'center'}}>What People Say</h2>
        <p className="section-sub reveal" style={{margin:'0 auto 3rem',textAlign:'center'}}>
          Kind words from clients and colleagues I&apos;ve had the pleasure of working with.
        </p>
        <div className="tstack-wrap">
          <div className="tstack-outer">
            <div className="tstack" id="tstack">
              {TESTIMONIALS.map((t, idx) => {
                const posIdx = order.indexOf(idx)
                const isFront = posIdx === 0
                return (
                  <div
                    key={idx}
                    data-index={idx}
                    className={`tcard ${POSITIONS[posIdx]}${dragging && isFront ? ' is-dragging' : ''}`}
                    style={isFront && dragging ? { marginLeft: marginLeft + 'px' } : {}}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <img className="tcard-avatar" src={t.img} alt={t.name} />
                    <p className="tcard-quote">{t.quote}</p>
                    <span className="tcard-author">{t.name} — {t.role}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="tstack-hint">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
            Drag the top card left to shuffle
          </div>
        </div>
      </div>
    </section>
  )
}
