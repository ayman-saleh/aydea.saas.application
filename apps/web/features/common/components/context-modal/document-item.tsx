'use client'

import React from 'react'
import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import { DocumentItemProps } from './types'

export function DocumentItem({ doc, onRemove, onView, getIcon }: DocumentItemProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  return (
    <HStack
      spacing={2}
      bg="context-modal.hover-bg"
      px={3}
      py={2}
      borderRadius="md"
      flexShrink={0}
      minW="fit-content"
    >
      <Box
        as="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onRemove(doc.id)}
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ opacity: 0.7 }}
      >
        {isHovered ? (
          <Icon
            as={LuX}
            boxSize={4}
            color="red.500"
          />
        ) : doc.type === 'website' && doc.faviconUrl ? (
          <Box
            as="img"
            src={doc.faviconUrl}
            alt=""
            boxSize={4}
            borderRadius="sm"
            objectFit="contain"
          />
        ) : (
          <Icon
            as={getIcon(doc.type)}
            boxSize={4}
            color="context-modal.icon-color"
          />
        )}
      </Box>
      <Text 
        fontSize="sm" 
        fontWeight="medium" 
        whiteSpace="nowrap"
        cursor="pointer"
        onClick={() => onView(doc)}
        _hover={{ textDecoration: 'underline' }}
      >
        {doc.title}
      </Text>
    </HStack>
  )
} 