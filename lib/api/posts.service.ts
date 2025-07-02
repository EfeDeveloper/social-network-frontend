import { api } from './axios.config';
import type { LikedPost, Post } from '@/types';

export async function getAllPosts(): Promise<Post[]> {
  const response = await api.get<Post[]>('/posts');
  return response.data;
}

export async function createPost(message: string): Promise<Post> {
  const response = await api.post<Post>(`/posts`, { message });
  return response.data;
}

export async function postToggleLike(postId: string): Promise<LikedPost> {
  const response = await api.post(`/posts/${postId}/like`);
  return response.data;
}
