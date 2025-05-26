import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Star } from "lucide-react";
import RouteCard from "@/components/RouteCard";
import RoutePreview from "@/components/RoutePreview";
import { categories } from "@/data/routes";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/types/database.types";

type RouteType = Database["public"]["Tables"]["routes"]["Row"];

const Home = () => {
  const animatedElementsRef = useRef<(HTMLElement | null)[]>([]);
  const [featuredRoutes, setFeaturedRoutes] = useState<RouteType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch featured routes
  useEffect(() => {
    const fetchFeaturedRoutes = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching routes...");

        const { data, error } = await supabase
          .from("routes")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        console.log("Routes loaded:", data?.length);
        setFeaturedRoutes(data || []);
      } catch (error: any) {
        console.error("Error fetching routes:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить маршруты",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedRoutes();
  }, [toast]);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [featuredRoutes]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img
            src="https://cs14.pikabu.ru/post_img/2023/09/23/7/og_og_1695466871252998121.jpg"
            alt="Калининград"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Откройте для себя Калининград
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Исследуйте уникальные маршруты, созданные местными экспертами
          </p>
          <Button
            asChild
            size="lg"
            className="bg-kalingo-amber hover:bg-kalingo-amber/90 text-kalingo-dark text-lg"
          >
            <Link to="/routes">Начать путешествие</Link>
          </Button>
        </div>
      </section>

      {/* Featured Routes Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Новые маршруты</h2>
            <Button
              asChild
              variant="ghost"
              className="text-kalingo-blue hover:text-kalingo-blue/80 text-xl"
            >
              <Link to="/routes" className="flex items-center">
                Смотреть все
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kalingo-blue"></div>
            </div>
          ) : featuredRoutes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRoutes.map((route, index) => (
                <div
                  key={route.id}
                  className="animate-on-scroll"
                  ref={(el) => {
                    if (el) animatedElementsRef.current[index] = el;
                  }}
                >
                  <RouteCard
                    id={route.id}
                    title={route.title}
                    description={route.description}
                    image_url={
                      route.image_url ||
                      "https://cs14.pikabu.ru/post_img/2023/09/23/7/og_og_1695466871252998121.jpg"
                    }
                    duration={`${route.duration} мин`}
                    category={route.category}
                    rating={route.rating || 0}
                    reviewCount={0}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold mb-4">
                Маршруты пока не добавлены
              </h3>
              <p className="text-gray-600 mb-6">
                Скоро здесь появятся интересные маршруты для изучения
                Калининграда
              </p>
              <Button asChild>
                <Link to="/admin/routes/create">Добавить первый маршрут</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="pt-8 md:pt-12 pb-16 md:pb-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Категории маршрутов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/routes?category=${category.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {category.count} маршрутов
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
