import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlog } from '../services/blogService';
import { Blog } from '../types/blog';
import BlogContent from '../components/blogs/BlogContent';
import PublicLayout from '../components/layout/public/PublicLayout';
import Breadcrumb from '../components/common/Breadcrumb';

const BlogDetail = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        if (!category || !slug) return;
        const data = await getBlog(category, slug);
        setBlog(data);
      } catch (error) {
        console.error('Error loading blog:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, [category, slug]);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
        </div>
      </PublicLayout>
    );
  }

  if (!blog) {
    return (
      <PublicLayout>
        <div className="text-center py-12">
          <p className="text-red-600">Blog post not found</p>
        </div>
      </PublicLayout>
    );
  }

  const breadcrumbItems = [
    { label: 'Blogs', href: '/blogs' },
    { label: blog.content_type, href: `/blogs/${blog.content_type}` },
    { label: blog.title, href: '#' }
  ];

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <BlogContent blog={blog} />
      </div>
    </PublicLayout>
  );
};

export default BlogDetail;