import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Blog } from '../../types/blog';
import { formatShortDate } from '../../utils/dateUtils';
import { generateBlogUrl } from '../../utils/urlUtils';

interface Props {
  blog: Blog;
}

const BlogCard: React.FC<Props> = ({ blog }) => {
  const blogUrl = generateBlogUrl(blog.content_type, blog.title);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            blog.content_type === 'article' ? 'bg-blue-100 text-blue-800' :
            blog.content_type === 'video' ? 'bg-red-100 text-red-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {blog.content_type}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {formatShortDate(blog.published_at)}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
        <p className="text-gray-600 mb-4">{blog.description}</p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-1" />
            <span>Admin</span>
          </div>
          
          <Link
            to={blogUrl}
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            Read More
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;