
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

interface RouteCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  category: string;
  rating: number;
  reviewCount: number;
}

const RouteCard = ({
  id,
  title,
  description,
  image,
  duration,
  category,
  rating,
  reviewCount
}: RouteCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
    
    toast({
      title: !isFavorite ? "Добавлено в избранное" : "Удалено из избранного",
      description: !isFavorite ? `Маршрут "${title}" добавлен в избранное` : `Маршрут "${title}" удален из избранного`,
    });
  };
  
  // Function to get category badge color
  const getCategoryBadgeClass = () => {
    switch(category) {
      case 'historical':
        return 'bg-blue-100 text-blue-800';
      case 'cultural':
        return 'bg-purple-100 text-purple-800';
      case 'nature':
        return 'bg-green-100 text-green-800';
      case 'gastronomy':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get category name in Russian
  const getCategoryName = () => {
    switch(category) {
      case 'historical':
        return 'Исторический';
      case 'cultural':
        return 'Культурный';
      case 'nature':
        return 'Природный';
      case 'gastronomy':
        return 'Гастрономический';
      default:
        return category;
    }
  };

  return (
    <Link to={`/route/${id}`} className="route-card group">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="route-card-image transition-transform duration-500 group-hover:scale-105"
        />
        <Button 
          variant="outline" 
          size="icon" 
          className={`absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-sm ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className={`badge ${getCategoryBadgeClass()}`}>{getCategoryName()}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RouteCard;
