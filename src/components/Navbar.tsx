import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get user initials for avatar
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase();
    }
    return (
      profile?.username?.charAt(0).toUpperCase() ||
      user?.email?.charAt(0).toUpperCase() ||
      "U"
    );
  };

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white bg-opacity-90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-bold bg-white px-4 py-2 rounded-lg shadow-md">
              <span className="text-kalingo-blue">Kalin</span>
              <span className="text-kalingo-amber">Go</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end flex-1 pl-20">
            <div className="flex items-center space-x-12 mr-12">
              <Link
                to="/"
                className={`text-xl font-semibold transition-colors ${
                  scrolled ? "text-foreground" : "text-white"
                } hover:text-kalingo-amber`}
              >
                Главная
              </Link>
              <Link
                to="/routes"
                className={`text-xl font-semibold transition-colors ${
                  scrolled ? "text-foreground" : "text-white"
                } hover:text-kalingo-amber`}
              >
                Маршруты
              </Link>
              <Link
                to="/about"
                className={`text-xl font-semibold transition-colors ${
                  scrolled ? "text-foreground" : "text-white"
                } hover:text-kalingo-amber`}
              >
                О сервисе
              </Link>
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-12 w-12 rounded-full"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile?.avatar_url || ""} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="flex items-center justify-start gap-2 p-4">
                    <div className="flex flex-col space-y-1 leading-none">
                      {profile?.username && (
                        <p className="font-medium text-lg">
                          {profile.username}
                        </p>
                      )}
                      <p className="w-[200px] truncate text-base text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem
                    onClick={handleProfileClick}
                    className="text-lg py-3"
                  >
                    <User className="mr-2 h-5 w-5" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-lg py-3"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={handleLoginClick}
                  className={`text-xl font-semibold px-6 py-2 ${
                    scrolled ? "text-foreground" : "text-white"
                  } hover:text-kalingo-amber`}
                >
                  Войти
                </Button>
                <Button
                  variant="default"
                  className="bg-kalingo-amber hover:bg-kalingo-amber/90 text-kalingo-dark text-xl font-semibold px-6 py-2"
                  onClick={handleLoginClick}
                >
                  <User className="mr-2 h-5 w-5" />
                  Регистрация
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-md p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground hover:text-kalingo-blue transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Главная
              </Link>
              <Link
                to="/routes"
                className="text-foreground hover:text-kalingo-blue transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Маршруты
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-kalingo-blue transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                О сервисе
              </Link>

              {user ? (
                <>
                  <div className="flex items-center space-x-3 py-2">
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url || ""} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {profile?.username || "Пользователь"}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsOpen(false);
                      handleProfileClick();
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Профиль
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      handleLoginClick();
                    }}
                  >
                    Войти
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-kalingo-blue hover:bg-kalingo-blue/90"
                    onClick={() => {
                      setIsOpen(false);
                      handleLoginClick();
                    }}
                  >
                    Регистрация
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
