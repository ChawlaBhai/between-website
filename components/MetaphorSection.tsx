"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MetaphorSection() {
    const container = useRef<HTMLDivElement>(null);
    const leftSide = useRef<HTMLDivElement>(null);
    const rightSide = useRef<HTMLDivElement>(null);
    const centerText = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Reveal Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            });

            // 1. Left Side (Bubble Wrap) Reveal
            tl.from(leftSide.current, {
                opacity: 0,
                xPercent: -5,
                duration: 0.8,
                ease: "power2.out",
            })
                // 2. Right Side (Sports) Reveal
                .from(rightSide.current, {
                    opacity: 0,
                    xPercent: 5,
                    duration: 0.8,
                    ease: "power2.out",
                }, "-=0.6")
                // 3. Center Text Reveal
                .from(centerText.current, {
                    scale: 0.8,
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                }, "-=0.2");


            // Hover Interactions logic is handled via CSS group-hover for performance/simplicity 
            // where possible, or simple GSAP sets if complex. 
            // CSS is sufficient for the "lift" effect described.
        },
        { scope: container }
    );

    return (
        <section ref={container} className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-white">

            {/* LEFT: Bubble Wrap Approach */}
            <div
                ref={leftSide}
                className="w-full md:w-1/2 h-[50vh] md:h-screen bg-gray-50 flex flex-col items-center justify-center p-8 border-r border-charcoal/5 relative group transition-transform hover:-translate-y-1 duration-500 ease-out"
            >
                <div className="mb-4 md:mb-8 p-4 md:p-6 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                    {/* Placeholder Icon for Fragile/Bubble Wrap */}
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-charcoal/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 3v18M3 12h18" strokeDasharray="4 4" />
                        <rect x="5" y="5" width="14" height="14" rx="2" strokeDasharray="4 4" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-2">Modern Skincare</h3>
                <p className="text-charcoal/60 font-medium">Protection builds weakness</p>
                <div className="absolute top-0 left-0 w-full h-1 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* RIGHT: Sports Approach */}
            <div
                ref={rightSide}
                className="w-full md:w-1/2 h-[50vh] md:h-screen bg-white flex flex-col items-center justify-center p-8 relative group transition-transform hover:-translate-y-1 duration-500 ease-out"
            >
                <div className="absolute inset-0 bg-turquoise/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="mb-4 md:mb-8 p-4 md:p-6 bg-turquoise/10 rounded-full shadow-sm group-hover:shadow-md transition-shadow z-10">
                    {/* Placeholder Icon for Sports/Resilience */}
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-turquoise" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2l3 6 6 1-4.5 4.5L18 22l-6-3-6 3 1.5-8.5L3 9l6-1z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-2 z-10">BETWEEN</h3>
                <p className="text-turquoise font-medium z-10">Stress builds resilience</p>
                <div className="absolute top-0 left-0 w-full h-1 bg-turquoise opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Center Text Overlay */}
            <div
                ref={centerText}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-lg bg-white p-8 md:p-12 shadow-2xl rounded-2xl text-center z-20 border border-charcoal/5"
            >
                <p className="text-lg md:text-2xl text-charcoal leading-relaxed">
                    <span className="block mb-4 text-charcoal/60">
                        A child who plays sports builds strong bones.
                        <br />
                        A child wrapped in bubble wrap builds dependency.
                    </span>
                    <span className="font-bold block text-turquoise">
                        Skin works the same way.
                    </span>
                </p>
            </div>

        </section>
    );
}
