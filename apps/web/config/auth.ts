import { type AuthTypeEnum, AvailableProviders } from '@saas-ui/auth'
import { FaGithub, FaGoogle } from 'react-icons/fa'

/**
 * The authentication type, magiclink or password
 */
export const authType: AuthTypeEnum = 'magiclink'

/**
 * Available OAuth providers for single sign on.
 */
export const authProviders = undefined
// export const authProviders: AvailableProviders = {
//   google: {
//     icon: FaGoogle,
//     name: 'Google',
//   },
//   github: {
//     icon: FaGithub,
//     name: 'Github',
//   },
// }
