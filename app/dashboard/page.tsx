"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Gift, Plus, Users, Github, MessageSquare, Zap, Clock, Settings, FileText, Mail, CreditCard, Package, LogOut } from 'lucide-react'
import Link from 'next/link'

function OverviewContent() {
  return (
    <div className="space-y-8">
      {/* Pricing Plans Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {/* Free Plan */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Free</CardTitle>
              <CardDescription className="text-lg font-semibold text-foreground">
                $0 / mo
              </CardDescription>
              
            </CardHeader>
            <CardContent className="pt-0">
              <div className="w-full mb-3 p-2 bg-muted rounded-md text-center text-sm text-muted-foreground">
                Your subscription
              </div>
              <div className="space-y-2 text-sm">
                {['Unlimited Usage', 'Use own api for full control', 'Full Transparency - No Hidden Fees'].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-card border-border relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full bg-gradient-to-r from-red-500 to-orange-500"></div>
            </div>
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-lg">Enterprise</CardTitle>
              <CardDescription className="text-lg font-semibold text-foreground">
                $599 / mo
              </CardDescription>
              
            </CardHeader>
            <CardContent className="pt-0 relative z-10">
              <Button className="w-full mb-3 bg-primary hover:bg-primary/90 text-primary-foreground select-none">
                <Mail className="mr-2 h-4 w-4" />
                Inquire Now
              </Button>
              <div className="text-sm font-medium mb-3">Everything in free plus:</div>
              <div className="space-y-2 text-sm">
                {[
                  'Custom Vocabularies: Add/edit domain-specific terms',
                  'Advanced Integrations: Auto-insert to specific apps',
                  'Priority Transcription: Faster Whisper processing',
                  'Export Options: Save transcripts as TXT/MD/JSON',
                  'Pro Settings: Custom overlay position, animation styles',
                  'Support: Email support within 24 hours'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Groq API Usage Section */}
      <GroqUsageSection />
    </div>
  )
}

function GroqUsageSection() {
  const [hasGroqSession, setHasGroqSession] = useState(false)

  useEffect(() => {
    // Check for Groq session token in browser storage
    const checkGroqSession = () => {
      // Check localStorage for Groq session token
      const groqToken = localStorage.getItem('groq_session_token') || 
                       localStorage.getItem('groq_token') ||
                       localStorage.getItem('groq_auth_token')
      
      // Check sessionStorage as well
      const groqSessionToken = sessionStorage.getItem('groq_session_token') ||
                              sessionStorage.getItem('groq_token') ||
                              sessionStorage.getItem('groq_auth_token')
      
      // Check for any cookie that might contain Groq session info
      const hasGroqCookie = document.cookie.includes('groq') || 
                           document.cookie.includes('session')
      
      setHasGroqSession(!!(groqToken || groqSessionToken || hasGroqCookie))
    }

    checkGroqSession()
    
    // Listen for storage changes
    const handleStorageChange = () => checkGroqSession()
    window.addEventListener('storage', handleStorageChange)
    
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Groq API Usage</h2>
      <p className="text-muted-foreground mb-6">
        {hasGroqSession 
          ? "You're signed in to Groq. View your usage data below."
          : "Make sure you are signed in to Groq with the same email you generated API key of Groq"
        }
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Usage Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Cost Usage
            </CardTitle>
            <CardDescription>
              View your Groq API cost usage and billing information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 border rounded-lg overflow-hidden">
              {/* Security Note: iframe sandbox attributes limited to minimum required permissions */}
              <iframe
                src="https://console.groq.com/dashboard/usage?tab=cost"
                className="w-full h-full"
                title="Groq Cost Usage"
                sandbox="allow-same-origin allow-scripts allow-forms"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </CardContent>
        </Card>

        {/* Activity Usage Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Activity Usage
            </CardTitle>
            <CardDescription>
              Monitor your Groq API activity and request patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 border rounded-lg overflow-hidden">
              {/* Security Note: iframe sandbox attributes limited to minimum required permissions */}
              <iframe
                src="https://console.groq.com/dashboard/usage?tab=activity"
                className="w-full h-full"
                title="Groq Activity Usage"
                sandbox="allow-same-origin allow-scripts allow-forms"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ComingSoonContent({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">This feature is coming soon!</p>
        </CardContent>
      </Card>
    </div>
  )
}

function DocsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Documentation</h2>
        <p className="text-muted-foreground mb-6">
          Access our comprehensive documentation and guides
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">GitHub Repository</h3>
                <p className="text-muted-foreground text-sm">
                  View the complete documentation and source code
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="select-none">
              <Link href="https://github.com/hasin-codes/sweesh.exe/readme.md" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Docs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ContactContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-muted-foreground mb-6">
          Get in touch with our team for support or inquiries
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Mail className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-muted-foreground text-sm">
                  Send us an email for any questions or support needs
                </p>
              </div>
            </div>
            <Button asChild className="select-none">
              <Link href="mailto:hasin.innit@gmail.com?subject=Support Request&body=Hi, I need help with...">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Dashboard() {
  return <OverviewContent />
}