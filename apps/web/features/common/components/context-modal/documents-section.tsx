'use client'

import React from 'react'
import {
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBreakpointValue,
  Box,
} from '@chakra-ui/react'
import { LuPlus, LuFile, LuFileText, LuGlobe } from 'react-icons/lu'
import { Document } from './types'
import { DocumentItem } from './document-item'
import { getDocumentIcon } from './utils'

interface DocumentsSectionProps {
  documents: Document[]
  onRemoveDocument: (id: string) => void
  onViewDocument: (doc: Document) => void
  onPdfSelect: () => void
  onTextSelect: () => void
  onWebsiteSelect: () => void
}

export function DocumentsSection({
  documents,
  onRemoveDocument,
  onViewDocument,
  onPdfSelect,
  onTextSelect,
  onWebsiteSelect,
}: DocumentsSectionProps) {
  const isMobile = useBreakpointValue({ base: true, md: false })

  if (documents.length === 0) {
    return (
      <HStack spacing={2}>
        <Text fontSize="sm" color="context-modal.text-muted">
          No documents found
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<LuPlus />}
            size="xs"
            variant="ghost"
            aria-label="Add document"
            _hover={{ bg: 'context-modal.button-hover' }}
          />
          <MenuList>
            <MenuItem icon={<LuFile />} onClick={onPdfSelect}>
              PDF
            </MenuItem>
            <MenuItem icon={<LuFileText />} onClick={onTextSelect}>
              Text
            </MenuItem>
            <MenuItem icon={<LuGlobe />} onClick={onWebsiteSelect}>
              Website
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    )
  }

  return (
    <Box
      overflowX={isMobile ? "visible" : "auto"}
      overflowY="visible"
      py={1}
      css={!isMobile ? {
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--chakra-colors-gray-300)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'var(--chakra-colors-gray-400)',
        },
      } : {}}
    >
      <HStack 
        spacing={2}
        wrap={isMobile ? "wrap" : "nowrap"}
        align="start"
      >
        {documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            doc={doc}
            onRemove={onRemoveDocument}
            onView={onViewDocument}
            getIcon={getDocumentIcon}
          />
        ))}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<LuPlus />}
            size="xs"
            variant="ghost"
            aria-label="Add document"
            _hover={{ bg: 'context-modal.button-hover' }}
            flexShrink={0}
          />
          <MenuList>
            <MenuItem icon={<LuFile />} onClick={onPdfSelect}>
              PDF
            </MenuItem>
            <MenuItem icon={<LuFileText />} onClick={onTextSelect}>
              Text
            </MenuItem>
            <MenuItem icon={<LuGlobe />} onClick={onWebsiteSelect}>
              Website
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  )
} 