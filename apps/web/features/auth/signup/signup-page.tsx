'use client'

import { Center, Container, Stack, Text } from '@chakra-ui/react'
import { SignupView } from '@saas-ui/auth'

import { Link } from '@acme/next'
import { Logo } from '@acme/ui/logo'

import { authProviders, authType } from '#config/auth'

import { Testimonial } from './testimonial'

export const SignupPage = () => {
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
            type={authType}
            providers={authProviders}
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
