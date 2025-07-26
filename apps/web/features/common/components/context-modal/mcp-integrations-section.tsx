'use client'

import React from 'react'
import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useBreakpointValue,
} from '@chakra-ui/react'
import { LuPlus, LuPlug2 } from 'react-icons/lu'
import { MCPIntegrationsSectionProps } from './mcp-types'
import { AVAILABLE_INTEGRATIONS } from './mcp-constants'

export function MCPIntegrationsSection({
  integrations,
  onAddIntegration,
  onRemoveIntegration,
}: MCPIntegrationsSectionProps) {
  const connectedIntegrations = integrations.filter(i => i.connected)
  const availableToAdd = AVAILABLE_INTEGRATIONS.filter(
    available => !integrations.find(i => i.id === available.id)
  )
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <VStack align="start" spacing={3}>
      <Text fontSize="sm" color="context-modal.text-muted">
        Connect external tools and services to enhance your AI context
      </Text>
      <HStack spacing={2} flexWrap="wrap">
        {connectedIntegrations.map((integration) => (
          <Box
            key={integration.id}
            px={3}
            py={2}
            borderWidth="2px"
            borderColor="green.500"
            borderRadius="md"
            bg="context-modal.hover-bg"
            display="flex"
            alignItems="center"
            gap={2}
            position="relative"
            _hover={{ borderColor: 'green.600' }}
          >
            {integration.logoUrl ? (
              <Avatar
                size="xs"
                src={integration.logoUrl}
                name={integration.name}
              />
            ) : (
              <Icon as={LuPlug2} boxSize={4} color="green.500" />
            )}
            <Text fontSize="sm" fontWeight="medium">{integration.name}</Text>
            <IconButton
              aria-label="Remove integration"
              icon={<Icon as={LuPlus} transform="rotate(45deg)" />}
              size="xs"
              variant="ghost"
              onClick={() => onRemoveIntegration(integration.id)}
              ml={2}
            />
          </Box>
        ))}
        <Menu>
          <MenuButton
            as={Box}
            px={3}
            py={2}
            borderWidth="1px"
            borderColor="context-modal.border"
            borderRadius="md"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ 
              bg: 'context-modal.hover-bg',
              borderColor: 'context-modal.icon-color'
            }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon as={LuPlus} boxSize={4} color="context-modal.icon-color" />
            <Text fontSize="sm" color="context-modal.text-muted">Add Integration</Text>
          </MenuButton>
          <MenuList>
            {availableToAdd.length > 0 ? (
              availableToAdd.map((integration) => (
                <MenuItem key={integration.id} onClick={() => onAddIntegration(integration.id)}>
                  <Avatar
                    size="xs"
                    src={integration.logoUrl}
                    name={integration.name}
                    mr={2}
                  />
                  {integration.name}
                </MenuItem>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500" px={3} py={2}>
                No more integrations available
              </Text>
            )}
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  )
} 