import { getUserSettings } from './get-user-settings'

export function UserSettings() {
  const userSettings = getUserSettings()

  // set user settings globally so our `useUserSettings` hook
  // can access it during SSR.
  if (typeof global !== 'undefined') {
    ;(global as any).__USER_SETTINGS__ = userSettings
  }

  return null
}
