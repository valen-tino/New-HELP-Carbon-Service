import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Blog } from '../../../types/blog';
import { deleteBlog } from '../../../services/blogService';
import { formatShortDate } from '../../../utils/dateUtils';

interface Props {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: () => void;
}

const BlogList: React.FC<Props> = ({ blogs, onEdit, onDelete }) => {
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
        onDelete();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Type
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {blogs.map((blog) => (
            <tr key={blog.educational_content_id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                <div className="text-sm text-gray-500">{blog.description.substring(0, 100)}...</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                  {blog.content_type}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {formatShortDate(blog.published_at)}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <button 
                  onClick={() => onEdit(blog)}
                  className="mr-4 text-indigo-600 hover:text-indigo-900"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(blog.educational_content_id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;