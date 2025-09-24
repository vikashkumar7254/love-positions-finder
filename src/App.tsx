import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

// Games Pages
import Games from "./pages/Games";
import TruthOrDare from "./pages/games/TruthOrDare";
import ForeplayDice from "./pages/games/ForeplayDice";
import AllGames from "./pages/games/AllGames";
import LongDistance from "./pages/games/LongDistance";
import LoveQuiz from "./pages/games/LoveQuiz";

// Positions Pages
import Positions from "./pages/Positions";
import MostPopular from "./pages/positions/MostPopular";
import AllPositions from "./pages/positions/AllPositions";
import RandomGenerator from "./pages/positions/RandomGenerator";

// Other Pages  
import CustomPoster from "./pages/CustomPoster";
import JourneyPlanner from "./pages/JourneyPlanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Games Routes */}
          <Route path="/games" element={<Games />} />
          <Route path="/games/truth-or-dare" element={<TruthOrDare />} />
          <Route path="/games/foreplay-dice" element={<ForeplayDice />} />
          <Route path="/games/all-games" element={<AllGames />} />
          <Route path="/games/long-distance" element={<LongDistance />} />
          <Route path="/games/love-quiz" element={<LoveQuiz />} />
          
          {/* Positions Routes */}
          <Route path="/positions" element={<Positions />} />
          <Route path="/positions/most-popular" element={<MostPopular />} />
          <Route path="/positions/all" element={<AllPositions />} />
          <Route path="/positions/random-generator" element={<RandomGenerator />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Other Routes */}
          <Route path="/custom-poster" element={<CustomPoster />} />
          <Route path="/journey-planner" element={<JourneyPlanner />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
