import type React from 'react'

import { DashboardLayout } from '#features/common/layouts/dashboard-layout'

export default function DashboardRootLayout(props: {
  params: {
    workspace: string
  }
  children: React.ReactNode
}) {
  return <DashboardLayout>{props.children}</DashboardLayout>
}
