import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const navRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav id="navbar" ref={navRef} className={`${open ? 'open' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo" onClick={(e) => handleNavLink(e, '#hero')}>WJ.</a>
      <div className="nav-links">
        {['#about','#experience','#skills','#education','#testimonials'].map(href => (
          <a key={href} href={href} onClick={(e) => handleNavLink(e, href)}>
            {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
          </a>
        ))}
      </div>
      <a href="https://wa.me/923279700070" target="_blank" rel="noreferrer" className="nav-btn">Hire Me</a>
      <div className="hamburger" onClick={() => setOpen(o => !o)}>
        <span /><span /><span />
      </div>
    </nav>
  )
}
