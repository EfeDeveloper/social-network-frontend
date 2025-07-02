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

    try {
      await createPost(message.trim());
      router.push('/posts');
    } catch (error) {
      // Error manejado por el store
    }
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
                  Volver a publicaciones
                </Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Nueva Publicación</CardTitle>
                <CardDescription>Comparte tus pensamientos con la comunidad</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      placeholder="¿Qué está pasando?"
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
                        {characterCount}/{maxCharacters} caracteres
                      </span>

                      {isOverLimit && (
                        <span className="text-destructive text-xs">
                          Excede el límite de caracteres
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
                          Publicando...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 w-4 h-4" />
                          Publicar
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/posts')}
                      disabled={isLoading}
                    >
                      Cancelar
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
