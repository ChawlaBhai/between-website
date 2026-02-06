"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
    email: string;
    type: string;
};

// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzbawPH0V2O7b0vtYgD5aU2Gwjv4_wcexc3lX5qQ75uo7jm0juaqdZGQ4AoW4Pr7JctJg/exec";

export default function CloseSection() {
    const container = useRef<HTMLDivElement>(null);
    const headline = useRef<HTMLHeadingElement>(null);
    const ctaContainer = useRef<HTMLDivElement>(null);

    const [showWaitlist, setShowWaitlist] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitError("");

        try {


            // Send to Google Sheets (via Apps Script)
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8", // text/plain prevents preflight OPTIONS request
                },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    ...data
                }),
            });

            // With no-cors, we can't check response.ok, so we assume success if no info thrown
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setSubmitError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(headline.current, {
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: "power2.out",
            });

        },
        { scope: container }
    );

    return (
        <section ref={container} className="h-screen w-full bg-white flex flex-col items-center justify-center py-24 md:py-12 px-6 relative z-10 pb-28 md:pb-20">

            <div className="text-center mb-10 md:mb-16 max-w-4xl pt-20 md:pt-0">
                <h2 ref={headline} className="text-4xl md:text-7xl font-bold text-charcoal leading-tight">
                    Growing skin doesn't need to be fixed.
                    <br />
                    <span className="text-turquoise mt-4 md:mt-6 block">Let's prove it!</span>
                </h2>
            </div>

            <div ref={ctaContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl items-center">

                {/* Investor CTA */}
                <a
                    href="https://drive.google.com/file/d/18V2tOE_IhWXupbS8PpuJjCq5adD7YJAb/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-[60px] px-8 rounded-full border-2 border-turquoise text-turquoise font-bold text-lg hover:bg-turquoise/5 transition-colors w-full text-center"
                >
                    View Pitch Deck
                </a>

                {/* Parent/Waitlist CTA */}
                {!showWaitlist ? (
                    <div
                        role="button"
                        onClick={() => setShowWaitlist(true)}
                        className="flex items-center justify-center h-[60px] px-8 rounded-full bg-turquoise text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all w-full text-center cursor-pointer select-none border-2 border-transparent"
                    >
                        Join the Waitlist
                    </div>
                ) : (
                    <div className="w-full bg-gray-50 p-6 rounded-2xl border border-charcoal/10 animate-in fade-in slide-in-from-bottom-4 duration-300 md:col-start-2">
                        {!submitted ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <input
                                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                    type="email"
                                    placeholder="Enter email"
                                    className="px-4 py-3 rounded-lg border border-charcoal/20 focus:outline-none focus:border-turquoise bg-white w-full text-charcoal"
                                />
                                {errors.email && <span className="text-red-500 text-sm">Valid email required</span>}

                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer text-charcoal/80">
                                        <input {...register("type")} type="radio" value="parent" className="accent-turquoise" defaultChecked /> Parent
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-charcoal/80">
                                        <input {...register("type")} type="radio" value="teen" className="accent-turquoise" /> Teen
                                    </label>
                                </div>

                                {submitError && <span className="text-red-500 text-sm">{submitError}</span>}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-turquoise text-white rounded-lg font-bold hover:bg-turquoise/90 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? "Joining..." : "Join"}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-turquoise font-bold text-xl mb-2">You're on the list!</p>
                                <p className="text-charcoal/60 text-sm">We'll be in touch soon.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Partner CTA */}
                <a
                    href="mailto:sahajsadhu@gmail.com"
                    className="flex items-center justify-center h-[60px] px-8 rounded-full border-2 border-turquoise text-turquoise font-bold text-lg hover:bg-turquoise/5 transition-colors w-full text-center"
                >
                    Let's Talk
                </a>

            </div>

        </section>
    );
}
