'use client'

import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  VStack,
  HStack,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react'

interface TextInputModalProps {
  isOpen: boolean
  textTitle: string
  textContent: string
  onTitleChange: (value: string) => void
  onContentChange: (value: string) => void
  onSubmit: () => void
  onCancel: () => void
}

export function TextInputModal({
  isOpen,
  textTitle,
  textContent,
  onTitleChange,
  onContentChange,
  onSubmit,
  onCancel,
}: TextInputModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Text Document</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter document title"
                value={textTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                autoFocus
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Enter your text content here..."
                value={textContent}
                onChange={(e) => onContentChange(e.target.value)}
                minH="200px"
                resize="vertical"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={2}>
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              colorScheme="primary"
              onClick={onSubmit}
              isDisabled={!textTitle.trim() || !textContent.trim()}
            >
              Add Document
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 