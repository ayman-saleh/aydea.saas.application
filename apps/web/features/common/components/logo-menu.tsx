'use client'

import * as React from 'react'
import {
  Box,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  MenuDivider,
  Heading,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import {
  LuCircleHelp,
  LuHouse,
  LuRocket,
  LuPlus,
  LuInbox,
  LuUsers,
  LuTag,
  LuSettings,
  LuUser,
  LuShield,
  LuBell,
  LuKey,
  LuDollarSign,
  LuUserPlus,
} from 'react-icons/lu'

import { LogoText } from '@acme/ui/logo'
import { useModals } from '@acme/ui/modals'
import { useHelpCenter } from '@acme/ui/help-center'

import { usePath } from '#features/common/hooks/use-path'
import { InvitePeopleDialog } from './invite-people'

interface LogoMenuItem {
  label: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
  section?: 'main' | 'settings' | 'actions'
}

export const LogoMenu: React.FC = () => {
  const router = useRouter()
  const modals = useModals()
  const help = useHelpCenter()

  const menuItems: LogoMenuItem[] = [
    // Main navigation
    {
      label: 'Home',
      icon: <LuHouse />,
      href: usePath('/'),
      section: 'main',
    },
    {
      label: 'Deployments',
      icon: <LuRocket />,
      href: usePath('deployments'),
      section: 'main',
    },
    {
      label: 'Inbox',
      icon: <LuInbox />,
      href: usePath('inbox'),
      section: 'main',
    },
    {
      label: 'Contacts',
      icon: <LuUsers />,
      href: usePath('contacts'),
      section: 'main',
    },
    // Settings
    {
      label: 'Settings',
      icon: <LuSettings />,
      href: usePath('settings'),
      section: 'settings',
    },
    {
      label: 'Profile',
      icon: <LuUser />,
      href: usePath('settings/account'),
      section: 'settings',
    },
    {
      label: 'Security',
      icon: <LuShield />,
      href: usePath('settings/account/security'),
      section: 'settings',
    },
    {
      label: 'Members',
      icon: <LuUserPlus />,
      href: usePath('settings/members'),
      section: 'settings',
    },
    {
      label: 'Tags',
      icon: <LuTag />,
      href: usePath('settings/tags'),
      section: 'settings',
    },
    {
      label: 'Billing',
      icon: <LuDollarSign />,
      href: usePath('settings/billing'),
      section: 'settings',
    },
    // Actions
    {
      label: 'Invite people',
      icon: <LuPlus />,
      onClick: () => modals.open(InvitePeopleDialog),
      section: 'actions',
    },
    {
      label: 'Help & support',
      icon: <LuCircleHelp />,
      onClick: () => help.open(),
      section: 'actions',
    },
  ]

  const handleItemClick = (item: LogoMenuItem) => {
    if (item.href) {
      router.push(item.href)
    } else if (item.onClick) {
      item.onClick()
    }
  }

  const mainItems = menuItems.filter(item => item.section === 'main')
  const settingsItems = menuItems.filter(item => item.section === 'settings')
  const actionItems = menuItems.filter(item => item.section === 'actions')

  return (
    <Menu>
      <MenuButton
        as={Box}
        cursor="pointer"
        display="flex"
        h="20px"
        w="100px"
        _hover={{
          opacity: 0.8,
        }}
        transition="opacity 0.2s"
      >
        <LogoText />
      </MenuButton>
      <Portal>
        <MenuList
          p={4}
          minW="360px"
          maxH="80vh"
          overflowY="auto"
          zIndex={['modal', null, 'dropdown']}
        >
          {/* Main Navigation */}
          <Box mb={4}>
            <Heading size="xs" mb={3} color="sidebar-muted">
              Navigation
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              {mainItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  h="80px"
                  borderRadius="md"
                  transition="all 0.2s"
                  _hover={{
                    bg: 'sidebar-on-muted',
                    transform: 'scale(1.05)',
                  }}
                  _active={{
                    bg: 'sidebar-on-subtle',
                    transform: 'scale(0.98)',
                  }}
                >
                  <Box fontSize="24px" mb={2} color="sidebar-text">
                    {item.icon}
                  </Box>
                  <Text fontSize="sm" fontWeight="medium">
                    {item.label}
                  </Text>
                </MenuItem>
              ))}
            </Grid>
          </Box>

          <MenuDivider />

          {/* Settings */}
          <Box mb={4} mt={4}>
            <Heading size="xs" mb={3} color="sidebar-muted">
              Settings
            </Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              {settingsItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  h="70px"
                  borderRadius="md"
                  transition="all 0.2s"
                  _hover={{
                    bg: 'sidebar-on-muted',
                    transform: 'scale(1.05)',
                  }}
                  _active={{
                    bg: 'sidebar-on-subtle',
                    transform: 'scale(0.98)',
                  }}
                >
                  <Box fontSize="20px" mb={1} color="sidebar-text">
                    {item.icon}
                  </Box>
                  <Text fontSize="xs" fontWeight="medium">
                    {item.label}
                  </Text>
                </MenuItem>
              ))}
            </Grid>
          </Box>

          <MenuDivider />

          {/* Actions */}
          <Box mt={4}>
            <Heading size="xs" mb={3} color="sidebar-muted">
              Actions
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              {actionItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  h="70px"
                  borderRadius="md"
                  transition="all 0.2s"
                  _hover={{
                    bg: 'sidebar-on-muted',
                    transform: 'scale(1.05)',
                  }}
                  _active={{
                    bg: 'sidebar-on-subtle',
                    transform: 'scale(0.98)',
                  }}
                >
                  <Box fontSize="20px" mb={1} color="sidebar-text">
                    {item.icon}
                  </Box>
                  <Text fontSize="xs" fontWeight="medium">
                    {item.label}
                  </Text>
                </MenuItem>
              ))}
            </Grid>
          </Box>
        </MenuList>
      </Portal>
    </Menu>
  )
} 