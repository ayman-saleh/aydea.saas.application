'use client'

import { Center, Container, Stack, Text } from '@chakra-ui/react'
import { SignupView } from '@saas-ui/auth'
import { useSnackbar } from '@saas-ui/react'
import { useSearchParams } from 'next/navigation'

import { Link } from '@acme/next'
import { Logo } from '@acme/ui/logo'

import { authConfig } from '#config/auth.config'

import { Testimonial } from './components/testimonial'

export const SignupPage = () => {
  const snackbar = useSnackbar()

  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo')

  return (
    <Stack flex="1" direction="row" height="$100vh">
      <Stack
        flex="1"
        alignItems="center"
        justify="center"
        direction="column"
        spacing="8"
      >
        <Container maxW="container.sm" py="8">
          <Logo margin="0 auto" mb="12" />
          <SignupView
            title="Sign up"
            type={authConfig.authType}
            providers={authConfig.authProviders}
            redirectUrl={redirectTo ?? undefined}
            onError={(error) => {
              snackbar.error({
                title: error.message ?? 'Could not sign you up',
                description:
                  'Please try again or contact us if the problem persists.',
              })
            }}
            fields={{
              submit: {
                children: 'Sign up',
              },
            }}
          />
        </Container>

        <Text color="muted">
          Already have an account?{' '}
          <Link href="/login" color="chakra-body-text">
            Log in
          </Link>
          .
        </Text>
      </Stack>
      <Stack flex="1" bg="primary.500">
        <Center flex="1">
          <Testimonial />
        </Center>
      </Stack>
    </Stack>
  )
}
