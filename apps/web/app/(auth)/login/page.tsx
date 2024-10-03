import { LoginPage } from '#features/auth/login/login-page'
import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'Login',
  component: () => {
    return <LoginPage />
  },
})

export { metadata }

export default Page
