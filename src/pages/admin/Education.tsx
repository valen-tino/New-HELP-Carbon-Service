import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import BlogList from '../../components/admin/blogs/BlogList';
import BlogForm from '../../components/admin/blogs/BlogForm';
import { getBlogs } from '../../services/blogService';
import type { Blog } from '../../types/blog';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
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

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setSelectedBlog(null);
    setIsFormOpen(false);
    loadBlogs();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          <PlusCircle className="w-5 h-5" />
          Add Blog Post
        </button>
      </div>
      
      {isLoading ? (
        <div className="py-8 text-center">Loading blogs...</div>
      ) : (
        <BlogList 
          blogs={blogs} 
          onEdit={handleEdit} 
          onDelete={loadBlogs}
        />
      )}

      {isFormOpen && (
        <BlogForm
          blog={selectedBlog}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default AdminBlogs;