import React from "react";
import {
  Building2,
  Users,
  TreePine,
  Clock,
  MapPin,
  Compass,
} from "lucide-react";

const CityStats = () => {
  return (
    <div className="w-[500px] space-y-6">
      {/* Карточки с фактами */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 transform hover:scale-105 transition-all duration-300 group cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="bg-kalingo-amber/20 p-3 rounded-lg group-hover:bg-kalingo-amber/30 transition-colors">
              <Building2 className="w-6 h-6 text-kalingo-amber" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white animate-count">
                1255
              </div>
              <div className="text-white/80 text-sm">год основания</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 transform hover:scale-105 transition-all duration-300 group cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="bg-kalingo-blue/20 p-3 rounded-lg group-hover:bg-kalingo-blue/30 transition-colors">
              <Users className="w-6 h-6 text-kalingo-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white animate-count">
                489k
              </div>
              <div className="text-white/80 text-sm">жителей</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 transform hover:scale-105 transition-all duration-300 group cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/20 p-3 rounded-lg group-hover:bg-green-500/30 transition-colors">
              <TreePine className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white animate-count">
                50+
              </div>
              <div className="text-white/80 text-sm">парков</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 transform hover:scale-105 transition-all duration-300 group cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
              <MapPin className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white animate-count">
                100+
              </div>
              <div className="text-white/80 text-sm">
                достопримечательностей
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Компас с анимацией */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-center">
          <div className="relative">
            <Compass className="w-20 h-20 text-white animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-kalingo-amber rounded-full" />
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="text-white font-medium">Исследуйте город</div>
          <div className="text-white/80 text-sm mt-1">во всех направлениях</div>
        </div>
      </div>

      {/* Временная шкала */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Clock className="w-5 h-5 text-kalingo-amber" />
          <div className="text-white font-medium">
            Средняя длительность маршрута
          </div>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-kalingo-amber animate-progress-slow w-3/4" />
        </div>
        <div className="flex justify-between mt-2 text-sm text-white/80">
          <span>0ч</span>
          <span>2ч</span>
          <span>4ч</span>
        </div>
      </div>
    </div>
  );
};

export default CityStats;
