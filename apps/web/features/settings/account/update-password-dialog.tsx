import * as React from 'react'

import { useUpdatePassword } from '@saas-ui/auth-provider'
import { FormDialog } from '@saas-ui/modals/zod'
import { FormDialogProps, FormLayout } from '@saas-ui/react'

import { UpdatePasswordFormInput, schema } from './schema/update-password'

export interface UpdatePasswordFormProps
  extends Omit<
    FormDialogProps<UpdatePasswordFormInput>,
    'onSubmit' | 'title' | 'scrollBehavior' | 'children'
  > {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: any) => void
}

export const UpdatePasswordDialog: React.FC<UpdatePasswordFormProps> = ({
  onSuccess = () => null,
  onError = () => null,
  onValidationError = () => null,
  ...formProps
}) => {
  const [, submit] = useUpdatePassword()

  const handleSubmit = async (values: UpdatePasswordFormInput) => {
    try {
      const data = await submit({
        password: values.password,
        newPassword: values.newPassword,
      })
      onSuccess(data)
    } catch (error) {
      onError(error)
    }
  }

  return (
    <FormDialog
      title={'Update your password'}
      fields={{
        cancel: {
          children: 'Cancel',
        },
      }}
      schema={schema}
      onError={onValidationError}
      onSubmit={handleSubmit}
      defaultValues={{
        password: '',
        newPassword: '',
        confirmPassword: '',
      }}
      {...formProps}
    >
      {({ Field }) => (
        <FormLayout>
          <Field
            name="password"
            label="Current Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your current password"
          />

          <Field
            name="newPassword"
            label="New Password"
            type="password"
            placeholder="Enter a new password"
          />

          <Field
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
          />
        </FormLayout>
      )}
    </FormDialog>
  )
}
