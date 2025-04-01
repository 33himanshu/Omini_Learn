
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Button
} from "@/components/ui/button";
import { 
  Input
} from "@/components/ui/input";
import { 
  Label
} from "@/components/ui/label";
import { 
  Monitor, 
  Mic, 
  User, 
  BrainCircuit,
  FileUp,
  Upload
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/sonner";

const MockInterviewWelcomePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState("ml-engineer");
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check if file is a PDF or DOC/DOCX
      if (file.type === 'application/pdf' || 
          file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
        toast.success("Resume uploaded successfully.");
      } else {
        toast.error("Please upload a PDF, DOC, or DOCX file.");
      }
    }
  };

  const handleStartInterview = () => {
    // Here we'd normally process the resume, but for this demo we'll just navigate
    localStorage.setItem('selectedRole', selectedRole);
    if (selectedFile) {
      localStorage.setItem('hasResume', 'true');
      // In a real app, we'd upload the file to a server or process it
    }
    
    navigate('/mock-interview');
  };

  const roleOptions = [
    {
      id: "ml-engineer",
      title: "Machine Learning Engineer",
      description: "Focus on ML algorithms, data preprocessing, and model evaluation",
      available: true
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Emphasis on statistical analysis, visualization, and insights",
      available: false
    },
    {
      id: "software-engineer",
      title: "Software Engineer",
      description: "Focus on algorithms, data structures, and system design",
      available: false
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto py-12 max-w-6xl px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">AI-Powered Mock Interview</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Practice your technical interview skills with our AI interviewer and get real-time feedback
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="backdrop-blur-sm bg-background/80 border-primary/20 shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Real Interview Experience</h3>
                  <p className="text-muted-foreground">
                    Simulates a real interview with AI-generated questions specific to Machine Learning roles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Speech Recognition</h3>
                  <p className="text-muted-foreground">
                    Speak naturally and get your answers transcribed automatically
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Facial Analysis</h3>
                  <p className="text-muted-foreground">
                    Get feedback on confidence and presentation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Feedback</h3>
                  <p className="text-muted-foreground">
                    Receive detailed analysis and improvement suggestions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-background/80 border-primary/20 shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">Interview Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {roleOptions.map((role) => (
                <div 
                  key={role.id}
                  className={`p-4 border ${
                    selectedRole === role.id ? 'border-primary' : 'border-primary/20'
                  } rounded-lg cursor-pointer hover:bg-primary/5 transition-colors ${
                    role.available ? '' : 'opacity-60'
                  }`}
                  onClick={() => role.available && setSelectedRole(role.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-lg">{role.title}</h3>
                    {!role.available && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">Coming Soon</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{role.description}</p>
                </div>
              ))}

              <div className="border border-dashed border-primary/20 rounded-lg p-6 mt-6">
                <div className="text-center">
                  <FileUp className="h-8 w-8 mx-auto text-primary/60 mb-3" />
                  <h3 className="font-semibold mb-2">Upload Your Resume (Optional)</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload your resume for more personalized interview questions
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {selectedFile ? 'Change File' : 'Select File'}
                  </Button>
                  {selectedFile && (
                    <p className="text-sm text-green-500 mt-2">
                      {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleStartInterview}
            size="lg"
            className="w-full max-w-md bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white py-6 text-lg shadow-lg"
          >
            Start Mock Interview
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default MockInterviewWelcomePage;
