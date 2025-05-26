
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyState = ({ onAddClick }: EmptyStateProps) => {
  return (
    <div className="bg-gray-50 p-6 text-center rounded-lg">
      <p className="text-gray-500">Для этого маршрута пока нет точек интереса</p>
      <Button onClick={onAddClick} variant="outline" className="mt-4">
        <Plus className="h-4 w-4 mr-2" />
        Добавить первую точку
      </Button>
    </div>
  );
};

export default EmptyState;
