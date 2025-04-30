import React from "react";
import { MapPin, Clock, Star } from "lucide-react";

const RoutePreview = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 w-[600px]">
      <div className="flex items-center space-x-2 text-white/80 text-sm mb-4">
        <div className="flex items-center px-3 py-1 rounded-full bg-white/10">
          <Clock className="w-4 h-4 mr-1" />
          <span>2 часа</span>
        </div>
        <div className="flex items-center px-3 py-1 rounded-full bg-white/10">
          <MapPin className="w-4 h-4 mr-1" />
          <span>5 мест</span>
        </div>
        <div className="flex items-center px-3 py-1 rounded-full bg-white/10">
          <Star className="w-4 h-4 mr-1" />
          <span>4.8</span>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl overflow-hidden mb-4">
        <div className="relative h-[350px]">
          <img
            src="https://media.istockphoto.com/id/871475270/ru/фото/рыбацкая-деревня-калининград-россия.jpg?s=612x612&w=0&k=20&c=IHVeae8tiEdIQTUbXUGguD0JRnjdg8zaTu42N5hLXKs="
            alt="Рыбная деревня на закате"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
        <div className="font-medium text-lg mb-2 text-white">
          Королевский путь
        </div>
        <div className="text-sm text-white/90">
          Рыбная деревня • Музей янтаря • Кафедральный собор
        </div>
      </div>
    </div>
  );
};

export default RoutePreview;
