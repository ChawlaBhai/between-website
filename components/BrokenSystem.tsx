"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const PROBLEMS = [
    "Every product = a problem solver",
    "Every routine = corrective",
    "Every breakout = an emergency",
];

export default function BrokenSystem() {
    const container = useRef<HTMLDivElement>(null);
    const mainText = useRef<HTMLHeadingElement>(null);
    const rotatingTextRef = useRef<HTMLDivElement>(null);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

    useGSAP(
        () => {
            // Typewriter Effect
            gsap.to(mainText.current, {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center", // Start typing when section hits center
                    toggleActions: "play none none reverse",
                },
                text: "Skincare became skin-cure.",
                duration: 1.5,
                ease: "none",
            });

            // Rotating Text Cycle (Fade In/Out)
            const fadeDuration = 0.5;
            const stayDuration = 2;

            const tl = gsap.timeline({ repeat: -1 });

            PROBLEMS.forEach((_, i) => {
                // We handle the text update manually or via state, but for GSAP timeline strictness
                // it's often easier to just animate opacity and swap text in a callback or have 3 absolute elements.
                // Let's use the state approach with a simple interval-like timeline triggering state changes? 
                // No, that might desync. Best to have all 3 elements and faint them in/out.
            });

            // Actually, let's just cycle opacity on the container and swap text? 
            // Or cleaner: Simple Interval in React useEffect for the rotation, 
            // keeping GSAP for the scroll enter/exit.
        },
        { scope: container }
    );

    // Rotating Text Interval
    useGSAP(() => {
        const interval = setInterval(() => {
            gsap.to(rotatingTextRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    setCurrentProblemIndex((prev) => (prev + 1) % PROBLEMS.length);
                    gsap.to(rotatingTextRef.current, { opacity: 1, duration: 0.5 });
                }
            });
        }, 3000);

        return () => clearInterval(interval);
    }, { scope: container });

    // Parallax / Exit effect
    useGSAP(() => {
        gsap.to(container.current, {
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            scale: 0.95,
            opacity: 0
        })
    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white z-20"
        >
            <div className="text-center px-4 max-w-4xl">
                <h2
                    ref={mainText}
                    className="text-5xl md:text-7xl font-bold text-charcoal mb-12 min-h-[1.2em]"
                >
                    {/* Text injected by GSAP */}
                </h2>

                <div
                    ref={rotatingTextRef}
                    className="h-16 flex items-center justify-center"
                >
                    <p className="text-xl md:text-3xl text-charcoal/60 font-medium italic">
                        {PROBLEMS[currentProblemIndex]}
                    </p>
                </div>
            </div>
        </section>
    );
}
