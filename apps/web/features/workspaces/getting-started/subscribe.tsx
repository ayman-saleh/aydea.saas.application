import * as z from 'zod'
import { Box, Flex, Heading, Stack, Switch, Text } from '@chakra-ui/react'
import { useSnackbar, useStepperContext } from '@saas-ui/react'

import { LinkButton } from '@acme/ui/button'

import { api } from '#lib/trpc/react'

import { OnboardingStep } from './onboarding-step'

const schema = z.object({
  newsletter: z.boolean(),
})

type FormInput = z.infer<typeof schema>

export const SubscribeStep = () => {
  const stepper = useStepperContext()
  const snackbar = useSnackbar()

  const { mutateAsync } = api.users.subscribeToNewsletter.useMutation()

  return (
    <OnboardingStep<FormInput>
      schema={schema}
      title="Subscribe to updates"
      description="Saas UI is updated regularly. These are the best ways to stay up to date."
      defaultValues={{ newsletter: false }}
      onSubmit={async (data) => {
        if (data.newsletter) {
          try {
            await mutateAsync({
              newsletter: data.newsletter,
            })
          } catch {
            snackbar.error('Could not subscribe you to our newsletter.')
          }
        }

        stepper.nextStep()
      }}
      submitLabel="Continue"
    >
      <Box m="-6">
        <Flex borderBottomWidth="1px" p="6" display="flex" alignItems="center">
          <Stack flex="1" alignItems="flex-start" spacing="0.5">
            <Heading size="sm">Subscribe to our monthly newsletter</Heading>
            <Text color="muted">
              Receive monthly updates in your email inbox.
            </Text>
          </Stack>
          <Switch />
        </Flex>
        <Flex borderBottomWidth="1px" p="6" display="flex" alignItems="center">
          <Stack flex="1" alignItems="flex-start" spacing="0.5">
            <Heading size="sm">Follow us on X</Heading>
            <Text color="muted">Regular posts with updates and tips.</Text>
          </Stack>
          <LinkButton href="https://x.com/saas_js" target="_blank">
            @saas_js
          </LinkButton>
        </Flex>
        <Flex p="6" display="flex" alignItems="center">
          <Stack flex="1" alignItems="flex-start" spacing="0.5">
            <Heading size="sm">Join our Discord community</Heading>
            <Text color="muted">Chat with other developers and founders.</Text>
          </Stack>
          <LinkButton href="https://saas-ui.dev/discord">
            Join Discord
          </LinkButton>
        </Flex>
      </Box>
    </OnboardingStep>
  )
}
