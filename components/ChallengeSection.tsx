"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHALLENGES = [
    {
        title: "Perfecting 3, Not Launching 100",
        desc: "We obsess over quality. That takes time competitors skip."
    },
    {
        title: "Education Over Marketing",
        desc: "Teaching prevention is slower than selling fear. But it's stickier."
    },
    {
        title: "Category Creation",
        desc: "We're building the playbook from scratch."
    },
    {
        title: "Patience in a Hype Market",
        desc: "Beauty rewards fast. We're building for decades."
    }
];

export default function ChallengeSection() {
    const container = useRef<HTMLDivElement>(null);
    const headline = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".challenge-card");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            });

            // Headline
            tl.from(headline.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out"
            })
                // Cards
                .from(cards, {
                    opacity: 0,
                    y: 40,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.4")
                // Bottom Text
                .from(".bottom-text", {
                    opacity: 0,
                    y: 10,
                    duration: 0.8,
                    delay: 0.2
                });

        },
        { scope: container }
    );

    return (
        <section ref={container} className="min-h-screen w-full bg-[#f8f9fa] flex flex-col items-center justify-center py-20 px-6 md:px-12 relative overflow-hidden">

            <div className="text-center mb-8 md:mb-10">
                <h2 ref={headline} className="text-3xl md:text-6xl font-bold text-charcoal leading-tight">
                    Why this is hard?
                    <br />
                    <span className="text-charcoal/60">(And why that's the point.)</span>
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl mb-16 md:mb-20">
                {CHALLENGES.map((item, i) => (
                    <div
                        key={i}
                        className="challenge-card bg-charcoal text-white p-6 md:p-10 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                    >
                        {/* Top Border Accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-turquoise" />

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-turquoise/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{item.title}</h3>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="bottom-text text-center text-charcoal/80 text-lg md:text-xl font-medium max-w-2xl">
                <p>These challenges will become our moat.</p>
                <p className="mt-1">Anyone taking shortcuts can't build what we're building.</p>
            </div>

        </section>
    );
}
