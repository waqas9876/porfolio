import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const card   = document.getElementById('ca-main-card')
    const iphone = document.getElementById('ca-iphone')

    let rafId = 0
    const onMouseMove = (e) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!card) return
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px')
        card.style.setProperty('--mouse-y', (e.clientY - r.top)  + 'px')
        if (iphone && window.scrollY < window.innerHeight * 2) {
          const xv = (e.clientX / window.innerWidth  - 0.5) * 2
          const yv = (e.clientY / window.innerHeight - 0.5) * 2
          gsap.to(iphone, { rotationY: xv * 10, rotationX: -yv * 10, ease: 'power3.out', duration: 1.2 })
        }
      })
    }
    window.addEventListener('mousemove', onMouseMove)

    gsap.set('.ca-track',        { autoAlpha: 0, y: 60, scale: 0.85, filter: 'blur(20px)', rotationX: -20 })
    gsap.set('.ca-days',         { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' })
    gsap.set('.ca-card-wrapper', { visibility: 'visible' })
    gsap.set('.ca-card',         { y: window.innerHeight + 200 })
    gsap.set(['.ca-card-left', '.ca-card-right', '.ca-mockup-wrap', '.ca-badge', '.ca-pw'], { autoAlpha: 0 })
    gsap.set('.ca-cta',          { autoAlpha: 0, scale: 0.85, filter: 'blur(25px)' })

    const intro = gsap.timeline({ delay: 0.15 })
    intro
      .to('.ca-track', { duration: 1.6, autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', rotationX: 0, ease: 'expo.out' })
      .to('.ca-days',  { duration: 1.3, clipPath: 'inset(0 0% 0 0)', ease: 'power4.inOut' }, '-=0.9')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top top',
        end: '+=2500',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    })

    tl
      .to(['.ca-hero-text', '.ca-grid-bg'],
          { scale: 1.1, filter: 'blur(20px)', opacity: 0.15, ease: 'power2.inOut', duration: 2 }, 0)
      .to('.ca-card', { y: 0, ease: 'power3.inOut', duration: 2 }, 0)
      .to('.ca-card', { width: '100%', height: '100%', borderRadius: '0px', ease: 'power3.inOut', duration: 1.5 })
      .fromTo('.ca-mockup-wrap',
          { y: 260, rotationX: 45, autoAlpha: 0, scale: 0.65 },
          { y: 0, rotationX: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 2.5 }, '-=0.8')
      .fromTo('.ca-pw',
          { y: 35, autoAlpha: 0, scale: 0.9 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, ease: 'back.out(1.2)', duration: 1.5 }, '-=1.5')
      .to('.ca-pring',   { strokeDashoffset: 80, duration: 2, ease: 'power3.inOut' }, '-=1.2')
      .to('.ca-counter', { innerHTML: 4, snap: { innerHTML: 1 }, duration: 1.5, ease: 'expo.out' }, '-=2.0')
      .fromTo('.ca-badge',
          { y: 70, autoAlpha: 0, scale: 0.7, rotationZ: -8 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'back.out(1.5)', duration: 1.5, stagger: 0.2 }, '-=1.5')
      .fromTo('.ca-card-left',  { x: -45, autoAlpha: 0 },             { x: 0, autoAlpha: 1, ease: 'power4.out', duration: 1.5 }, '-=1.0')
      .fromTo('.ca-card-right', { x: 45, autoAlpha: 0, scale: 0.85 }, { x: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 1.5 }, '<')
      .to({}, { duration: 2 })
      .set('.ca-hero-text', { autoAlpha: 0 })
      .set('.ca-cta',       { autoAlpha: 1 })
      .to({}, { duration: 1 })
      .to(['.ca-mockup-wrap', '.ca-badge', '.ca-card-left', '.ca-card-right'],
          { scale: 0.88, y: -30, autoAlpha: 0, ease: 'power3.in', duration: 1, stagger: 0.04 })
      .to('.ca-card',
          { width: isMobile ? '92vw' : '85vw', height: isMobile ? '92vh' : '85vh',
            borderRadius: isMobile ? '32px' : '40px', ease: 'expo.inOut', duration: 1.5 }, 'pullback')
      .to('.ca-cta', { scale: 1, filter: 'blur(0px)', ease: 'expo.inOut', duration: 1.5 }, 'pullback')
      .to('.ca-card', { y: -(window.innerHeight + 300), ease: 'power3.in', duration: 1.5 })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      intro.kill()
      tl.kill()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      <div className="ca-grain" aria-hidden="true" />
      <div className="ca-grid-bg" aria-hidden="true" />

      <div className="ca-hero-text">
        <h1 className="ca-track">Building the web,</h1>
        <h1 className="ca-days">since 2021.</h1>
      </div>

      <div className="ca-cta">
        <h2>Let&apos;s build something great.</h2>
        <p>Available for freelance and full-time opportunities. I bring 4+ years of web development expertise to every project.</p>
        <div className="ca-cta-btns">
          <a href="https://wa.me/923279700070" target="_blank" rel="noreferrer" className="ca-btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
            Get In Touch
          </a>
          <a href="#skills" className="ca-btn-secondary" onClick={(e) => { e.preventDefault(); document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) }}>
            View Skills
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
          </a>
        </div>
      </div>

      <div className="ca-card-wrapper">
        <div className="ca-card" id="ca-main-card">
          <div className="ca-sheen" aria-hidden="true" />
          <div className="ca-card-inner">
            <div className="ca-card-left">
              <h3>Code with passion.</h3>
              <p>Muhammad Waqas Javed is a Senior Web Developer with 4+ years of experience crafting responsive, high-performance web applications from concept to deployment.</p>
              <div className="ca-skills-list">
                <div className="ca-skill-item">
                  <span className="ca-skill-dot" style={{background:'#3B82F6'}} />
                  PHP &amp; Laravel Backend
                </div>
                <div className="ca-skill-item">
                  <span className="ca-skill-dot" style={{background:'#10B981'}} />
                  WordPress &amp; Shopify
                </div>
                <div className="ca-skill-item">
                  <span className="ca-skill-dot" style={{background:'#8B5CF6'}} />
                  React &amp; JavaScript
                </div>
                <div className="ca-skill-item">
                  <span className="ca-skill-dot" style={{background:'#F59E0B'}} />
                  RESTful APIs &amp; MySQL
                </div>
              </div>
              <div className="ca-location">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(147,197,253,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Islamabad, Pakistan · Open to Remote
              </div>
            </div>

            <div className="ca-mockup-wrap" id="ca-mockup-wrap">
              <div className="ca-phone-scale">
                <div className="ca-iphone" id="ca-iphone">
                  <div className="ca-hw" style={{top:'120px',left:'-3px',width:'3px',height:'25px',borderRadius:'0 3px 3px 0'}} />
                  <div className="ca-hw" style={{top:'160px',left:'-3px',width:'3px',height:'45px',borderRadius:'0 3px 3px 0'}} />
                  <div className="ca-hw" style={{top:'220px',left:'-3px',width:'3px',height:'45px',borderRadius:'0 3px 3px 0'}} />
                  <div className="ca-hw" style={{top:'170px',right:'-3px',width:'3px',height:'70px',borderRadius:'3px 0 0 3px'}} />
                  <div className="ca-screen">
                    <div className="ca-screen-glare" aria-hidden="true" />
                    <div className="ca-island"><div className="ca-island-dot" /></div>
                    <div className="ca-app">
                      <div className="ca-pw ca-app-hdr">
                        <div>
                          <div style={{fontSize:'10px',color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'2px',fontWeight:700,marginBottom:'2px'}}>Portfolio</div>
                          <div style={{fontSize:'1.05rem',fontWeight:700,color:'white',letterSpacing:'-0.5px'}}>Stats</div>
                        </div>
                        <div className="ca-app-hdr-avatar">WJ</div>
                      </div>
                      <div className="ca-pw" style={{position:'relative',width:'160px',height:'160px',margin:'0 auto 1.2rem',flexShrink:0,filter:'drop-shadow(0 15px 25px rgba(0,0,0,0.8))'}}>
                        <svg width="160" height="160" aria-hidden="true" style={{position:'absolute',inset:0}}>
                          <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12"/>
                          <circle className="ca-pring" cx="80" cy="80" r="64" fill="none" stroke="#3B82F6" strokeWidth="12"/>
                        </svg>
                        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                          <span className="ca-counter" style={{fontSize:'2.5rem',fontWeight:800,color:'white',letterSpacing:'-2px',lineHeight:1}}>0</span>
                          <span style={{fontSize:'8px',color:'rgba(147,197,253,0.5)',textTransform:'uppercase',letterSpacing:'2px',fontWeight:700,marginTop:'4px'}}>Yrs Exp</span>
                        </div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
                        <div className="ca-pw ca-wd" style={{borderRadius:'16px',padding:'0.75rem',display:'flex',alignItems:'center'}}>
                          <div style={{width:'40px',height:'40px',borderRadius:'12px',background:'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(59,130,246,0.05))',display:'flex',alignItems:'center',justifyContent:'center',marginRight:'12px',border:'1px solid rgba(59,130,246,0.2)'}}>
                            <svg width="16" height="16" fill="none" stroke="#60a5fa" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/></svg>
                          </div>
                          <div style={{flex:1}}>
                            <div style={{height:'8px',width:'80px',background:'#d4d4d8',borderRadius:'999px',marginBottom:'6px'}} />
                            <div style={{height:'6px',width:'50px',background:'#52525b',borderRadius:'999px'}} />
                          </div>
                        </div>
                        <div className="ca-pw ca-wd" style={{borderRadius:'16px',padding:'0.75rem',display:'flex',alignItems:'center'}}>
                          <div style={{width:'40px',height:'40px',borderRadius:'12px',background:'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(16,185,129,0.05))',display:'flex',alignItems:'center',justifyContent:'center',marginRight:'12px',border:'1px solid rgba(16,185,129,0.2)'}}>
                            <svg width="16" height="16" fill="none" stroke="#34d399" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"/></svg>
                          </div>
                          <div style={{flex:1}}>
                            <div style={{height:'8px',width:'70px',background:'#d4d4d8',borderRadius:'999px',marginBottom:'6px'}} />
                            <div style={{height:'6px',width:'90px',background:'#52525b',borderRadius:'999px'}} />
                          </div>
                        </div>
                      </div>
                      <div style={{position:'absolute',bottom:'8px',left:'50%',transform:'translateX(-50%)',width:'120px',height:'4px',background:'rgba(255,255,255,0.2)',borderRadius:'999px'}} />
                    </div>
                  </div>
                </div>
                <div className="ca-badge ca-badge-1">
                  <div className="ca-badge-ico" style={{background:'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(30,58,138,0.1))',border:'1px solid rgba(96,165,250,0.3)'}}>🚀</div>
                  <div>
                    <div className="ca-badge-title">50+ Projects</div>
                    <div className="ca-badge-sub">Successfully delivered</div>
                  </div>
                </div>
                <div className="ca-badge ca-badge-2">
                  <div className="ca-badge-ico" style={{background:'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(49,46,129,0.1))',border:'1px solid rgba(129,140,248,0.3)'}}>💼</div>
                  <div>
                    <div className="ca-badge-title">Open to Work</div>
                    <div className="ca-badge-sub">Freelance &amp; Full-time</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ca-card-right">
              <h2>Senior</h2>
              <h2>Web</h2>
              <h2>Dev.</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
