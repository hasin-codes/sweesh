import { SignIn, SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface AuthPageProps {
  params: Promise<{
    rest?: string[]
  }>
}

export default async function AuthPage({ params }: AuthPageProps) {
  const resolvedParams = await params
  const authType = resolvedParams.rest?.[0] || 'sign-in'
  
  // Check if user is already authenticated
  const user = await currentUser()
  if (user) {
    redirect('/dashboard')
  }
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <img src="/icons/logo2.svg" alt="Sweesh" className="h-8 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {authType === 'sign-up' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {authType === 'sign-up' 
              ? 'Join Sweesh and start transcribing' 
              : 'Sign in to your Sweesh account'
            }
          </p>
        </div>
        
        <div className="flex justify-center">
          {authType === 'sign-up' ? (
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                  card: 'shadow-lg',
                  formButton: 'select-none',
                  button: 'select-none',
                }
              }}
            />
          ) : (
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                  card: 'shadow-lg',
                  formButton: 'select-none',
                  button: 'select-none',
                }
              }}
            />
          )}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {authType === 'sign-up' ? "Already have an account? " : "Don't have an account? "}
            <Button variant="link" asChild className="p-0 h-auto text-primary hover:underline select-none">
              <Link href={authType === 'sign-up' ? '/auth/sign-in' : '/auth/sign-up'}>
                {authType === 'sign-up' ? 'Sign in' : 'Sign up'}
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
