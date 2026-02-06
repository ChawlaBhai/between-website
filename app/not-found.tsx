import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white text-charcoal">
            <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
            <p className="mb-8 text-charcoal/60">Could not find requested resource</p>
            <Link href="/" className="px-6 py-3 bg-turquoise text-white rounded-full font-bold hover:bg-turquoise/90 transition-colors">
                Return Home
            </Link>
        </div>
    )
}
