'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Box, Heading, useColorModeValue } from '@chakra-ui/react'
import gsap from 'gsap'

const headlines = [
  "Analyze competitor strategies",
  "Generate market insights",
  "Create content strategies", 
  "Build product roadmaps",
  "Discover growth opportunities"
]

export function CyclingHeadlines() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const skeletonBase = useColorModeValue('#E2E8F0', '#2D3748')
  const skeletonPulse = useColorModeValue('#CBD5E0', '#4A5568')
  const textColor = useColorModeValue('gray.800', 'white')

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let timeoutId: number
    let tl: gsap.core.Timeline

    const scheduleNext = () => {
      timeoutId = window.setTimeout(animateSkeleton, 10000) // 10s display
    }

    const animateSkeleton = () => {
      const heading = headingRef.current
      const container = containerRef.current
      if (!heading || !container) return

      // Create skeleton overlay with fixed size
      const overlay = document.createElement('div')
      Object.assign(overlay.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%', // Fixed width relative to container
        height: '40px', // Fixed height
        borderRadius: '0.5rem',
        backgroundColor: skeletonBase,
        zIndex: '2',
        pointerEvents: 'none',
        opacity: '1', // cover immediately
      })
      container.appendChild(overlay)

      // Now swap the headline under the overlay
      setCurrentIndex(i => (i + 1) % headlines.length)

      // Build timeline to pulse and fade-out overlay
      tl = gsap.timeline({
        onComplete: () => {
          overlay.remove()
          scheduleNext()
        }
      })
      .to(overlay, {
        backgroundColor: skeletonPulse,
        duration: 0.5,
        ease: 'power1.inOut',
        repeat: 2,
        yoyo: true,
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut'
      })
    }

    // Kick off the loop
    scheduleNext()

    return () => {
      clearTimeout(timeoutId)
      if (tl) tl.kill()
    }
  }, [skeletonBase, skeletonPulse])

  return (
    <Box 
      ref={containerRef}
      position="relative"
      width="100%"
      height="60px" // Fixed height container
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden" // Hide any overflow
    >
      <Heading
        ref={headingRef}
        position="absolute"
        size="2xl"
        fontWeight="light"
        textAlign="center"
        fontFamily="neueBit"
        color={textColor}
        whiteSpace="nowrap" // Prevent text wrapping
        maxWidth="90%" // Constrain width
        overflow="hidden" // Hide overflow
        textOverflow="ellipsis" // Add ellipsis if needed
      >
        {headlines[currentIndex]}
      </Heading>
    </Box>
  )
}
