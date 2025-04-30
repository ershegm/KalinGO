
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-kalingo-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Kalin<span className="text-kalingo-amber">Go</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Откройте для себя Калининград с помощью наших тематических маршрутов и экскурсий.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/routes" className="text-gray-300 hover:text-white transition-colors">
                  Маршруты
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  О сервисе
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Категории</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/routes?category=historical" className="text-gray-300 hover:text-white transition-colors">
                  Исторические
                </Link>
              </li>
              <li>
                <Link to="/routes?category=cultural" className="text-gray-300 hover:text-white transition-colors">
                  Культурные
                </Link>
              </li>
              <li>
                <Link to="/routes?category=nature" className="text-gray-300 hover:text-white transition-colors">
                  Природные
                </Link>
              </li>
              <li>
                <Link to="/routes?category=gastronomy" className="text-gray-300 hover:text-white transition-colors">
                  Гастрономические
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">
                Email: info@kalingo.ru
              </li>
              <li className="text-gray-300">
                Телефон: +7 (4012) 123-45-67
              </li>
              <li className="text-gray-300">
                Адрес: г. Калининград, ул. Ленинский пр-т, 123
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} KalinGo. Все права защищены.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Условия использования
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
