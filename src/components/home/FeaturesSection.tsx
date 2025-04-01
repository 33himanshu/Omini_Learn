
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Calculator, 
  FileText, 
  LineChart, 
  PenTool, 
  Sparkles 
} from 'lucide-react';
import FeatureCard from '@/components/ui/FeatureCard';

const FeaturesSection = () => {
  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Powerful AI Tools for <span className="text-primary">Modern Learning</span>
        </motion.h2>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our suite of AI-powered tools is designed to enhance your learning experience and help you excel in your career.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Video className="h-6 w-6" />}
          title="AI Mock Interviews"
          description="Practice technical interviews with our AI interviewer. Get real-time feedback on your answers and communication style."
          color="from-blue-500 to-cyan-500"
          delay={1}
          path="/mock-interview/welcome"
        />
        
        <FeatureCard
          icon={<Calculator className="h-6 w-6" />}
          title="Math Problem Solver"
          description="Solve complex math problems step by step with our AI assistant. Understand the solutions, not just the answers."
          color="from-purple-500 to-pink-500"
          delay={2}
          path="/math-solver"
        />
        
        <FeatureCard
          icon={<FileText className="h-6 w-6" />}
          title="Notes Organizer"
          description="Organize your study notes with AI assistance. Summarize, categorize, and retrieve information when you need it."
          color="from-amber-500 to-orange-500"
          delay={3}
          path="/notes-organizer"
        />
        
        <FeatureCard
          icon={<LineChart className="h-6 w-6" />}
          title="Performance Analytics"
          description="Track your progress over time with detailed analytics and insights to help you identify areas for improvement."
          color="from-emerald-500 to-teal-500"
          delay={4}
          path="/profile"
        />
        
        <FeatureCard
          icon={<PenTool className="h-6 w-6" />}
          title="AI Tutoring"
          description="Get personalized tutoring from our AI tutors. Ask questions and receive clear, concise explanations."
          color="from-rose-500 to-red-500"
          delay={5}
          path="/math-solver"
        />
        
        <FeatureCard
          icon={<Sparkles className="h-6 w-6" />}
          title="Smart Flashcards"
          description="Create and study with AI-generated flashcards that adapt to your learning style and progress."
          color="from-indigo-500 to-blue-500"
          delay={6}
          path="/notes-organizer"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
