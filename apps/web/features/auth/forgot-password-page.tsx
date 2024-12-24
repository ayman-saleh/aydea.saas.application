'use client'

import { Container, Stack } from '@chakra-ui/react'
import { ForgotPasswordView } from '@saas-ui/auth'
import { useSnackbar } from '@saas-ui/react'

import { Link } from '@acme/next'
import { Logo } from '@acme/ui/logo'

export const ForgotPasswordPage = () => {
  const snackbar = useSnackbar()

  return (
    <Stack flex="1" direction="row">
      <Stack
        flex="1"
        alignItems="center"
        justify="center"
        direction="column"
        spacing="8"
      >
        <Container maxW="container.sm" py="8">
          <Logo margin="0 auto" mb="12" />
          <ForgotPasswordView
            title="Reset your password"
            onError={(error) => {
              snackbar.error({
                title: error.message ?? 'Could not reset your password',
                description:
                  'Please try again or contact us if the problem persists.',
              })
            }}
          />
        </Container>

        <Link href="/login" color="chakra-body-text">
          Back to log in
        </Link>
      </Stack>
    </Stack>
  )
}
