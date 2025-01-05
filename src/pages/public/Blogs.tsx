import React, { useState, useEffect } from 'react';
import PublicLayout from '../../components/layout/public/PublicLayout';
import BlogGrid from '../../components/blogs/BlogGrid';
import BlogFilter from '../../components/blogs/BlogFilter';
import { getBlogs } from '../../services/blogService';
import type { Blog } from '../../types/blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBlogs = selectedType === 'all'
    ? blogs
    : blogs.filter(blog => blog.content_type === selectedType);

  return (
    <PublicLayout>
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Educational Blog</h1>
            <p className="mt-2 text-lg text-gray-600">
              Discover insights and tips for reducing your environmental impact
            </p>
          </div>

          <BlogFilter
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />

          {isLoading ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 mx-auto border-b-2 border-green-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : (
            <BlogGrid blogs={filteredBlogs} />
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default Blogs;