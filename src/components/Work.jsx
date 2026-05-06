import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap,
} from '@/components/ui/scroll-x-carousel'
import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from '@/components/ui/reveal-on-hover'
import { Badge } from '@/components/ui/badge'

const PROJECTS = [
  {
    id: 'project-1',
    title: 'Real Estate WordPress Site',
    description:
      'A full-featured real estate listing website built on WordPress with custom post types, advanced search filters, and property map integration.',
    services: ['WordPress', 'Custom Theme', 'WooCommerce'],
    type: 'WordPress',
    imageUrl:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2487&auto=format&fit=crop',
  },
  {
    id: 'project-2',
    title: 'Fashion Shopify Store',
    description:
      'A high-converting Shopify store for a fashion brand with custom liquid templates, product upsells, and seamless checkout.',
    services: ['Shopify', 'Liquid', 'UI Design'],
    type: 'eCommerce',
    imageUrl:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2487&auto=format&fit=crop',
  },
  {
    id: 'project-3',
    title: 'SaaS Analytics Dashboard',
    description:
      'A React-based SaaS dashboard with real-time data visualisation, role-based access, and a clean dark-mode interface.',
    services: ['React', 'Laravel API', 'TailwindCSS'],
    type: 'SaaS',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2487&auto=format&fit=crop',
  },
  {
    id: 'project-4',
    title: 'Restaurant Booking Platform',
    description:
      'An online reservation system with table management, email confirmations, and an admin panel built in PHP/Laravel.',
    services: ['PHP', 'Laravel', 'MySQL'],
    type: 'Web App',
    imageUrl:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2487&auto=format&fit=crop',
  },
  {
    id: 'project-5',
    title: 'Corporate WordPress Portal',
    description:
      'A multi-language corporate website with custom Gutenberg blocks, Yoast SEO integration, and a members-only content portal.',
    services: ['WordPress', 'Gutenberg', 'SEO'],
    type: 'WordPress',
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2487&auto=format&fit=crop',
  },
  {
    id: 'project-6',
    title: 'Health & Wellness Shopify',
    description:
      'A performance-optimised Shopify store for a supplements brand featuring subscription products and loyalty integrations.',
    services: ['Shopify', 'Klaviyo', 'CRO'],
    type: 'eCommerce',
    imageUrl:
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=2487&auto=format&fit=crop',
  },
  {
    id: 'project-7',
    title: 'Taxi Booking Web App',
    description:
      'A real-time ride-booking app with live driver tracking, fare estimation, payment gateway integration, and a driver panel.',
    services: ['React', 'Node.js', 'Maps API'],
    type: 'Web App',
    imageUrl:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2487&auto=format&fit=crop',
  },
]

const TYPE_COLORS = {
  WordPress: '#2563eb',
  eCommerce: '#059669',
  SaaS:      '#7c3aed',
  'Web App': '#d97706',
}

export default function Work() {
  return (
    <section id="work" style={{ padding: 0, overflow: 'hidden', background: 'var(--bg)' }}>
      <ScrollXCarousel style={{ height: '220vh' }}>
        <ScrollXCarouselContainer
          style={{
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.5rem',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            position: 'sticky',
            top: 0,
          }}
        >
          {/* Fade edges */}
          <div className="work-fade-left" />
          <div className="work-fade-right" />

          {/* Section header — inside sticky so it's always visible */}
          <div style={{ padding: '0 5%', flexShrink: 0 }}>
            <span className="section-label">Portfolio</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px', marginBottom: '0.4rem' }}>
              My Work
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 500 }}>
              A selection of projects I&apos;ve designed and built — from WordPress sites and Shopify stores to full-stack web applications.
            </p>
          </div>

          {/* Carousel cards */}
          <ScrollXCarouselWrap
            xRagnge={['-0%', '-75%']}
            style={{ display: 'flex', gap: '1.25rem', paddingLeft: '5%', flexShrink: 0 }}
          >
            {PROJECTS.map((project) => (
              <CardHoverReveal
                key={project.id}
                style={{
                  minWidth: 'min(72vw, 320px)',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  flexShrink: 0,
                }}
              >
                <CardHoverRevealMain style={{ height: 'min(52vh, 400px)' }}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </CardHoverRevealMain>

                {/* Always-visible bottom label */}
                <div className="work-card-label">
                  <span className="work-card-type" style={{ background: TYPE_COLORS[project.type] ?? '#4f46e5' }}>
                    {project.type}
                  </span>
                  <span className="work-card-title">{project.title}</span>
                </div>

                <CardHoverRevealContent
                  style={{
                    background: 'rgba(0,0,0,0.72)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    inset: 'auto 0.75rem 0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span
                      style={{
                        background: TYPE_COLORS[project.type] ?? '#4f46e5',
                        color: '#fff',
                        borderRadius: '999px',
                        padding: '2px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                      }}
                    >
                      {project.type}
                    </span>
                    {project.services.map((s) => (
                      <span
                        key={s}
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.75)',
                          borderRadius: '999px',
                          padding: '2px 10px',
                          fontSize: '0.72rem',
                          fontWeight: 500,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem', lineHeight: 1.3 }}>
                    {project.title}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                </CardHoverRevealContent>
              </CardHoverReveal>
            ))}
          </ScrollXCarouselWrap>

          {/* Progress bar */}
          <div style={{ padding: '0 5%', flexShrink: 0 }}>
            <ScrollXCarouselProgress
              className="work-progress-track"
              progressStyle="work-progress-bar"
            />
          </div>
        </ScrollXCarouselContainer>
      </ScrollXCarousel>
    </section>
  )
}
