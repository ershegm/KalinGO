
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/database.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Edit, Trash, MoveUp, MoveDown } from 'lucide-react';

type RoutePointType = Database['public']['Tables']['points_of_interest']['Row'];

interface PointsListProps {
  points: RoutePointType[];
  onEdit: (point: RoutePointType) => void;
  onPointsChanged: () => void;
}

const PointsList = ({ points, onEdit, onPointsChanged }: PointsListProps) => {
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDeletePoint = async (pointId: string) => {
    try {
      setDeleting(pointId);
      
      const { error } = await supabase
        .from('points_of_interest')
        .delete()
        .eq('id', pointId);
        
      if (error) throw error;
      
      toast({
        title: 'Точка удалена',
        description: 'Точка маршрута успешно удалена',
      });
      
      onPointsChanged();
    } catch (error: any) {
      console.error('Error deleting point:', error.message);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить точку маршрута',
        variant: 'destructive',
      });
    } finally {
      setDeleting(null);
    }
  };
  
  const handleMovePoint = async (point: RoutePointType, direction: 'up' | 'down') => {
    try {
      const newIndex = direction === 'up' ? point.order_index - 1 : point.order_index + 1;
      
      // Find the point at the destination position
      const otherPoint = points.find(p => p.order_index === newIndex);
      
      if (!otherPoint) return;
      
      // Swap the order indexes
      await Promise.all([
        supabase
          .from('points_of_interest')
          .update({ order_index: newIndex })
          .eq('id', point.id),
          
        supabase
          .from('points_of_interest')
          .update({ order_index: point.order_index })
          .eq('id', otherPoint.id)
      ]);
      
      onPointsChanged();
    } catch (error: any) {
      console.error('Error moving point:', error.message);
      toast({
        title: 'Ошибка',
        description: 'Не удалось изменить порядок точек',
        variant: 'destructive',
      });
    }
  };

  if (points.length === 0) {
    return (
      <div className="bg-gray-50 p-6 text-center rounded-lg">
        <p className="text-gray-500">Для этого маршрута пока нет точек интереса</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {points.map((point) => (
        <Card key={point.id}>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">
              Точка {point.order_index + 1}: {point.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {point.image && (
              <img 
                src={point.image} 
                alt={point.name} 
                className="h-40 object-cover rounded-md mb-2" 
              />
            )}
            {point.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {point.description}
              </p>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0 justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                disabled={point.order_index === 0} 
                onClick={() => handleMovePoint(point, 'up')}
              >
                <MoveUp className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                disabled={point.order_index === points.length - 1} 
                onClick={() => handleMovePoint(point, 'down')}
              >
                <MoveDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(point)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Изменить
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeletePoint(point.id)}
                disabled={deleting === point.id}
              >
                {deleting === point.id ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Trash className="h-4 w-4 mr-2" />
                )}
                Удалить
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PointsList;
