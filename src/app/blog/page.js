import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export const metadata = {
  title: 'Blog',
  description: 'Studio updates, works in progress, and thoughts from Terry Mellway — coloured pencil, watercolour, and oil artist.',
};

export default function BlogPage() {
  return (
    <div className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal mb-3">From the Studio</h1>
          <p className="text-charcoal-light max-w-lg mx-auto">
            Works in progress, completed pieces, and thoughts from the easel.
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <time className="text-xs text-charcoal-light tracking-wide uppercase">
                  {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h2 className="font-serif text-2xl text-charcoal mt-1 mb-2 group-hover:text-brown transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-charcoal-light line-clamp-3">{post.excerpt}</p>
                <span className="inline-block mt-3 text-brown text-sm tracking-wide group-hover:underline">
                  Read more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
