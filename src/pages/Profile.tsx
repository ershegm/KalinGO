import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Save, User } from 'lucide-react';
import { Database } from '@/types/database.types';

const profileSchema = z.object({
  username: z.string().min(3, 'Имя пользователя должно содержать минимум 3 символа'),
  full_name: z.string().optional(),
  bio: z.string().max(250, 'Биография не должна превышать 250 символов').optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

const Profile = () => {
  const { user, profile, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: profile?.username || '',
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const updateData: ProfileUpdate = {
        username: data.username,
        full_name: data.full_name,
        bio: data.bio,
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Профиль обновлен',
        description: 'Ваш профиль был успешно обновлен',
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error?.message || 'Не удалось обновить профиль',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase();
    }
    return profile?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || 'User'} />
                <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <User className="mr-2 h-4 w-4" /> Изменить фото
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{profile?.full_name || profile?.username || 'Пользователь'}</h1>
              <p className="text-gray-500 mb-4">{user?.email}</p>
              <Button variant="destructive" onClick={signOut}>
                Выйти из аккаунта
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="favorites">Избранное</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя пользователя</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="username"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Полное имя</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Иван Иванов"
                            {...field}
                            value={field.value || ''}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>О себе</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Немного о себе..."
                            className="resize-none"
                            {...field}
                            value={field.value || ''}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Сохранение...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Сохранить изменения
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="favorites">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">У вас пока нет избранных маршрутов</h3>
                <p className="text-gray-500">
                  Добавляйте маршруты в избранное, чтобы быстро находить их здесь
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
