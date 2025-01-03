'use client'

import { useCallback } from 'react'

import {
  Container,
  Divider,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useLocalStorageValue } from '@react-hookz/web'
import { useAuth } from '@saas-ui/auth-provider'
import { FormLayout, SubmitButton, useSnackbar } from '@saas-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

import { Link } from '@acme/next'
import { Form } from '@acme/ui/form'
import { Logo } from '@acme/ui/logo'

import { LoginFormInput, schema } from '#features/settings/account/schema/login'

import { LastUsedProvider } from './last-used'
import { Providers } from './providers'

export const LoginPage = () => {
  const snackbar = useSnackbar()
  const router = useRouter()
  const auth = useAuth()

  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo')

  const lastUsed = useLocalStorageValue('lastUsedProvider', {
    initializeWithValue: false,
  })

  const mutation = useMutation({
    mutationFn: (params: LoginFormInput) => auth.logIn(params),
    onSuccess: () => {
      lastUsed.set('credentials')

      router.push(redirectTo ?? '/')
    },
    onError: (error) => {
      snackbar.error({
        title: error.message ?? 'Could not log you in',
        description: 'Please try again or contact us if the problem persists.',
      })
    },
  })

  const emailRef = useCallback(
    (el: HTMLInputElement | null) => {
      if (lastUsed.value === 'credentials') {
        el?.focus()
      }
    },
    [lastUsed.value],
  )

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
          <Logo mb="12" width="120px" />

          <Heading as="h2" size="md" mb="4">
            Log in
          </Heading>

          <Providers />

          <HStack my="4">
            <Divider />
            <Text flexShrink={0} color="muted">
              Or continue with
            </Text>
            <Divider />
          </HStack>

          <Form
            mode="onSubmit"
            schema={schema}
            onSubmit={async (values) => {
              await mutation.mutateAsync({
                email: values.email,
                password: values.password,
              })
            }}
          >
            {({ Field }) => (
              <FormLayout>
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  ref={emailRef}
                  rightAddon={
                    <LastUsedProvider value="credentials">
                      <div />
                    </LastUsedProvider>
                  }
                />

                <Field name="password" type="password" label="Password" />

                <Link href="/forgot-password">Forgot your password?</Link>

                <SubmitButton>Log in</SubmitButton>
              </FormLayout>
            )}
          </Form>
        </Container>

        <Text color="muted">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" color="chakra-body-text">
            Sign up
          </Link>
          .
        </Text>
      </Stack>
    </Stack>
  )
}
