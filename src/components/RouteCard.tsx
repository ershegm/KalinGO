import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface RouteCardProps {
  id: string;
  title: string;
  description: string;
  image_url: string;
  duration: string;
  category: string;
  rating: number;
  reviewCount: number;
}

const RouteCard = ({
  id,
  title,
  description,
  image_url,
  duration,
  category,
  rating,
  reviewCount,
}: RouteCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    }
  }, [user, id]);

  const checkIfFavorite = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("route_id", id)
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking favorite status:", error);
        return;
      }

      setIsFavorite(!!data);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Требуется авторизация",
        description:
          "Войдите или зарегистрируйтесь чтобы добавить маршрут в избранное",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("route_id", id)
          .eq("user_id", user.id);

        if (error) throw error;

        setIsFavorite(false);

        toast({
          title: "Удалено из избранного",
          description: `Маршрут "${title}" удален из избранного`,
        });
      } else {
        // Add to favorites
        const { error } = await supabase.from("favorites").insert({
          route_id: id,
          user_id: user.id,
        });

        if (error) throw error;

        setIsFavorite(true);

        toast({
          title: "Добавлено в избранное",
          description: `Маршрут "${title}" добавлен в избранное`,
        });
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить избранное",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get category badge color
  const getCategoryBadgeClass = () => {
    switch (category) {
      case "historical":
        return "bg-blue-100 text-blue-800";
      case "cultural":
        return "bg-purple-100 text-purple-800";
      case "nature":
        return "bg-green-100 text-green-800";
      case "gastronomy":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get category name in Russian
  const getCategoryName = () => {
    switch (category) {
      case "historical":
        return "Исторический";
      case "cultural":
        return "Культурный";
      case "nature":
        return "Природный";
      case "gastronomy":
        return "Гастрономический";
      default:
        return category;
    }
  };

  return (
    <div className="route-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col overflow-hidden">
      <div className="relative">
        <img
          src={image_url}
          alt={title}
          className="route-card-image transition-transform duration-500 group-hover:scale-105 rounded-t-2xl h-48 w-full object-cover"
        />
        <Button
          variant="outline"
          size="icon"
          className={`absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md ${
            isFavorite ? "text-red-500" : "text-gray-500"
          }`}
          onClick={handleFavoriteClick}
          disabled={isLoading}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-2xl">
          <span
            className={`badge ${getCategoryBadgeClass()} text-base px-4 py-1 shadow-md`}
          >
            {getCategoryName()}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-xl mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-base mb-4 line-clamp-2 flex-1">
          {description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-base text-gray-700">
            <Clock className="h-5 w-5 mr-1 text-kalingo-blue" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current drop-shadow"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-base text-gray-600 font-medium">
              ({reviewCount})
            </span>
          </div>
        </div>
        <Link to={`/route/${id}`} className="mt-auto w-full">
          <Button className="w-full bg-kalingo-blue hover:bg-kalingo-blue/90 text-white font-semibold rounded-xl py-2 text-base shadow-md transition-all duration-200">
            Подробнее
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RouteCard;
