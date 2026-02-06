"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
    const container = useRef<HTMLDivElement>(null);
    const title = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".philosophy-card");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center",
                    toggleActions: "play none none reverse"
                }
            });

            // 1. Title Reveal
            tl.from(title.current, {
                opacity: 0,
                y: 30,
                scale: 0.95,
                duration: 0.8,
                ease: "power2.out"
            })
                // 2. Cards Slide Up
                .from(cards, {
                    opacity: 0,
                    y: 60,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.4");

        },
        { scope: container }
    );

    return (
        <section ref={container} className="min-h-screen w-full bg-[#F8F9FA] flex flex-col items-center justify-center py-12 md:py-24 px-6">

            {/* Main Statement */}
            <div className="text-center max-w-4xl mb-10 md:mb-20">
                <h2 ref={title} className="text-2xl md:text-6xl font-bold text-charcoal leading-tight">
                    Healthy growing skin
                    <br />
                    doesn't need to be fixed.
                    <br />
                    <span className="text-turquoise mt-2 md:mt-4 block">It needs to be supported.</span>
                </h2>
            </div>

            {/* Cards Container */}
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">

                {/* Card 1: Biology-First */}
                <div className="philosophy-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-l-4 border-turquoise group hover:-translate-y-2 transform">
                    <div className="w-12 h-12 bg-turquoise/10 rounded-full flex items-center justify-center mb-6 text-turquoise">
                        {/* DNA Icon Placeholder */}
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12z" /><path d="M15 9l-6 6" /><path d="M9 9l6 6" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-3">Biology-First</h3>
                    <p className="text-charcoal/70 leading-relaxed">
                        Formulated for puberty skin. Barrier-respecting. Microbiome-aware.
                    </p>
                </div>

                {/* Card 2: Prevention, Not Treatment */}
                <div className="philosophy-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-l-4 border-turquoise group hover:-translate-y-2 transform">
                    <div className="w-12 h-12 bg-turquoise/10 rounded-full flex items-center justify-center mb-6 text-turquoise">
                        {/* Shield Icon Placeholder */}
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-3">Prevention Over Cure</h3>
                    <p className="text-charcoal/70 leading-relaxed">
                        We build resilience so skin doesn't need correction later.
                    </p>
                </div>

                {/* Card 3: Long-Term Thinking */}
                <div className="philosophy-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-l-4 border-turquoise group hover:-translate-y-2 transform">
                    <div className="w-12 h-12 bg-turquoise/10 rounded-full flex items-center justify-center mb-6 text-turquoise">
                        {/* Timeline Icon Placeholder */}
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-3">Long-Term Thinking</h3>
                    <p className="text-charcoal/70 leading-relaxed">
                        Training skin from 8–18 means healthy skin for life.
                    </p>
                </div>

            </div>

        </section>
    );
}
