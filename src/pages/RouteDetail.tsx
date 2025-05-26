import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/types/database.types";
import YandexMap from "@/components/YandexMap";
import RoutePointsDisplay from "@/components/RoutePointsDisplay";
import { Loader2 } from "lucide-react";

type RouteType = Database["public"]["Tables"]["routes"]["Row"];

const RouteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [route, setRoute] = useState<RouteType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error("Route ID is missing");
        }

        const { data, error } = await supabase
          .from("routes")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        setRoute(data);
      } catch (error: any) {
        console.error("Error fetching route:", error.message);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить информацию о маршруте",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-kalingo-blue" />
      </div>
    );
  }

  if (!route) {
    return (
      <div className="min-h-screen pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Маршрут не найден</h1>
          <p>Запрошенный маршрут не существует или был удален.</p>
        </div>
      </div>
    );
  }

  const difficultyDisplay = {
    easy: "Легкий",
    medium: "Средний",
    hard: "Сложный",
  };

  const categoryDisplay = {
    historical: "Исторический",
    cultural: "Культурный",
    nature: "Природный",
    gastronomy: "Гастрономический",
    architectural: "Архитектурный",
    entertainment: "Развлекательный",
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Route Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {route.image_url && (
              <div className="h-80 w-full overflow-hidden">
                <img
                  src={route.image_url}
                  alt={route.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{route.title}</h1>

              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-kalingo-blue/10 text-kalingo-blue px-3 py-1 rounded-full text-sm">
                  {(categoryDisplay as any)[route.category] || route.category}
                </span>
                <span className="bg-kalingo-amber/10 text-kalingo-amber px-3 py-1 rounded-full text-sm">
                  {(difficultyDisplay as any)[route.difficulty] ||
                    route.difficulty}
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {route.duration} минут
                </span>
                {route.distance && (
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {route.distance} км
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                <div>
                  <span className="font-medium">От:</span> {route.start_point}
                </div>
                <div>
                  <span className="font-medium">До:</span> {route.end_point}
                </div>
              </div>

              <p className="text-gray-700 whitespace-pre-line">
                {route.description}
              </p>
            </div>
          </div>

          {/* Main Route Points Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              Основные точки маршрута
            </h2>
            <RoutePointsDisplay routeId={id as string} />
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Карта маршрута</h2>
            <YandexMap
              embedCode={route.map_embed_code || ""}
              className="h-[500px] w-full bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetail;
