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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <>
    <InputGroup size="md" maxW="600px" w="full">
      {/* Left element: spinner or spacer */}
      <InputLeftElement h="100%" display="flex" alignItems="center" justifyContent="center" p={2} w="auto" gap={2}>
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
        <Divider orientation="vertical" h="24px" w="1px" bg="prompt-input.divider" />
      </InputLeftElement>

      {/* Pill‑shaped input */}
      <Input
        placeholder="Add competitor analysis"
        textColor="prompt-input.text"
        bg="prompt-input.bg"
        backdropFilter="blur(16px)"
        borderRadius="full"            // makes it a pill
        borderWidth="1px"
        borderColor="prompt-input.border"
        ring="2px"
        ringColor="prompt-input.ring"
        boxShadow="sm"
        _placeholder={{
          color: 'prompt-input.placeholder',
          _focus: { color: 'prompt-input.placeholder-focus' },
        }}
        _hover={{ ringColor: 'prompt-input.ring-hover' }}
        _focus={{
          borderColor: 'prompt-input.border',
          ringColor: 'prompt-input.ring-focus',
          boxShadow: 'sm',
        }}
        _disabled={{
          opacity: 0.5,
          pointerEvents: 'none',
          cursor: 'not-allowed',
        }}
        fontSize="sm"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        pl="60px"    // space for left element with gap
        pr="100px"   // space for right button
        px={4}
        h="36px"     // 36px tall → radius=18px
        transition="all 0.3s ease-out"
      />

      {/* Right element: center the button */}
      <InputRightElement
        display="flex"
        alignItems="center"
        justifyContent="center"
        pointerEvents="none"
        pr={2}
        h="100%"
      >
        <IconButton
          pointerEvents="auto"
          aria-label="Submit"
          icon={<LuArrowUp size="16px" />}
          boxSize="28px"
          variant="ghost"
          onClick={onSubmit}
          isDisabled={!value.trim() || isLoading}
          _hover={{ bg: 'prompt-input.button.bg-hover' }}
          bg="prompt-input.button.bg"
          borderRadius="full"          // circle matching the pill curvature
        />
      </InputRightElement>
    </InputGroup>
    
    <ContextModal isOpen={isContextModalOpen} onClose={() => setIsContextModalOpen(false)} />
    </>
  )
}
