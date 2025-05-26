import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/types/database.types";
import { Loader2, Plus } from "lucide-react";
import PointsList from "./route-points/PointsList";
import PointFormDialog from "./route-points/PointFormDialog";
import EmptyState from "./route-points/EmptyState";

type RoutePointType = Database["public"]["Tables"]["points_of_interest"]["Row"];
type PointFormValues = {
  name: string;
  description?: string;
  image?: string;
  order_index: number;
};

const RoutePointsManager = () => {
  const { id: routeId } = useParams<{ id: string }>();
  const [points, setPoints] = useState<RoutePointType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingPoint, setEditingPoint] = useState<RoutePointType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Fetch route points
  useEffect(() => {
    fetchPoints();
  }, [routeId]);

  const fetchPoints = async () => {
    try {
      setLoading(true);

      if (!routeId) {
        throw new Error("Route ID is missing");
      }

      const { data, error } = await supabase
        .from("points_of_interest")
        .select("*")
        .eq("route_id", routeId)
        .order("order_index");

      if (error) throw error;

      setPoints(data || []);
    } catch (error: any) {
      console.error("Error fetching points:", error.message);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить точки маршрута",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openAddDialog = () => {
    setEditingPoint(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (point: RoutePointType) => {
    setEditingPoint(point);
    setIsDialogOpen(true);
  };

  const handleSavePoint = async (values: PointFormValues) => {
    try {
      setSaving(true);
      if (!routeId) {
        throw new Error("Route ID is missing");
      }
      const pointData = {
        ...values,
        route_id: routeId,
        image: values.image || null,
      };
      if (editingPoint) {
        // Update existing point
        const { error } = await supabase
          .from("points_of_interest")
          .update(pointData)
          .eq("id", editingPoint.id);
        if (error) throw error;
        toast({
          title: "Точка обновлена",
          description: "Точка маршрута успешно обновлена",
        });
      } else {
        // Create new point
        const { error } = await supabase
          .from("points_of_interest")
          .insert([pointData]);
        if (error) throw error;
        toast({
          title: "Точка добавлена",
          description: "Новая точка маршрута успешно добавлена",
        });
      }
      setIsDialogOpen(false);
      setEditingPoint(null);
      fetchPoints();
    } catch (error: any) {
      console.error(
        "Error saving point:",
        error.message,
        error.details || error
      );
      toast({
        title: "Ошибка",
        description: `Не удалось сохранить точку маршрута: ${
          error.message || error
        }`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-kalingo-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Точки маршрута</h3>
          <p className="text-sm text-gray-600">
            Добавьте точки интереса, которые будут показаны на карточке маршрута
          </p>
        </div>
        <button
          onClick={openAddDialog}
          className="inline-flex items-center px-4 py-2 bg-kalingo-blue text-white rounded-md hover:bg-kalingo-blue/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить точку
        </button>
      </div>

      {points.length === 0 ? (
        <EmptyState onAddClick={openAddDialog} />
      ) : (
        <PointsList
          points={points}
          onEdit={openEditDialog}
          onPointsChanged={fetchPoints}
        />
      )}

      <PointFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSavePoint}
        editingPoint={editingPoint}
        pointsCount={points.length}
        saving={saving}
      />
    </div>
  );
};

export default RoutePointsManager;
