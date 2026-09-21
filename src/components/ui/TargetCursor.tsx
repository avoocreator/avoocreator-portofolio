import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export interface TargetCursorProps {
  targetSelector?: string
  spinDuration?: number
  hideDefaultCursor?: boolean
  parallaxOn?: boolean
  hoverDuration?: number
  cursorColor?: string
  cursorColorOnTarget?: string
}

const CORNER_SIZE = 12
const BORDER_WIDTH = 3
const PARALLAX_STRENGTH = 0.00005

const COLLAPSED_POSITIONS = [
  { x: -CORNER_SIZE * 1.5, y: -CORNER_SIZE * 1.5 },
  { x: CORNER_SIZE * 0.5, y: -CORNER_SIZE * 1.5 },
  { x: CORNER_SIZE * 0.5, y: CORNER_SIZE * 0.5 },
  { x: -CORNER_SIZE * 1.5, y: CORNER_SIZE * 0.5 },
]

export default function TargetCursor({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  parallaxOn = true,
  hoverDuration = 0.2,
  cursorColor = '#ffffff',
  cursorColorOnTarget,
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const cornersRef = useRef<NodeListOf<Element> | null>(null)
  const spinTl = useRef<gsap.core.Timeline | null>(null)

  const activeTargetRef = useRef<Element | null>(null)
  const activeCleanupRef = useRef<(() => void) | null>(null)

  const activeColor = cursorColorOnTarget ?? cursorColor
  const location = useLocation()

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth <= 768
    return hasTouchScreen && isSmallScreen
  }, [])

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, { x, y, duration: 0.1, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    if (isMobile || !cursorRef.current) return

    const originalCursor = document.body.style.cursor
    if (hideDefaultCursor) document.body.style.cursor = 'none'

    const cursor = cursorRef.current
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner')

    let isAnimatingToTarget = false
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null

    const cleanupTarget = (target: Element, targetMove: (ev: Event) => void, leaveHandler: () => void) => {
      target.removeEventListener('mousemove', targetMove)
      target.removeEventListener('mouseleave', leaveHandler)
    }

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })

    const createSpinTimeline = () => {
      spinTl.current?.kill()
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' })
    }
    createSpinTimeline()

    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY)
    window.addEventListener('mousemove', moveHandler)

    const setColor = (color: string) => {
      if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: color, duration: 0.2 })
      if (cornersRef.current) {
        gsap.to(Array.from(cornersRef.current), { borderColor: color, duration: 0.2 })
      }
    }

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as Element | null
      const allTargets: Element[] = []
      let current = directTarget
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) allTargets.push(current)
        current = current.parentElement
      }
      const target = allTargets[0] || null
      if (!target || !cursorRef.current || !cornersRef.current) return
      if (activeTargetRef.current === target) return
      activeCleanupRef.current?.()
      if (resumeTimeout) {
        clearTimeout(resumeTimeout)
        resumeTimeout = null
      }

      activeTargetRef.current = target
      setColor(activeColor)

      gsap.killTweensOf(cursorRef.current, 'rotation')
      spinTl.current?.pause()
      gsap.set(cursorRef.current, { rotation: 0 })

      const updateCorners = (mouseX?: number, mouseY?: number) => {
        const rect = target.getBoundingClientRect()
        const cursorRect = cursorRef.current!.getBoundingClientRect()
        const cursorCenterX = cursorRect.left + cursorRect.width / 2
        const cursorCenterY = cursorRect.top + cursorRect.height / 2
        const [tlc, trc, brc, blc] = Array.from(cornersRef.current!)

        const tlOffset = { x: rect.left - cursorCenterX - BORDER_WIDTH, y: rect.top - cursorCenterY - BORDER_WIDTH }
        const trOffset = {
          x: rect.right - cursorCenterX + BORDER_WIDTH - CORNER_SIZE,
          y: rect.top - cursorCenterY - BORDER_WIDTH,
        }
        const brOffset = {
          x: rect.right - cursorCenterX + BORDER_WIDTH - CORNER_SIZE,
          y: rect.bottom - cursorCenterY + BORDER_WIDTH - CORNER_SIZE,
        }
        const blOffset = {
          x: rect.left - cursorCenterX - BORDER_WIDTH,
          y: rect.bottom - cursorCenterY + BORDER_WIDTH - CORNER_SIZE,
        }

        if (parallaxOn && mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2
          const targetCenterY = rect.top + rect.height / 2
          const mouseOffsetX = (mouseX - targetCenterX) * PARALLAX_STRENGTH
          const mouseOffsetY = (mouseY - targetCenterY) * PARALLAX_STRENGTH
          ;[tlOffset, trOffset, brOffset, blOffset].forEach((offset) => {
            offset.x += mouseOffsetX
            offset.y += mouseOffsetY
          })
        }

        const tl = gsap.timeline()
        const corners = [tlc, trc, brc, blc]
        const offsets = [tlOffset, trOffset, brOffset, blOffset]
        corners.forEach((corner, index) => {
          tl.to(corner, { x: offsets[index].x, y: offsets[index].y, duration: hoverDuration, ease: 'power2.out' }, 0)
        })
      }

      isAnimatingToTarget = true
      updateCorners()
      setTimeout(() => {
        isAnimatingToTarget = false
      }, 1)

      let moveThrottle: number | null = null
      const targetMove = (ev: Event) => {
        if (moveThrottle || isAnimatingToTarget) return
        moveThrottle = requestAnimationFrame(() => {
          const mouseEvent = ev as MouseEvent
          updateCorners(mouseEvent.clientX, mouseEvent.clientY)
          moveThrottle = null
        })
      }

      const leaveHandler = () => {
        activeTargetRef.current = null
        activeCleanupRef.current = null
        isAnimatingToTarget = false
        setColor(cursorColor)

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current)
          gsap.killTweensOf(corners)
          const tl = gsap.timeline()
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              { x: COLLAPSED_POSITIONS[index].x, y: COLLAPSED_POSITIONS[index].y, duration: 0.3, ease: 'power3.out' },
              0
            )
          })
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTargetRef.current && cursorRef.current && spinTl.current) {
            const currentRotation = Number(gsap.getProperty(cursorRef.current, 'rotation'))
            const normalizedRotation = currentRotation % 360

            spinTl.current.kill()
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' })

            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: 'none',
              onComplete: () => spinTl.current?.restart(),
            })
          }
          resumeTimeout = null
        }, 50)

        cleanupTarget(target, targetMove, leaveHandler)
      }

      activeCleanupRef.current = () => cleanupTarget(target, targetMove, leaveHandler)
      target.addEventListener('mousemove', targetMove)
      target.addEventListener('mouseleave', leaveHandler)
    }

    window.addEventListener('mouseover', enterHandler as EventListener, { passive: true })

    return () => {
      window.removeEventListener('mousemove', moveHandler)
      window.removeEventListener('mouseover', enterHandler as EventListener)
      activeCleanupRef.current?.()
      activeCleanupRef.current = null
      activeTargetRef.current = null
      spinTl.current?.kill()
      document.body.style.cursor = originalCursor
    }
  }, [targetSelector, spinDuration, moveCursor, hideDefaultCursor, isMobile, parallaxOn, hoverDuration, cursorColor, activeColor])

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current) return
    if (spinTl.current.isActive()) {
      spinTl.current.kill()
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' })
    }
  }, [spinDuration])

  useEffect(() => {
    if (isMobile) return

    activeCleanupRef.current?.()
    activeCleanupRef.current = null
    activeTargetRef.current = null

    if (dotRef.current) gsap.set(dotRef.current, { backgroundColor: cursorColor })
    if (cornersRef.current) {
      const corners = Array.from(cornersRef.current)
      gsap.killTweensOf(corners)
      corners.forEach((corner, index) => gsap.set(corner, COLLAPSED_POSITIONS[index]))
    }
    if (cursorRef.current) {
      gsap.killTweensOf(cursorRef.current, 'rotation')
      gsap.set(cursorRef.current, { rotation: 0 })
      spinTl.current?.kill()
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' })
    }
  }, [location.pathname])

  if (isMobile) return null

  const cornerBase = 'target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-solid border-[3px]'

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]" style={{ willChange: 'transform' }}>
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: cursorColor, willChange: 'transform' }}
      />
      <div className={`${cornerBase} -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0`} style={{ borderColor: cursorColor }} />
      <div className={`${cornerBase} translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0`} style={{ borderColor: cursorColor }} />
      <div className={`${cornerBase} translate-x-1/2 translate-y-1/2 border-l-0 border-t-0`} style={{ borderColor: cursorColor }} />
      <div className={`${cornerBase} -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0`} style={{ borderColor: cursorColor }} />
    </div>
  )
}