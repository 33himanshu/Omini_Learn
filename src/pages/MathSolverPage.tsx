
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { MathSolver } from "@/components/math-solver/math-solver";

const MathSolverPage = () => {
  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Math Problem Solver
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Draw or type your math problem and get step-by-step solutions
          </motion.p>
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MathSolver />
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <PlusIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Multiple Formats</h3>
                  <p className="text-sm text-muted-foreground">
                    Write or type equations in various formats including algebraic, calculus, and more
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <PlusIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Step-by-Step Solutions</h3>
                  <p className="text-sm text-muted-foreground">
                    Get detailed explanations for each step of the solution process
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <PlusIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Save & Export</h3>
                  <p className="text-sm text-muted-foreground">
                    Save your solved problems and export solutions for future reference
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MathSolverPage;
