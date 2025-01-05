import React from 'react';
import BlogCard from './BlogCard';
import type { Blog } from '../../types/blog';

interface Props {
  blogs: Blog[];
}

const BlogGrid: React.FC<Props> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.educational_content_id} blog={blog} />
      ))}
      {blogs.length === 0 && (
        <div className="py-12 text-center text-gray-500 col-span-full">
          No blogs found.
        </div>
      )}
    </div>
  );
};

export default BlogGrid;