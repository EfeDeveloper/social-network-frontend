export interface User {
  id: string;
  firstName: string;
  lastName: string;
  alias: string;
  birthDate: string;
  avatar?: string;
}

export interface Post {
  id: string;
  message: string;
  user: User;
  likesCount: number;
  likedByCurrentUser: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}
