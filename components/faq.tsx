'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsFour() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'How does Sweesh ensure my privacy and security?',
            answer: 'Sweesh takes your privacy seriously. Your Groq API key is encrypted using OS-level secure storage (Keychain on macOS, DPAPI on Windows, libsecret on Linux) with AES-256-CBC fallback. Audio processing happens through your personal API key, meaning your voice data never touches Sweesh servers. All transcriptions are stored locally on your device.',
        },
        {
            id: 'item-2',
            question: 'What makes Sweesh different from built-in voice typing?',
            answer: 'Unlike native voice typing tools that require you to be in specific text fields, Sweesh works system-wide with global keyboard shortcuts. It automatically copies transcriptions to your clipboard, allowing you to paste anywhere instantly. The hold-to-talk interface feels more natural than toggle-based systems, and Sweesh uses Whisper for industry-leading accuracy that adapts to technical terminology and accents.',
        },
        {
            id: 'item-3',
            question: 'What happens to my transcriptions? Are they stored forever?',
            answer: 'All transcriptions are stored locally on your device with full privacy Sweesh never uploads or syncs your data to external servers without your explicit permission. You have complete control: edit, delete, or export transcriptions anytime through the app interface. Transcriptions persist between sessions, so you can build a searchable archive of your ideas over time. If you uninstall Sweesh, simply back up your transcription history first. For teams or users who want cloud sync, we are exploring optional encrypted backup features in future releases based on user demand.',
        },
        {
            id: 'item-4',
            question: 'Can I use Sweesh for brainstorming and sending prompts to AI tools?',
            answer: "Absolutely! Sweesh is perfect for rapidly capturing ideas and making detailed prompts for AI assistants like Cursor, Claude or GitHub Copilot especially tools that lack native voice input. Simply hold your shortcut key, speak your thoughts naturally, and the transcription is instantly copied to your clipboard. Paste it directly into any AI chat interface, code editor, or development tool. Many users rely on Sweesh for brainstorming sessions, drafting complex coding instructions, articulating feature requirements, and even dictating technical documentation without breaking their creative flow.",
        },
        {
            id: 'item-5',
            question: 'What happens if Im offline or my API key stops working?',
            answer: 'Sweesh requires an active internet connection to access Whisper API for transcription. If you are offline or encounter API issues, you will receive clear error messages in the app. We recommend keeping a backup text editor open for critical work. Your previously saved transcriptions remain accessible locally even without internet. If your API key expires or reaches its limit, simply update it in Settings no data loss occurs.',
        },
    ]

    return (
        <section id="faq" className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Discover quick and comprehensive answers to common questions about our platform, services, and features.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1">
                        {faqItems.map((item) => (
                            <div
                                className="group"
                                key={item.id}>
                                <AccordionItem
                                    value={item.id}
                                    className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm">
                                    <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-base">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                            </div>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            href="#"
                            className="text-primary font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
