import 'server-only'

import { cache } from 'react'

import { cookies } from 'next/headers'

export const USER_SETTINGS_COOKIE = 'user-settings'

export const getUserSettings = cache(function getUserSettings() {
  const cookieStore = cookies()

  const userSettingsCookie = cookieStore.get(USER_SETTINGS_COOKIE)

  if (!userSettingsCookie) {
    return null
  }

  return JSON.parse(userSettingsCookie.value)
})
