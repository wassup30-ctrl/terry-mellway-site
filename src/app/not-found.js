import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-6xl text-charcoal mb-4">404</h1>
        <p className="text-charcoal-light mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-brown text-white text-sm tracking-wide uppercase rounded-md hover:bg-brown-light transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
