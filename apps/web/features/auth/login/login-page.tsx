'use client'

import { Container, Stack, Text } from '@chakra-ui/react'
import { LoginView } from '@saas-ui/auth'
import { useSnackbar } from '@saas-ui/react'
import { useSearchParams } from 'next/navigation'

import { Link } from '@acme/next'
import { Logo } from '@acme/ui/logo'

import { authConfig } from '#config/auth.config'

export const LoginPage = () => {
  const snackbar = useSnackbar()

  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo')

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
          <LoginView
            title="Log in"
            type={authConfig.authType}
            providers={authConfig.authProviders}
            redirectUrl={redirectTo ?? undefined}
            onError={(error) => {
              snackbar.error({
                title: error.message ?? 'Could not log you in',
                description:
                  'Please try again or contact us if the problem persists.',
              })
            }}
          >
            {authConfig.authType === 'password' ? (
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
