import { ImagesScrollingAnimation } from '@/components/ui/images-scrolling-animation'

const PROJECTS = [
  {
    title: 'Front-end Development · 95%',
    src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'JavaScript & React · 88%',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'WordPress & Shopify · 92%',
    src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'PHP & Laravel · 80%',
    src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Back-end & APIs · 80%',
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
]

const TAGS = ['HTML5','CSS3','Bootstrap','JavaScript','jQuery','PHP','Laravel','WordPress','Shopify','RESTful APIs','MySQL','Git','Responsive Design','SEO']

export default function Skills() {
  return (
    <section id="skills" className="skills-split-section">
      <div className="skills-split-layout">

        {/* ── Sticky left panel ── */}
        <div className="skills-split-left">
          <p className="section-label">What I Know</p>
          <h2 className="skills-accordion-heading">
            Expertise That Powers<br />Every Project
          </h2>
          <p className="skills-accordion-desc">
            Building fast, responsive web experiences using a full-stack toolkit — from
            pixel-perfect frontends to robust PHP backends and scalable CMS solutions.
          </p>
          <a
            href="#contact"
            className="skills-accordion-cta"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Let&apos;s Work Together
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>Technologies &amp; Tools</p>
          <div className="tags-grid">
            {TAGS.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>

        {/* ── Scrolling image cards ── */}
        <div className="skills-split-right">
          <ImagesScrollingAnimation projects={PROJECTS} />
        </div>

      </div>
    </section>
  )
}
