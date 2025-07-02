'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';
import { usePostsStore } from '@/lib/posts.store';
import type { Post } from '@/types';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { toggleLike } = usePostsStore();
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      await toggleLike(post.id);
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;

    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.avatar} alt={post.user.firstName} />
            <AvatarFallback>
              {post.user.firstName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <p className="font-semibold text-sm">{post.user.firstName}</p>
            <p className="text-muted-foreground text-xs">{formatDate(post.createdAt)}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="mb-4 text-sm leading-relaxed">{post.message}</p>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
            className={cn('h-8 px-2 text-xs', post.isLiked && 'text-red-500 hover:text-red-600')}
          >
            <Heart className={cn('h-4 w-4 mr-1', post.isLiked && 'fill-current')} />
            {post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
