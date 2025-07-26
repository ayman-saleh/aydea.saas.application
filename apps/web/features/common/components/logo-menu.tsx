'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Portal,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  VStack,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import {
  LuPlus,
  LuSearch,
  LuSettings,
  LuCircleHelp,
  LuLogOut,
  LuHouse,
  LuUsers,
  LuFileText,
  LuBell,
  LuCreditCard,
  LuDollarSign,
  LuUserPlus,
  LuChevronDown,
  LuInbox,
  LuRocket,
  LuTag,
  LuUser,
  LuShield,
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
  const help = useHelpCenter()
  const modals = useModals()
  const [isOpen, setIsOpen] = React.useState(false)

  const usePath = (path: string) => {
    const segments = path.split('/')
    if (segments[0] === 'settings') {
      return `/settings/${segments.slice(1).join('/')}`
    }
    return `/${path}`
  }

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
    {
      label: 'Log out',
      icon: <LuLogOut />,
      onClick: () => router.push('/logout'),
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
    <Menu onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
      <MenuButton
        as={Box}
        cursor="pointer"
        display="flex"
        alignItems="center"
        h="32px"
        _hover={{
          opacity: 0.8,
        }}
        transition="opacity 0.2s"
      >
        <HStack spacing={1} align="center" h="full">
          <Box w="100px" h="20px" display="flex" alignItems="center">
            <LogoText />
          </Box>
          <Box
            transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
            transition="transform 0.2s ease"
            display="flex"
            alignItems="center"
          >
            <LuChevronDown size={16} />
          </Box>
        </HStack>
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