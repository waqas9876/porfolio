import { useState, useEffect, useRef } from 'react'

const PANELS = [
  { title: 'Front-end · 95%',     img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80', alt: 'Front-end Development' },
  { title: 'JavaScript · 88%',    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', alt: 'JavaScript / jQuery' },
  { title: 'WordPress · 92%',     img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80', alt: 'WordPress / Shopify' },
  { title: 'PHP / Laravel · 80%', img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80', alt: 'PHP / Laravel' },
  { title: 'Back-end · 80%',      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', alt: 'Back-end Development' },
]

const TAGS = ['HTML5','CSS3','Bootstrap','JavaScript','jQuery','PHP','Laravel','WordPress','Shopify','RESTful APIs','MySQL','Git','Responsive Design','SEO']

export default function Skills() {
  const [active, setActive] = useState(4)
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

  return (
    <section id="skills" ref={sectionRef}>
      <div className="container">
        <p className="section-label reveal">What I Know</p>
        <div className="skills-accordion-layout reveal">
          <div className="skills-accordion-left">
            <h2 className="skills-accordion-heading">Expertise That Powers Every Project</h2>
            <p className="skills-accordion-desc">
              Building fast, responsive web experiences using a full-stack toolkit — from pixel-perfect frontends to robust PHP backends and scalable CMS solutions.
            </p>
            <a href="#contact" className="skills-accordion-cta" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Let&apos;s Work Together
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <p className="section-label" style={{marginBottom:'0.75rem'}}>Technologies &amp; Tools</p>
            <div className="tags-grid">
              {TAGS.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
          <div className="skills-accordion-right">
            <div className="skills-accordion-wrap">
              {PANELS.map((p, i) => (
                <div
                  key={i}
                  className={`sa-item${i === active ? ' sa-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <img className="sa-item-img" src={p.img} alt={p.alt} />
                  <div className="sa-item-overlay" />
                  <span className="sa-item-title">{p.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
