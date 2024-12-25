'use client'

import { Center, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '@saas-ui/auth-provider'
import { FormLayout, SubmitButton, useSnackbar } from '@saas-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { Link } from '@acme/next'
import { Form } from '@acme/ui/form'
import { Logo } from '@acme/ui/logo'

import { Testimonial } from './components/testimonial'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const SignupPage = () => {
  const snackbar = useSnackbar()
  const router = useRouter()
  const auth = useAuth()

  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo')

  const mutation = useMutation({
    mutationFn: (params: z.infer<typeof schema>) => auth.signUp(params),
    onSuccess: () => {
      router.push(redirectTo ?? '/')
    },
    onError: (error) => {
      snackbar.error({
        title: error.message ?? 'Could not sign you up',
        description: 'Please try again or contact us if the problem persists.',
      })
    },
  })

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

          <Heading as="h2" size="md" mb="4">
            Sign up
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
                <Field name="email" label="Email" />
                <Field name="password" label="Password" />

                <Link href="/forgot-password">Forgot your password?</Link>

                <SubmitButton>Sign up</SubmitButton>
              </FormLayout>
            )}
          </Form>
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
