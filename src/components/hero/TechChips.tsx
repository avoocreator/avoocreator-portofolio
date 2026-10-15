import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Chip = {
  name: string
  src: string
  position: string
  rotate: number
  delay: number
  duration: number
}

const CHIPS: Chip[] = [
  { name: 'Canva',       src: '/assets/tech/canva.svg',   position: 'left-[6%] top-[12%]',      rotate: -8, delay: 0,   duration: 5.5 },
  { name: 'VS Code',     src: '/assets/tech/vscode.svg',  position: 'right-[4%] top-[20%]',     rotate: 7,  delay: 0.6, duration: 6.2 },
  { name: 'Figma',       src: '/assets/tech/figma.svg',   position: 'left-[2%] bottom-[22%]',   rotate: 6,  delay: 1.1, duration: 5.8 },
  { name: 'Arduino IDE', src: '/assets/tech/arduino.svg', position: 'right-[10%] bottom-[12%]', rotate: -6, delay: 0.3, duration: 6.6 },
]

function ChipIcon({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="text-2xl font-bold text-accent-orange">{name.charAt(0)}</span>
    )
  }

  return (
    <img
      src={src}
      alt=""
      draggable={false}
      onError={() => setFailed(true)}
      className="h-9 w-9 object-contain md:h-11 md:w-11"
    />
  )
}

export default function TechChips() {
  const reduced = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {CHIPS.map((chip) => (
        <motion.div
          key={chip.name}
          title={chip.name}
          className={`absolute ${chip.position} flex h-16 w-16 items-center justify-center rounded-2xl border border-black/10 bg-white/80 shadow-lg shadow-black/10 backdrop-blur dark:border-white/10 dark:bg-[#1b2030]/80 dark:shadow-black/40 md:h-20 md:w-20`}
          initial={{ rotate: chip.rotate }}
          animate={
            reduced
              ? { rotate: chip.rotate }
              : { y: [0, -12, 0], rotate: [chip.rotate, chip.rotate + 4, chip.rotate] }
          }
          transition={{
            duration: chip.duration,
            delay: chip.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChipIcon name={chip.name} src={chip.src} />
        </motion.div>
      ))}
    </div>
  )
}