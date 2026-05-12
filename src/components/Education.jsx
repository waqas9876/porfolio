import { useEffect, useRef } from 'react'

const EDUCATION = [
  { icon: '🎓', degree: 'Bachelor of Computer Science', school: 'Riphah International University', year: '2019 – 2023' },
  { icon: '📚', degree: 'Intermediate (FSc)', school: 'Superior College', year: '2017 – 2019' },
]

export default function Education() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const CalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{width:14,height:14}}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  )

  return (
    <section id="education" ref={sectionRef}>
      <div className="container">
        <p className="section-label reveal">Academic Background</p>
        <h2 className="section-title reveal">Education</h2>
        <p className="section-sub reveal">My formal academic qualifications.</p>
        <div className="edu-grid">
          {EDUCATION.map((e, i) => (
            <div key={i} className="edu-card reveal">
              <div className="edu-icon">{e.icon}</div>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-school">{e.school}</div>
              <div className="edu-year"><CalIcon />{e.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
