import { Button, Stack } from '@chakra-ui/react'
import { useLocalStorageValue } from '@react-hookz/web'
import { useAuth } from '@saas-ui/auth-provider'
import { FaGoogle } from 'react-icons/fa6'

import { LastUsedProvider } from './last-used'

export function Providers() {
  const auth = useAuth()

  const lastUsed = useLocalStorageValue('lastUsedProvider')

  return (
    <Stack gap="2" mb="4">
      <LastUsedProvider value="google">
        <Button
          leftIcon={<FaGoogle />}
          height="9"
          variant="outline"
          onClick={() =>
            auth
              .logIn({
                provider: 'google',
              })
              .then(() => lastUsed.set('google'))
          }
        >
          Continue with Google
        </Button>
      </LastUsedProvider>
    </Stack>
  )
}
