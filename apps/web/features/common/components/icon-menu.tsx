'use client'

import * as React from 'react'
import {
  Avatar,
  AvatarProps,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import { Has } from '@saas-ui-pro/feature-flags'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LuCheck,
  LuPlus,
  LuSettings,
  LuDollarSign,
  LuBriefcase,
} from 'react-icons/lu'

import { LogoIcon } from '@acme/ui/logo'
import { useModals } from '@acme/ui/modals'

import { usePath } from '#features/common/hooks/use-path'
import { useWorkspace } from '#features/common/hooks/use-workspace'
import { useWorkspaces } from '#features/common/hooks/use-workspaces'
import { InvitePeopleDialog } from './invite-people'

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
  const workspace = useWorkspace()
  const workspaces = useWorkspaces()

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
        </MenuList>
      </Portal>
    </Menu>
  )
} 