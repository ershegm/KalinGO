import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import RoutesPage from "@/pages/Routes";
import RouteDetail from "@/pages/RouteDetail";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminRoutes from "@/pages/admin/Routes";
import RouteForm from "@/pages/admin/RouteForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <RouterRoutes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/routes" element={<AdminRoutes />} />
              <Route path="/admin/routes/create" element={<RouteForm />} />
              <Route path="/admin/routes/edit/:id" element={<RouteForm />} />

              {/* Public Routes with Navbar and Footer */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <Home />
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/routes"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <RoutesPage />
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/route/:id"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <RouteDetail />
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <About />
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/auth"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <Auth />
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    </main>
                    <Footer />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <NotFound />
                    </main>
                    <Footer />
                  </>
                }
              />
            </RouterRoutes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
