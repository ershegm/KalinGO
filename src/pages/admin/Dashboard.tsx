
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, User, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    routes: 0,
    users: 0,
    reviews: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // Get route count
        const { count: routesCount, error: routesError } = await supabase
          .from('routes')
          .select('*', { count: 'exact', head: true });
          
        if (routesError) throw routesError;
        
        // Get user count
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        if (usersError) throw usersError;
        
        // Get reviews count
        const { count: reviewsCount, error: reviewsError } = await supabase
          .from('reviews')
          .select('*', { count: 'exact', head: true });
          
        if (reviewsError) throw reviewsError;
        
        setStats({
          routes: routesCount || 0,
          users: usersCount || 0,
          reviews: reviewsCount || 0
        });
      } catch (error: any) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить статистику',
          variant: 'destructive'
        });
        console.error('Error fetching stats:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, [toast]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Панель администратора</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Маршруты</CardTitle>
                <Map className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.routes}</div>
                <p className="text-xs text-muted-foreground">Всего маршрутов в системе</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
                <p className="text-xs text-muted-foreground">Зарегистрированных пользователей</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Отзывы</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.reviews}</div>
                <p className="text-xs text-muted-foreground">Оставленных отзывов</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Добро пожаловать в панель администратора</h2>
            <p className="text-gray-600">
              Используйте боковое меню для управления маршрутами и пользователями. Вы можете добавлять новые маршруты, 
              редактировать существующие и просматривать статистику по сайту.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
