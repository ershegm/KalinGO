
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, Plus, Edit, Trash } from 'lucide-react';
import { Database } from '@/types/database.types';

type RouteType = Database['public']['Tables']['routes']['Row'];

const AdminRoutes = () => {
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('routes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRoutes(data || []);
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить маршруты',
        variant: 'destructive',
      });
      console.error('Error fetching routes:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoute = async (id: string) => {
    try {
      setIsDeleting(id);
      
      // First delete all points of interest associated with the route
      const { error: pointsError } = await supabase
        .from('points_of_interest')
        .delete()
        .eq('route_id', id);
        
      if (pointsError) throw pointsError;
      
      // Then delete the route
      const { error } = await supabase
        .from('routes')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: 'Маршрут удален',
        description: 'Маршрут был успешно удален из системы',
      });
      
      // Update the routes list
      setRoutes((prev) => prev.filter(route => route.id !== id));
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить маршрут',
        variant: 'destructive',
      });
      console.error('Error deleting route:', error.message);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Управление маршрутами</h1>
            <Button asChild>
              <Link to="/admin/routes/create">
                <Plus className="mr-2 h-4 w-4" /> Добавить маршрут
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-kalingo-blue" />
              </div>
            ) : routes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 p-6">
                <p className="text-gray-500 mb-4">Маршрутов пока нет</p>
                <Button asChild>
                  <Link to="/admin/routes/create">
                    <Plus className="mr-2 h-4 w-4" /> Добавить первый маршрут
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Сложность</TableHead>
                    <TableHead>Длительность</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.title}</TableCell>
                      <TableCell>{route.category}</TableCell>
                      <TableCell>{route.difficulty}</TableCell>
                      <TableCell>{route.duration} мин</TableCell>
                      <TableCell className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/routes/edit/${route.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Удаление маршрута</DialogTitle>
                              <DialogDescription>
                                Вы уверены, что хотите удалить маршрут "{route.title}"? 
                                Это действие нельзя отменить.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button variant="outline">Отмена</Button>
                              <Button 
                                variant="destructive" 
                                onClick={() => handleDeleteRoute(route.id)}
                                disabled={isDeleting === route.id}
                              >
                                {isDeleting === route.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : null}
                                Удалить
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;
