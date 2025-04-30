
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Heart, 
  Share, 
  ThumbsUp, 
  ThumbsDown,
  Star,
  Calendar,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { allRoutes } from '@/data/routes';

const RouteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const route = allRoutes.find(r => r.id === Number(id));
  const { toast } = useToast();
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  if (!route) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Маршрут не найден</h1>
          <p className="mb-4">К сожалению, запрашиваемый маршрут не существует.</p>
          <Button asChild>
            <Link to="/routes">Вернуться к списку маршрутов</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Добавлено в избранное" : "Удалено из избранного",
      description: !isFavorite ? `Маршрут "${route.title}" добавлен в избранное` : `Маршрут "${route.title}" удален из избранного`,
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Ссылка скопирована",
      description: "Ссылка на маршрут скопирована в буфер обмена",
    });
  };
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userRating === 0) {
      toast({
        title: "Необходимо указать оценку",
        description: "Пожалуйста, выберите оценку от 1 до 5 звезд",
        variant: "destructive",
      });
      return;
    }
    
    if (reviewText.trim().length < 10) {
      toast({
        title: "Отзыв слишком короткий",
        description: "Пожалуйста, напишите более подробный отзыв (минимум 10 символов)",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Отзыв отправлен",
      description: "Спасибо за ваш отзыв! Он будет опубликован после модерации.",
    });
    
    setReviewText('');
    setUserRating(0);
  };
  
  // Function to get category name in Russian
  const getCategoryName = () => {
    switch(route.category) {
      case 'historical':
        return 'Исторический';
      case 'cultural':
        return 'Культурный';
      case 'nature':
        return 'Природный';
      case 'gastronomy':
        return 'Гастрономический';
      default:
        return route.category;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <img 
          src={route.image} 
          alt={route.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <div className="flex items-center mb-2">
              <span className="badge text-xs bg-kalingo-blue text-white px-2 py-1 rounded">
                {getCategoryName()}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{route.title}</h1>
            <div className="flex flex-wrap items-center text-white text-sm md:text-base gap-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{route.duration}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Калининград</span>
              </div>
              <div className="flex items-center">
                <div className="flex mr-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(route.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span>{route.rating.toFixed(1)} ({route.reviewCount} отзывов)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Описание маршрута</h2>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={isFavorite ? 'text-red-500' : ''}
                    onClick={handleFavoriteClick}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleShare}
                  >
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{route.description}</p>
              
              <div className="prose max-w-none">
                <p>
                  Калининград – уникальный город с богатой историей, в котором переплетаются немецкое и русское культурное наследие. Этот маршрут 
                  позволит вам познакомиться с основными достопримечательностями города, узнать интересные факты о его прошлом и настоящем.
                </p>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">Ключевые точки маршрута:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Кафедральный собор</strong> - символ города, построенный в XIV веке в готическом стиле. Здесь находится могила Иммануила Канта.</li>
                  <li><strong>Рыбная деревня</strong> - этнографический и торгово-ремесленный центр, стилизованный под довоенный Кёнигсберг.</li>
                  <li><strong>Музей Мирового океана</strong> - один из крупнейших морских музеев России с уникальными экспонатами.</li>
                  <li><strong>Остров Канта</strong> - живописный остров в центре города с парковой зоной.</li>
                  <li><strong>Королевские ворота</strong> - одни из семи сохранившихся городских ворот Кёнигсберга.</li>
                </ol>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">Рекомендации:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Удобная обувь для длительных прогулок.</li>
                  <li>Возьмите с собой воду и легкие закуски.</li>
                  <li>Лучшее время для маршрута - утро или вечер в летние месяцы.</li>
                  <li>По пути много кафе для отдыха.</li>
                </ul>
              </div>
            </div>
            
            <Tabs defaultValue="map" className="bg-white rounded-xl shadow-md overflow-hidden">
              <TabsList className="w-full border-b">
                <TabsTrigger value="map" className="flex-1">Карта маршрута</TabsTrigger>
                <TabsTrigger value="photos" className="flex-1">Фотографии</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Отзывы ({route.reviewCount})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="map" className="p-0">
                <div className="map-container h-[400px] w-full flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="h-12 w-12 text-kalingo-blue/50 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold mb-1">Карта маршрута</h3>
                    <p className="text-gray-500">Интерактивная карта будет доступна после подключения Яндекс Карт API</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="photos" className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden">
                      <img 
                        src={`https://i.pinimg.com/736x/c0/5d/a3/c05da325d363e122828555ad9c3a1de1.jpg`}
                        alt={`${route.title} фото ${i+1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-6">
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Оставить отзыв</h3>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <span className="text-sm mr-2">Ваша оценка:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-6 w-6 cursor-pointer ${
                                i < (hoveredRating || userRating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                              onClick={() => setUserRating(i + 1)}
                              onMouseEnter={() => setHoveredRating(i + 1)}
                              onMouseLeave={() => setHoveredRating(0)}
                            />
                          ))}
                        </div>
                      </div>
                      <Textarea 
                        placeholder="Поделитесь своими впечатлениями о маршруте..."
                        className="min-h-[100px]"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit">Отправить отзыв</Button>
                    </div>
                  </form>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-kalingo-blue/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-kalingo-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Анна П.</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>15.04.2025</span>
                      </div>
                    </div>
                    <p className="text-gray-700">Отличный маршрут, который позволяет увидеть основные достопримечательности Калининграда. Мы прошли его за 3 часа с небольшой остановкой в кафе. Особенно понравился Кафедральный собор и Рыбная деревня!</p>
                    <div className="flex space-x-4 mt-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>8</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        <span>0</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-kalingo-blue/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-kalingo-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Сергей М.</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>20.03.2025</span>
                      </div>
                    </div>
                    <p className="text-gray-700">Хороший маршрут для знакомства с городом. Интересные исторические факты и красивые места. Единственный минус - в некоторых местах не хватало указателей. В целом, рекомендую всем, кто впервые в Калининграде.</p>
                    <div className="flex space-x-4 mt-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>4</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        <span>1</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Информация о маршруте</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Категория</span>
                  <span className="font-medium">{getCategoryName()}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Длительность</span>
                  <span className="font-medium">{route.duration}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Длина маршрута</span>
                  <span className="font-medium">5.2 км</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Сложность</span>
                  <span className="font-medium">Лёгкая</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Рейтинг</span>
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(route.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span>{route.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6">Начать маршрут</Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Рекомендуемые маршруты</h3>
              </div>
              <div className="space-y-4 p-6 pt-0">
                {allRoutes
                  .filter(r => r.category === route.category && r.id !== route.id)
                  .slice(0, 3)
                  .map((recommendedRoute) => (
                    <Link 
                      key={recommendedRoute.id} 
                      to={`/route/${recommendedRoute.id}`}
                      className="flex space-x-3 group"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={recommendedRoute.image} 
                          alt={recommendedRoute.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-kalingo-blue transition-colors">
                          {recommendedRoute.title}
                        </h4>
                        <div className="flex items-center mt-1 text-gray-500 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{recommendedRoute.duration}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < Math.floor(recommendedRoute.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({recommendedRoute.reviewCount})
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetail;
