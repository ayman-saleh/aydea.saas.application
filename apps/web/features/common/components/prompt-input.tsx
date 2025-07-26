'use client'

import React, { useState } from 'react'
import {
  Divider,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  IconButton,
  Spinner,
  Box,
} from '@chakra-ui/react'
import { LuArrowUp } from 'react-icons/lu'
import { motion, AnimatePresence } from 'framer-motion'
import { ContextIcon } from './context-icon'
import { ContextModal } from './context-modal'

interface PromptInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  isLoading?: boolean
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
}: PromptInputProps) {
  const [isContextModalOpen, setIsContextModalOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  // Animation variants
  const containerVariants = {
    initial: { 
      scale: 1,
      y: 0,
      width: '100%',
    },
    hover: {
      scale: 1.02,
      y: -2,
      width: '100%',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      }
    },
    focused: {
      scale: 1.05,
      y: -8,
      width: '60vw',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  }

  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    focused: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
    <Box position="relative" maxW={isFocused ? "60vw" : "600px"} w="full" transition="max-width 0.3s ease-out">
      <motion.div
        initial="initial"
        animate={isFocused ? "focused" : isHovered ? "hover" : "initial"}
        variants={containerVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          zIndex: isFocused ? 10 : 1,
        }}
      >
        {/* Glow effect layer */}
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate={isFocused ? "focused" : "initial"}
          style={{
            position: 'absolute',
            inset: isFocused ? -8 : -4,
            background: isFocused 
              ? 'linear-gradient(45deg, rgba(107, 117, 208, 0.4), rgba(133, 142, 221, 0.4), rgba(107, 117, 208, 0.3))' 
              : 'linear-gradient(45deg, rgba(107, 117, 208, 0.3), rgba(133, 142, 221, 0.3))',
            borderRadius: '9999px',
            filter: isFocused ? 'blur(20px)' : 'blur(12px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
        
        <InputGroup size="lg" w="full">
          {/* Left element: spinner or spacer */}
          <InputLeftElement h="100%" display="flex" alignItems="center" justifyContent="center" p={2} w="auto" gap={2}>
            <motion.div
              animate={{ rotate: isLoading ? 360 : 0 }}
              transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
            >
              {isLoading ? (
                <Spinner size="sm" thickness="2px" color="prompt-input.spinner" />
              ) : (
                <Box 
                  as="button"
                  onClick={() => setIsContextModalOpen(true)}
                  _hover={{ opacity: 0.8 }}
                  transition="opacity 0.2s"
                >
                  <ContextIcon />
                </Box>
              )}
            </motion.div>
            <Divider orientation="vertical" h="32px" w="1px" bg="prompt-input.divider" />
          </InputLeftElement>

          {/* Pill‑shaped input */}
          <Input
            placeholder="Add competitor analysis"
            textColor="prompt-input.text"
            bg="prompt-input.bg"
            backdropFilter="blur(16px)"
            borderRadius="full"
            borderWidth="1px"
            borderColor="prompt-input.border"
            ring="2px"
            ringColor="prompt-input.ring"
            boxShadow={isFocused ? "0 0 0 4px rgba(107, 117, 208, 0.1)" : "sm"}
            _placeholder={{
              color: 'prompt-input.placeholder',
              _focus: { color: 'prompt-input.placeholder-focus' },
              fontSize: isFocused ? "lg" : "md",
              transition: "font-size 0.3s ease-out",
            }}
            _hover={{ ringColor: 'prompt-input.ring-hover' }}
            _focus={{
              borderColor: 'prompt-input.border',
              ringColor: 'prompt-input.ring-focus',
              boxShadow: "0 0 0 4px rgba(107, 117, 208, 0.1)",
            }}
            _disabled={{
              opacity: 0.5,
              pointerEvents: 'none',
              cursor: 'not-allowed',
            }}
            fontSize={isFocused ? "lg" : "md"}
            value={value}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            pl="70px"
            pr="120px"
            px={4}
            h={isFocused ? "56px" : "44px"}
            transition="all 0.3s ease-out"
          />

          {/* Right element: center the button */}
          <InputRightElement
            display="flex"
            alignItems="center"
            justifyContent="center"
            pointerEvents="none"
            pr={3}
            h="100%"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                width: isFocused ? "40px" : "32px",
                height: isFocused ? "40px" : "32px",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <IconButton
                pointerEvents="auto"
                aria-label="Submit"
                icon={<LuArrowUp size={isFocused ? "22px" : "18px"} />}
                boxSize="100%"
                variant="ghost"
                onClick={onSubmit}
                isDisabled={!value.trim() || isLoading}
                _hover={{ bg: 'prompt-input.button.bg-hover' }}
                bg="prompt-input.button.bg"
                borderRadius="full"
              />
            </motion.div>
          </InputRightElement>
        </InputGroup>
      </motion.div>
    </Box>
    
    <ContextModal isOpen={isContextModalOpen} onClose={() => setIsContextModalOpen(false)} />
    </>
  )
}
