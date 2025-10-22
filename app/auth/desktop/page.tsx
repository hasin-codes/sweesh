'use client'

import { useAuth } from '@clerk/nextjs'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

type AuthStatus = 'loading' | 'success' | 'error' | 'not-logged-in' | 'redirecting'

function DesktopAuthContent() {
  const { isSignedIn, getToken } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [countdown, setCountdown] = useState(3)
  
  useEffect(() => {
    if (isSignedIn !== undefined) {
      handleAuth()
    }
  }, [isSignedIn])
  
  useEffect(() => {
    if (status === 'redirecting' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [status, countdown])
  
  async function handleAuth() {
    try {
      // Extract and validate parameters
      const challenge = searchParams.get('challenge')
      const uuid = searchParams.get('uuid')
      const mode = searchParams.get('mode')
      
      // Validate required parameters
      if (!challenge || !uuid) {
        setStatus('error')
        setErrorMessage('Invalid authentication request. Missing required parameters.')
        return
      }
      
      // Check if user is logged in
      if (!isSignedIn) {
        setStatus('not-logged-in')
        // Redirect to login with return URL
        const currentUrl = window.location.href
        router.push(`/auth/sign-in?redirect_url=${encodeURIComponent(currentUrl)}`)
        return
      }
      
      // User is logged in, generate JWT token
      setStatus('loading')
      
      const token = await getToken({ template: 'desktop-app-auth' })
      
      if (!token) {
        setStatus('error')
        setErrorMessage('Failed to generate authentication token. Please try again.')
        return
      }
      
      // Construct deep link URL
      const deepLinkUrl = `sweesh://auth/callback?token=${encodeURIComponent(token)}&challenge=${challenge}&uuid=${uuid}`
      
      // Show success state briefly
      setStatus('success')
      
      // Redirect to deep link after brief delay
      setTimeout(() => {
        setStatus('redirecting')
        
        // Attempt to redirect to deep link
        window.location.href = deepLinkUrl
        
        // Fallback: if still on page after 3 seconds, show error
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            setStatus('error')
            setErrorMessage("Couldn't open the desktop app. Please make sure it's installed.")
          }
        }, 3000)
      }, 1500)
      
    } catch (error) {
      // Only log errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Desktop auth error:', error)
      }
      setStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
    }
  }
  
  function handleRetry() {
    setStatus('loading')
    setErrorMessage('')
    handleAuth()
  }
  
  function handleDownload() {
    window.open('https://github.com/hasin-codes/sweesh.exe/releases/download/v1.1.2/Sweesh-Setup-1.1.2.exe', '_blank')
  }
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <img src="/icons/logo2.svg" alt="Sweesh" className="h-8 w-auto mx-auto mb-4" />
          </Link>
        </div>
        
        {/* Loading State */}
        {status === 'loading' && (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Authenticating your account...</h1>
            <p className="text-muted-foreground">Please wait while we connect to your desktop app.</p>
          </div>
        )}
        
        {/* Success State */}
        {status === 'success' && (
          <div className="space-y-4">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <h1 className="text-2xl font-bold text-foreground">Authentication successful!</h1>
            <p className="text-muted-foreground">Opening desktop app...</p>
          </div>
        )}
        
        {/* Redirecting State */}
        {status === 'redirecting' && (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Redirecting to desktop app...</h1>
            <p className="text-muted-foreground">Redirecting in {countdown} seconds</p>
          </div>
        )}
        
        {/* Not Logged In State */}
        {status === 'not-logged-in' && (
          <div className="space-y-4">
            <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500" />
            <h1 className="text-2xl font-bold text-foreground">Please log in to continue</h1>
            <p className="text-muted-foreground">Redirecting to login page...</p>
          </div>
        )}
        
        {/* Error State */}
        {status === 'error' && (
          <div className="space-y-4">
            <XCircle className="h-12 w-12 mx-auto text-red-500" />
            <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground">{errorMessage}</p>
            
            <div className="space-y-2">
              <Button onClick={handleRetry} className="w-full">
                Try Again
              </Button>
              
              {errorMessage.includes("Couldn't open the desktop app") && (
                <Button variant="outline" onClick={handleDownload} className="w-full">
                  Download Desktop App
                </Button>
              )}
              
              <Button variant="ghost" asChild className="w-full">
                <Link href="/">Go to Homepage</Link>
              </Button>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-8 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            This authentication is for the Sweesh desktop app only.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function DesktopAuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <img src="/icons/logo2.svg" alt="Sweesh" className="h-8 w-auto mx-auto mb-4" />
            </Link>
          </div>
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Loading...</h1>
          </div>
        </div>
      </div>
    }>
      <DesktopAuthContent />
    </Suspense>
  )
}
