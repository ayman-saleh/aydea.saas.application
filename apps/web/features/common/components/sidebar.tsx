'use client'

import * as React from 'react'

import {
  Badge,
  Box,
  Flex,
  Spacer,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  Command,
  useHotkeysShortcut,
} from '@saas-ui/react'
import {
  NavItem,
  NavItemProps,
} from '@saas-ui/react'
import { Route } from 'next'
import { useRouter } from 'next/navigation'

import { useActivePath } from '@acme/next'
import { useHelpCenter } from '@acme/ui/help-center'
import { useModals } from '@acme/ui/modals'

import { useUserSettings } from '#lib/user-settings/use-user-settings'

import { BillingStatus } from './billing-status'
import { UserMenu } from './user-menu'
import { LogoMenu } from './logo-menu'
import { IconMenu } from './icon-menu'
import { PromptInput } from './prompt-input'

export interface AppSidebarProps {
  variant?: 'default' | 'compact'
  colorScheme?: string
}

export const AppSidebar: React.FC<AppSidebarProps> = (props) => {
  const modals = useModals()
  const help = useHelpCenter()

  const [{ sidebarVariant }, setUserSettings] = useUserSettings()

  const { variant = sidebarVariant || 'default', colorScheme } = props
  const isCompact = variant === 'compact'

  const isMobile = useBreakpointValue({ base: true, md: false })

  // State for PromptInput
  const [promptValue, setPromptValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handlePromptSubmit = () => {
    if (promptValue.trim()) {
      setIsLoading(true)
      // TODO: Handle the prompt submission logic here
      console.log('Submitting prompt:', promptValue)
      
      // Simulate async operation
      setTimeout(() => {
        setIsLoading(false)
        setPromptValue('')
      }, 2000)
    }
  }

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={100}
      bg={"sidebar.bg"}
      borderTopWidth="1px"
      borderTopColor="sidebar.border"
      h={isCompact ? "80px" : "100px"}
    >
      <HStack
        h="full"
        spacing={4}
        px={4}
        py={isCompact ? 2 : 3}
        align="center"
        overflowX="auto"
      >
        {/* Logo Section */}
        <Flex align="center" justify="center" minW="fit-content" gap={1}>
          <IconMenu />
          {!isMobile && <LogoMenu />}
        </Flex>

        <Spacer />

        {/* Prompt Input - centered */}
        {!isCompact && (
          <PromptInput
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            onSubmit={handlePromptSubmit}
            isLoading={isLoading}
          />
        )}

        <Spacer />

        {/* Right Section with User Menu - hide on mobile */}
        {!isMobile && (
          <HStack spacing={2} minW="fit-content">
            {isCompact ? (
              <UserMenu />
            ) : (
              <>
                <BillingStatus />
                <UserMenu />
              </>
            )}
          </HStack>
        )}
      </HStack>
    </Box>
  )
}

interface AppSidebarlink<Href extends Route = Route> extends NavItemProps {
  hotkey: string
  href: Route<Href>
  label: string
  badge?: React.ReactNode
  isCompact?: boolean
}

const AppSidebarLink = <Href extends Route = Route>(
  props: AppSidebarlink<Href>,
) => {
  const { href, label, hotkey, badge, isCompact, ...rest } = props
  const { push } = useRouter()
  const isActive = useActivePath(href)

  const command = useHotkeysShortcut(hotkey, () => {
    push(href)
  }, [href])

  return (
    <NavItem
      href={href}
      isActive={isActive}
      {...rest}
      size="sm"
      variant="ghost"
      aria-label={label}
      tooltipProps={{
        label: (
          <>
            {label} <Command>{command}</Command>
          </>
        ),
        placement: 'top' as const,
      }}
    >
      {!isCompact && (
        <Box as="span" noOfLines={1}>
          {label}
        </Box>
      )}

      {typeof badge !== 'undefined' && !isCompact ? (
        <Badge borderRadius="sm" ms="auto" px="1.5" bg="none">
          {badge}
        </Badge>
      ) : null}
    </NavItem>
  )
}
