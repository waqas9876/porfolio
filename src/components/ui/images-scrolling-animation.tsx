"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface CardProps {
  i: number
  title: string
  src: string
  progress: any
  range: [number, number]
  targetScale: number
}

const StickyCard = ({ i, title, src, progress, range, targetScale }: CardProps) => {
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{ scale, originY: 'top', height: '100%', width: '100%' }}
      >
        <img
          src={src}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              letterSpacing: '-0.3px',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

interface Project { title: string; src: string }
interface Props { projects: Project[] }

export const ImagesScrollingAnimation = ({ projects }: Props) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={container}>
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i - 1) * 0.05
        return (
          <StickyCard
            key={i}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * (1 / projects.length), 1]}
            targetScale={targetScale}
          />
        )
      })}
    </div>
  )
}
