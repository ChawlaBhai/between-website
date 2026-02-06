"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProofSection() {
    const container = useRef<HTMLDivElement>(null);
    const headline = useRef<HTMLHeadingElement>(null);
    const statsContainer = useRef<HTMLDivElement>(null);
    const subtext = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Reveal Sequence
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(headline.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out",
            });

            // Animate Numbers
            const statItems = gsap.utils.toArray<HTMLElement>(".stat-item");
            statItems.forEach((item, i) => {
                const numberEl = item.querySelector(".stat-number");
                const targetValue = parseInt(numberEl?.getAttribute("data-target") || "0", 10);

                // Custom object to tween
                const counter = { val: 0 };

                tl.to(counter, {
                    val: targetValue,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (numberEl) {
                            numberEl.textContent = Math.ceil(counter.val) + (item.getAttribute("data-suffix") || "");
                        }
                    }
                }, i === 0 ? "-=0.4" : "-=1.8"); // Overlap animations

                tl.from(item, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power2.out"
                }, "<");
            });

            tl.from(subtext.current, {
                opacity: 0,
                duration: 1,
                delay: 0.5
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="min-h-[80vh] w-full bg-white flex flex-col items-center justify-center py-24 px-6">

            <h2 ref={headline} className="text-4xl md:text-6xl font-bold text-charcoal mb-20 text-center">
                We didn't guess. We asked.
            </h2>

            <div ref={statsContainer} className="flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center mb-16 w-full max-w-6xl">

                {/* Stat 1 */}
                <div className="stat-item flex flex-col items-center text-center" data-suffix="+">
                    <span className="stat-number text-7xl md:text-9xl font-bold text-turquoise mb-4" data-target="500">0</span>
                    <p className="text-charcoal font-bold text-xl uppercase tracking-widest">In-person interviews</p>
                </div>

                {/* Stat 2 */}
                <div className="stat-item flex flex-col items-center text-center" data-suffix="%">
                    <span className="stat-number text-7xl md:text-9xl font-bold text-turquoise mb-4" data-target="70">0</span>
                    <p className="text-charcoal font-bold text-xl uppercase tracking-widest">Said "This is a real problem"</p>
                </div>

                {/* Stat 3 */}
                <div className="stat-item flex flex-col items-center text-center" data-suffix="%">
                    <span className="stat-number text-7xl md:text-9xl font-bold text-turquoise mb-4" data-target="30">0</span>
                    <p className="text-charcoal font-bold text-xl uppercase tracking-widest">Said "I can't unsee it"</p>
                </div>

            </div>

            <div ref={subtext} className="text-center text-charcoal/60 text-lg md:text-xl max-w-2xl">
                <p>100+ formal survey responses. 30+ parents. Real names. Real data.</p>
                <p className="font-bold text-charcoal mt-2">This isn't theory. It's validated.</p>
            </div>

        </section>
    );
}
