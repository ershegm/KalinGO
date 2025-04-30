import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Star } from "lucide-react";
import RouteCard from "@/components/RouteCard";
import RoutePreview from "@/components/RoutePreview";
import { featuredRoutes, categories } from "@/data/routes";

const Home = () => {
  const animatedElementsRef = useRef<(HTMLElement | null)[]>([]);

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
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-kalingo-blue/90 via-kalingo-dark/80 to-kalingo-blue/70">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex justify-between items-center">
            <div className="max-w-2xl text-white animate-fade-in">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                Исследуйте
                <br />
                Калининград
                <br />
                вместе с <span className="text-kalingo-amber">Kalin</span>
                <span className="text-kalingo-blue">Go</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-white/90">
                Откройте для себя лучшие маршруты по городу с удобной
                навигацией, интересными фактами и отзывами путешественников.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-kalingo-amber text-kalingo-dark hover:bg-kalingo-amber/90 text-xl py-8 px-10 rounded-xl"
                >
                  <Link to="/routes" className="flex items-center">
                    Смотреть маршруты
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white hover:bg-white/20 text-xl py-8 px-10 rounded-xl"
                >
                  <Link to="/about">О сервисе</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block animate-float">
              <RoutePreview />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Routes Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Популярные маршруты
            </h2>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRoutes.map((route) => (
              <div
                key={route.id}
                className="animate-on-scroll"
                ref={(el) => {
                  if (el) animatedElementsRef.current.push(el);
                }}
              >
                <RouteCard {...route} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-kalingo-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Выберите категорию маршрута
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/routes?category=${category.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-on-scroll"
                ref={(el) => {
                  if (el) animatedElementsRef.current.push(el);
                }}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-xl">{category.name}</h3>
                  <p className="text-base text-gray-600 mt-2">
                    {category.count} маршрутов
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Как это работает
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center animate-on-scroll"
              ref={(el) => {
                if (el) animatedElementsRef.current.push(el);
              }}
            >
              <div className="bg-kalingo-blue/10 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6">
                <MapPin className="h-8 w-8 text-kalingo-blue" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Выберите маршрут</h3>
              <p className="text-lg text-gray-600">
                Выберите маршрут из нашей коллекции, основываясь на ваших
                интересах и доступном времени.
              </p>
            </div>

            <div
              className="text-center animate-on-scroll"
              ref={(el) => {
                if (el) animatedElementsRef.current.push(el);
              }}
              style={{ animationDelay: "100ms" }}
            >
              <div className="bg-kalingo-amber/10 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6">
                <Clock className="h-8 w-8 text-kalingo-amber" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Исследуйте город</h3>
              <p className="text-lg text-gray-600">
                Следуйте маршруту с помощью карты и описания, узнавая интересные
                факты о достопримечательностях.
              </p>
            </div>

            <div
              className="text-center animate-on-scroll"
              ref={(el) => {
                if (el) animatedElementsRef.current.push(el);
              }}
              style={{ animationDelay: "200ms" }}
            >
              <div className="bg-green-500/10 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6">
                <Star className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Оставьте отзыв</h3>
              <p className="text-lg text-gray-600">
                Поделитесь своими впечатлениями и помогите другим
                путешественникам выбрать лучший маршрут.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-blue-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Готовы исследовать Калининград?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к нашему сообществу путешественников и откройте для
            себя все тайны янтарного края
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-kalingo-blue hover:bg-white/90 text-xl py-8 px-10 rounded-xl"
          >
            <Link to="/routes">Начать путешествие</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
