import { type AuthTypeEnum, AvailableProviders } from '@saas-ui/auth'

// import { FaGoogle } from 'react-icons/fa'

interface AuthConfig {
  authType: AuthTypeEnum
  authProviders?: AvailableProviders
}

export const authConfig: AuthConfig = {
  /**
   * The authentication type, magiclink or password
   */
  authType: 'password',

  // /**
  //  * Available OAuth providers for single sign on.
  //  */
  // authProviders: {
  //   google: {
  //     icon: FaGoogle,
  //     name: 'Google',
  //   },
  // },
}
