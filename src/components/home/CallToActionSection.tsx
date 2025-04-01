
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, Calculator, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToActionSection = () => {
  return (
    <section>
      <motion.div 
        className="bg-gradient-to-r from-primary/10 to-purple-600/10 backdrop-blur-md border border-primary/10 rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-600 to-primary" />
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Supercharge Your Learning?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Try our AI-powered tools today and take your skills to the next level.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/mock-interview/welcome">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 group"
              >
                <BrainCircuit className="mr-2 h-5 w-5" />
                Start Mock Interview
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/math-solver">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/20 bg-background/50 hover:bg-primary/5"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Try Math Solver
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToActionSection;
