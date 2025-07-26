'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Avatar,
  AvatarProps,
  Box,
  HStack,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  MenuGroup,
  IconButton,
  Portal,
  Text,
  Heading,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Has } from '@saas-ui-pro/feature-flags'
import {
  LuPlus,
  LuSettings,
  LuHouse,
  LuInbox,
  LuUsers,
  LuTag,
  LuCircleHelp,
  LuLogOut,
  LuUser,
  LuCheck,
  LuBriefcase,
  LuDollarSign,
} from 'react-icons/lu'

import { useActivePath } from '@acme/next'
import { LogoIcon } from '@acme/ui/logo'
import { useModals } from '@acme/ui/modals'
import { useHelpCenter } from '@acme/ui/help-center'

import { InvitePeopleDialog } from './invite-people'
import { useWorkspace } from '#features/common/hooks/use-workspace'
import { useWorkspaces } from '#features/common/hooks/use-workspaces'
import { usePath } from '#features/common/hooks/use-path'
import { useUserSettings } from '#lib/user-settings/use-user-settings'

const WorkspaceLogo: React.FC<AvatarProps> = (props) => {
  const { src, ...rest } = props
  return (
    <Avatar
      display="inline-flex"
      src={src}
      size="xs"
      borderRadius="full"
      {...rest}
    />
  )
}

export const IconMenu: React.FC = () => {
  const router = useRouter()
  const modals = useModals()
  const help = useHelpCenter()
  const workspace = useWorkspace()
  const workspaces = useWorkspaces()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const activeWorkspace = (function () {
    for (const i in workspaces) {
      if (workspaces[i]?.slug === workspace) {
        return workspaces[i]
      }
    }
    return workspaces[0]
  })()

  const setWorkspace = (workspace: string) => {
    router.push(`/${workspace}`)
  }

  const handleNavigation = (path: string) => {
    const fullPath = path.startsWith('/') ? path : `/${workspace}/${path}`
    router.push(fullPath)
  }

  return (
    <Menu>
      <MenuButton
        as={Box}
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        _hover={{
          opacity: 0.8,
          bg: 'sidebar-on-muted',
        }}
        _active={{
          bg: 'sidebar-on-subtle',
        }}
        transition="all 0.2s"
        p={1}
      >
        <Box
          bg={useColorModeValue("white", "gray.800")}
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderRadius="md"
          p={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="sm"
        >
          <LogoIcon h="24px" />
        </Box>
      </MenuButton>
      <Portal>
        <MenuList
          minW="280px"
          maxH="80vh"
          overflowY="auto"
          zIndex={['modal', null, 'dropdown']}
        >
          {/* Workspaces Section */}
          <MenuGroup title="Workspaces">
            {workspaces.map(({ slug, label, logo, ...props }) => {
              return (
                <MenuItem
                  key={slug}
                  value={slug}
                  icon={<WorkspaceLogo name={label} src={logo} />}
                  onClick={() => setWorkspace(slug)}
                  transition="all 0.2s"
                  _hover={{
                    bg: 'sidebar-on-muted',
                  }}
                  _active={{
                    bg: 'sidebar-on-subtle',
                  }}
                  {...props}
                >
                  <HStack>
                    <Text>{label}</Text>
                    <Spacer />
                    {slug === activeWorkspace?.slug ? <LuCheck /> : null}
                  </HStack>
                </MenuItem>
              )
            })}
            <MenuItem
              as={Link}
              href="/getting-started"
              icon={<LuPlus />}
              transition="all 0.2s"
              _hover={{
                bg: 'sidebar-on-muted',
              }}
              _active={{
                bg: 'sidebar-on-subtle',
              }}
            >
              Create a workspace
            </MenuItem>
          </MenuGroup>

          <MenuDivider />

          {/* Mobile Navigation - only show on mobile */}
          {isMobile && (
            <>
              <MenuGroup title="Navigation">
                <MenuItem
                  icon={<LuHouse />}
                  onClick={() => handleNavigation('/')}
                  transition="all 0.2s"
                  _hover={{ bg: 'sidebar-on-muted' }}
                  _active={{ bg: 'sidebar-on-subtle' }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  icon={<LuInbox />}
                  onClick={() => handleNavigation('inbox')}
                  transition="all 0.2s"
                  _hover={{ bg: 'sidebar-on-muted' }}
                  _active={{ bg: 'sidebar-on-subtle' }}
                >
                  Inbox
                </MenuItem>
                <MenuItem
                  icon={<LuUsers />}
                  onClick={() => handleNavigation('contacts')}
                  transition="all 0.2s"
                  _hover={{ bg: 'sidebar-on-muted' }}
                  _active={{ bg: 'sidebar-on-subtle' }}
                >
                  Contacts
                </MenuItem>
              </MenuGroup>
              
              <MenuDivider />
              
              <MenuGroup title="Account">
                <MenuItem
                  icon={<LuUser />}
                  onClick={() => handleNavigation('settings/account')}
                  transition="all 0.2s"
                  _hover={{ bg: 'sidebar-on-muted' }}
                  _active={{ bg: 'sidebar-on-subtle' }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  icon={<LuSettings />}
                  onClick={() => handleNavigation('settings')}
                  transition="all 0.2s"
                  _hover={{ bg: 'sidebar-on-muted' }}
                  _active={{ bg: 'sidebar-on-subtle' }}
                >
                  Settings
                </MenuItem>
              </MenuGroup>
              
              <MenuDivider />
            </>
          )}

          {/* Quick Actions */}
          <MenuGroup title="Quick Actions">
            <MenuItem
              onClick={() => modals.open(InvitePeopleDialog)}
              icon={<LuPlus />}
              transition="all 0.2s"
              _hover={{
                bg: 'sidebar-on-muted',
              }}
              _active={{
                bg: 'sidebar-on-subtle',
              }}
            >
              Invite people
            </MenuItem>
            <Has feature="settings">
              <MenuItem
                as={Link}
                href={usePath('settings/workspace')}
                icon={<LuBriefcase />}
                transition="all 0.2s"
                _hover={{
                  bg: 'sidebar-on-muted',
                }}
                _active={{
                  bg: 'sidebar-on-subtle',
                }}
              >
                Workspace settings
              </MenuItem>
            </Has>
            <MenuItem
              as={Link}
              href={usePath('settings')}
              icon={<LuSettings />}
              transition="all 0.2s"
              _hover={{
                bg: 'sidebar-on-muted',
              }}
              _active={{
                bg: 'sidebar-on-subtle',
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              as={Link}
              href={usePath('settings/billing')}
              icon={<LuDollarSign />}
              transition="all 0.2s"
              _hover={{
                bg: 'sidebar-on-muted',
              }}
              _active={{
                bg: 'sidebar-on-subtle',
              }}
            >
              Billing
            </MenuItem>
          </MenuGroup>

          {/* Logout - only show on mobile */}
          {isMobile && (
            <>
              <MenuDivider />
              <MenuItem
                icon={<LuLogOut />}
                onClick={() => router.push('/logout')}
                transition="all 0.2s"
                _hover={{
                  bg: 'sidebar-on-muted',
                }}
                _active={{
                  bg: 'sidebar-on-subtle',
                }}
                color="red.500"
              >
                Log out
              </MenuItem>
            </>
          )}
        </MenuList>
      </Portal>
    </Menu>
  )
} 