'use client'

import { Container, Heading, Stack } from '@chakra-ui/react'
import { useAuth } from '@saas-ui/auth-provider'
import { FormLayout, SubmitButton, useSnackbar } from '@saas-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { Link } from '@acme/next'
import { Form } from '@acme/ui/form'
import { Logo } from '@acme/ui/logo'

const schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export const ResetPasswordPage = () => {
  const router = useRouter()

  const snackbar = useSnackbar()

  const auth = useAuth()

  const search = useSearchParams()

  const mutation = useMutation({
    mutationFn: (values: { password: string }) => {
      return auth.updatePassword({
        password: values.password,
        token: search.get('token') ?? '',
      })
    },
    onSuccess: () => {
      snackbar.success({
        title: 'Password updated',
        description: 'You can now log in with your new password',
      })

      router.push('/login')
    },
    onError: (error) => {
      snackbar.error({
        title: 'Could not update your password',
        description:
          error.message ??
          'Please try again or contact us if the problem persists.',
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
            Choose a new password
          </Heading>

          <Form
            schema={schema}
            onSubmit={async (values) => {
              await mutation.mutateAsync({
                password: values.password,
              })
            }}
          >
            {({ Field }) => (
              <FormLayout>
                <Field name="password" label="Password" />
                <Field name="confirmPassword" label="Confirm Password" />

                <SubmitButton />
              </FormLayout>
            )}
          </Form>
        </Container>

        <Link href="/login" color="chakra-body-text">
          Back to log in
        </Link>
      </Stack>
    </Stack>
  )
}
