
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Database } from '@/types/database.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type RoutePointType = Database['public']['Tables']['points_of_interest']['Row'];

// Point form schema
const pointSchema = z.object({
  name: z.string().min(3, "Название должно содержать минимум 3 символа"),
  description: z.string().optional(),
  image: z.string().url("Введите корректный URL изображения").optional().or(z.literal("")),
  order_index: z.number(),
});

type PointFormValues = z.infer<typeof pointSchema>;

interface PointFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: PointFormValues) => Promise<void>;
  editingPoint: RoutePointType | null;
  pointsCount: number;
  saving: boolean;
}

const PointFormDialog = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingPoint, 
  pointsCount, 
  saving 
}: PointFormDialogProps) => {
  const form = useForm<PointFormValues>({
    resolver: zodResolver(pointSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      order_index: pointsCount,
    },
  });

  // Set form values when editing a point
  useEffect(() => {
    if (editingPoint) {
      form.reset({
        name: editingPoint.name,
        description: editingPoint.description || '',
        image: editingPoint.image || '',
        order_index: editingPoint.order_index,
      });
    } else {
      form.reset({
        name: '',
        description: '',
        image: '',
        order_index: pointsCount,
      });
    }
  }, [editingPoint, form, pointsCount]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editingPoint ? "Редактирование точки" : "Добавление точки маршрута"}
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о точке интереса на маршруте
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название точки</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Введите описание точки маршрута" 
                      className="min-h-[100px]"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL изображения</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/image.jpg" 
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Ссылка на изображение, которое будет отображаться для этой точки
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Отмена
                </Button>
              </DialogClose>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingPoint ? "Сохранить изменения" : "Добавить точку"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PointFormDialog;
