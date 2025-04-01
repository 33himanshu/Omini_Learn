
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
  path: string; // Added path prop for navigation
}

const FeatureCard = ({ icon, title, description, color, delay = 0, path }: FeatureCardProps) => {
  return (
    <Link to={path} className="block w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        whileHover={{ y: -5 }}
        className="feature-card group relative z-10 backdrop-blur-sm"
      >
        {/* Background gradient effect */}
        <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity rounded-xl`} />
        
        {/* Subtle border gradient effect on hover */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/20 transition-colors duration-300"></div>
        
        {/* Icon with hover animation */}
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary/80 group-hover:text-primary transition-colors card-icon">
          {icon}
        </div>
        
        {/* Content with subtle transitions */}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">{description}</p>
        
        {/* Hidden arrow that appears on hover */}
        <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path 
              d="M7 17L17 7M17 7H8M17 7V16" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
};

export default FeatureCard;
