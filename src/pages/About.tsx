
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Heart, Star, Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-kalingo-blue py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">О сервисе KalinGo</h1>
            <p className="text-lg md:text-xl">
              Ваш личный гид по достопримечательностям и скрытым жемчужинам Калининграда
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Наша миссия</h2>
            <p className="text-lg text-gray-700 mb-6">
              <span className="font-semibold">KalinGo</span> — это сервис, созданный для всех, кто хочет увидеть Калининград глазами местных жителей 
              и опытных путешественников. Мы собрали лучшие тематические маршруты, которые помогут вам 
              познакомиться с разными сторонами этого уникального города на границе России и Европы.
            </p>
            <p className="text-lg text-gray-700">
              Наша цель — сделать путешествие по Калининграду интересным, комфортным и познавательным как для туристов, 
              так и для самих жителей города, которые хотят открыть для себя новые грани родного края.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Возможности сервиса</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-kalingo-blue/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <MapPin className="h-8 w-8 text-kalingo-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Тематические маршруты</h3>
              <p className="text-gray-600">
                Исторические, культурные, природные и гастрономические маршруты по Калининграду с подробным описанием и картами.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-kalingo-amber/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <Heart className="h-8 w-8 text-kalingo-amber" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Избранное и оценки</h3>
              <p className="text-gray-600">
                Сохраняйте понравившиеся маршруты в избранное, оценивайте их и делитесь своими впечатлениями с другими путешественниками.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-kalingo-teal/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <Clock className="h-8 w-8 text-kalingo-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Планирование времени</h3>
              <p className="text-gray-600">
                Информация о длительности каждого маршрута поможет вам спланировать свой день и посетить максимум интересных мест.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Наша команда</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://source.unsplash.com/random/300x300?portrait,woman&sig=1" 
                  alt="Елена Соколова" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Елена Соколова</h3>
                <p className="text-kalingo-blue mb-3">Основатель проекта</p>
                <p className="text-gray-600 mb-4">
                  Краевед и историк, влюблённая в Калининград. Автор популярных экскурсий и путеводителей.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://source.unsplash.com/random/300x300?portrait,man&sig=2" 
                  alt="Алексей Морозов" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Алексей Морозов</h3>
                <p className="text-kalingo-blue mb-3">Технический директор</p>
                <p className="text-gray-600 mb-4">
                  Опытный разработчик и энтузиаст технологий, создавший удобную платформу для путешественников.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://source.unsplash.com/random/300x300?portrait,woman&sig=3" 
                  alt="Мария Лебедева" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Мария Лебедева</h3>
                <p className="text-kalingo-blue mb-3">Контент-менеджер</p>
                <p className="text-gray-600 mb-4">
                  Журналист и фотограф с 10-летним стажем путешествий по России и Европе.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Часто задаваемые вопросы</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Как пользоваться сервисом?</h3>
              <p className="text-gray-600">
                Просто выберите интересующую вас категорию маршрутов, ознакомьтесь с описанием и начните своё путешествие. 
                Для получения полного доступа ко всем функциям рекомендуем зарегистрироваться.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Все маршруты бесплатные?</h3>
              <p className="text-gray-600">
                Да, все маршруты доступны бесплатно. В будущем мы планируем добавить премиум-контент с эксклюзивными маршрутами 
                и аудиогидами, но основной функционал останется бесплатным.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Можно ли предложить свой маршрут?</h3>
              <p className="text-gray-600">
                Конечно! Мы всегда рады новым идеям. Если вы хорошо знаете Калининград и хотите поделиться своим маршрутом, 
                свяжитесь с нами через форму обратной связи.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Работает ли сервис офлайн?</h3>
              <p className="text-gray-600">
                В настоящее время для полноценной работы сервиса требуется интернет-соединение. В будущих обновлениях 
                мы планируем добавить возможность загрузки маршрутов для офлайн-использования.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section className="py-16 bg-kalingo-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Свяжитесь с нами</h2>
            <p className="text-lg mb-8">
              Есть вопросы, предложения или хотите сотрудничать? Мы всегда на связи!
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-white text-kalingo-blue hover:bg-white/90 inline-flex items-center"
            >
              <a href="mailto:info@kalingo.ru">
                <Mail className="mr-2 h-5 w-5" />
                Написать нам
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
