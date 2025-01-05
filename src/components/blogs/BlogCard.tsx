import React from 'react';
import { Calendar, User, ExternalLink } from 'lucide-react';
import type { Blog } from '../../types/blog';

interface Props {
  blog: Blog;
}

const BlogCard: React.FC<Props> = ({ blog }) => {
  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'infographic':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getContentTypeColor(blog.content_type)}`}>
            {blog.content_type}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(blog.uploaded_at).toLocaleDateString()}
          </div>
        </div>

        <h3 className="mb-2 text-xl font-semibold text-gray-900">{blog.title}</h3>
        <p className="mb-4 text-gray-600">{blog.description}</p>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-1" />
            <span>Admin</span>
          </div>
          
          <a
            href={blog.content_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            Read More
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;