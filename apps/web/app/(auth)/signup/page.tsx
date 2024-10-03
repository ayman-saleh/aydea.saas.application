import { SignupPage } from '#features/auth/signup/signup-page'
import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'Signup',
  component: () => {
    return <SignupPage />
  },
})

export { metadata }
export default Page
