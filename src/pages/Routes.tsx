import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RouteCard from "@/components/RouteCard";
import { categories } from "@/data/routes";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type RouteType = Database["public"]["Tables"]["routes"]["Row"];
type SortOption = "rating" | "duration" | "popularity";

const Routes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<RouteType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch routes from Supabase
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from("routes").select("*");

        if (error) throw error;
        setRoutes(data || []);
      } catch (error: any) {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить маршруты",
          variant: "destructive",
        });
        console.error("Error fetching routes:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Update filtered routes when filters change
  useEffect(() => {
    let result = [...routes];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (route) =>
          route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          route.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((route) => route.category === selectedCategory);
    }

    // Filter by duration
    if (durationFilter !== "all") {
      switch (durationFilter) {
        case "short":
          result = result.filter((route) => route.duration <= 60);
          break;
        case "medium":
          result = result.filter(
            (route) => route.duration > 60 && route.duration <= 180
          );
          break;
        case "long":
          result = result.filter((route) => route.duration > 180);
          break;
      }
    }

    // Sort results
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "duration":
        result.sort((a, b) => a.duration - b.duration);
        break;
      case "popularity":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    setFilteredRoutes(result);

    // Update URL params
    if (selectedCategory && selectedCategory !== "all") {
      searchParams.set("category", selectedCategory);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  }, [
    searchQuery,
    selectedCategory,
    sortBy,
    durationFilter,
    routes,
    searchParams,
    setSearchParams,
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Function to get category name in Russian
  const getCategoryName = (slug: string) => {
    const category = categories.find((c) => c.slug === slug);
    return category ? category.name : "Все категории";
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Маршруты по Калининграду
            </h1>
            <p className="text-gray-600">
              Исследуйте город с помощью наших тематических маршрутов
            </p>
          </div>

          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Поиск маршрутов..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="ml-2 flex items-center md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5 mr-1" />
                Фильтры
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div
            className={`md:w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-semibold mb-4">Фильтры</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Категория
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Длительность
                  </label>
                  <Select
                    value={durationFilter}
                    onValueChange={setDurationFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите длительность" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любая</SelectItem>
                      <SelectItem value="short">До 1 часа</SelectItem>
                      <SelectItem value="medium">1-3 часа</SelectItem>
                      <SelectItem value="long">Более 3 часов</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Сортировка
                  </label>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Сортировать по" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                      <SelectItem value="duration">По длительности</SelectItem>
                      <SelectItem value="popularity">
                        По популярности
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Routes Grid */}
          <div className="flex-grow">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kalingo-blue"></div>
              </div>
            ) : filteredRoutes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {!isLoading &&
                  filteredRoutes.map((route) => (
                    <div key={route.id} className="animate-scale-in">
                      <RouteCard
                        id={route.id}
                        title={route.title}
                        description={route.description}
                        image_url={route.image_url || "/placeholder-route.jpg"}
                        duration={`${route.duration} мин`}
                        category={route.category}
                        rating={route.rating || 0}
                        reviewCount={0}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-10 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  Маршруты не найдены
                </h3>
                <p className="text-gray-600 mb-4">
                  К сожалению, по вашему запросу ничего не найдено. Попробуйте
                  изменить параметры поиска.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setDurationFilter("all");
                    setSortBy("rating");
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes;
