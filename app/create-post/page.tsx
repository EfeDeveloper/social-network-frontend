'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthGuard } from '@/components/auth-guard';
import { Navbar } from '@/components/navbar';
import { usePostsStore } from '@/lib/posts.store';
import { Loader2, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreatePostPage() {
  const [message, setMessage] = useState('');
  const { createPost, isLoading, error, clearError } = usePostsStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    await createPost(message.trim());
    router.push('/posts');
  };

  const characterCount = message.length;
  const maxCharacters = 500;
  const isOverLimit = characterCount > maxCharacters;

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />

        <div className="mx-auto px-4 py-8 container">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6">
              <Button variant="ghost" asChild className="mb-4">
                <Link href="/posts">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Return to pots
                </Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">New post</CardTitle>
                <CardDescription>Share your thoughts with the community</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="¿What's happening?"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        clearError();
                      }}
                      disabled={isLoading}
                      rows={6}
                      className="resize-none"
                    />

                    <div className="flex justify-between items-center text-sm">
                      <span
                        className={`${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}
                      >
                        {characterCount}/{maxCharacters} Characters
                      </span>

                      {isOverLimit && (
                        <span className="text-destructive text-xs">
                          Exceeds the characters limit
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      disabled={isLoading || !message.trim() || isOverLimit}
                      className="flex-1"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Publishing ...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 w-4 h-4" />
                          Post
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/posts')}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
