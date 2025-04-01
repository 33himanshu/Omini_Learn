
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, BarChart2 } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="mb-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background rounded-3xl z-0" />
      
      <div className="relative z-10 p-8 lg:p-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform makes learning and interview preparation simple and effective.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Choose Your Tool</h3>
            <p className="text-muted-foreground">
              Select from our suite of AI-powered tools designed to help you learn, practice, and excel.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center text-center relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interact with AI</h3>
            <p className="text-muted-foreground">
              Our advanced AI provides personalized experiences, adapting to your learning style and needs.
            </p>
            
            {/* Connector lines */}
            <div className="hidden md:block absolute left-0 top-8 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <BarChart2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
            <p className="text-muted-foreground">
              Get detailed feedback and analytics to track your improvement and identify areas for growth.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
