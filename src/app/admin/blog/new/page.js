'use client';

import BlogPostForm from '@/components/admin/BlogPostForm';

export default function NewBlogPost() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal mb-6">New Blog Post</h1>
      <BlogPostForm />
    </div>
  );
}
