
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Map, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navigationItems = [
    {
      name: 'Панель',
      href: '/admin',
      icon: Settings,
    },
    {
      name: 'Маршруты',
      href: '/admin/routes',
      icon: Map,
    },
    {
      name: 'Пользователи',
      href: '/admin/users',
      icon: User,
    },
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-md fixed left-0 top-0 pt-8">
      <div className="px-6 py-4">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">
            <span className="text-kalingo-blue">Kalin</span>
            <span className="text-kalingo-amber">Go</span>
          </span>
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold">
            Админ
          </span>
        </Link>
      </div>

      <div className="mt-10">
        <nav className="space-y-1 px-3">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-base font-medium",
                  isActivePath(item.href)
                    ? "bg-gray-100 text-kalingo-blue"
                    : "text-gray-600 hover:text-kalingo-blue hover:bg-gray-50"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-8 px-3 w-full">
        <Button
          variant="ghost"
          className="w-full justify-start text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
          onClick={signOut}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
