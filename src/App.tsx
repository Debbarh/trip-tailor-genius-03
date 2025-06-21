
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomeNavigation from "@/components/layout/HomeNavigation";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Countries from "./pages/Countries";
import Itinerary from "./pages/Itinerary";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={
                <>
                  <HomeNavigation />
                  <Login />
                </>
              } />
              <Route path="/signup" element={
                <>
                  <HomeNavigation />
                  <Signup />
                </>
              } />
              <Route path="/profile" element={
                <>
                  <HomeNavigation />
                  <Profile />
                </>
              } />
              <Route path="/countries" element={
                <>
                  <HomeNavigation />
                  <Countries />
                </>
              } />
              <Route path="/itinerary" element={
                <>
                  <HomeNavigation />
                  <Itinerary />
                </>
              } />
              <Route path="/admin" element={
                <>
                  <HomeNavigation />
                  <Admin />
                </>
              } />
              <Route path="*" element={
                <>
                  <HomeNavigation />
                  <NotFound />
                </>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
