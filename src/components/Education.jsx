import { StickyFeatureSection } from '@/components/ui/sticky-scroll-cards-section'

const CARDS = [
  {
    label: '01 — University',
    title: 'Bachelor of Computer Science',
    description: 'Graduated from Riphah International University (2019–2023) with a degree in Computer Science. Four years of intensive study covering software engineering, data structures, algorithms, OOP, databases, and modern web development — the foundation behind every project I build.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
    bgColor: 'bg-amber-100',
    textColor: 'text-gray-700',
  },
  {
    label: '02 — College',
    title: 'Intermediate (FSc)',
    description: 'Completed FSc Pre-Engineering at Superior College (2017–2019). A rigorous two-year curriculum that sharpened analytical and mathematical thinking, laying the groundwork for a career in technology and software engineering.',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80',
    bgColor: 'bg-orange-100',
    textColor: 'text-gray-700',
  },
  {
    label: '03 — In Practice',
    title: '4+ Years of Real-World Experience',
    description: 'Since graduating in 2023, I have delivered 30+ projects across WordPress, Shopify, Laravel, React, and PHP — turning academic foundations into measurable results for clients worldwide. Continuous self-learning keeps my skills ahead of the curve.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    bgColor: 'bg-yellow-100',
    textColor: 'text-gray-700',
  },
]

export default function Education() {
  return (
    <section id="education" style={{ padding: 0 }}>
      <StickyFeatureSection
        label="Academic Background"
        title="Education"
        subtitle="My formal qualifications and the real-world experience built on top of them."
        cards={CARDS}
      />
    </section>
  )
}
