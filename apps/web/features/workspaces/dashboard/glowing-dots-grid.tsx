'use client'

import { useEffect, useRef } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import gsap from 'gsap'

interface GlowingDotsGridProps extends BoxProps {
  baseColor?: string
  activeColor?: string
  threshold?: number
  speedThreshold?: number
  shockRadius?: number
  shockPower?: number
  maxSpeed?: number
  centerHole?: boolean
}

export function GlowingDotsGrid({
  baseColor = '#245E51',
  activeColor = '#A8FF51', 
  threshold = 200,
  speedThreshold = 100,
  shockRadius = 325,
  shockPower = 5,
  maxSpeed = 5000,
  centerHole = true,
  ...boxProps
}: GlowingDotsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])
  const dotCentersRef = useRef<{ el: HTMLDivElement; x: number; y: number }[]>([])
  const lastTimeRef = useRef(0)
  const lastPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let dots: HTMLDivElement[] = []
    let dotCenters: { el: HTMLDivElement; x: number; y: number }[] = []

    function buildGrid() {
      container.innerHTML = ''
      dots = []
      dotCenters = []

      const dotPx = 4 // Dot size
      const gapPx = 16 // Gap between dots
      const totalSpacing = dotPx + gapPx // Total space per dot
      
      const contW = container.clientWidth
      const contH = container.clientHeight

      // Calculate number of dots that fit
      const cols = Math.floor(contW / totalSpacing)
      const rows = Math.floor(contH / totalSpacing)
      
      // Calculate starting position to center the grid
      const gridWidth = cols * totalSpacing - gapPx
      const gridHeight = rows * totalSpacing - gapPx
      const offsetX = (contW - gridWidth) / 2
      const offsetY = (contH - gridHeight) / 2

      // Calculate hole dimensions
      const holeCols = centerHole ? Math.max(8, Math.floor(cols * 0.2)) : 0
      const holeRows = centerHole ? Math.max(8, Math.floor(rows * 0.2)) : 0
      const holeStartCol = Math.floor((cols - holeCols) / 2)
      const holeEndCol = holeStartCol + holeCols
      const holeStartRow = Math.floor((rows - holeRows) / 2)
      const holeEndRow = holeStartRow + holeRows
      
      // Calculate hole size in pixels
      const holeWidth = holeCols * totalSpacing - gapPx
      const holeHeight = holeRows * totalSpacing - gapPx
      
      // Store hole dimensions on container for icon sizing
      container.setAttribute('data-hole-width', holeWidth.toString())
      container.setAttribute('data-hole-height', holeHeight.toString())

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const isHole = centerHole &&
            row >= holeStartRow && row < holeEndRow &&
            col >= holeStartCol && col < holeEndCol

          const d = document.createElement('div')
          d.classList.add('dot')
          d.style.position = 'absolute'
          d.style.left = `${offsetX + col * totalSpacing}px`
          d.style.top = `${offsetY + row * totalSpacing}px`
          d.style.width = `${dotPx}px`
          d.style.height = `${dotPx}px`
          d.style.borderRadius = '50%'
          d.style.backgroundColor = baseColor
          d.style.opacity = '0.8'
          d.style.willChange = 'transform, background-color'
          d.style.transformOrigin = 'center'

          if (isHole) {
            d.style.visibility = 'hidden'
            ;(d as any)._isHole = true
          } else {
            gsap.set(d, { x: 0, y: 0 })
            ;(d as any)._inertiaApplied = false
          }

          container.appendChild(d)
          dots.push(d)
        }
      }

      dotsRef.current = dots

      // Calculate dot centers after a frame to ensure DOM is updated
      requestAnimationFrame(() => {
        dotCenters = dots
          .filter(d => !(d as any)._isHole)
          .map(d => {
            const left = parseFloat(d.style.left)
            const top = parseFloat(d.style.top)
            const rect = container.getBoundingClientRect()
            return {
              el: d,
              x: rect.left + left + dotPx / 2,
              y: rect.top + top + dotPx / 2
            }
          })
        dotCentersRef.current = dotCenters
      })
    }

    function handleMouseMove(e: MouseEvent) {
      const now = performance.now()
      const dt = now - lastTimeRef.current || 16
      const dx = e.pageX - lastPosRef.current.x
      const dy = e.pageY - lastPosRef.current.y
      let vx = (dx / dt) * 1000
      let vy = (dy / dt) * 1000
      let speed = Math.hypot(vx, vy)

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed
        vx *= scale
        vy *= scale
        speed = maxSpeed
      }

      lastTimeRef.current = now
      lastPosRef.current = { x: e.pageX, y: e.pageY }

      requestAnimationFrame(() => {
        dotCentersRef.current.forEach(({ el, x, y }) => {
          const dist = Math.hypot(x - e.pageX, y - e.pageY)
          const t = Math.max(0, 1 - dist / threshold)
          const col = gsap.utils.interpolate(baseColor, activeColor, t)
          gsap.set(el, { backgroundColor: col })

          if (speed > speedThreshold && dist < threshold && !(el as any)._inertiaApplied) {
            ;(el as any)._inertiaApplied = true
            const pushX = (x - e.pageX) + vx * 0.005
            const pushY = (y - e.pageY) + vy * 0.005

            // Simulate inertia without the plugin
            gsap.to(el, {
              x: pushX,
              y: pushY,
              duration: 0.6,
              ease: "power2.out",
              onComplete() {
                gsap.to(el, {
                  x: 0,
                  y: 0,
                  duration: 1.5,
                  ease: "elastic.out(1,0.75)"
                })
                ;(el as any)._inertiaApplied = false
              }
            })
          }
        })
      })
    }

    function handleClick(e: MouseEvent) {
      dotCentersRef.current.forEach(({ el, x, y }) => {
        const dist = Math.hypot(x - e.pageX, y - e.pageY)
        if (dist < shockRadius && !(el as any)._inertiaApplied) {
          ;(el as any)._inertiaApplied = true
          const falloff = Math.max(0, 1 - dist / shockRadius)
          const pushX = (x - e.pageX) * shockPower * falloff
          const pushY = (y - e.pageY) * shockPower * falloff

          // Simulate inertia without the plugin
          gsap.to(el, {
            x: pushX,
            y: pushY,
            duration: 0.6,
            ease: "power2.out",
            onComplete() {
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: 1.5,
                ease: "elastic.out(1,0.75)"
              })
              ;(el as any)._inertiaApplied = false
            }
          })
        }
      })
    }

    // Initialize
    buildGrid()

    // Event listeners
    window.addEventListener('resize', buildGrid)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('resize', buildGrid)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      // Kill all GSAP animations on unmount
      gsap.killTweensOf(dotsRef.current)
    }
  }, [baseColor, activeColor, threshold, speedThreshold, shockRadius, shockPower, maxSpeed, centerHole])

  return (
    <Box
      ref={containerRef}
      {...boxProps}
      className="dots-container"
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        ...boxProps.sx,
      }}
    />
  )
} 