import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Mic, 
  MicOff, 
  Send, 
  Clock, 
  BrainCircuit,
  Play,
  Pause,
  StopCircle,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  User,
  ChevronRight,
  Smile,
  Eye,
  MessageSquare,
  HelpCircle,
  X,
  BarChart4,
  Info,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import FaceAnalysis from "@/components/face-analysis";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: any;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionEvent) => void) | null;
  onend: ((event: Event) => void) | null;
  onstart: ((event: Event) => void) | null;
}

interface IWindow extends Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

const MOCK_QUESTIONS = {
  technical: [
    "Tell me about your experience with machine learning algorithms.",
    "How would you handle imbalanced datasets?",
    "Explain the difference between supervised and unsupervised learning.",
    "What evaluation metrics would you use for a classification problem?",
    "Describe a challenging ML project you've worked on."
  ],
  behavioral: [
    "Tell me about a time when you had to work under pressure to meet a deadline.",
    "Describe a situation where you had to resolve a conflict within your team.",
    "How do you handle feedback and criticism?",
    "Tell me about a time when you demonstrated leadership.",
    "How do you prioritize tasks when you have multiple deadlines?"
  ]
};

const MockInterviewPage = () => {
  const navigate = useNavigate();
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState<"technical" | "behavioral">("technical");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([
    { role: "assistant", content: "Welcome to your AI Mock Interview. Click 'Start Interview' when you're ready to begin." }
  ]);
  const [timer, setTimer] = useState(0);
  const [faceMetrics, setFaceMetrics] = useState({
    attention: 0,
    positivity: 0,
    confidence: 0,
    happy: 0,
    uncomfortable: 0,
  });
  const [interviewData, setInterviewData] = useState<any>({
    questions: [],
    responses: [],
    faceMetrics: [],
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const windowWithSpeech = window as unknown as IWindow;
    const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";
        
        recognitionRef.current.onstart = () => {
          console.log("Speech recognition started");
          setIsListening(true);
        };

        recognitionRef.current.onend = () => {
          console.log("Speech recognition ended");
          setIsListening(false);
          
          if (isInterviewStarted && !isPaused && isMicOn) {
            try {
              recognitionRef.current?.start();
            } catch (error) {
              console.error("Failed to restart speech recognition:", error);
            }
          }
        };
        
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          setTranscript(finalTranscript || interimTranscript);
        };
        
        recognitionRef.current.onerror = (event: SpeechRecognitionEvent) => {
          console.error('Speech recognition error', event.error);
          
          if (event.error === "not-allowed" || event.error === "permission-denied") {
            toast.error("Microphone access denied. Please allow microphone access to use this feature.");
            setIsMicOn(false);
          } else if (event.error !== "aborted") {
            toast.error("Speech recognition error. Please try again.");
          }
          
          setIsListening(false);
        };
      }
    } else {
      toast.error("Speech recognition is not supported in this browser. Try using Chrome.");
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.log("Recognition may not be running:", error);
        }
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInterviewStarted && !isPaused && isMicOn) {
      try {
        if (!isListening && recognitionRef.current) {
          recognitionRef.current.start();
        }
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
      }
    } else if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Recognition may not be running:", error);
      }
    }
  }, [isInterviewStarted, isPaused, isMicOn, isListening]);

  useEffect(() => {
    if (isVideoOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing webcam:", err);
          toast.error("Unable to access camera. Please check permissions.");
          setIsVideoOn(false);
        });
    } else if (!isVideoOn && videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isVideoOn]);

  useEffect(() => {
    if (!currentQuestion || !isAudioOn || typeof window === "undefined") return;

    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis is not supported in this browser");
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    try {
      const utterance = new SpeechSynthesisUtterance(currentQuestion);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;

      let voices = window.speechSynthesis.getVoices();
      
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          const preferredVoice = voices.find(
            (voice) => 
              voice.name.includes("Google") || 
              voice.name.includes("Female") || 
              voice.name.includes("en-US")
          );
          
          if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log("Using voice:", preferredVoice.name);
          }
          
          window.speechSynthesis.speak(utterance);
          setIsSpeaking(true);
        };
      } else {
        const preferredVoice = voices.find(
          (voice) => 
            voice.name.includes("Google") || 
            voice.name.includes("Female") || 
            voice.name.includes("en-US")
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
          console.log("Using voice:", preferredVoice.name);
        }
        
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }

      utterance.onstart = () => {
        console.log("Speech started");
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        console.log("Speech ended");
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setIsSpeaking(false);
      };

      speechSynthesisRef.current = utterance;
    } catch (error) {
      console.error("Error with speech synthesis:", error);
    }

    return () => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    }
  }, [currentQuestion, isAudioOn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isInterviewStarted && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isInterviewStarted, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startInterview = () => {
    setIsInterviewStarted(true);
    setIsPaused(false);

    timerRef.current = window.setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    const questions = MOCK_QUESTIONS[activeTab];
    const firstQuestion = questions[0];
    setCurrentQuestion(firstQuestion);
    setCurrentQuestionIndex(0);

    setMessages([
      {
        role: "system",
        content: "Interview started. I'll be asking you questions about machine learning engineering. Please respond verbally or type your response."
      },
      { role: "assistant", content: firstQuestion }
    ]);

    setInterviewData(prev => ({
      ...prev,
      questions: [...prev.questions, firstQuestion]
    }));

    setTimeout(() => {
      if (isAudioOn && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(firstQuestion);
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          (voice) => voice.name.includes("Google") || voice.name.includes("Female") || voice.name.includes("en-US")
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
      }
    }, 500);

    toast.success("Interview started. Your first question is ready.");
  };

  const pauseInterview = () => {
    setIsPaused(!isPaused);

    if (!isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      toast.info("Interview paused. Take a moment to collect your thoughts.");
    } else {
      timerRef.current = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      toast.success("Interview resumed. Continue with your responses.");
    }
  };

  const toggleMicrophone = () => {
    const hasSpeechRecognition =
      typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

    if (!isMicOn && !hasSpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser. Try using Chrome.");
      return;
    }

    setIsMicOn(!isMicOn);

    if (isMicOn) {
      if (recognitionRef.current && isListening) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.log("Recognition may not be running:", error);
        }
      }
      toast.info("Microphone turned off");
    } else {
      toast.success("Microphone turned on");
      if (isInterviewStarted && !isPaused && recognitionRef.current && !isListening) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error("Failed to start speech recognition:", error);
        }
      }
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);

    if (isVideoOn) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      toast.info("Camera turned off");
    } else {
      toast.success("Camera turned on");
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);

    if (isAudioOn) {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      toast.info("AI interviewer voice muted");
    } else {
      toast.success("AI interviewer voice activated");
      if (currentQuestion && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(currentQuestion);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
      }
    }
  };

  const handleSendResponse = async () => {
    if (!transcript.trim()) {
      toast.error("Please provide a response before submitting.");
      return;
    }

    setMessages(prev => [...prev, { role: "user", content: transcript }]);

    setInterviewData(prev => ({
      ...prev,
      responses: [...prev.responses, transcript],
      faceMetrics: [...prev.faceMetrics, { ...faceMetrics }]
    }));

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Recognition may not be running:", error);
      }
    }

    setTranscript("");

    try {
      setMessages(prev => [...prev, { role: "assistant", content: "Analyzing your response..." }]);
      
      setTimeout(() => {
        setMessages(prev => prev.slice(0, -1));
        
        const feedbackOptions = [
          "Good answer! You've demonstrated a solid understanding of the concept.",
          "Interesting perspective. I appreciate the detail in your explanation.",
          "That's a thoughtful response, though you might want to consider additional factors.",
          "Nice job explaining that concept, though there's some room for more technical depth."
        ];
        
        const feedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
        
        const questions = MOCK_QUESTIONS[activeTab];
        const nextQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        const nextQuestion = questions[nextQuestionIndex];
        
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: feedback },
          { role: "assistant", content: nextQuestion }
        ]);
        
        setCurrentQuestion(nextQuestion);
        setCurrentQuestionIndex(nextQuestionIndex);
        
        setInterviewData(prev => ({
          ...prev,
          questions: [...prev.questions, nextQuestion]
        }));
      }, 2000);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("There was an error processing your response. Please try again.");
      
      setMessages(prev => prev.slice(0, -1));
    }
  };

  const nextQuestion = () => {
    const questions = MOCK_QUESTIONS[activeTab];
    const nextQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    const nextQuestion = questions[nextQuestionIndex];
    
    setCurrentQuestion(nextQuestion);
    setCurrentQuestionIndex(nextQuestionIndex);
    setTranscript("");
    
    setMessages(prev => [
      ...prev,
      { role: "assistant", content: nextQuestion }
    ]);
    
    setInterviewData(prev => ({
      ...prev,
      questions: [...prev.questions, nextQuestion]
    }));

    toast.info("Moving to the next question.");
  };

  const endInterview = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Recognition may not be running:", error);
      }
    }

    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    localStorage.setItem(
      "interviewData",
      JSON.stringify({
        ...interviewData,
        duration: timer,
        messages,
      })
    );

    toast.success("Interview completed! Redirecting to analysis...");
    
    setTimeout(() => {
      navigate("/interview-analysis/1");
    }, 1500);
  };

  const updateFaceMetrics = (metrics: any) => {
    setFaceMetrics(metrics);
  };

  const getMetricBadgeState = (value: number) => {
    const percent = value * 100;
    if (percent >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    if (percent >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
  };

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
            AI Mock Interview
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-lg font-mono">{formatTime(timer)}</span>
            </div>
            <Button 
              variant="destructive" 
              onClick={endInterview} 
              disabled={!isInterviewStarted}
            >
              End Interview
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 z-0"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center">
                Video Feed
                <div className="ml-auto flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full h-8 w-8 ${!isMicOn ? "bg-red-500/10 text-red-500 border-red-500/30" : ""}`}
                          onClick={toggleMicrophone}
                        >
                          {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isMicOn ? "Turn off microphone" : "Turn on microphone"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full h-8 w-8 ${!isVideoOn ? "bg-red-500/10 text-red-500 border-red-500/30" : ""}`}
                          onClick={toggleVideo}
                        >
                          {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isVideoOn ? "Turn off camera" : "Turn on camera"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full h-8 w-8 ${!isAudioOn ? "bg-red-500/10 text-red-500 border-red-500/30" : ""}`}
                          onClick={toggleAudio}
                        >
                          {isAudioOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isAudioOn ? "Mute AI voice" : "Unmute AI voice"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              {isInterviewStarted ? (
                <>
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mock-interview-backdrop border border-primary/10 shadow-inner">
                    {isVideoOn ? (
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                        <User className="h-16 w-16 text-muted-foreground/50 mb-2" />
                        <p className="text-sm text-muted-foreground">Camera is turned off</p>
                      </div>
                    )}
                    
                    {isVideoOn && (
                      <FaceAnalysis videoRef={videoRef} onMetricsUpdate={updateFaceMetrics} />
                    )}
                    
                    {isInterviewStarted && !isPaused && isVideoOn && (
                      <div className="absolute top-4 right-4 flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                        <span className="text-xs text-white/80 bg-black/50 px-2 py-1 rounded-full">REC</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(faceMetrics).slice(0, 4).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center capitalize">
                          {key === "attention" && <Eye className="h-3 w-3 mr-1 text-blue-400" />}
                          {key === "confidence" && <MessageSquare className="h-3 w-3 mr-1 text-purple-400" />}
                          {key === "positivity" && <Smile className="h-3 w-3 mr-1 text-green-400" />}
                          {key === "happy" && <Smile className="h-3 w-3 mr-1 text-amber-400" />}
                          {key}
                        </p>
                        <Progress 
                          value={value * 100} 
                          className="h-2"
                          style={{
                            "--progress-background": key === "attention" ? "rgb(96, 165, 250)" : 
                                                    key === "confidence" ? "rgb(192, 132, 252)" : 
                                                    key === "positivity" ? "rgb(74, 222, 128)" : 
                                                    "rgb(251, 191, 36)"
                          } as React.CSSProperties}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className={getMetricBadgeState(faceMetrics.attention)}>
                      {faceMetrics.attention * 100 >= 80 ? "Very Attentive" : faceMetrics.attention * 100 >= 60 ? "Attentive" : "Distracted"}
                    </Badge>
                    <Badge variant="outline" className={getMetricBadgeState(faceMetrics.confidence)}>
                      {faceMetrics.confidence * 100 >= 80 ? "Confident" : faceMetrics.confidence * 100 >= 60 ? "Moderate" : "Nervous"}
                    </Badge>
                    <Badge variant="outline" className={getMetricBadgeState(faceMetrics.positivity)}>
                      {faceMetrics.positivity * 100 >= 80 ? "Positive" : faceMetrics.positivity * 100 >= 60 ? "Neutral" : "Negative"}
                    </Badge>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "technical" | "behavioral")} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="technical">Technical</TabsTrigger>
                      <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  {isInterviewStarted && (
                    <div className="text-center text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS[activeTab].length}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <BrainCircuit className="h-16 w-16 text-primary mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Click the button below to start your mock interview for a Machine Learning Engineer position.
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    onClick={startInterview}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Interview
                  </Button>
                </div>
              )}
              
              {isInterviewStarted && (
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={pauseInterview}
                    className="border-primary/20 hover:bg-primary/5"
                  >
                    {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    variant="destructive" 
                    onClick={endInterview}
                  >
                    <StopCircle className="mr-2 h-4 w-4" />
                    End Interview
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-primary/20 bg-background/80 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 z-0"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center">
                Interview Session
                <div className="ml-auto flex items-center gap-2">
                  {isListening && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <Mic className="h-3 w-3 mr-1" />
                      Listening
                    </Badge>
                  )}
                  {isSpeaking && (
                    <Badge className="bg-green-500 text-white">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Speaking
                    </Badge>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-8 w-8"
                          onClick={() => setShowTips(!showTips)}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{showTips ? "Hide interview tips" : "Show interview tips"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    <Card className="p-4 border border-primary/20 bg-primary/5">
                      <div className="flex items-center mb-2">
                        <h3 className="text-sm font-semibold">Interview Tips</h3>
                        <Button variant="ghost" size="sm" onClick={() => setShowTips(false)} className="h-6 w-6 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>• Maintain eye contact with the camera to demonstrate confidence.</p>
                        <p>• Use the STAR method (Situation, Task, Action, Result) for behavioral questions.</p>
                        <p>• Speak clearly and at a moderate pace for better voice recognition.</p>
                        <p>• Take a moment to gather your thoughts before answering complex questions.</p>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex flex-col h-[500px]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
                  {messages.map((message, index) => (
                    <div 
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : message.role === "system" 
                              ? "bg-secondary text-secondary-foreground" 
                              : "bg-muted text-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                {isInterviewStarted ? (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <p className="text-sm text-muted-foreground">Your response:</p>
                        {isListening && (
                          <div className="ml-2 flex items-center">
                            <span className="inline-block h-1 w-1 rounded-full bg-red-400 mr-1 animate-ping"></span>
                            <span
                              className="inline-block h-1 w-1 rounded-full bg-red-400 mr-1 animate-ping"
                              style={{ animationDelay: "0.2s" }}
                            ></span>
                            <span
                              className="inline-block h-1 w-1 rounded-full bg-red-400 animate-ping"
                              style={{ animationDelay: "0.4s" }}
                            ></span>
                          </div>
                        )}
                      </div>
                      <p className="min-h-[40px]">
                        {transcript || (
                          isMicOn 
                            ? "Speak or type to provide your answer..." 
                            : "Microphone is off. Enable it or type your response below."
                        )}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant={isListening ? "destructive" : "outline"}
                        onClick={toggleMicrophone}
                        className="flex-shrink-0"
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Textarea 
                        placeholder="Type your response here..."
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                        className="flex-1 h-10 min-h-0 resize-none"
                      />
                      <Button
                        className="flex-shrink-0 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                        onClick={handleSendResponse}
                        disabled={!transcript.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" /> Send
                      </Button>
                    </div>
                    
                    {currentQuestionIndex > 0 && (
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          onClick={nextQuestion}
                          className="border-primary/20 hover:bg-primary/5"
                        >
                          Next Question
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">Start the interview to begin the session.</p>
                  </div>
                )}
                
                {isInterviewStarted && interviewData.questions.length >= 3 && (
                  <div className="mt-4 flex justify-center">
                    <Button onClick={endInterview} className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                      <BarChart4 className="mr-2 h-4 w-4" />
                      Complete Interview & View Analysis
                    </Button>
                  </div>
                )}
              </div>
              
              {!isInterviewStarted && (
                <Card className="mt-4 p-4 border border-primary/20 bg-primary/5">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mr-3">
                      <Info className="h-4 w-4 text-amber-500" />
                    </div>
                    <h3 className="font-semibold">About AI Mock Interviews</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI-powered mock interviews help you prepare for real interviews by simulating realistic interview
                    scenarios. The system analyzes your facial expressions, tone, and content of your responses to provide
                    comprehensive feedback.
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-muted/20 rounded-lg border border-primary/10">
                      <div className="font-medium mb-1">Interview Type</div>
                      <div className="text-xs text-muted-foreground">
                        {activeTab === "technical" ? "Technical" : "Behavioral"}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg border border-primary/10">
                      <div className="font-medium mb-1">Duration</div>
                      <div className="text-xs text-muted-foreground">~15 minutes</div>
                    </div>
                  </div>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default MockInterviewPage;
