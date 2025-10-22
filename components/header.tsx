'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { DesignerModal } from '@/components/designer-modal'

// Windows Icon Component
const WindowsIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 5.5L11 4.5V11.5H3V5.5ZM11 12.5V19.5L3 18.5V12.5H11ZM12 19.7L21 21V12.5H12V19.7ZM21 11.5V3L12 4.3V11.5H21Z" />
    </svg>
)

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isDesignerModalOpen, setIsDesignerModalOpen] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <>
            <header>
                <nav
                    data-state={menuState && 'active'}
                    className="fixed z-20 w-full px-2">
                    <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between lg:w-auto">
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center space-x-2">
                                    <img src="/icons/logo2.svg" alt="Sweesh" className="h-5 w-auto" />
                                </Link>

                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                                <div className="lg:hidden">
                                    <ul className="space-y-6 text-base">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                    <SignedOut>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={cn(isScrolled && 'lg:hidden', 'select-none')}
                                            onClick={() => setIsDesignerModalOpen(true)}>
                                            <span>Login</span>
                                        </Button>
                                        <Button
                                            size="sm"
                                            className={cn(isScrolled && 'lg:hidden', 'select-none')}
                                            onClick={() => setIsDesignerModalOpen(true)}>
                                            <span>Sign Up</span>
                                        </Button>
                                    </SignedOut>
                                    <SignedIn>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className={cn(isScrolled && 'lg:hidden', 'select-none')}>
                                            <Link href="/dashboard">
                                                <span>Dashboard</span>
                                            </Link>
                                        </Button>
                                    </SignedIn>
                                    <Button
                                        size="sm"
                                        className={cn(isScrolled ? 'lg:inline-flex' : 'hidden', 'select-none')}
                                        onClick={() => window.open('https://github.com/hasin-codes/sweesh.exe/releases/download/v1.3.0/Sweesh-Setup-1.3.0.exe', '_blank')}>
                                        <WindowsIcon className="mr-2 h-4 w-4" />
                                        <span>Download for Windows</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Designer Modal */}
            <DesignerModal 
                isOpen={isDesignerModalOpen} 
                onClose={() => setIsDesignerModalOpen(false)} 
            />
        </>
    )
}
