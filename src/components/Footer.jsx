import { useEffect, useRef } from 'react'

const EmailIcon = () => <svg className="hf-ci-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
const PhoneIcon = () => <svg className="hf-ci-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" /></svg>
const PinIcon  = () => <svg className="hf-ci-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" /></svg>

export default function Footer() {
  const svgRef      = useRef(null)
  const drawTextRef = useRef(null)
  const backdropRef = useRef(null)
  const rmaskRef    = useRef(null)

  useEffect(() => {
    const svg      = svgRef.current
    const backdrop = backdropRef.current
    const drawText = drawTextRef.current
    const rmask    = rmaskRef.current
    if (!svg) return

    let drawn = false
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !drawn) {
          drawn = true
          drawText.classList.add('hf-playing')
        }
      })
    }, { threshold: 0.2 })
    io.observe(svg)

    const onEnter  = () => { backdrop.style.opacity = '0.8' }
    const onLeave  = () => { backdrop.style.opacity = '0'; rmask.setAttribute('cx','150'); rmask.setAttribute('cy','50') }
    const onMove   = (e) => {
      const rect = svg.getBoundingClientRect()
      rmask.setAttribute('cx', ((e.clientX - rect.left) / rect.width * 300).toString())
      rmask.setAttribute('cy', ((e.clientY - rect.top)  / rect.height * 100).toString())
    }
    svg.addEventListener('mouseenter', onEnter)
    svg.addEventListener('mouseleave', onLeave)
    svg.addEventListener('mousemove',  onMove)
    return () => {
      io.disconnect()
      svg.removeEventListener('mouseenter', onEnter)
      svg.removeEventListener('mouseleave', onLeave)
      svg.removeEventListener('mousemove',  onMove)
    }
  }, [])

  const navClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="hf-bg" aria-hidden="true" />
      <div className="hf-inner">
        <div className="hf-grid">
          <div>
            <div className="hf-logo">
              <span className="hf-heart">♥</span>
              <span className="hf-logo-name">Waqas</span>
            </div>
            <p className="hf-brand-desc">Building fast, responsive, and elegant web experiences for clients worldwide.</p>
          </div>
          <div>
            <h4 className="hf-col-title">Services</h4>
            <ul className="hf-links">
              <li><a href="#skills" onClick={(e) => navClick(e,'#skills')}>Frontend Development</a></li>
              <li><a href="#skills" onClick={(e) => navClick(e,'#skills')}>Backend Development</a></li>
              <li><a href="#skills" onClick={(e) => navClick(e,'#skills')}>WordPress Dev</a></li>
              <li><a href="#skills" onClick={(e) => navClick(e,'#skills')}>Shopify Development</a></li>
            </ul>
          </div>
          <div>
            <h4 className="hf-col-title">Quick Links</h4>
            <ul className="hf-links">
              <li><a href="#about"      onClick={(e) => navClick(e,'#about')}>About Me</a></li>
              <li><a href="#experience" onClick={(e) => navClick(e,'#experience')}>Experience</a></li>
              <li><a href="#skills"     onClick={(e) => navClick(e,'#skills')}>Skills</a></li>
              <li><a href="#contact"    onClick={(e) => navClick(e,'#contact')}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="hf-col-title">Contact</h4>
            <ul className="hf-contact-list">
              <li className="hf-ci"><EmailIcon /><a href="mailto:mwaqasjaved2300@gmail.com">mwaqasjaved2300@gmail.com</a></li>
              <li className="hf-ci"><PhoneIcon /><a href="tel:+923279700070">0327-9700070</a></li>
              <li className="hf-ci"><PinIcon  /><span>Islamabad, Pakistan</span></li>
            </ul>
          </div>
        </div>

        <hr className="hf-divider" />

        <div className="hf-bottom">
          <div className="hf-socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hf-social" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hf-social" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:mwaqasjaved2300@gmail.com" className="hf-social" aria-label="Email">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
            </a>
            <a href="#" className="hf-social" aria-label="Twitter/X">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <p className="hf-copy">&copy; 2025 Muhammad Waqas Javed. All rights reserved.</p>
        </div>
      </div>

      <div className="hf-text-wrap">
        <svg id="hf-svg" ref={svgRef} width="100%" height="100%" viewBox="0 0 300 100"
             xmlns="http://www.w3.org/2000/svg" style={{cursor:'pointer',userSelect:'none'}}>
          <defs>
            <linearGradient id="hf-grad" gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="300" y2="50">
              <stop offset="0%"   stopColor="#eab308" />
              <stop offset="25%"  stopColor="#ef4444" />
              <stop offset="50%"  stopColor="#80eeb4" />
              <stop offset="75%"  stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <radialGradient id="hf-rmask" gradientUnits="userSpaceOnUse" cx="150" cy="50" r="55">
              <stop offset="0%"   stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <mask id="hf-mask">
              <rect x="0" y="0" width="300" height="100" fill="url(#hf-rmask)" ref={rmaskRef} />
            </mask>
          </defs>
          <text ref={backdropRef} id="hf-backdrop"
                x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
                fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
                fontSize="52" fontWeight="900"
                fill="transparent" stroke="#2a2a3a" strokeWidth="0.4"
                style={{opacity:0,transition:'opacity 0.3s',textTransform:'uppercase'}}>WAQAS</text>
          <text ref={drawTextRef} id="hf-draw"
                x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
                fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
                fontSize="52" fontWeight="900"
                fill="transparent" stroke="#222222" strokeWidth="0.4"
                strokeDasharray="5000" strokeDashoffset="5000"
                style={{textTransform:'uppercase'}}>WAQAS</text>
          <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
                fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
                fontSize="52" fontWeight="900"
                fill="url(#hf-grad)"
                mask="url(#hf-mask)"
                style={{textTransform:'uppercase'}}>WAQAS</text>
        </svg>
      </div>
    </footer>
  )
}
