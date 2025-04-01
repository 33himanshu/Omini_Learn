
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import MockInterviewPage from "./pages/MockInterviewPage";
import MockInterviewWelcomePage from "./pages/MockInterviewWelcomePage";
import InterviewAnalysisPage from "./pages/InterviewAnalysisPage";
import MathSolverPage from "./pages/MathSolverPage";
import NotesOrganizerPage from "./pages/NotesOrganizerPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { MotionConfig } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode") === "false" ? false : true;
    
    if (!darkModePreference) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="math-solver" element={<MathSolverPage />} />
                <Route path="notes-organizer" element={<NotesOrganizerPage />} />
                <Route path="mock-interview" element={<MockInterviewPage />} />
                <Route path="mock-interview/welcome" element={<MockInterviewWelcomePage />} />
                <Route path="interview-analysis/:id" element={<InterviewAnalysisPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
};

export default App;
