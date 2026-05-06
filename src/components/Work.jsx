import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from '@/components/ui/animated-gallery'
import { MailIcon, ArrowRightIcon } from 'lucide-react'

const IMAGES_1 = [
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=70',
]

const IMAGES_2 = [
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=70',
]

const IMAGES_3 = [
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&auto=format&fit=crop&q=70',
]

export default function Work() {
  return (
    <section id="work" className="work-ag-section">

      {/* ── Header ── */}
      <ContainerStagger className="work-ag-header">
        <ContainerAnimated>
          <span className="section-label">Portfolio</span>
        </ContainerAnimated>
        <ContainerAnimated>
          <h2 className="work-ag-title">
            My <span className="work-ag-title-accent">Work</span>
          </h2>
        </ContainerAnimated>
        <ContainerAnimated>
          <p className="work-ag-desc">
            From WordPress sites and Shopify stores to full-stack web applications —
            built with performance, design, and real results in mind.
          </p>
        </ContainerAnimated>
        <ContainerAnimated className="work-ag-btns">
          <a href="mailto:mwaqasjaved2300@gmail.com" className="work-ag-btn-primary">
            <MailIcon size={16} />
            Hire Me
          </a>
          <a href="#contact" className="work-ag-btn-ghost">
            View All
            <ArrowRightIcon size={15} />
          </a>
        </ContainerAnimated>
      </ContainerStagger>

      {/* ── Ambient glow ── */}
      <div className="work-ag-glow" />

      {/* ── 3-D scroll gallery ── */}
      <ContainerScroll className="work-ag-scroll">
        <ContainerSticky className="work-ag-sticky">
          <GalleryContainer className="work-ag-grid">

            <GalleryCol yRange={['-10%', '2%']} className="work-ag-col-offset">
              {IMAGES_1.map((src, i) => (
                <img key={i} src={src} alt="project" className="work-ag-img" loading="lazy" />
              ))}
            </GalleryCol>

            <GalleryCol className="work-ag-col-mid" yRange={['15%', '5%']}>
              {IMAGES_2.map((src, i) => (
                <img key={i} src={src} alt="project" className="work-ag-img" loading="lazy" />
              ))}
            </GalleryCol>

            <GalleryCol yRange={['-10%', '2%']} className="work-ag-col-offset">
              {IMAGES_3.map((src, i) => (
                <img key={i} src={src} alt="project" className="work-ag-img" loading="lazy" />
              ))}
            </GalleryCol>

          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>

    </section>
  )
}
