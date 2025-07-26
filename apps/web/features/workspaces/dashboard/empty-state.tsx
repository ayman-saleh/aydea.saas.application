'use client'

import { Box, Heading, Text, VStack, useColorModeValue, useTheme, Card } from '@chakra-ui/react'
import { EmptyState } from '@saas-ui/react'
import { LuMessageSquare } from 'react-icons/lu'
import { useEffect, useState, useRef } from 'react'

import { AydeaSupportIcon } from '@acme/ui/logo'
import { GlowingDotsGrid } from './glowing-dots-grid'
import { CyclingHeadlines } from './cycling-headlines'

export function DashboardEmptyState() {
  const theme = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const baseColor = useColorModeValue(
    'rgba(0, 0, 0, 0.3)',  // Black with opacity for light mode
    'rgba(255, 255, 255, 0.2)' // White with opacity for dark mode
  )
  const activeColor = useColorModeValue(
    'rgba(0, 0, 0, 0.9)',  // Darker black when active
    'rgba(255, 255, 255, 0.8)' // Brighter white when active
  )
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box ref={containerRef} position="relative" minH="100vh" w="100vw" overflow="hidden">
      <GlowingDotsGrid 
        baseColor={baseColor}
        activeColor={activeColor}
        threshold={50}
        speedThreshold={500}
        shockRadius={50}
        shockPower={40}
        centerHole={false}
      />
      
      {/* Center card */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={1}
      >
        <Card
          bg={cardBg}
          borderColor={cardBorder}
          borderWidth="1px"
          p={16}
          maxW="650px"
          boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)"
          backdropFilter="blur(10px)"
          bgGradient={useColorModeValue(
            'linear(to-br, white, gray.50)',
            'linear(to-br, gray.800, gray.900)'
          )}
          position="relative"
          _hover={{
            boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.15), 0 15px 15px -5px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            transform: "translateY(-2px)",
            transition: "all 0.3s ease"
          }}
          transition="all 0.3s ease"
        >
          {/* Icon in top left corner */}
          <Box
            position="absolute"
            top={6}
            left={6}
          >
            <AydeaSupportIcon 
              width="48px" 
              height="48px" 
              color={useColorModeValue('gray.600', 'gray.400')}
            />
          </Box>
          
          <VStack spacing={8} align="center" mt={12}>
            <CyclingHeadlines />
            <Text 
              color="muted" 
              textAlign="center" 
              fontSize="xl"
              maxW="450px"
              lineHeight="tall"
            >
              Start a conversation by typing in the prompt below or explore our templates to get inspired.
            </Text>
          </VStack>
        </Card>
      </Box>
    </Box>
  )
} 