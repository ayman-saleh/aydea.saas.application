'use client'

import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react'
import { Document } from './types'

interface DocumentViewerModalProps {
  viewingDocument: Document | null
  onClose: () => void
}

export function DocumentViewerModal({ viewingDocument, onClose }: DocumentViewerModalProps) {
  if (!viewingDocument) return null

  return (
    <Modal isOpen={true} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent h="90vh">
        <ModalHeader>{viewingDocument.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={4} overflow="auto">
          {viewingDocument.type === 'text' && viewingDocument.content && (
            <Box
              bg="gray.50"
              _dark={{ bg: 'gray.800' }}
              p={6}
              borderRadius="md"
              whiteSpace="pre-wrap"
              fontFamily="mono"
              fontSize="sm"
            >
              {viewingDocument.content}
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
} 