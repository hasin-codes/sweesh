export default function StatsSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <h2 className="text-center text-4xl font-semibold lg:text-5xl">Founder&apos;s words</h2>
                <div className="relative z-10 max-w-xl space-y-6">
                    <h2 className="text-4xl font-medium lg:text-5xl">Built on technology trusted by thousands of developers</h2>
                    <p>
                    Powered by the same open-source Whisper model trusted and starred by over 89k developers worldwide.<span className="font-medium"> Runs on Groq&apos;s ultra-fast AI processing, the same platform relied on by over a million developers to power real-time applications.</span>
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                    <div>
                        
                        <div className="mb-12 mt-12 grid grid-cols-2 gap-2 md:mb-0">
                            <div className="space-y-4">
                                <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">+89K</div>
                                <p>Stars on GitHub</p>
                                <p></p>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">+1M</div>
                                <p>Developers Using Groq</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <blockquote className="border-l-4 pl-4">
                            <p>Using Sweesh means using a tool backed by the same technology trusted by thousands of developers and creators worldwide. It&apos;s powered by Whisper and Groq - the engines behind fast, accurate, and private transcription.</p>
                            <div className="mt-6">
                                <cite className="block font-medium">Hasin Raiyan, Founder</cite>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    )
}
