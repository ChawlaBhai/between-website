"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const leftShelf = useRef<HTMLDivElement>(null);
    const rightShelf = useRef<HTMLDivElement>(null);
    const centerStage = useRef<HTMLDivElement>(null);
    const questionMark = useRef<HTMLDivElement>(null);
    const textContent = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Intro Animation
            const tl = gsap.timeline();

            tl.to(
                [leftShelf.current, rightShelf.current],
                {
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "start"
            )
                .from(
                    leftShelf.current,
                    {
                        xPercent: -50,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "slideIn"
                )
                .from(
                    rightShelf.current,
                    {
                        xPercent: 50,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "slideIn"
                )
                .from(questionMark.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.3)",
                })
                .to(textContent.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                });

            // Scroll Animation (Split)
            ScrollTrigger.create({
                trigger: container.current,
                start: "top top",
                end: "+=150%", // Scroll distance triggers the split
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Move shelves outward
                    gsap.set(leftShelf.current, { xPercent: -100 * progress });
                    gsap.set(rightShelf.current, { xPercent: 100 * progress });
                    // Fade out center content
                    gsap.set(centerStage.current, { opacity: 1 - progress * 2 });
                },
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="relative h-screen w-full overflow-hidden bg-white">
            {/* Center Stage (Text) - Starts IN FRONT (z-30) */}
            <div
                ref={centerStage}
                className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
            >
                <div ref={questionMark} className="text-8xl md:text-[12rem] font-bold text-turquoise leading-none mb-8">
                    ?
                </div>

                <div ref={textContent} className="text-center opacity-0 translate-y-8 px-4 w-full max-w-5xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6 tracking-tight leading-tight">
                        Who makes personal care for<br className="hidden md:block" />
                        the years in between?
                    </h1>
                    <p className="text-lg md:text-2xl text-charcoal/80 font-medium leading-relaxed">
                        Ages 8–18. The most transformative decade.<br className="hidden md:block" />
                        The most underserved market.
                    </p>

                    <div className="mt-12 animate-bounce opacity-50">
                        <span className="text-turquoise text-sm uppercase tracking-[0.2em] font-bold">
                            Scroll to find out
                        </span>
                        <div className="w-[1px] h-12 bg-turquoise mx-auto mt-4"></div>
                    </div>
                </div>
            </div>

            {/* Container for the 3 distinct parts (Shelves) - On TOP (z-10) */}
            <div className="absolute inset-0 flex pointer-events-none">
                {/* Left: Baby Products - 1/3 Width, Content Left Aligned */}
                <div
                    ref={leftShelf}
                    className="w-1/3 h-full bg-[#f0f4f8] flex items-center justify-start pl-4 md:pl-12 border-r border-charcoal/5 relative z-10 opacity-0 pointer-events-auto"
                >
                    <div className="text-left w-full flex flex-col items-start -translate-y-4 md:-translate-y-6">
                        <div className="relative w-32 h-32 md:w-56 md:h-56 mb-2 -ml-4 md:-ml-8">
                            <Image
                                src="/baby-products.png"
                                alt="Baby Products"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="font-bold text-3xl md:text-5xl text-charcoal mb-2">0–8</h3>
                        <p className="font-sans text-charcoal/60 text-sm md:text-lg tracking-widest uppercase">
                            Too mild
                        </p>
                    </div>
                </div>

                {/* Middle: The Void */}
                <div className="w-1/3 h-full relative z-0">
                    {/* Spacer */}
                </div>

                {/* Right: Adult Skincare - 1/3 Width, Content Right Aligned */}
                <div
                    ref={rightShelf}
                    className="w-1/3 h-full bg-[#e8eaed] flex items-center justify-end pr-4 md:pr-12 border-l border-charcoal/5 relative z-10 opacity-0 pointer-events-auto"
                >
                    <div className="text-right w-full flex flex-col items-end -translate-y-4 md:-translate-y-6">
                        <div className="relative w-32 h-32 md:w-56 md:h-56 mb-2 -mr-4 md:-mr-8">
                            <Image
                                src="/adult-products.png"
                                alt="Adult Products"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="font-bold text-3xl md:text-5xl text-charcoal mb-2">18+</h3>
                        <p className="font-sans text-charcoal/60 text-sm md:text-lg tracking-widest uppercase">
                            Too harsh
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
