import api from './api';
import { Blog, BlogInput } from '../types/blog';
import { slugify } from '../utils/urlUtils';

export async function getBlogs() {
  const response = await api.get('/blogs');
  return response.data;
}

export async function getBlog(category: string, slug: string) {
  const response = await api.get(`/blogs/${category}/${slug}`);
  return response.data;
}

export async function createBlog(data: BlogInput) {
  const response = await api.post('/blogs', {
    ...data,
    slug: slugify(data.title)
  });
  return response.data;
}

export async function updateBlog(id: number, data: Partial<BlogInput>) {
  const response = await api.put(`/blogs/${id}`, {
    ...data,
    slug: data.title ? slugify(data.title) : undefined
  });
  return response.data;
}

export async function deleteBlog(id: number) {
  return api.delete(`/blogs/${id}`);
}