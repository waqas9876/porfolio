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
      'A high-converting Shopify store for a fashion brand with custom liquid templates, product upsells, and a seamless checkout experience.',
    services: ['Shopify', 'Liquid', 'UI Design'],
    type: 'eCommerce',
    imageUrl:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2487&auto=format&fit=crop',
  },
  {
    id: 'project-3',
    title: 'SaaS Dashboard App',
    description:
      'A React-based SaaS analytics dashboard with real-time data visualisation, role-based access, and a clean dark-mode interface.',
    services: ['React', 'Laravel API', 'TailwindCSS'],
    type: 'SaaS',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2487&auto=format&fit=crop',
  },
  {
    id: 'project-4',
    title: 'Restaurant Booking Platform',
    description:
      'An online reservation system for a restaurant chain with table management, email confirmations, and an admin panel built in PHP/Laravel.',
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
      'A performance-optimised Shopify store for a supplements brand featuring subscription products, bundle builders, and loyalty integrations.',
    services: ['Shopify', 'Klaviyo', 'Conversion CRO'],
    type: 'eCommerce',
    imageUrl:
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=2487&auto=format&fit=crop',
  },
  {
    id: 'project-7',
    title: 'Taxi Booking Web App',
    description:
      'A real-time ride-booking application with live driver tracking, fare estimation, payment gateway integration, and a driver management panel.',
    services: ['React', 'Node.js', 'Google Maps API'],
    type: 'Web App',
    imageUrl:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2487&auto=format&fit=crop',
  },
]

const TYPE_COLORS = {
  WordPress: 'bg-blue-600',
  eCommerce: 'bg-emerald-600',
  SaaS:      'bg-violet-600',
  'Web App': 'bg-amber-600',
}

export default function Work() {
  return (
    <section id="work" className="work-section">
      <div className="work-header">
        <span className="section-label">Portfolio</span>
        <h2 className="section-title">My Work</h2>
        <p className="section-sub">
          A selection of projects I&apos;ve designed and built — from WordPress sites and Shopify stores to full-stack web applications.
        </p>
      </div>

      <ScrollXCarousel className="h-[180vh]">
        <ScrollXCarouselContainer className="h-dvh flex flex-col justify-center gap-6 py-10">

          <div className="work-fade-left" />
          <div className="work-fade-right" />

          <ScrollXCarouselWrap
            xRagnge={['-0%', '-62%']}
            className="flex space-x-6 pl-8"
          >
            {PROJECTS.map((project) => (
              <CardHoverReveal
                key={project.id}
                className="min-w-[78vw] sm:min-w-[44vw] lg:min-w-[32vw] xl:min-w-[26vw] shadow-2xl rounded-2xl border border-white/10"
              >
                <CardHoverRevealMain className="h-[420px] sm:h-[460px]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </CardHoverRevealMain>

                <CardHoverRevealContent className="space-y-3 rounded-2xl bg-black/55 backdrop-blur-2xl p-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`capitalize rounded-full text-white border-0 ${TYPE_COLORS[project.type] ?? 'bg-indigo-600'}`}>
                      {project.type}
                    </Badge>
                    {project.services.map((s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="capitalize rounded-full bg-white/10 text-white/80 border-0 text-[11px]"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-white font-semibold text-base leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </CardHoverRevealContent>
              </CardHoverReveal>
            ))}
          </ScrollXCarouselWrap>

          <ScrollXCarouselProgress
            className="mx-8 h-[2px] rounded-full bg-white/10 overflow-hidden"
            progressStyle="size-full bg-white/60 rounded-full"
          />
        </ScrollXCarouselContainer>
      </ScrollXCarousel>
    </section>
  )
}
