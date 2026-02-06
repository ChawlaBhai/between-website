import Image from "next/image";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-charcoal text-white py-2 px-6 md:px-12 flex justify-between items-center z-50 h-12 border-t border-white/10">
            <div className="flex items-center gap-3">
                {/* Logo added in previous step kept, but layout reverted to original */}
                {/* Logo */}
                <div className="w-25 h-35 relative">
                    <Image
                        src="/Between logo transparent white.png"
                        alt="Between Logo"
                        fill
                        sizes="150px"
                        className="object-contain"
                    />
                </div>
                {/* Text removed as per request */}
            </div>

            <div className="hidden md:block text-white/80 text-sm">
                Daily care for growing skin. Ages 8–18.
            </div>

            <a href="mailto:hello@between.in" className="text-white/80 hover:text-turquoise text-sm transition-colors">
                +91-7007162269
            </a>
        </footer>
    );
}
