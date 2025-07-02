'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthGuard } from '@/components/auth-guard';
import { Navbar } from '@/components/navbar';
import { useAuthStore } from '@/lib/auth.store';
import { Loader2, User, Mail, Calendar, Edit } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile, isLoading, error, clearError } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateProfile(formData);
    setIsEditing(false);
    clearError();
  };

  const handleCancel = () => {
    setFormData({
      name: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
    });
    setIsEditing(false);
    clearError();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />

        <div className="mx-auto px-4 py-8 container">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.avatar} alt={user?.firstName} />
                    <AvatarFallback className="text-4xl">
                      {user?.firstName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <CardTitle className="text-2xl">My profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>

              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {!isEditing ? (
                  <div className="space-y-6">
                    <div className="gap-4 grid">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <Label className="font-medium text-sm">Name</Label>
                          <p className="text-muted-foreground text-sm">{user?.firstName}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <Label className="font-medium text-sm">Alias</Label>
                          <p className="text-muted-foreground text-sm">{user?.alias}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <Label className="font-medium text-sm">Birthday</Label>
                          <p className="text-muted-foreground text-sm">
                            {user?.birthDate && formatDate(user.birthDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button onClick={() => setIsEditing(true)} className="w-full">
                      <Edit className="mr-2 w-4 h-4" />
                      Edit profile
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">last name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        type="submit"
                        disabled={isLoading || !formData.name.trim()}
                        className="flex-1"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Look at...
                          </>
                        ) : (
                          'Save changes'
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex-1 bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
