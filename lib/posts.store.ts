import { create } from 'zustand';
import type { PostsState } from '@/types';
import { createPost, getAllPosts, postToggleLike } from './api/posts.service';

function getErrorMessage(error: unknown, fallback = 'Failed to load posts'): string {
  return error instanceof Error ? error.message : fallback;
}

interface PostsStore extends PostsState {
  fetchPosts: () => Promise<void>;
  createPost: (message: string) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const usePostsStore = create<PostsStore>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const allPost = await getAllPosts();

      set({ posts: allPost, isLoading: false });
    } catch (error) {
      set({
        error: getErrorMessage(error, 'Failed to load posts'),
        isLoading: false,
      });
    }
  },

  createPost: async (message: string) => {
    set({ isLoading: true, error: null });

    try {
      const createdPost = await createPost(message);

      set((state) => ({
        posts: [createdPost, ...state.posts],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: getErrorMessage(error, 'Failed to create post'),
        isLoading: false,
      });
    }
  },

  toggleLike: async (postId: string) => {
    set({ error: null });

    try {
      const likedAPost = await postToggleLike(postId);

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likedByCurrentUser: likedAPost.liked,
                likesCount: likedAPost.likesCount,
              }
            : post
        ),
      }));
    } catch (error) {
      set({
        error: getErrorMessage(error, 'Failed to toggle like'),
      });
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({ posts: [], isLoading: false, error: null }),
}));
