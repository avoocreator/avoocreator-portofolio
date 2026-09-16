import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/utils'

type MascotVariant = 'point' | 'curious'

const sources: Record<MascotVariant, string> = {
  point: '/assets/mascot/mascot-point.svg',
  curious: '/assets/mascot/mascot-curious.svg',
}

interface MascotProps {
  variant?: MascotVariant
  className?: string
  animate?: boolean
  priority?: boolean
}

export function Mascot({ variant = 'point', className, animate = true, priority = false }: MascotProps) {
  const reducedMotion = usePrefersReducedMotion()
  const shouldAnimate = animate && !reducedMotion

  return (
    <motion.div
      className={cn('relative', className)}
      style={shouldAnimate ? { willChange: 'transform' } : undefined}
      animate={shouldAnimate ? { y: [0, -16, 0] } : undefined}
      transition={
        shouldAnimate
          ? { duration: 5.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }
          : undefined
      }
    >
      <img
        src={sources[variant]}
        alt="Maskot Avoo Creator"
        className="h-full w-full object-contain select-none pointer-events-none"
        draggable={false}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        width={800}
        height={800}
      />
    </motion.div>
  )
}