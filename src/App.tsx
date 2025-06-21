
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import UnifiedNavigation from "@/components/navigation/UnifiedNavigation";
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
          <div className="min-h-screen bg-neutral-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={
                <>
                  <UnifiedNavigation />
                  <Login />
                </>
              } />
              <Route path="/signup" element={
                <>
                  <UnifiedNavigation />
                  <Signup />
                </>
              } />
              <Route path="/profile" element={
                <>
                  <UnifiedNavigation />
                  <Profile />
                </>
              } />
              <Route path="/countries" element={
                <>
                  <UnifiedNavigation />
                  <Countries />
                </>
              } />
              <Route path="/itinerary" element={
                <>
                  <UnifiedNavigation />
                  <Itinerary />
                </>
              } />
              <Route path="/admin" element={
                <>
                  <UnifiedNavigation />
                  <Admin />
                </>
              } />
              <Route path="*" element={
                <>
                  <UnifiedNavigation />
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
