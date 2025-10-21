import { redirect } from 'next/navigation'

export default function SignOutRedirect() {
  redirect('/auth/sign-out')
}
