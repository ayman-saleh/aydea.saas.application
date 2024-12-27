'use client'

import { Button, Card } from '@chakra-ui/react'
import { Section, SectionBody, SectionHeader } from '@saas-ui-pro/react'
import {
  StructuredList,
  StructuredListCell,
  StructuredListItem,
  useSnackbar,
} from '@saas-ui/react'

import { useModals } from '@acme/ui/modals'
import { SettingsPage } from '@acme/ui/settings-page'

import { UpdatePasswordDialog } from './update-password-dialog'

function TwoFactorAuthItem() {
  return (
    <StructuredListItem>
      <StructuredListCell flex="1">
        Two-factor authentication
      </StructuredListCell>
      <StructuredListCell px="4">
        <Button variant="secondary" size="sm">
          Enable
        </Button>
      </StructuredListCell>
    </StructuredListItem>
  )
}

function PasswordListItem() {
  const modals = useModals()
  const snackbar = useSnackbar()

  return (
    <StructuredListItem>
      <StructuredListCell flex="1">Password</StructuredListCell>
      <StructuredListCell px="4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            const id = modals.open({
              title: 'Update your password',
              component: UpdatePasswordDialog,
              onSuccess() {
                snackbar.success({
                  title: 'Your password has been updated',
                })
                modals.close(id)
              },
              onError() {
                snackbar.error({
                  title: 'Failed to update password',
                })
              },
            })
          }}
        >
          Change password
        </Button>
      </StructuredListCell>
    </StructuredListItem>
  )
}

function AccountSignIn() {
  return (
    <Section variant="annotated">
      <SectionHeader
        title="Signing in"
        description="Update your password and improve account security."
      />
      <SectionBody>
        <Card>
          <StructuredList variant="settings">
            <PasswordListItem />
            <TwoFactorAuthItem />
          </StructuredList>
        </Card>
      </SectionBody>
    </Section>
  )
}

export function AccountSecurityPage() {
  return (
    <SettingsPage
      title="Security"
      description="Manage your account security"
      isLoading={false}
    >
      <AccountSignIn />
    </SettingsPage>
  )
}
