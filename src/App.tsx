import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AgeVerification from "@/components/AgeVerification";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

// Games Pages
import TruthOrDare from "./pages/games/TruthOrDare";
import AllGames from "./pages/games/AllGames";
import PassionDice from "./pages/games/PassionDice";
import EroticMassage from "./pages/games/EroticMassage";
import FantasyRoleplay from "./pages/games/FantasyRoleplay";
import SeductiveConversation from "./pages/games/SeductiveConversation";
import PleasureMap from "./pages/games/PleasureMap";
// Removed duplicates: ForeplayDice, MassageJourney, DesireExplorer
import ScratchPosition from "./pages/games/ScratchPosition";
import SpinForDesire from "./pages/games/SpinForDesire";
import LongDistance from "./pages/games/LongDistance";
import LoveQuiz from "./pages/games/LoveQuiz";
import HoneymoonBucketList from "./pages/games/HoneymoonBucketList";
import FirstNightBucketList from "./pages/games/FirstNightBucketList";
import DiceToSpice from "./pages/games/DiceToSpice";

// Positions Pages
import Positions from "./pages/Positions";
import MostPopular from "./pages/positions/MostPopular";
import CustomPoster from "./pages/positions/CustomPoster";
// Removed: RandomGenerator

// Other Pages
import JourneyPlanner from "./pages/JourneyPlanner";
import LoveLanguageExplorer from "./pages/LoveLanguageExplorer";
import RomanticGuides from "./pages/RomanticGuides";
import AddBlog from "./pages/AddBlog";
import AddPosition from "./pages/admin/AddPosition";
import ScratchPositionsAdmin from "./pages/admin/ScratchPositionsAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SpinForDesireAdmin from "./pages/admin/SpinForDesireAdmin";
import RomanticGuidesAdmin from "./pages/admin/RomanticGuidesAdmin";
import CustomPosterAdmin from "./pages/admin/CustomPosterAdmin";
import JourneyImagesAdmin from "./pages/admin/JourneyImagesAdmin";
import ImageManagementAdmin from "./pages/admin/ImageManagementAdmin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import { AdminAuthProvider } from "./components/AdminAuth";

const queryClient = new QueryClient();

const App = () => {
  const [isVerified, setIsVerified] = useState(false);

  if (!isVerified) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AgeVerification onVerified={() => setIsVerified(true)} />
        </TooltipProvider>
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
              <Route path="/" element={<Index />} />
              
              <Route path="/games" element={<AllGames />} />
              <Route path="/games/truth-or-dare" element={<TruthOrDare />} />
              <Route path="/games/all-games" element={<Navigate to="/games" replace />} />
              <Route path="/games/passion-dice" element={<PassionDice />} />
              <Route path="/games/erotic-massage" element={<EroticMassage />} />
              <Route path="/games/fantasy-roleplay" element={<FantasyRoleplay />} />
              <Route path="/games/seductive-conversation" element={<SeductiveConversation />} />
              <Route path="/games/pleasure-map" element={<PleasureMap />} />
              {/** Removed duplicates: Foreplay Dice, Massage Journey, Desire Explorer **/}
              <Route path="/games/scratch-position" element={<ScratchPosition />} />
              <Route path="/games/spin-for-desire" element={<SpinForDesire />} />
              <Route path="/games/long-distance" element={<LongDistance />} />
              <Route path="/games/love-quiz" element={<LoveQuiz />} />
              <Route path="/games/honeymoon-bucket-list" element={<HoneymoonBucketList />} />
              <Route path="/games/first-night-bucket-list" element={<FirstNightBucketList />} />
              <Route path="/games/dice-to-spice" element={<DiceToSpice />} />
              
              {/* Positions Routes */}
              <Route path="/positions" element={<Positions />} />
              <Route path="/positions/most-popular" element={<MostPopular />} />
              <Route path="/positions/all" element={<Navigate to="/games/scratch-position?start=1#start" replace />} />
              <Route path="/positions/custom-poster" element={<CustomPoster />} />
              {/** Removed Random Generator route **/}
              
              {/* Blog Routes */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/blog/new" element={<AddBlog />} />
              <Route path="/admin/positions/new" element={<AddPosition />} />
              <Route path="/admin/scratch-positions" element={<ScratchPositionsAdmin />} />
              <Route path="/admin/spin-for-desire" element={<SpinForDesireAdmin />} />
              <Route path="/admin/custom-poster" element={<CustomPosterAdmin />} />
              <Route path="/admin/journey-images" element={<JourneyImagesAdmin />} />
              <Route path="/admin/images" element={<ImageManagementAdmin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* Other Routes */}
              <Route path="/journey-planner" element={<JourneyPlanner />} />
              <Route path="/scratch-cards" element={<Navigate to="/games/scratch-position?start=1#start" replace />} />
              <Route path="/love-languages" element={<LoveLanguageExplorer />} />
              <Route path="/romantic-guides" element={<RomanticGuides />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
