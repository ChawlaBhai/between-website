"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ProductReveal() {
    const container = useRef<HTMLElement>(null);
    const contentWrapper = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 60%", // Start animating when section is 60% into view
                    toggleActions: "play reverse play reverse",
                },
            });

            // Standard Fade In / Slide Up
            tl.from(contentWrapper.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="h-screen w-full bg-white overflow-hidden flex flex-col items-center justify-center relative">

            <div ref={contentWrapper} className="w-full max-w-7xl h-full flex flex-col items-center justify-center gap-8 md:gap-20 px-4">

                {/* 1. Brand Logo & Philosophy (Stacked Tight) */}
                <div className="flex flex-col items-center text-center z-10 shrink-0 w-full">
                    {/* Logo (Massive Focus - Viewport Based) */}
                    <div className="relative w-[95vw] h-[25vh] md:w-[95vw] md:-mt-25 md:h-[45vh]">
                        <Image
                            src="/Between logo transparent black.png"
                            alt="BETWEEN"
                            fill
                            sizes="95vw"
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Philosophy Lines */}
                    <div className="space-y-1 md:space-y-2 -mt-4 md:-mt-26 relative z-20">
                        <p className="text-lg md:text-2xl font-medium text-charcoal">
                            Not for babies.
                        </p>
                        <p className="text-lg md:text-2xl font-medium text-charcoal">
                            Not for adults.
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-turquoise">
                            Made for everything in between.
                        </p>
                    </div>
                </div>

                {/* 2. Product Trio (Fit within remaining space) */}
                <div className="flex flex-row items-end justify-center gap-4 md:gap-10 w-full z-10 flex-1 max-h-[50vh] pb-2">

                    {/* Left: Facewash */}
                    <div className="flex flex-col items-center group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative w-28 h-40 md:w-48 md:h-72 mb-2">
                            <Image
                                src="/individual/facewash.png"
                                alt="Between Facewash"
                                fill
                                sizes="(max-width: 768px) 150px, 300px"
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-charcoal group-hover:text-turquoise transition-colors">Face Wash</span>
                    </div>

                    {/* Center: Bodywash (Focus) */}
                    <div className="flex flex-col items-center group cursor-pointer hover:-translate-y-2 transition-transform duration-300 pb-4 md:pb-8">
                        <div className="relative w-32 h-48 md:w-56 md:h-80 mb-2">
                            <Image
                                src="/individual/bodywash.png"
                                alt="Between Bodywash"
                                fill
                                sizes="(max-width: 768px) 150px, 300px"
                                className="object-contain"
                            />
                        </div>
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-charcoal group-hover:text-turquoise transition-colors">Body Wash</span>
                    </div>

                    {/* Right: Moisturizer */}
                    <div className="flex flex-col items-center group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative w-28 h-40 md:w-48 md:h-72 mb-2">
                            <Image
                                src="/individual/moisturizer.png"
                                alt="Between Moisturizer"
                                fill
                                sizes="(max-width: 768px) 150px, 300px"
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-charcoal group-hover:text-turquoise transition-colors">Moisturizer</span>
                    </div>

                </div>

            </div>
        </section>
    );
}
