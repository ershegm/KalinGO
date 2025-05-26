
import { useEffect, useRef } from 'react';

interface YandexMapProps {
  embedCode: string;
  className?: string;
}

const YandexMap = ({ embedCode, className = '' }: YandexMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !embedCode) return;

    try {
      // Extract the src URL from the embed code
      const srcMatch = embedCode.match(/src=["'](https:\/\/api-maps\.yandex\.ru\/services\/constructor\/[^"']+)["']/);
      
      if (srcMatch && srcMatch[1]) {
        const scriptSrc = srcMatch[1];
        
        // Create a new script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = scriptSrc;
        
        // Clear container and append script
        mapContainerRef.current.innerHTML = '';
        mapContainerRef.current.appendChild(script);
      } else {
        console.error('Invalid Yandex Maps embed code format');
        mapContainerRef.current.innerHTML = '<div class="p-4 text-center text-red-500">Неверный формат кода карты</div>';
      }
    } catch (error) {
      console.error('Error rendering Yandex Map:', error);
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '<div class="p-4 text-center text-red-500">Ошибка при загрузке карты</div>';
      }
    }

    return () => {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';
      }
    };
  }, [embedCode]);

  if (!embedCode) {
    return <div className={`${className} bg-gray-100 rounded flex items-center justify-center`}>Карта не добавлена</div>;
  }

  return <div ref={mapContainerRef} className={`${className} rounded overflow-hidden`} />;
};

export default YandexMap;
