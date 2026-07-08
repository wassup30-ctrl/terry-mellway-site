import Link from 'next/link';
import { getBlogData } from '@/lib/data';
import { notFound } from 'next/navigation';
import RichText from '@/components/RichText';

// Render per-request so admin edits in KV show up immediately.
export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const { slug } = await props.params;
  const { posts } = await getBlogData();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage(props) {
  const { slug } = await props.params;
  const { posts } = await getBlogData();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const images = post.images || (post.image ? [post.image] : []);
  const featured = images[0] || post.image;
  const gallery = images.slice(1);

  const postIndex = posts.indexOf(post);
  const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;

  return (
    <article className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-charcoal-light mb-6">
          <Link href="/blog" className="hover:text-brown transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <time className="text-sm text-charcoal-light tracking-wide uppercase">
            {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal mt-2 mb-4">
            {post.title}
          </h1>
        </header>

        {/* Featured image */}
        {featured && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={featured}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-none">
          <RichText text={post.content} paragraphClassName="text-charcoal-light leading-relaxed mb-4" />
        </div>

        {/* Additional images */}
        {gallery.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gallery.map((src, i) => (
              <div key={`${src}-${i}`} className="rounded-lg overflow-hidden">
                <img
                  src={src}
                  alt={`${post.title} — image ${i + 2}`}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-warm-gray flex justify-between">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group flex items-center gap-2 text-charcoal-light hover:text-brown transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">{prevPost.title}</span>
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex items-center gap-2 text-charcoal-light hover:text-brown transition-colors text-right"
            >
              <span className="text-sm">{nextPost.title}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </div>
    </article>
  );
}
