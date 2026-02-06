"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AudienceSplit() {
    const container = useRef<HTMLDivElement>(null);
    const leftSide = useRef<HTMLDivElement>(null);
    const rightSide = useRef<HTMLDivElement>(null);
    const connector = useRef<HTMLDivElement>(null);

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

            tl.from([leftSide.current, rightSide.current], {
                y: 50, // Slide up only, no opacity hide to ensure visibility
                duration: 0.8,
                stagger: 0.2, // Left then Right
                ease: "power2.out",
            })
                .from(connector.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, "-=0.4");

        },
        { scope: container }
    );

    return (
        <section ref={container} className="min-h-screen w-full flex flex-col md:flex-row relative bg-white overflow-hidden">

            {/* Parents Side - Green (#0B9488 from Calendar) */}
            <div
                ref={leftSide}
                className="w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-center p-8 md:p-16 border-b md:border-b-0 md:border-r border-charcoal/10 transition-colors duration-500 bg-[#0B9488] text-white group/parent"
            >
                <div className="max-w-md mx-auto opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-8 text-white">
                        {/* Shield Icon */}
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-8">What Parents Want</h3>
                    <ul className="space-y-4 md:space-y-6">
                        {["Is this safe for my child?", "Will it harm their developing skin?", "Is this responsible and science-backed?"].map((text, i) => (
                            <li key={i} className="flex items-start">
                                <span className="w-2 h-2 rounded-full bg-white mt-1 md:mt-2 mr-3 md:mr-4 shrink-0" />
                                <span className="text-sm md:text-xl text-white/90 font-medium">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Teens Side - Whitish Grey */}
            <div
                ref={rightSide}
                className="w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-center p-8 md:p-16 transition-colors duration-500 bg-gray-50 text-charcoal group/teen"
            >
                <div className="max-w-md mx-auto opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-charcoal/5 rounded-full flex items-center justify-center mb-8 text-charcoal">
                        {/* Mirror/User Icon */}
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold text-charcoal mb-4 md:mb-8">What Teens Want</h3>
                    <ul className="space-y-4 md:space-y-6">
                        {["Does it actually feel good?", "Will I use it every day?", "Does it respect my intelligence?"].map((text, i) => (
                            <li key={i} className="flex items-start">
                                <span className="w-2 h-2 rounded-full bg-turquoise mt-1 md:mt-2 mr-3 md:mr-4 shrink-0" />
                                <span className="text-sm md:text-xl text-charcoal/80 font-medium">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Connector */}
            <div
                ref={connector}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
                <div className="bg-white text-charcoal px-6 py-3 rounded-full shadow-xl text-lg font-bold whitespace-nowrap border-4 border-[#0B9488]">
                    BETWEEN earns both.
                </div>
            </div>

        </section>
    );
}
