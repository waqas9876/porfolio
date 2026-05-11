import ScrollAdventure from '@/components/ui/animated-scroll'

const PAGES = [
  {
    leftBgImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      label: 'What I Know',
      heading: 'Expertise That Powers Every Project',
      description: 'Building fast, responsive web experiences using a full-stack toolkit — from pixel-perfect frontends to robust PHP backends and scalable CMS solutions.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    leftContent: {
      label: 'Skill 01',
      heading: 'Front-End Development',
      description: 'Crafting pixel-perfect, responsive UIs with HTML5, CSS3, JavaScript, React, and Tailwind CSS. Every interface is built for speed and usability.',
    },
    rightContent: null,
  },
  {
    leftBgImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      label: 'Skill 02',
      heading: 'WordPress & Shopify',
      description: 'Building powerful CMS-driven websites and high-converting e-commerce stores with custom themes, plugins, and seamless payment integrations.',
    },
  },
  {
    leftBgImage: null,
    rightBgImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
    leftContent: {
      label: 'Skill 03',
      heading: 'PHP & Laravel',
      description: 'Developing scalable back-end systems, RESTful APIs, and database-driven applications using PHP, Laravel, and MySQL.',
    },
    rightContent: null,
  },
  {
    leftBgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      label: "Let's Connect",
      heading: "Ready To Build Something Great?",
      description: '4+ years of experience delivering real results. Let\'s work together on your next project.',
      cta: { label: "Hire Me", href: '#contact' },
    },
  },
]

export default function Skills() {
  return (
    <section id="skills" style={{ padding: 0 }}>
      <div className="bg-[#0d0d0d] flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <p className="text-xs font-bold tracking-[4px] uppercase text-white/40 mb-5">What I Do</p>
        <h2 className="text-4xl md:text-6xl font-black uppercase text-white leading-tight tracking-tight mb-6 max-w-2xl">
          Skills & Expertise
        </h2>
        <div className="w-12 h-[2px] bg-white/20 rounded-full mb-6" />
        <p className="text-base md:text-lg text-white/55 max-w-lg leading-relaxed">
          A full-stack toolkit built over 4+ years — covering everything from pixel-perfect
          frontends and e-commerce stores to robust back-end systems and scalable CMS solutions.
        </p>
      </div>
      <ScrollAdventure pages={PAGES} />
    </section>
  )
}
