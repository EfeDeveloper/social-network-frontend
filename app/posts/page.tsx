'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthGuard } from '@/components/auth-guard';
import { Navbar } from '@/components/navbar';
import { PostCard } from '@/components/post-card';
import { usePostsStore } from '@/lib/posts.store';
import { PlusCircle, RefreshCw } from 'lucide-react';

export default function PostsPage() {
  const { posts, isLoading, error, fetchPosts, clearError } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = () => {
    clearError();
    fetchPosts();
  };

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />

        <div className="mx-auto px-4 py-8 container">
          <div className="mx-auto max-w-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="font-bold text-3xl">Post</h1>
                <p className="text-muted-foreground">Discover what the community is sharing</p>
              </div>

              <Button asChild>
                <Link href="/create-post">
                  <PlusCircle className="mr-2 w-4 h-4" />
                  New post
                </Link>
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription className="flex justify-between items-center">
                  <span>{error}</span>
                  <Button variant="outline" size="sm" onClick={handleRefresh}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg animate-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-gray-200 rounded-full w-10 h-10"></div>
                      <div className="space-y-2">
                        <div className="bg-gray-200 rounded w-24 h-4"></div>
                        <div className="bg-gray-200 rounded w-16 h-3"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-200 rounded h-4"></div>
                      <div className="bg-gray-200 rounded w-3/4 h-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 w-12 h-12 text-muted-foreground">
                  <PlusCircle className="w-full h-full" />
                </div>
                <h3 className="mb-2 font-semibold text-lg">There are no post</h3>
                <p className="mb-4 text-muted-foreground">
                  Be the first to share something with the community!
                </p>
                <Button asChild>
                  <Link href="/create-post">Create first post</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
