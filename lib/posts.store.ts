import { create } from 'zustand';
import type { Post, PostsState } from '@/types';

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
      // TODO: Replace with real API call (e.g. await postService.fetchAll())
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockPosts: Post[] = [
        {
          id: '1',
          userId: '2',
          user: {
            id: '2',
            firstName: 'Ana García',
            lastName: 'test',
            alias: 'ana@example.com',
            birthDate: new Date(),
          },
          message:
            'We just launched our new app! 🚀 Excited to share this project with all of you.',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: [],
          likesCount: 15,
          isLiked: false,
        },
      ];

      set({ posts: mockPosts, isLoading: false });
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
      // TODO: Replace with real API call (e.g. await postService.create(...))
      await new Promise((resolve) => setTimeout(resolve, 500));

      const user = {
        id: '1',
        alias: 'test',
        firstName: '',
        lastName: '',
        birthDate: new Date(),
      }; // Replace by your auth store user!
      const newPost: Post = {
        id: Date.now().toString(),
        userId: user.id,
        user,
        message,
        createdAt: new Date().toISOString(),
        likes: [],
        likesCount: 0,
        isLiked: false,
      };

      set((state) => ({
        posts: [newPost, ...state.posts],
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
      // TODO: Replace with real API call (e.g. await postService.toggleLike(...))
      await new Promise((resolve) => setTimeout(resolve, 200));

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
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
