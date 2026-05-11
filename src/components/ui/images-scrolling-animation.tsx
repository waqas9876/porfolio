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

export const StickyCard = ({ i, title, src, progress, range, targetScale }: CardProps) => {
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className="sticky top-0 flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20 + 80}px)`,
        }}
        className="relative origin-top overflow-hidden w-full"
        sx={{ height: 'min(60vh, 520px)' }}
      >
        <img
          src={src}
          alt={title}
          className="h-full w-full object-cover"
          style={{ height: 'min(60vh, 520px)' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-bold text-lg tracking-wide drop-shadow-lg whitespace-nowrap">
          {title}
        </span>
      </motion.div>
    </div>
  )
}

interface Project {
  title: string
  src: string
}

interface ImagesScrollingAnimationProps {
  projects: Project[]
}

export const ImagesScrollingAnimation = ({ projects }: ImagesScrollingAnimationProps) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <div
      ref={container}
      className="relative w-full"
      style={{ paddingBottom: '40vh' }}
    >
      {projects.map((project, i) => {
        const targetScale = Math.max(0.6, 1 - (projects.length - i - 1) * 0.07)
        return (
          <StickyCard
            key={`card_${i}`}
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
