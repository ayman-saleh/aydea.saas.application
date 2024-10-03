import { FormEvent, useRef } from 'react'

import * as z from 'zod'
import {
  Icon,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useDebouncedCallback, useSessionStorageValue } from '@react-hookz/web'
import {
  Field,
  FormLayout,
  UseFormReturn,
  useSnackbar,
  useStepperContext,
} from '@saas-ui/react'
import { LuCheck } from 'react-icons/lu'
import slug from 'slug'

import { api } from '#lib/trpc/react'

import { OnboardingStep } from './onboarding-step'

const schema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your workspace name.')
    .min(2, 'Please choose a name with at least 3 characters.')
    .max(50, 'The name should be no longer than 50 characters.')
    .describe('Name'),
  slug: z
    .string()
    .min(1, 'Please enter your workspace URL.')
    .min(2, 'Please choose an URL with at least 3 characters.')
    .max(50, 'The URL should be no longer than 50 characters.')
    .regex(
      /^[a-z0-9-]+$/,
      'The URL should only contain lowercase letters, numbers, and dashes.',
    ),
})

type FormInput = z.infer<typeof schema>

export const CreateWorkspaceStep = () => {
  const stepper = useStepperContext()
  const snackbar = useSnackbar()

  const workspace = useSessionStorageValue('getting-started.workspace')

  const formRef = useRef<UseFormReturn<FormInput>>(null)

  const { mutateAsync } = api.workspaces.create.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate()
    },
  })

  const utils = api.useUtils()

  const slugAvailable = api.workspaces.slugAvailable.useMutation({
    onSettled: (data) => {
      if (!data?.available) {
        formRef.current?.setError('slug', {
          type: 'manual',
          message: 'This workspace URL is already taken.',
        })
      } else {
        formRef.current?.clearErrors('slug')
      }
    },
  })

  const checkSlug = useDebouncedCallback(slugAvailable.mutate, [], 500)

  const setSlug = (value: string) => {
    const slugValue = slug(value)
    formRef.current?.setValue('slug', slugValue)
    checkSlug({ slug: slugValue })
  }

  return (
    <OnboardingStep
      schema={schema}
      formRef={formRef}
      title="Create a new workspace"
      description="Saas UI is multi-tenant and supports workspaces with multiple teams."
      defaultValues={{ name: '', slug: '' }}
      onSubmit={async (data) => {
        try {
          const result = await mutateAsync({ name: data.name, slug: data.slug })
          if (result?.slug) {
            workspace.set(result.slug)
            stepper.nextStep()
          }
        } catch (error: any) {
          snackbar.error({
            title: 'Failed to create workspace',
            description: error.message,
          })
        }
      }}
      submitLabel="Create workspace"
    >
      <FormLayout>
        <Field
          name="name"
          label="Workspace name"
          autoFocus
          rules={{ required: true }}
          data-1p-ignore
          onChange={(e: FormEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            formRef.current?.setValue('name', value)
            setSlug(value)
          }}
        />
        <Field
          name="slug"
          type="text"
          label="Workspace URL"
          paddingLeft="140px"
          leftAddon={
            <InputLeftElement
              bg="transparent"
              width="auto"
              ps="3"
              pointerEvents="none"
            >
              <Text color="muted">https://saas-ui.dev/</Text>
            </InputLeftElement>
          }
          rightAddon={
            <InputRightElement>
              {slugAvailable.isPending ? (
                <Spinner size="xs" />
              ) : slugAvailable.data?.available ? (
                <Icon as={LuCheck} color="green.500" strokeWidth="3" />
              ) : null}
            </InputRightElement>
          }
          onChange={(e) => {
            const value = e.currentTarget.value
            setSlug(value)
          }}
        />
      </FormLayout>
    </OnboardingStep>
  )
}
