"use client"

import { Button } from '@/components/ui/button'
import { Settings, LogOut, Clock, Package, CreditCard, FileText, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

interface DashboardLayoutProps {
  children: React.ReactNode
}

function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Clock, href: '/dashboard' },
    { id: 'integrations', label: 'Integrations', icon: Package, href: '/dashboard/integrations' },
    { id: 'billing', label: 'Billing & Invoices', icon: CreditCard, href: '/dashboard/billing' },
    { id: 'docs', label: 'Docs', icon: FileText, href: '/dashboard/docs' },
    { id: 'contact', label: 'Contact Us', icon: Mail, href: '/dashboard/contact' },
  ]

  return (
    <div className="w-64 bg-card border-r h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        {/* User Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">{user?.fullName || user?.firstName || 'User'}</h3>
            <div className="flex gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <div className="h-4 w-4 bg-muted-foreground rounded-sm"></div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Free Plan • {user?.primaryEmailAddress?.emailAddress || 'No email'}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Sign Out Button */}
        <div className="mt-8 pt-4 border-t">
          <Link href="/auth/sign-out">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground select-none">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content with left margin to account for fixed sidebar */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="select-none">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
