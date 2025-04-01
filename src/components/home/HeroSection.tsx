
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Calculator, 
  Video, 
  ChevronRight,
  UserIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="hero-container rounded-3xl mb-20 overflow-hidden relative p-8 lg:p-16">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-background z-0" />
      
      {/* Animated accent elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              AI-Powered Learning
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Your <span className="text-primary">AI Companion</span> for Learning & Interview Prep
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Enhance your skills with our advanced AI-powered tools designed to help you learn, practice, and excel.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link to="/mock-interview/welcome">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 group"
              >
                <Video className="mr-2 h-5 w-5" />
                Try Mock Interview
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/math-solver">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/5"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Solve Math Problems
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl blur-2xl" />
          <div className="relative bg-black/40 backdrop-blur-sm border border-primary/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-10 bg-black/40 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-4 h-5 w-32 bg-white/10 rounded-full" />
            </div>
            <div className="pt-10 pb-6 px-6">
              <div className="flex gap-4 items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-black/40 rounded-lg p-3 max-w-sm">
                  <p className="text-sm">I'll help you prepare for your technical interviews with realistic questions and personalized feedback.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start mb-4 justify-end">
                <div className="bg-primary/20 text-white rounded-lg p-3 max-w-sm">
                  <p className="text-sm">How does the mock interview process work?</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-black/40 rounded-lg p-3 max-w-sm">
                  <p className="text-sm">You'll get real-time feedback on your answers, facial expressions, and communication style. After the interview, I'll provide a detailed analysis of your performance.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
