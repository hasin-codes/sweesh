import { SignOutButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignOutPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <img src="/icons/logo2.svg" alt="Sweesh" className="h-8 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Sign out</h1>
          <p className="text-muted-foreground mt-2">Are you sure you want to sign out?</p>
        </div>
        
        <div className="space-y-4">
          <SignOutButton>
            <Button className="w-full select-none">Sign Out</Button>
          </SignOutButton>
          
          <Button variant="outline" asChild className="w-full select-none">
            <Link href="/dashboard">Cancel</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
