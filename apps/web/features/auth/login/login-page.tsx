'use client'

import { Container, Stack, Text } from '@chakra-ui/react'
import { LoginView } from '@saas-ui/auth'

import { Link } from '@acme/next'
import { Logo } from '@acme/ui/logo'

import { authProviders, authType } from '#config/auth'
import { useSnackbar } from '@saas-ui/react'

export const LoginPage = () => {
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
          <LoginView title="Log in" type={authType} providers={authProviders} onError={(error) => {
            snackbar.error({
              title: error.message ?? 'Could not log you in',
              description: 'Please try again or contact us if the problem persists.'
            })
          }}>
            {authType === 'password' ? (
              <Link href="/forgot_password">Forgot your password?</Link>
            ) : null}
          </LoginView>
        </Container>

        <Text color="muted">
          Don't have an account yet?{' '}
          <Link href="/signup" color="chakra-body-text">
            Sign up
          </Link>
          .
        </Text>
      </Stack>
    </Stack>
  )
}
