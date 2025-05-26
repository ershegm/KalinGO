
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Database } from "@/types/database.types";

type RoutePointType = Database["public"]["Tables"]["points_of_interest"]["Row"];

interface RoutePointsProps {
  routeId: string;
}

const RoutePoints = ({ routeId }: RoutePointsProps) => {
  const [points, setPoints] = useState<RoutePointType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutePoints = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("points_of_interest")
          .select("*")
          .eq("route_id", routeId)
          .order("order_index");

        if (error) {
          throw error;
        }

        setPoints(data || []);
      } catch (error: any) {
        console.error("Error fetching route points:", error.message);
        setError("Не удалось загрузить точки маршрута");
      } finally {
        setLoading(false);
      }
    };

    if (routeId) {
      fetchRoutePoints();
    }
  }, [routeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-kalingo-blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  if (points.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        <p>Для этого маршрута пока не добавлены точки интереса.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {points.map((point) => (
        <Card key={point.id} className="overflow-hidden">
          <div className="lg:flex">
            {point.image && (
              <div className="lg:w-1/3">
                <img
                  src={point.image}
                  alt={point.name}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
            )}
            <CardContent className={`p-6 ${point.image ? "lg:w-2/3" : "w-full"}`}>
              <div className="flex items-center mb-2">
                <span className="bg-kalingo-blue/10 text-kalingo-blue px-3 py-1 rounded-full text-sm mr-2">
                  Точка {point.order_index + 1}
                </span>
                <h3 className="text-xl font-semibold">{point.name}</h3>
              </div>
              {point.description && (
                <p className="text-gray-700 whitespace-pre-line">
                  {point.description}
                </p>
              )}
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RoutePoints;
