"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface Project {
  title: string
  src: string
}

const StickyCard_001 = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
}: {
  i: number
  title: string
  src: string
  progress: any
  range: [number, number]
  targetScale: number
}) => {
  const container = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 15 + 200}px)`,
        }}
        className="rounded-2xl sm:rounded-3xl relative -top-1/4 flex origin-top flex-col overflow-hidden
                   h-[200px] w-[280px]
                   sm:h-[240px] sm:w-[360px]
                   md:h-[280px] md:w-[420px]
                   lg:h-[300px] lg:w-[500px]"
      >
        <img src={src} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-semibold text-sm tracking-wide whitespace-nowrap drop-shadow-md">
          {title}
        </span>
      </motion.div>
    </div>
  )
}

const ImagesScrollingAnimation = ({ projects }: { projects: Project[] }) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <main
      ref={container}
      className="relative flex w-full flex-col items-center justify-center
                 pb-[50vh] pt-[5vh]
                 sm:pb-[60vh] sm:pt-[8vh]
                 lg:pb-[70vh] lg:pt-[10vh]"
    >
      {projects.map((project, i) => {
        const targetScale = Math.max(0.6, 1 - (projects.length - i - 1) * 0.08)
        return (
          <StickyCard_001
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.2, 1]}
            targetScale={targetScale}
          />
        )
      })}
    </main>
  )
}

export { ImagesScrollingAnimation, StickyCard_001 }
