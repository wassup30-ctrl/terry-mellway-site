'use client';

import { useState, useEffect, use } from 'react';
import BlogPostForm from '@/components/admin/BlogPostForm';

export default function EditBlogPost({ params }) {
  const { slug } = use(params);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/blog/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setPost)
      .catch(() => setError('Post not found'));
  }, [slug]);

  if (error) {
    return <div className="text-center py-12 text-charcoal-light">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-12 text-charcoal-light">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal mb-6">Edit Post</h1>
      <BlogPostForm post={post} isEdit />
    </div>
  );
}
