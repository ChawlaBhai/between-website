"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BottleIcon from "./icons/BottleIcon";

gsap.registerPlugin(ScrollTrigger);

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const PROBLEM_DAYS = [5, 18, 26]; // 0-indexed: Day 6, 19, 27 (Randomized "red" days)

export default function CalendarSection() {
    const container = useRef<HTMLDivElement>(null);
    const gridContainer = useRef<HTMLDivElement>(null);
    const textSection = useRef<HTMLDivElement>(null);
    const overlayText = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const dayCells = gsap.utils.toArray<HTMLElement>(".day-cell");
            const bottles = gsap.utils.toArray<HTMLElement>(".bottle-icon");
            const redCells = PROBLEM_DAYS.map((i) => dayCells[i]);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center", // Start when section is centered
                    toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
                },
            });

            // 1. Grid Fades In
            tl.from(gridContainer.current, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: "power2.out",
            })
                // 2. Days Populate (Auto-play fast)
                .from(dayCells, {
                    scale: 0,
                    opacity: 0,
                    stagger: {
                        amount: 1,
                        grid: [6, 5],
                        from: "start",
                    },
                    duration: 0.8,
                    ease: "back.out(1.2)",
                }, "-=0.3")
                // 3. Problem Days Flash
                .to(redCells, {
                    backgroundColor: "#0B9488",
                    color: "#fff",
                    scale: 1.1,
                    duration: 0.4,
                    yoyo: true,
                    repeat: 1,
                })
                .to(redCells, {
                    backgroundColor: "#0B9488",
                    color: "#fff",
                    scale: 1.05,
                    duration: 0.3,
                })
                // 4. Bottles Appear
                .from(bottles, {
                    opacity: 0,
                    scale: 0,
                    stagger: 0.02,
                    duration: 0.5,
                }, "-=0.2")
                // 5. Overlay Text
                .from(overlayText.current, {
                    opacity: 0,
                    scale: 0.9,
                    y: 10,
                    duration: 0.6,
                    ease: "power2.out"
                }, "+=0.1");

        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="min-h-screen w-full bg-white flex flex-col lg:flex-row items-center justify-center p-4 lg:p-12 overflow-hidden relative pb-20 md:pb-0"
        >
            {/* Left: Text - Centered Vertically */}
            <div ref={textSection} className="lg:w-1/3 mb-12 lg:mb-0 lg:pr-12 pointer-events-none z-10 text-center lg:text-left flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4 md:mb-8 leading-tight">
                    Out of 30 days,
                    <br />
                    skin has issues for maybe 2–3.
                </h2>
                <h3 className="text-xl md:text-3xl text-charcoal/60 font-medium">
                    But we use harsh products
                    <br />
                    <span className="text-turquoise font-bold">for all 30.</span>
                </h3>
            </div>

            {/* Right: Calendar Grid - Centered */}
            <div className="lg:w-2/3 relative w-full flex items-center justify-center py-10">
                <div
                    ref={gridContainer}
                    className="grid grid-cols-6 md:grid-cols-5 gap-1 md:gap-4 max-w-xl mx-auto w-full"
                >
                    {DAYS.map((day, i) => {
                        const isProblemDay = PROBLEM_DAYS.includes(i);
                        return (
                            <div
                                key={day}
                                className={`day-cell aspect-square border ${isProblemDay
                                    ? "border-turquoise/30" // Will animate to filled
                                    : "border-charcoal/10"
                                    } rounded-lg md:rounded-xl relative flex flex-col items-center justify-center bg-white shadow-sm`}
                            >
                                <span className={`text-xs md:text-base font-medium mb-1 z-10 relative ${isProblemDay ? 'text-charcoal' : 'text-charcoal/40'}`}>
                                    {day}
                                </span>

                                {/* Bottle Icon */}
                                <div className="bottle-icon w-4 h-4 md:w-6 md:h-6 text-charcoal/80 z-10 relative">
                                    <BottleIcon />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Overlay Message */}
                <div ref={overlayText} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-turquoise/20 text-center z-30 w-3/4 md:w-auto">
                    <p className="text-xl md:text-2xl font-bold text-charcoal mb-2">2-3 days of problems.</p>
                    <p className="text-lg md:text-xl text-turquoise font-medium">30 days of treatment.</p>
                </div>
            </div>
        </section>
    );
}
