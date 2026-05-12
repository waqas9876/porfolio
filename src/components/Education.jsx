import FlowArt, { FlowSection } from '@/components/ui/story-scroll'

export default function Education() {
  return (
    <section id="education" style={{ padding: 0 }}>
      <FlowArt aria-label="Education">

        <FlowSection aria-label="Academic Background" style={{ backgroundColor: '#0d0d0d', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Academic Background</p>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '2vw 0' }} />
          <div>
            <h2 style={{ fontSize: 'clamp(3.5rem,12vw,14rem)', fontWeight: 800, lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              Education
            </h2>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '2vw 0' }} />
          <p style={{ maxWidth: '50ch', fontSize: 'clamp(1rem,2.5vw,2rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>
            Formally trained in Computer Science with a strong foundation in software engineering,
            algorithms, and modern web development.
          </p>
        </FlowSection>

        <FlowSection aria-label="Bachelor's Degree" style={{ backgroundColor: '#111827', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">01 — University</p>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '2vw 0' }} />
          <div>
            <h2 style={{ fontSize: 'clamp(3.5rem,10vw,12rem)', fontWeight: 800, lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              Bachelor<br />of CS
            </h2>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '2vw 0' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3vw' }}>
            <div style={{ minWidth: 180, flex: 1 }}>
              <p style={{ marginBottom: 8, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Institution</p>
              <p style={{ fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.6, opacity: 0.7 }}>
                Riphah International University
              </p>
            </div>
            <div style={{ minWidth: 180, flex: 1 }}>
              <p style={{ marginBottom: 8, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Duration</p>
              <p style={{ fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.6, opacity: 0.7 }}>
                2019 – 2023
              </p>
            </div>
            <div style={{ minWidth: 180, flex: 1 }}>
              <p style={{ marginBottom: 8, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Degree</p>
              <p style={{ fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.6, opacity: 0.7 }}>
                Bachelor of Computer Science
              </p>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '2vw 0' }} />
          <p style={{ maxWidth: '50ch', fontSize: 'clamp(1rem,2.5vw,2rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>
            Four years of deep study in software engineering, data structures, algorithms,
            databases, and modern web technologies — building the foundation for everything I build today.
          </p>
        </FlowSection>

        <FlowSection aria-label="Intermediate" style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">02 — College</p>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '2vw 0' }} />
          <div>
            <h2 style={{ fontSize: 'clamp(3.5rem,10vw,12rem)', fontWeight: 800, lineHeight: 0.85, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              Inter<br />mediate
            </h2>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '2vw 0' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3vw' }}>
            <div style={{ minWidth: 180, flex: 1 }}>
              <p style={{ marginBottom: 8, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Institution</p>
              <p style={{ fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.6, opacity: 0.7 }}>
                Superior College
              </p>
            </div>
            <div style={{ minWidth: 180, flex: 1 }}>
              <p style={{ marginBottom: 8, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Duration</p>
              <p style={{ fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.6, opacity: 0.7 }}>
                2017 – 2019
              </p>
            </div>
            <div style={{ minWidth: 180, flex: 1 }}>
              <p style={{ marginBottom: 8, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Stream</p>
              <p style={{ fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.6, opacity: 0.7 }}>
                FSc — Pre-Engineering
              </p>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '2vw 0' }} />
          <p style={{ maxWidth: '50ch', fontSize: 'clamp(1rem,2.5vw,2rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', marginTop: 'auto', marginLeft: 'auto', textAlign: 'right' }}>
            A rigorous pre-engineering curriculum that sharpened analytical thinking and
            laid the groundwork for a career in technology.
          </p>
        </FlowSection>

      </FlowArt>
    </section>
  )
}
