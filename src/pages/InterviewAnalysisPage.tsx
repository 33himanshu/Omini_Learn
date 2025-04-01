
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BrainCircuit, 
  CheckCircle, 
  PenLine, 
  XCircle, 
  Home,
  Download,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ScoreCircle from "@/components/score-circle";

const InterviewAnalysisPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [interviewData, setInterviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState({
    overall: 0,
    completeness: 0,
    communication: 0,
    technicalKnowledge: 0,
    confidence: 0,
  });
  const [skills, setSkills] = useState({
    strong: ["Machine Learning Fundamentals", "Data Preprocessing"],
    moderate: ["Model Evaluation", "Neural Networks"],
    weak: ["Deployment Strategies", "MLOps"],
  });
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // In a real app, we would fetch the analysis from the API
    // For now, we'll use the data from localStorage and generate mock scores
    const loadData = async () => {
      try {
        const data = localStorage.getItem("interviewData");
        
        if (!data) {
          // Use mock data for demonstration
          setInterviewData({
            duration: 600, // 10 minutes
            questions: ["Tell me about yourself", "What is your experience with ML?"],
            messages: [
              { role: "assistant", content: "Tell me about yourself" },
              { role: "user", content: "I am a machine learning engineer with 3 years of experience." },
              { role: "assistant", content: "Great! What projects have you worked on?" }
            ]
          });
        } else {
          setInterviewData(JSON.parse(data));
        }

        // Generate mock scores
        setScores({
          overall: Math.floor(Math.random() * 30) + 70, // 70-99
          completeness: Math.floor(Math.random() * 40) + 60, // 60-99
          communication: Math.floor(Math.random() * 40) + 60, // 60-99
          technicalKnowledge: Math.floor(Math.random() * 40) + 60, // 60-99
          confidence: Math.floor(Math.random() * 40) + 60, // 60-99
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading interview data:", error);
        toast.error("Could not load interview data.");
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const barChartData = [
    { name: "Strong", value: skills.strong.length, fill: "#10b981" }, // green
    { name: "Moderate", value: skills.moderate.length, fill: "#f59e0b" }, // yellow
    { name: "Weak", value: skills.weak.length, fill: "#ef4444" }, // red
  ];

  const downloadReport = () => {
    toast.success("Interview analysis report downloaded!");
  };

  const getColorByScore = (score: number) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 70) return "#3b82f6"; // blue
    if (score >= 60) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl">Analyzing your interview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <BrainCircuit className="mr-2 h-8 w-8 text-primary" />
            Interview Analysis
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Home
            </Button>
            <Button onClick={downloadReport} className="flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
              <Download className="h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        {/* System time and info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="col-span-2 border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 z-0"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-2xl">Interview Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground">
                Machine Learning Engineer Position • {formatTime(interviewData?.duration || 0)} Duration •{" "}
                {interviewData?.questions?.length || 0} Questions
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 z-0"></div>
            <CardContent className="flex flex-col items-center justify-center h-full py-6 relative z-10">
              <div className="text-primary text-4xl font-bold">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <div className="text-muted-foreground">
                {new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for analysis sections */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-background/80 backdrop-blur-sm border border-primary/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 z-0"></div>
                <CardHeader className="relative z-10">
                  <CardTitle>Overall Performance</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center py-8 relative z-10">
                  <ScoreCircle score={scores.overall} size={200} />
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 z-0"></div>
                <CardHeader className="relative z-10">
                  <CardTitle>Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 relative z-10">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Completeness</span>
                        <span>{scores.completeness}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${scores.completeness}%`, backgroundColor: getColorByScore(scores.completeness) }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Communication</span>
                        <span>{scores.communication}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${scores.communication}%`, backgroundColor: getColorByScore(scores.communication) }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Technical Knowledge</span>
                        <span>{scores.technicalKnowledge}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${scores.technicalKnowledge}%`, backgroundColor: getColorByScore(scores.technicalKnowledge) }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Confidence</span>
                        <span>{scores.confidence}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${scores.confidence}%`, backgroundColor: getColorByScore(scores.confidence) }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 z-0"></div>
              <CardHeader className="relative z-10">
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/10 p-4 rounded-lg border border-green-900/20">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Strengths
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Strong understanding of machine learning fundamentals</li>
                      <li>Good communication of technical concepts</li>
                      <li>Effective problem-solving approach</li>
                    </ul>
                  </div>

                  <div className="bg-red-900/10 p-4 rounded-lg border border-red-900/20">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <XCircle className="h-5 w-5 mr-2 text-red-500" />
                      Areas for Improvement
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Deepen knowledge of MLOps and deployment strategies</li>
                      <li>Practice more concise responses to technical questions</li>
                      <li>Improve confidence when discussing complex topics</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Analysis Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card className="border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 z-0"></div>
              <CardHeader className="relative z-10">
                <CardTitle>Skills Distribution</CardTitle>
                <CardDescription>Analysis of your demonstrated skills during the interview</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-background to-green-300/5 z-0"></div>
                <CardHeader className="bg-green-900/20 relative z-10">
                  <CardTitle className="text-green-400">Strong Skills</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {skills.strong.map((skill, index) => (
                      <div key={index} className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-background to-yellow-300/5 z-0"></div>
                <CardHeader className="bg-yellow-900/20 relative z-10">
                  <CardTitle className="text-yellow-400">Moderate Skills</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {skills.moderate.map((skill, index) => (
                      <div key={index} className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs">
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-background to-red-300/5 z-0"></div>
                <CardHeader className="bg-red-900/20 relative z-10">
                  <CardTitle className="text-red-400">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {skills.weak.map((skill, index) => (
                      <div key={index} className="px-2 py-1 bg-red-900/30 text-red-400 rounded-full text-xs">
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transcript Tab */}
          <TabsContent value="transcript">
            <Card className="border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 z-0"></div>
              <CardHeader className="flex flex-row items-center justify-between relative z-10">
                <div>
                  <CardTitle>Interview Transcript</CardTitle>
                  <CardDescription>Full conversation from your interview</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={downloadReport}>
                  <Download className="h-4 w-4 mr-2" /> Save
                </Button>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4">
                  {interviewData?.messages?.map((message: any, index: number) => (
                    <div key={index} className="mb-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        {message.role === "user" ? "You" : message.role === "system" ? "System" : "Interviewer"}:
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-primary/20 border border-primary/30"
                            : message.role === "system"
                              ? "bg-muted"
                              : "bg-secondary/30"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-primary/10 p-4 flex justify-between relative z-10">
                <p className="text-sm text-muted-foreground">
                  {interviewData?.messages?.filter((m: any) => m.role === "user").length || 0} responses over {formatTime(interviewData?.duration || 0)}
                </p>
                <Button variant="outline" size="sm" onClick={() => navigate("/mock-interview")}>
                  Try Again <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default InterviewAnalysisPage;
