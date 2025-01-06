import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Blog, BlogInput, BlogType } from '../../../types/blog';
import { createBlog, updateBlog } from '../../../services/blogService';

interface Props {
  blog?: Blog;
  onClose: () => void;
}

const BlogForm: React.FC<Props> = ({ blog, onClose }) => {
  const [formData, setFormData] = useState<BlogInput>({
    title: blog?.title || '',
    description: blog?.description || '',
    content_type: blog?.content_type || 'article',
    content: blog?.content || {},
    tags: blog?.tags || []
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContentChange = (value: any) => {
    setFormData(prev => ({
      ...prev,
      content: {
        [formData.content_type]: value
      }
    }));
  };

  const renderContentFields = () => {
    switch (formData.content_type) {
      case 'article':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Article Body</label>
              <textarea
                value={formData.content.article?.body || ''}
                onChange={(e) => handleContentChange({ 
                  body: e.target.value,
                  readingTime: Math.ceil(e.target.value.split(' ').length / 200)
                })}
                rows={10}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Video URL</label>
              <input
                type="url"
                value={formData.content.video?.url || ''}
                onChange={(e) => handleContentChange({ 
                  url: e.target.value,
                  duration: formData.content.video?.duration || 0
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                value={formData.content.video?.duration || ''}
                onChange={(e) => handleContentChange({ 
                  url: formData.content.video?.url || '',
                  duration: parseInt(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          </div>
        );

      case 'infographic':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={formData.content.infographic?.imageUrl || ''}
                onChange={(e) => handleContentChange({ 
                  imageUrl: e.target.value,
                  altText: formData.content.infographic?.altText || ''
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alt Text</label>
              <input
                type="text"
                value={formData.content.infographic?.altText || ''}
                onChange={(e) => handleContentChange({ 
                  imageUrl: formData.content.infographic?.imageUrl || '',
                  altText: e.target.value
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          </div>
        );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (blog) {
        await updateBlog(blog.educational_content_id, formData);
      } else {
        await createBlog(formData);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save blog');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {blog ? 'Edit Blog Post' : 'New Blog Post'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content Type</label>
            <select
              value={formData.content_type}
              onChange={(e) => setFormData({ 
                ...formData, 
                content_type: e.target.value as BlogType,
                content: {} // Reset content when type changes
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="infographic">Infographic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          {renderContentFields()}

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
              })}
              placeholder="Enter tags separated by commas"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : blog ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;