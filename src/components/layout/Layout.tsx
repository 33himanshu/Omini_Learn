
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, User, Book, Calculator, BrainCircuit, PenLine, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/", icon: <Book className="h-5 w-5" /> },
    { name: "Mock Interview", path: "/mock-interview", icon: <BrainCircuit className="h-5 w-5" /> },
    { name: "Math Solver", path: "/math-solver", icon: <Calculator className="h-5 w-5" /> },
    { name: "Notes Organizer", path: "/notes-organizer", icon: <PenLine className="h-5 w-5" /> },
    { name: "Profile", path: "/profile", icon: <User className="h-5 w-5" /> },
  ];

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Set dark mode by default, but still check local storage preference
    const darkModePreference = localStorage.getItem("darkMode") === "false" ? false : true;
    setIsDarkMode(darkModePreference);
    
    if (!darkModePreference) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    localStorage.setItem("darkMode", String(newDarkMode));
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  const handleLogin = () => {
    // Placeholder for login functionality
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    // Placeholder for signup functionality
    navigate("/signup");
  };

  const handleLogout = () => {
    // Placeholder for logout functionality
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                className="h-8 w-8 bg-gradient-to-r from-brand-purple to-brand-blue rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <span className="text-xl font-display font-bold">AI Learning Hub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavLinkClick(link.path)}
                  className={`nav-link flex items-center space-x-1 ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </button>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleSignup}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden ml-2 p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background z-40"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavLinkClick(link.path)}
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted transition-colors"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </button>
              ))}
              
              {/* Mobile auth buttons */}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleLogin}
                    className="justify-start"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={handleSignup}
                    className="justify-start"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-gradient-to-r from-brand-purple to-brand-blue rounded-lg" />
              <span className="font-display font-bold">AI Learning Hub</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Learning Hub. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
