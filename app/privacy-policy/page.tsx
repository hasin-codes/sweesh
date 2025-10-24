'use client'

import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'

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

export default function PrivacyPolicy() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    
    return (
        <main className="bg-background min-h-screen">
            {/* Header */}
            <header className="fixed z-20 w-full px-2">
                <div className="mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            <Image src="/icons/logo2.svg" alt="Sweesh" className="h-5 w-auto" width={100} height={20} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content */}
            <section className="pt-24 md:pt-36 pb-16">
                <div className="mx-auto max-w-4xl px-6">
                    <AnimatedGroup variants={transitionVariants}>
                        <div className="text-center mb-12">
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="text-4xl md:text-5xl font-bold mb-4">
                                Privacy Policy
                            </TextEffect>
                            <p className="text-muted-foreground opacity-0 animate-in fade-in duration-500 delay-300">
                                Last Updated: {lastUpdated}
                            </p>
                        </div>
                    </AnimatedGroup>

                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.5,
                                    },
                                },
                            },
                            ...transitionVariants,
                        }}>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            {/* Introduction */}
                            <div className="mb-12">
                                <p className="text-muted-foreground leading-relaxed">
                                    At Sweesh, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and safeguard your information when you use our desktop application and related services. By using Sweesh, you agree to the practices described in this policy.
                                </p>
                            </div>

                            {/* Section 1 */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-6 text-foreground">1. Information We Collect</h2>
                                
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3 text-foreground">1.1 Account Information</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-3">
                                        When you sign up or log in using Clerk Authentication, we receive essential account data such as:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                        <li>Your email address</li>
                                        <li>Your unique user ID</li>
                                        <li>Basic authentication and verification data</li>
                                    </ul>
                                    <p className="text-muted-foreground leading-relaxed mt-3">
                                        This information is securely handled by Clerk, a trusted third-party authentication provider, and is used solely for secure login, identity verification, and personalized user experience within Sweesh.
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3 text-foreground">1.2 Device Information</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-3">
                                        To ensure app stability, compatibility, and performance, Sweesh may collect limited technical details, including:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                        <li>Device type and operating system</li>
                                        <li>App version</li>
                                        <li>Basic crash logs or performance data (if applicable)</li>
                                    </ul>
                                    <p className="text-muted-foreground leading-relaxed mt-3">
                                        This data is non-personal and helps us maintain app performance and troubleshoot issues.
                                    </p>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4 text-foreground">2. Data Storage and Processing</h2>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>Sweesh processes and stores user data locally on the user's device.</li>
                                    <li>We do not transmit, share, or sell personal data to any third party.</li>
                                    <li>Authentication data handled by Clerk is stored and processed according to their Privacy Policy. Sweesh does not store any user passwords or raw credentials.</li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4 text-foreground">3. How We Use Your Information</h2>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    We use collected data strictly for the following purposes:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>To provide secure and personalized access to the app</li>
                                    <li>To ensure functionality, app performance, and bug fixes</li>
                                    <li>To prevent unauthorized access or misuse of the platform</li>
                                    <li>To comply with applicable legal or security obligations</li>
                                </ul>
                                <p className="text-muted-foreground leading-relaxed mt-3">
                                    We do not use your data for advertising, profiling, or marketing purposes.
                                </p>
                            </div>

                            {/* Section 4 */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Security</h2>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    Sweesh is built with a security-first approach. All authentication and communication processes are encrypted using industry-standard protocols.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-3">We apply:</p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>End-to-end encrypted sessions via Clerk</li>
                                    <li>Local-only storage for personal or sensitive data</li>
                                    <li>Strict access control to backend systems (if applicable)</li>
                                </ul>
                                <p className="text-muted-foreground leading-relaxed mt-3">
                                    No external analytics or data tracking scripts are embedded in Sweesh.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4 text-foreground">5. User Rights</h2>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    You have complete control over your data within Sweesh. You may:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>Access and review your account details via Clerk</li>
                                    <li>Delete your account at any time through Clerk's dashboard or by contacting support</li>
                                    <li>Request data deletion or account closure directly from us at <a href="mailto:hasin.innit@gmail.com" className="text-primary hover:underline">hasin.innit@gmail.com</a></li>
                                </ul>
                                <p className="text-muted-foreground leading-relaxed mt-3">
                                    Once deleted, all associated local data and session credentials are permanently removed and cannot be recovered.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4 text-foreground">6. Retention Policy</h2>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>We retain your authentication and device data only as long as your account remains active.</li>
                                    <li>Once deleted, all user-related data is erased from our systems and local storage.</li>
                                    <li>Temporary logs (e.g., crash data) are automatically cleared periodically.</li>
                                </ul>
                            </div>

                            {/* Section 7 */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4 text-foreground">7. Children's Privacy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Sweesh is not directed toward children under the age of 13. We do not knowingly collect or process personal data from minors. If such data is found, it will be immediately deleted.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4 text-foreground">8. Legal Jurisdiction</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    This Privacy Policy is governed by the laws of Bangladesh, without regard to its conflict of law principles. Any disputes arising under this policy shall be subject to the exclusive jurisdiction of the courts of Bangladesh.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4 text-foreground">9. Changes to This Policy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Sweesh reserves the right to modify or update this Privacy Policy at any time. Changes will be reflected with a revised "Last Updated" date. Your continued use of Sweesh constitutes acceptance of these updates.
                                </p>
                            </div>

                            {/* Contact Section */}
                            <div className="mt-12 p-6 bg-muted rounded-lg">
                                <h2 className="text-xl font-bold mb-3 text-foreground">Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
                                    <a href="mailto:hasin.innit@gmail.com" className="text-primary hover:underline">
                                        hasin.innit@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </AnimatedGroup>
                </div>
            </section>

            <Footer />
        </main>
    )
}

