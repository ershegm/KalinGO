
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import BasicInfoForm from "./BasicInfoForm";
import MediaForm from "./MediaForm";
import ActionButtons from "./ActionButtons";
import { routeSchema } from "./schema";

type FormValues = z.infer<typeof routeSchema>;

interface RouteFormWrapperProps {
  isEditMode: boolean;
  id?: string;
  initialData?: FormValues;
  onSaveSuccess: (routeId: string) => void;
}

const RouteFormWrapper = ({
  isEditMode,
  id,
  initialData,
  onSaveSuccess,
}: RouteFormWrapperProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(routeSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      category: "cultural",
      difficulty: "medium",
      duration: 60,
      distance: undefined,
      start_point: "",
      end_point: "",
      image_url: "",
      map_embed_code: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      if (isEditMode) {
        const { error } = await supabase
          .from("routes")
          .update({
            title: data.title,
            description: data.description,
            category: data.category,
            difficulty: data.difficulty,
            duration: data.duration,
            distance: data.distance || null,
            start_point: data.start_point,
            end_point: data.end_point,
            image_url: data.image_url || null,
            map_embed_code: data.map_embed_code || null,
          })
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Маршрут обновлен",
          description: "Изменения маршрута успешно сохранены",
        });
        
        if (id) {
          onSaveSuccess(id);
        }
      } else {
        const { data: newRoute, error } = await supabase
          .from("routes")
          .insert({
            title: data.title,
            description: data.description,
            category: data.category,
            difficulty: data.difficulty,
            duration: data.duration,
            distance: data.distance || null,
            start_point: data.start_point,
            end_point: data.end_point,
            image_url: data.image_url || null,
            map_embed_code: data.map_embed_code || null,
          })
          .select('id')
          .single();

        if (error) throw error;

        toast({
          title: "Маршрут создан",
          description: "Новый маршрут успешно добавлен",
        });
        
        if (newRoute?.id) {
          onSaveSuccess(newRoute.id);
        }
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description:
          error?.message || "Произошла ошибка при сохранении маршрута",
        variant: "destructive",
      });
      console.error("Error saving route:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfoForm control={form.control} />
            <MediaForm control={form.control} />
            <ActionButtons isEditMode={isEditMode} isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RouteFormWrapper;
