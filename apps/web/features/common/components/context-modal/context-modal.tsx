'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  HStack,
  VStack,
  Text,
  Divider,
  Icon,
  IconButton,
  useBreakpointValue,
  Stack,
} from '@chakra-ui/react'
import {
  LuPlus,
  LuFileText,
  LuPlug2,
} from 'react-icons/lu'

import { ContextModalProps, ContextSection, Document } from './types'
import { DocumentsSection } from './documents-section'
import { TextInputModal } from './text-input-modal'
import { WebsiteInputModal } from './website-input-modal'
import { DocumentViewerModal } from './document-viewer-modal'
import { getFaviconUrl, inferTitleFromUrl } from './utils'
import { Integration } from './mcp-types'
import { MCPIntegrationsSection } from './mcp-integrations-section'
import { DEFAULT_INTEGRATIONS, AVAILABLE_INTEGRATIONS } from './mcp-constants'

export function ContextModal({ isOpen, onClose }: ContextModalProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isTextFormOpen, setIsTextFormOpen] = useState(false)
  const [textTitle, setTextTitle] = useState('')
  const [textContent, setTextContent] = useState('')
  const [isWebsiteFormOpen, setIsWebsiteFormOpen] = useState(false)
  const [websiteTitle, setWebsiteTitle] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isLoadingTitle, setIsLoadingTitle] = useState(false)
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null)
  const [integrations, setIntegrations] = useState<Integration[]>(DEFAULT_INTEGRATIONS)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  
  const modalSize = useBreakpointValue({ base: 'full', md: '6xl' })
  const isMobile = useBreakpointValue({ base: true, md: false })

  const addDocument = (type: 'pdf' | 'text' | 'website', title?: string, content?: string, url?: string) => {
    const newDoc: Document = {
      id: Date.now().toString(),
      title: title || (type === 'pdf' ? 'Document.pdf' : type === 'text' ? 'Notes.txt' : 'example.com'),
      type,
      content,
      url,
    }
    setDocuments([...documents, newDoc])
  }

  const handlePdfSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        const newDoc: Document = {
          id: Date.now().toString(),
          title: file.name,
          type: 'pdf',
          fileData: base64,
        }
        setDocuments([...documents, newDoc])
      }
      reader.readAsDataURL(file)
    }
    // Reset the input value so the same file can be selected again
    if (event.target) {
      event.target.value = ''
    }
  }

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  const handleTextSubmit = () => {
    if (textTitle.trim() && textContent.trim()) {
      addDocument('text', textTitle, textContent)
      setTextTitle('')
      setTextContent('')
      setIsTextFormOpen(false)
    }
  }

  const handleTextCancel = () => {
    setTextTitle('')
    setTextContent('')
    setIsTextFormOpen(false)
  }

  const handleWebsiteSubmit = () => {
    if (websiteTitle.trim() && websiteUrl.trim()) {
      const formattedUrl = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`
      const faviconUrl = getFaviconUrl(formattedUrl)
      const newDoc: Document = {
        id: Date.now().toString(),
        title: websiteTitle,
        type: 'website',
        url: formattedUrl,
        faviconUrl,
      }
      setDocuments([...documents, newDoc])
      setWebsiteTitle('')
      setWebsiteUrl('')
      setIsWebsiteFormOpen(false)
    }
  }

  const handleWebsiteCancel = () => {
    setWebsiteTitle('')
    setWebsiteUrl('')
    setIsLoadingTitle(false)
    setIsWebsiteFormOpen(false)
  }

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setWebsiteUrl(url)
    
    // Only infer title if URL looks valid and title is empty
    if (url && url.includes('.') && !websiteTitle) {
      const inferredTitle = inferTitleFromUrl(url)
      if (inferredTitle) {
        setWebsiteTitle(inferredTitle)
      }
    }
  }

  const handleViewDocument = (doc: Document) => {
    if (doc.type === 'website') {
      // Open website in new tab
      window.open(doc.url || doc.title, '_blank')
    } else if (doc.type === 'pdf' && doc.fileData) {
      // Open PDF in new tab
      window.open(doc.fileData, '_blank')
    } else {
      // Open viewer modal for text
      setViewingDocument(doc)
    }
  }

  const handleAddIntegration = (integrationId: string) => {
    const integration = AVAILABLE_INTEGRATIONS.find(i => i.id === integrationId)
    if (integration && !integrations.find(i => i.id === integrationId)) {
      setIntegrations([...integrations, { ...integration, connected: true }])
    }
  }

  const handleRemoveIntegration = (integrationId: string) => {
    setIntegrations(integrations.filter(i => i.id !== integrationId))
  }

  const sections: ContextSection[] = [
    {
      label: 'MCP Integrations',
      icon: LuPlug2,
      content: (
        <MCPIntegrationsSection
          integrations={integrations}
          onAddIntegration={handleAddIntegration}
          onRemoveIntegration={handleRemoveIntegration}
        />
      ),
    },
    {
      label: 'Documents',
      icon: LuFileText,
      content: (
        <DocumentsSection
          documents={documents}
          onRemoveDocument={removeDocument}
          onViewDocument={handleViewDocument}
          onPdfSelect={handlePdfSelect}
          onTextSelect={() => setIsTextFormOpen(true)}
          onWebsiteSelect={() => setIsWebsiteFormOpen(true)}
        />
      ),
    },
  ]

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <ModalContent
          bg="context-modal.bg"
          borderRadius={isMobile ? "none" : "md"}
          boxShadow={isMobile ? "none" : "xl"}
          borderWidth={isMobile ? "0" : "1px"}
          borderColor="context-modal.border"
          m={isMobile ? 0 : 4}
          maxH={isMobile ? "100vh" : "90vh"}
        >
          <ModalCloseButton />
          <ModalBody p={0} overflowY="auto">
            <Box maxW={isMobile ? "100%" : "1200px"} mx="auto" px={isMobile ? 4 : 6} py={isMobile ? 6 : 8}>
              <VStack align="stretch" spacing={0}>
              {sections.map((section, index) => (
                <Box key={section.label}>
                  <Box
                    py={isMobile ? 4 : 6}
                    px={isMobile ? 4 : 8}
                    _hover={section.expandable ? { bg: 'context-modal.hover-bg' } : {}}
                    cursor={section.expandable ? 'pointer' : 'default'}
                    borderRadius="lg"
                    transition="background 0.2s"
                  >
                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <Stack 
                      direction={isMobile ? "column" : "row"}
                      align={isMobile ? "stretch" : "start"}
                      spacing={isMobile ? 3 : 8}
                      w="full"
                    >
                      {/* Label Section */}
                      <HStack 
                        spacing={3} 
                        minW={isMobile ? "auto" : "200px"} 
                        align="center"
                      >
                        <Icon
                          as={section.icon}
                          boxSize={4}
                          color="context-modal.icon-color"
                        />
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="context-modal.label-color"
                        >
                          {section.label}
                        </Text>
                      </HStack>

                      {/* Content Section */}
                      <Box flex={1} w="full">
                        {section.content}
                      </Box>

                      {/* Expandable Indicator */}
                      {section.expandable && (
                        <IconButton
                          aria-label="Expand section"
                          icon={<LuPlus />}
                          size="xs"
                          variant="ghost"
                          color="context-modal.icon-color"
                          _hover={{ bg: 'context-modal.button-hover' }}
                          ml={isMobile ? "auto" : 0}
                        />
                      )}
                    </Stack>
                  </Box>
                  
                  {index < sections.length - 1 && (
                    <Divider borderColor="context-modal.border" />
                  )}
                </Box>
              ))}
            </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Text Input Modal */}
      <TextInputModal
        isOpen={isTextFormOpen}
        textTitle={textTitle}
        textContent={textContent}
        onTitleChange={setTextTitle}
        onContentChange={setTextContent}
        onSubmit={handleTextSubmit}
        onCancel={handleTextCancel}
      />

      {/* Website Input Modal */}
      <WebsiteInputModal
        isOpen={isWebsiteFormOpen}
        websiteTitle={websiteTitle}
        websiteUrl={websiteUrl}
        isLoadingTitle={isLoadingTitle}
        onTitleChange={setWebsiteTitle}
        onUrlChange={handleUrlChange}
        onSubmit={handleWebsiteSubmit}
        onCancel={handleWebsiteCancel}
      />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        viewingDocument={viewingDocument}
        onClose={() => setViewingDocument(null)}
      />
    </>
  )
} 