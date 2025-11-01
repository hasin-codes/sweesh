'use client'
import React from 'react'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from './header'

// Windows Icon Component
const WindowsIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 5.5L11 4.5V11.5H3V5.5ZM11 12.5V19.5L3 18.5V12.5H11ZM12 19.7L21 21V12.5H12V19.7ZM21 11.5V3L12 4.3V11.5H21Z" />
    </svg>
)


const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        

                        <div
                            aria-hidden
                            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
                        />

                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0 relative">
                                <AnimatedGroup variants={transitionVariants}>
                                    <a 
                                        href="https://www.producthunt.com/products/sweesh?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-sweesh" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mx-auto inline-block transition-opacity hover:opacity-80"
                                    >
                                        <img 
                                            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1032781&theme=light&t=1762004208610" 
                                            alt="Sweesh - Capture ideas before your brain moves on | Product Hunt" 
                                            style={{ width: '250px', height: '54px' }} 
                                            width="250" 
                                            height="54" 
                                        />
                                    </a>
                                </AnimatedGroup>

                                

                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="h1"
                                    className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                                    Speak it, Send it
                                </TextEffect>
                                
                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                    className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                                    We turn your voice into ready to use text - directly on your desktop.
                                </TextEffect>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex items-center justify-center">
                                    <AnimatedGroup variants={transitionVariants}>
                                        <a
                                            href="https://github.com/hasin-codes/sweesh.exe/releases/download/v1.4.2/Sweesh-Setup-1.4.2.exe"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open('https://github.com/hasin-codes/sweesh.exe/releases/download/v1.4.2/Sweesh-Setup-1.4.2.exe', '_blank');
                                            }}
                                            className="hover:bg-primary/90 bg-primary group mx-auto flex w-fit items-center gap-4 rounded-full border border-primary p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950 cursor-pointer">
                                            <WindowsIcon className="size-4 text-white" />
                                            <span className="text-white text-sm font-medium">Download for Windows</span>
                                            <span className="dark:border-background block h-4 w-0.5 border-l bg-white/30 dark:bg-white/30"></span>

                                            <div className="bg-white/10 group-hover:bg-white/20 size-6 overflow-hidden rounded-full duration-500">
                                                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                    <span className="flex size-6">
                                                        <ArrowDown className="m-auto size-3 text-white" />
                                                    </span>
                                                    <span className="flex size-6">
                                                        <ArrowDown className="m-auto size-3 text-white" />
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </AnimatedGroup>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="mask-b-from-55% relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                
                                 
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <Image
                                        className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                                        src="/icons/mail2.png"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                    <Image
                                        className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                                        src="/icons/mail2.png"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                                
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                
            </main>
        </>
    )
}
