import { Button } from '@/components/ui/button'
import { Check, Mail } from 'lucide-react'
import Link from 'next/link'
import { EvervaultCard } from '@/components/ui/evervault-card'

export default function Pricing() {
    return (
        <section id="pricing" className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">Pricing that Scales with You</h1>
                    <p>Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.</p>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
                    <div className="rounded-(--radius) flex flex-col justify-between space-y-8 border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
                        <div className="space-y-4">
                            <div>
                                <h2 className="font-medium">Free</h2>
                                <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                                
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full">
                                <Link href="">Get Started</Link>
                            </Button>

                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Unlimited Usage', 'Use own api for full control', 'Full Transparency - No Hidden Fees'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="dark:bg-muted rounded-(--radius) border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)] relative overflow-hidden">
                        {/* Evervault Card Background */}
                        <div className="absolute inset-0 opacity-30">
                            <EvervaultCard className="w-full h-full" />
                        </div>
                        
                        <div className="relative z-10 grid gap-6 sm:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="font-medium">Enterprise</h2>
                                    <span className="my-3 block text-2xl font-semibold">$599 / mo</span>
                                    
                                </div>

                                <Button
                                    asChild
                                    className="w-full">
                                    <Link href="mailto:hasin.innit@gmail.com?subject=Inquire about Enterprise Plan&body=Hi, I'm interested in learning more about the Enterprise plan features.">
                                        <Mail className="mr-2 h-4 w-4" />
                                        <span>Inquire Now</span>
                                    </Link>
                                </Button>
                            </div>

                            <div>
                                <div className="text-sm font-medium">Everything in free plus :</div>

                                <ul className="mt-4 list-outside space-y-3 text-sm">
                                    {['Custom Vocabularies: Add/edit domain-specific terms (e.g., medical, legal) stored locally or synced via minimal cloud (e.g., Firebase free tier).' , 'Advanced Integrations: Auto-insert to specific apps (e.g., Obsidian, Notion, VS Code) via custom triggers or scripts.' , 'Priority Transcription: Faster Whisper processing via your optimized API proxy (optional, low-cost AWS Lambda).' , 'Export Options: Save transcripts as TXT/MD/JSON, with timestamps or speaker tags.' , 'Pro Settings: Custom overlay position, animation styles (e.g., wave colors), multiple hotkeys.' , 'Support: Email support within 24 hours'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
