
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { routeSchema } from "@/components/admin/route-form/schema";
import RouteFormWrapper from "@/components/admin/route-form/RouteFormWrapper";
import RoutePointsManager from "@/components/admin/RoutePointsManager";
import { z } from "zod";
import { Database } from "@/types/database.types";

type RouteType = Database["public"]["Tables"]["routes"]["Row"];
type FormValues = z.infer<typeof routeSchema>;

const RouteForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [currentRouteId, setCurrentRouteId] = useState<string | null>(id || null);
  const [initialData, setInitialData] = useState<FormValues | undefined>(undefined);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isEditMode) {
      fetchRoute();
    }
  }, [id]);

  const fetchRoute = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setInitialData({
          title: data.title,
          description: data.description,
          category: data.category as any,
          difficulty: data.difficulty as any,
          duration: data.duration,
          distance: data.distance || undefined,
          start_point: data.start_point,
          end_point: data.end_point,
          image_url: data.image_url || "",
          map_embed_code: data.map_embed_code || "",
        });
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные маршрута",
        variant: "destructive",
      });
      console.error("Error fetching route:", error.message);
      navigate("/admin/routes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSuccess = (routeId: string) => {
    setCurrentRouteId(routeId);
    
    // If we just created a new route, navigate to the edit page
    if (!isEditMode) {
      navigate(`/admin/routes/edit/${routeId}`, { replace: true });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-kalingo-blue" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {isEditMode ? "Редактирование маршрута" : "Создание нового маршрута"}
          </h1>

          <RouteFormWrapper 
            isEditMode={isEditMode}
            id={id}
            initialData={initialData}
            onSaveSuccess={handleSaveSuccess}
          />
          
          {/* Route Points Manager */}
          {currentRouteId && (
            <Card>
              <CardContent className="p-6">
                <RoutePointsManager />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteForm;
