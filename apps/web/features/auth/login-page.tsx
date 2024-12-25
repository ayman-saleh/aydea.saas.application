'use client'

import { Container, Heading, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '@saas-ui/auth-provider'
import { FormLayout, SubmitButton, useSnackbar } from '@saas-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { Link } from '@acme/next'
import { Form } from '@acme/ui/form'
import { Logo } from '@acme/ui/logo'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const LoginPage = () => {
  const snackbar = useSnackbar()
  const router = useRouter()
  const auth = useAuth()

  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo')

  const mutation = useMutation({
    mutationFn: (params: z.infer<typeof schema>) => auth.logIn(params),
    onSuccess: () => {
      router.push(redirectTo ?? '/')
    },
    onError: (error) => {
      snackbar.error({
        title: error.message ?? 'Could not log you in',
        description: 'Please try again or contact us if the problem persists.',
      })
    },
  })

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

          <Heading as="h2" size="md" mb="4">
            Log in
          </Heading>

          <Form
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
                <Field name="email" label="Email" type="email" />
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
