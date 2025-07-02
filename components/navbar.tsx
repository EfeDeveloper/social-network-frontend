'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/lib/auth.store';
import { LogOut, User, Home, PlusCircle } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b">
      <div className="mx-auto px-4 container">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/posts" className="font-bold text-xl">
              Social network
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <Button variant={pathname === '/posts' ? 'default' : 'ghost'} size="sm" asChild>
                <Link href="/posts">
                  <Home className="mr-2 w-4 h-4" />
                  Home
                </Link>
              </Button>

              <Button variant={pathname === '/create-post' ? 'default' : 'ghost'} size="sm" asChild>
                <Link href="/create-post">
                  <PlusCircle className="mr-2 w-4 h-4" />
                  Create a post
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant={pathname === '/profile' ? 'default' : 'ghost'} size="sm" asChild>
              <Link href="/profile">
                <User className="mr-2 w-4 h-4" />
                Profile
              </Link>
            </Button>

            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} alt={user.firstName} />
                <AvatarFallback>
                  {user.firstName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
