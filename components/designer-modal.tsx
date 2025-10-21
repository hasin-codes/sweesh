"use client"

import { useState } from 'react'
import { SignIn, SignUp } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Link from 'next/link'

interface DesignerModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DesignerModal({ isOpen, onClose }: DesignerModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 select-none"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header */}
        <div className="text-center p-6 pb-4">
          <Link href="/" className="inline-block" onClick={onClose}>
            <img src="/icons/logo2.svg" alt="Sweesh" className="h-8 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp ? 'Join Sweesh and start transcribing' : 'Sign in to your Sweesh account'}
          </p>
        </div>
        
        {/* Clerk Component */}
        <div className="px-6 pb-6">
          {isSignUp ? (
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                  card: 'shadow-none border-0',
                  formButton: 'select-none',
                  button: 'select-none',
                }
              }}
              redirectUrl="/dashboard"
            />
          ) : (
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                  card: 'shadow-none border-0',
                  formButton: 'select-none',
                  button: 'select-none',
                }
              }}
              redirectUrl="/dashboard"
            />
          )}
        </div>
        
        {/* Toggle between Sign In and Sign Up */}
        <div className="text-center pb-6 px-6">
          <p className="text-sm text-muted-foreground">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary hover:underline select-none"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
