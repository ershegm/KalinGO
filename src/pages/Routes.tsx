
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import RouteCard from '@/components/RouteCard';
import { allRoutes, categories } from '@/data/routes';

type SortOption = 'rating' | 'duration' | 'popularity';

const Routes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredRoutes, setFilteredRoutes] = useState(allRoutes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Update filtered routes when filters change
  useEffect(() => {
    let result = [...allRoutes];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(route => 
        route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(route => route.category === selectedCategory);
    }
    
    // Filter by duration
    if (durationFilter !== 'all') {
      switch(durationFilter) {
        case 'short':
          result = result.filter(route => {
            const minutes = parseInt(route.duration.split(' ')[0]);
            return minutes <= 60;
          });
          break;
        case 'medium':
          result = result.filter(route => {
            const minutes = parseInt(route.duration.split(' ')[0]);
            return minutes > 60 && minutes <= 180;
          });
          break;
        case 'long':
          result = result.filter(route => {
            const minutes = parseInt(route.duration.split(' ')[0]);
            return minutes > 180;
          });
          break;
      }
    }
    
    // Sort results
    switch(sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        result.sort((a, b) => {
          const aDuration = parseInt(a.duration.split(' ')[0]);
          const bDuration = parseInt(b.duration.split(' ')[0]);
          return aDuration - bDuration;
        });
        break;
      case 'popularity':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    
    setFilteredRoutes(result);
    
    // Update URL params
    if (selectedCategory && selectedCategory !== 'all') {
      searchParams.set('category', selectedCategory);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
    
  }, [searchQuery, selectedCategory, sortBy, durationFilter, searchParams, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Function to get category name in Russian
  const getCategoryName = (slug: string) => {
    const category = categories.find(c => c.slug === slug);
    return category ? category.name : 'Все категории';
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Маршруты по Калининграду</h1>
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
                  onChange={e => setSearchQuery(e.target.value)}
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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-lg mb-4">Фильтры</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Категория</label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Сортировать по</label>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Сортировать по" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Рейтингу</SelectItem>
                    <SelectItem value="duration">Длительности</SelectItem>
                    <SelectItem value="popularity">Популярности</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Длительность</label>
                <Select
                  value={durationFilter}
                  onValueChange={setDurationFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Длительность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любая</SelectItem>
                    <SelectItem value="short">До 1 часа</SelectItem>
                    <SelectItem value="medium">1-3 часа</SelectItem>
                    <SelectItem value="long">Более 3 часов</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Filters - Mobile */}
          {showFilters && (
            <div className="md:hidden bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Фильтры</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowFilters(false)}
                >
                  Закрыть
                </Button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Категория</label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Сортировать по</label>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Сортировать по" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Рейтингу</SelectItem>
                    <SelectItem value="duration">Длительности</SelectItem>
                    <SelectItem value="popularity">Популярности</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Длительность</label>
                <Select
                  value={durationFilter}
                  onValueChange={setDurationFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Длительность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любая</SelectItem>
                    <SelectItem value="short">До 1 часа</SelectItem>
                    <SelectItem value="medium">1-3 часа</SelectItem>
                    <SelectItem value="long">Более 3 часов</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Routes Grid */}
          <div className="md:col-span-3">
            {/* Active filters */}
            {selectedCategory !== 'all' && (
              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-500 mr-2">Активные фильтры:</span>
                <div className="bg-kalingo-blue/10 text-kalingo-blue text-sm py-1 px-3 rounded-full flex items-center">
                  {getCategoryName(selectedCategory)}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 ml-1 p-0 hover:bg-transparent"
                    onClick={() => setSelectedCategory('all')}
                  >
                    <span className="sr-only">Удалить</span>
                    ✕
                  </Button>
                </div>
              </div>
            )}
            
            {filteredRoutes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRoutes.map(route => (
                  <div key={route.id} className="animate-scale-in">
                    <RouteCard {...route} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-10 text-center">
                <h3 className="text-xl font-semibold mb-2">Маршруты не найдены</h3>
                <p className="text-gray-600 mb-4">
                  К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setDurationFilter('all');
                    setSortBy('rating');
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
