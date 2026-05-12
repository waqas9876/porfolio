import { NebulaCube } from '@/components/ui/explorations-with-gsap-and-scroll-trigger'

const SLIDES = [
  {
    label: 'Academic Background',
    title: ['My', 'Education'],
    description: 'Formally trained in Computer Science with a strong academic foundation — spanning algorithms, software engineering, databases, and modern web development.',
  },
  {
    label: '01 — University · 2019–2023',
    title: ['Bachelor', 'of CS'],
    description: 'Bachelor of Computer Science at Riphah International University. Four years of intensive study in software engineering, data structures, OOP, databases, and full-stack development — the bedrock of everything I build today.',
  },
  {
    label: '02 — College · 2017–2019',
    title: ['Inter-', 'mediate'],
    description: 'Intermediate (FSc Pre-Engineering) at Superior College. A rigorous two-year programme that sharpened analytical thinking and laid the mathematical foundation for a career in technology.',
  },
  {
    label: '03 — Since 2023',
    title: ['4+ Years', 'Building'],
    description: 'Since graduating I have delivered 30+ projects across WordPress, Shopify, Laravel, and React — turning academic foundations into real-world results for clients worldwide.',
  },
]

export default function Education() {
  return (
    <section id="education" style={{ padding: 0 }}>
      <NebulaCube sections={SLIDES} />
    </section>
  )
}
