import { Marquee } from '@/components/ui/3d-testimonials'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    username: '@sarahm',
    role: 'CEO @ GreenLeaf Studio',
    body: 'Waqas delivered our WordPress site ahead of schedule. Clean code, great communication, and he genuinely understood our brand vision from day one.',
    img: 'https://i.pravatar.cc/128?img=47',
  },
  {
    name: 'Ahmed K.',
    username: '@ahmedk',
    role: 'CTO @ TechBridge Solutions',
    body: 'We hired Waqas to rebuild our outdated PHP backend. The new system is blazing fast and has been rock-solid for over a year with zero downtime.',
    img: 'https://i.pravatar.cc/128?img=12',
  },
  {
    name: 'Priya S.',
    username: '@priyas',
    role: 'Product Manager @ DigitalFlow',
    body: 'Outstanding frontend work. The responsive design Waqas built looks flawless on every device. He pays close attention to detail and delivers quality.',
    img: 'https://i.pravatar.cc/128?img=32',
  },
  {
    name: 'James R.',
    username: '@jamesr',
    role: 'Founder @ Launchpad Co.',
    body: 'Waqas built our Shopify store from scratch. The UX is intuitive, conversion rates improved by 30%, and he was a pleasure to work with throughout.',
    img: 'https://i.pravatar.cc/128?img=53',
  },
  {
    name: 'Lena W.',
    username: '@lenaw',
    role: 'Marketing Director @ BrightMark',
    body: 'Fast turnaround, pixel-perfect execution. Waqas takes ownership of his work and proactively flags issues before they become problems.',
    img: 'https://i.pravatar.cc/128?img=25',
  },
  {
    name: 'Omar F.',
    username: '@omarf',
    role: 'Lead Dev @ NexaCore',
    body: 'Solid Laravel developer. Waqas wrote clean, well-structured code that the whole team could easily maintain. Would hire again without hesitation.',
    img: 'https://i.pravatar.cc/128?img=68',
  },
]

function TestimonialCard({ img, name, username, role, body }) {
  return (
    <Card className="w-[220px] border-[#272727] bg-[#161616]">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-[#222] text-white text-xs">{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-semibold text-white leading-tight">{name}</figcaption>
            <p className="text-xs text-[#888]">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-[#aaa] leading-relaxed">{body}</blockquote>
        <p className="mt-2 text-[10px] text-[#555] uppercase tracking-wider">{role}</p>
      </CardContent>
    </Card>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '4rem 0', overflow: 'hidden' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 5%', textAlign: 'center' }}>
        <p className="section-label">Client Feedback</p>
        <h2 className="section-title">What People Say</h2>
        <p className="section-sub" style={{ margin: '0 auto 3rem' }}>
          Kind words from clients and colleagues I've had the pleasure of working with.
        </p>
      </div>

      <div
        className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden gap-1.5"
        style={{ perspective: '300px' }}
      >
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform: 'translateX(0px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(0deg) rotateZ(20deg)',
          }}
        >
          <Marquee vertical pauseOnHover repeat={3} className="[--duration:35s]">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.username} {...t} />)}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:35s]">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.username} {...t} />)}
          </Marquee>
          <Marquee vertical pauseOnHover repeat={3} className="[--duration:35s]">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.username} {...t} />)}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:35s]">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.username} {...t} />)}
          </Marquee>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0d0d0d]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0d0d0d]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0d0d0d]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0d0d0d]" />
      </div>
    </section>
  )
}
