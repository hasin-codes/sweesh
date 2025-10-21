export default function TestimonialsSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl">
                    <blockquote>
                        <p className="text-lg font-semibold sm:text-xl md:text-3xl">Sweesh has completely transformed how I capture ideas. The hold-to-talk feature feels so natural, and having transcriptions automatically copied to my clipboard saves me countless hours every week. It's like having a personal assistant that actually understands me.</p>

                        <div className="mt-12 flex items-center gap-6">
                            <img className="h-7 w-fit dark:invert" src="/icons/nvidia.svg" alt="The Decor" height="20" width="auto" />
                            <div className="space-y-1 border-l pl-6">
                                <cite className="font-medium">Mahmud Rahman</cite>
                                <span className="text-muted-foreground block text-sm">Product Designer, The Decor</span>
                            </div>
                        </div>
                    </blockquote>
                </div>
            </div>
        </section>
    )
}
