
import { useLocation } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="animate-floating">
          <div className="bg-kalingo-blue/10 w-24 h-24 flex items-center justify-center rounded-full mx-auto mb-6">
            <MapPin className="h-12 w-12 text-kalingo-blue" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Похоже, вы сбились с маршрута. Страница не найдена.
        </p>
        <div className="space-y-3">
          <Button 
            asChild
            className="bg-kalingo-blue hover:bg-kalingo-blue/90 w-full"
          >
            <Link to="/">
              Вернуться на главную
            </Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="w-full"
          >
            <Link to="/routes">
              Смотреть маршруты
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
