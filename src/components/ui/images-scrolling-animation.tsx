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
    <div className="sticky top-0 flex items-center justify-center py-3">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 18 + 160}px)`,
        }}
        className="relative origin-top overflow-hidden rounded-2xl
                   h-[200px] w-[300px]
                   sm:h-[240px] sm:w-[400px]
                   md:h-[270px] md:w-[460px]
                   lg:h-[300px] lg:w-[520px]"
      >
        <img src={src} alt={title} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-5 text-white font-semibold text-sm tracking-wide">
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
      className="relative flex w-full flex-col items-center justify-center pb-[40vh] pt-[8vh]"
    >
      {projects.map((project, i) => {
        const targetScale = Math.max(0.65, 1 - (projects.length - i - 1) * 0.08)
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
