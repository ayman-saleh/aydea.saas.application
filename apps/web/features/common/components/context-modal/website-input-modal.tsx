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
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react'

interface WebsiteInputModalProps {
  isOpen: boolean
  websiteTitle: string
  websiteUrl: string
  isLoadingTitle: boolean
  onTitleChange: (value: string) => void
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  onCancel: () => void
}

export function WebsiteInputModal({
  isOpen,
  websiteTitle,
  websiteUrl,
  isLoadingTitle,
  onTitleChange,
  onUrlChange,
  onSubmit,
  onCancel,
}: WebsiteInputModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Website</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>URL</FormLabel>
              <Input
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={onUrlChange}
                type="url"
                autoFocus
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Website title (auto-filled)"
                value={websiteTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                isReadOnly={isLoadingTitle}
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
              isDisabled={!websiteTitle.trim() || !websiteUrl.trim()}
            >
              Add Website
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 