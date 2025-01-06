import api from './api';
import { Blog, BlogInput } from '../types/blog';

export async function getBlogs() {
  const response = await api.get('/blogs');
  return response.data;
}

export async function getBlog(id: number) {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
}

export async function createBlog(data: BlogInput) {
  const response = await api.post('/blogs', data);
  return response.data;
}

export async function updateBlog(id: number, data: Partial<BlogInput>) {
  const response = await api.put(`/blogs/${id}`, data);
  return response.data;
}

export async function deleteBlog(id: number) {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
}