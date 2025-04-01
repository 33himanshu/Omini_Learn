
// import { useState, useEffect, useRef } from "react";
// import { motion, MotionConfig } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { ChevronDown, ChevronUp, Pencil, Eraser, Trash2, Download, Undo, Redo, Home, Loader2 } from "lucide-react";
// import { FloatingToolbar } from "@/components/ui/floating-toolbar";
// import { Card } from "@/components/ui/card";

// interface FullScreenMathSolverProps {
//   onExit: () => void;
//   initialEquation?: string;
//   initialSolution?: string | null;
//   initialSteps?: string[];
// }

// export function FullScreenMathSolver({
//   onExit,
//   initialEquation = "",
//   initialSolution = null,
//   initialSteps = [],
// }: FullScreenMathSolverProps) {
//   const [equation, setEquation] = useState(initialEquation);
//   const [solution, setSolution] = useState<string | null>(initialSolution);
//   const [steps, setSteps] = useState<string[]>(initialSteps);
//   const [showSteps, setShowSteps] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSolution, setShowSolution] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [brushColor, setBrushColor] = useState("#000000");
//   const [brushSize, setBrushSize] = useState(3);
//   const [isEraser, setIsEraser] = useState(false);
//   const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
//   const [historyIndex, setHistoryIndex] = useState(-1);
//   const [lastX, setLastX] = useState(0);
//   const [lastY, setLastY] = useState(0);

//   const colorPalette = [
//     "#000000", "#FFFFFF", "#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#008000", "#A52A2A", "#FFC0CB", "#808080", "#4B0082", "#FF4500",
//   ];

//   // Dynamically adjust canvas width based on solution panel visibility
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d", { willReadFrequently: true });
//     if (!ctx) return;

//     canvasContextRef.current = ctx;

//     // Adjust canvas width based on showSolution
//     const canvasWidth = showSolution ? window.innerWidth - 400 : window.innerWidth;
//     canvas.width = canvasWidth;
//     canvas.height = window.innerHeight - 60;

//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     ctx.strokeStyle = brushColor;
//     ctx.lineWidth = brushSize;

//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Restore last canvas state if available
//     if (canvasHistory.length > 0 && historyIndex >= 0) {
//       ctx.putImageData(canvasHistory[historyIndex], 0, 0);
//     } else {
//       saveCanvasState();
//     }

//     const handleResize = () => {
//       if (!canvas || !ctx) return;

//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//       const newWidth = showSolution ? window.innerWidth - 400 : window.innerWidth;
//       canvas.width = newWidth;
//       canvas.height = window.innerHeight - 60;

//       ctx.putImageData(imageData, 0, 0);

//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
//       ctx.strokeStyle = isEraser ? "#ffffff" : brushColor;
//       ctx.lineWidth = brushSize;
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [brushColor, brushSize, isEraser, showSolution, canvasHistory, historyIndex]); 

//   useEffect(() => {
//     if (!canvasContextRef.current) return;

//     canvasContextRef.current.strokeStyle = isEraser ? "#ffffff" : brushColor;
//     canvasContextRef.current.lineWidth = brushSize;
//   }, [brushColor, brushSize, isEraser]);

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
//     if (!canvasContextRef.current) return;

//     setIsDrawing(true);

//     let clientX, clientY;
//     if ("touches" in e) {
//       clientX = e.touches[0].clientX;
//       clientY = e.touches[0].clientY;
//     } else {
//       clientX = e.clientX;
//       clientY = e.clientY;
//     }

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = clientX - rect.left;
//     const y = clientY - rect.top;

//     setLastX(x);
//     setLastY(y);

//     canvasContextRef.current.beginPath();
//     canvasContextRef.current.moveTo(x, y);
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !canvasContextRef.current) return;

//     let clientX, clientY;
//     if ("touches" in e) {
//       clientX = e.touches[0].clientX;
//       clientY = e.touches[0].clientY;
//     } else {
//       clientX = e.clientX;
//       clientY = e.clientY;
//     }

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = clientX - rect.left;
//     const y = clientY - rect.top;

//     canvasContextRef.current.lineTo(x, y);
//     canvasContextRef.current.stroke();

//     setLastX(x);
//     setLastY(y);
//   };

//   const stopDrawing = () => {
//     if (!isDrawing) return;

//     setIsDrawing(false);

//     if (canvasContextRef.current) {
//       canvasContextRef.current.closePath();
//     }

//     saveCanvasState();
//   };

//   const saveCanvasState = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvasContextRef.current;
//     if (!canvas || !ctx) return;

//     try {
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//       if (historyIndex < canvasHistory.length - 1) {
//         setCanvasHistory((prev) => prev.slice(0, historyIndex + 1));
//       }

//       setCanvasHistory((prev) => [...prev, imageData]);
//       setHistoryIndex((prev) => prev + 1);
//     } catch (error) {
//       console.error("Error saving canvas state:", error);
//     }
//   };

//   const undo = () => {
//     if (historyIndex <= 0) return;

//     const canvas = canvasRef.current;
//     const ctx = canvasContextRef.current;
//     if (!canvas || !ctx) return;

//     const newIndex = historyIndex - 1;
//     setHistoryIndex(newIndex);

//     ctx.putImageData(canvasHistory[newIndex], 0, 0);
//   };

//   const redo = () => {
//     if (historyIndex >= canvasHistory.length - 1) return;

//     const canvas = canvasRef.current;
//     const ctx = canvasContextRef.current;
//     if (!canvas || !ctx) return;

//     const newIndex = historyIndex + 1;
//     setHistoryIndex(newIndex);

//     ctx.putImageData(canvasHistory[newIndex], 0, 0);
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvasContextRef.current;
//     if (!canvas || !ctx) return;

//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     setSolution(null);
//     setSteps([]);
//     setEquation("");
//     setShowSolution(false);
//     setErrorMessage(null);

//     saveCanvasState();
//   };

//   const toggleEraser = () => {
//     setIsEraser(!isEraser);
//   };

//   const solveEquation = async () => {
//     setIsLoading(true);
//     setErrorMessage(null);

//     try {
//       const canvas = canvasRef.current;
//       if (!canvas) throw new Error("Canvas not available");

//       const dataURL = canvas.toDataURL("image/png");
//       console.log("Sending request to backend with image");

//       // This is a mock implementation since we don't have a backend yet
//       // In a real application, you would send the image to your backend
//       setTimeout(() => {
//         // Simulate a response from the backend
//         const mockEquation = "3x² + 6x - 9 = 0";
//         const mockSolution = "x = 1 or x = -3";
//         const mockSteps = [
//           "Start with the equation: 3x² + 6x - 9 = 0",
//           "Factor out the common term 3: 3(x² + 2x - 3) = 0",
//           "Since 3 ≠ 0, we have: x² + 2x - 3 = 0",
//           "Factor the quadratic: (x + 3)(x - 1) = 0",
//           "Set each factor equal to zero: x + 3 = 0 or x - 1 = 0",
//           "Solve for x: x = -3 or x = 1"
//         ];

//         setEquation(mockEquation);
//         setSolution(mockSolution);
//         setSteps(mockSteps);
//         setShowSolution(true);
//         setIsLoading(false);
//       }, 1500);
//     } catch (error) {
//       console.error("Error solving equation:", error);
//       setErrorMessage(`Failed to solve equation: ${(error as Error).message}`);
//       setIsLoading(false);
//     }
//   };

//   const downloadCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const dataURL = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.download = "math-equation.png";
//     link.href = dataURL;
//     link.click();
//   };

//   return (
//     <div className="fixed inset-0 bg-background z-50 flex flex-col">
//       <div className="h-[60px] border-b flex justify-between items-center px-4 bg-card">
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="icon" onClick={onExit} className="h-9 w-9">
//             <Home className="h-5 w-5" />
//           </Button>
//           <h1 className="text-xl font-bold">Math Solver</h1>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button onClick={solveEquation} disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Solving...
//               </>
//             ) : (
//               "Solve Equation"
//             )}
//           </Button>
//           {solution && (
//             <Button variant="outline" onClick={() => setShowSolution(!showSolution)} className="flex items-center">
//               {showSolution ? "Hide Solution" : "Show Solution"}
//             </Button>
//           )}
//         </div>
//       </div>

//       <div className="flex-1 relative" style={{ height: "calc(100vh - 60px)" }}>
//         <div className="absolute inset-0 w-full h-full" style={{ position: "relative", zIndex: 1 }}>
//           <canvas
//             ref={canvasRef}
//             className="touch-none"
//             style={{ position: "absolute", zIndex: 1, height: "100%" }}
//             onMouseDown={startDrawing}
//             onMouseMove={draw}
//             onMouseUp={stopDrawing}
//             onMouseLeave={stopDrawing}
//             onTouchStart={startDrawing}
//             onTouchMove={draw}
//             onTouchEnd={stopDrawing}
//           />

//           {errorMessage && (
//             <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
//               <span>{errorMessage}</span>
//             </div>
//           )}

//           <FloatingToolbar position="left">
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant={isEraser ? "outline" : "default"} size="icon" className="h-10 w-10">
//                   <Pencil className="h-5 w-5" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div className="space-y-4">
//                   <h4 className="font-medium">Brush Settings</h4>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span>Size: {brushSize}px</span>
//                     </div>
//                     <Slider
//                       value={[brushSize]}
//                       min={1}
//                       max={20}
//                       step={1}
//                       onValueChange={(value) => setBrushSize(value[0])}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <span>Color:</span>
//                     <div className="grid grid-cols-4 gap-2">
//                       {colorPalette.map((color) => (
//                         <button
//                           key={color}
//                           className={`h-8 w-8 rounded-full border-2 ${
//                             brushColor === color ? "border-primary" : "border-transparent"
//                           }`}
//                           style={{ backgroundColor: color }}
//                           onClick={() => {
//                             setBrushColor(color);
//                             setIsEraser(false);
//                           }}
//                         />
//                       ))}
//                     </div>
//                     <input
//                       type="color"
//                       value={brushColor}
//                       onChange={(e) => {
//                         setBrushColor(e.target.value);
//                         setIsEraser(false);
//                       }}
//                       className="w-full h-10 mt-2"
//                     />
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>

//             <Button variant={isEraser ? "default" : "outline"} size="icon" className="h-10 w-10" onClick={toggleEraser}>
//               <Eraser className="h-5 w-5" />
//             </Button>

//             <Button variant="outline" size="icon" className="h-10 w-10" onClick={undo} disabled={historyIndex <= 0}>
//               <Undo className="h-5 w-5" />
//             </Button>

//             <Button
//               variant="outline"
//               size="icon"
//               className="h-10 w-10"
//               onClick={redo}
//               disabled={historyIndex >= canvasHistory.length - 1}
//             >
//               <Redo className="h-5 w-5" />
//             </Button>

//             <Button variant="outline" size="icon" className="h-10 w-10" onClick={clearCanvas}>
//               <Trash2 className="h-5 w-5" />
//             </Button>

//             <Button variant="outline" size="icon" className="h-10 w-10" onClick={downloadCanvas}>
//               <Download className="h-5 w-5" />
//             </Button>
//           </FloatingToolbar>
//         </div>

//         {solution && showSolution && (
//           <MotionConfig transition={{ type: "spring", damping: 20 }}>
//             <motion.div
//               key={solution}
//               className="absolute right-0 top-0 bottom-0 bg-card border-l w-[400px] overflow-auto p-4 z-50"
//               initial={{ x: 400 }}
//               animate={{ x: 0 }}
//               exit={{ x: 400 }}
//               layout
//             >
//               <div className="space-y-6">
//                 <Card className="p-4">
//                   <h2 className="text-xl font-semibold mb-2">Equation/Problem</h2>
//                   <p className="text-lg font-mono">{equation || "No equation"}</p>
//                 </Card>
//                 <Card className="p-4">
//                   <h2 className="text-xl font-semibold mb-2">Solution/Result</h2>
//                   <p className="text-lg font-mono">{solution || "No solution provided"}</p>
//                   <div className="mt-4">
//                     <Button variant="outline" onClick={() => setShowSteps(!showSteps)} className="flex items-center">
//                       {showSteps ? (
//                         <>
//                           <ChevronUp className="mr-2 h-4 w-4" />
//                           Hide Steps
//                         </>
//                       ) : (
//                         <>
//                           <ChevronDown className="mr-2 h-4 w-4" />
//                           Show Steps
//                         </>
//                       )}
//                     </Button>
//                     {showSteps && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="mt-4 space-y-2 overflow-hidden"
//                       >
//                         {steps.length > 0 ? (
//                           steps.map((step, index) => (
//                             <motion.div
//                               key={index}
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: index * 0.1 }}
//                               className="p-3 border rounded-md bg-muted"
//                             >
//                               {step}
//                             </motion.div>
//                           ))
//                         ) : (
//                           <p>No steps available</p>
//                         )}
//                       </motion.div>
//                     )}
//                   </div>
//                 </Card>
//               </div>
//             </motion.div>
//           </MotionConfig>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, ChevronUp, Pencil, Eraser, Trash2, Download, Undo, Redo, Home, Loader2 } from "lucide-react";
import { FloatingToolbar } from "@/components/ui/floating-toolbar";
import { Card } from "@/components/ui/card";
import Draggable from "react-draggable";


// Declare MathJax on the Window interface
declare global {
  interface Window {
    MathJax: {
      Hub: {
        Queue: (commands: any[]) => void;
        Config: (config: any) => void;
      };
    };
  }
}

interface FullScreenMathSolverProps {
  onExit: () => void;
  initialEquation?: string;
  initialSolution?: string | null;
  initialSteps?: string[];
}

interface LatexExpression {
  latex: string;
  x: number;
  y: number;
}

const LatexExpressionComponent = ({
  expr,
  index,
  onPositionChange,
}: {
  expr: LatexExpression;
  index: number;
  onPositionChange: (index: number, x: number, y: number) => void;
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(`Rendering LaTeX element ${index}:`, expr);
    if (window.MathJax && nodeRef.current) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, nodeRef.current]);
    }
  }, [expr, index]);

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: expr.x, y: expr.y }}
      onStop={(e, data) => onPositionChange(index, data.x, data.y)}
    >
      <div
        ref={nodeRef}
        className="absolute p-2 text-black rounded shadow-md"
        style={{ zIndex: 10, background: "white", border: "1px solid #ccc" }}
      >
        <div className="latex-content" dangerouslySetInnerHTML={{ __html: expr.latex }} />
      </div>
    </Draggable>
  );
};

export function FullScreenMathSolver({
  onExit,
  initialEquation = "",
  initialSolution = null,
  initialSteps = [],
}: FullScreenMathSolverProps) {
  const [equation, setEquation] = useState(initialEquation);
  const [solution, setSolution] = useState<string | null>(initialSolution);
  const [steps, setSteps] = useState<string[]>(initialSteps);
  const [showSteps, setShowSteps] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const [latexExpressions, setLatexExpressions] = useState<LatexExpression[]>([]);

  const colorPalette = [
    "#000000", "#FFFFFF", "#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#008000", "#A52A2A", "#FFC0CB", "#808080", "#4B0082", "#FF4500",
  ];

  // Dynamically adjust canvas width and load MathJax
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvasContextRef.current = ctx;

    const canvasWidth = showSolution ? window.innerWidth - 400 : window.innerWidth;
    canvas.width = canvasWidth;
    canvas.height = window.innerHeight - 60;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (canvasHistory.length > 0 && historyIndex >= 0) {
      ctx.putImageData(canvasHistory[historyIndex], 0, 0);
    } else {
      saveCanvasState();
    }

    const handleResize = () => {
      if (!canvas || !ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const newWidth = showSolution ? window.innerWidth - 400 : window.innerWidth;
      canvas.width = newWidth;
      canvas.height = window.innerHeight - 60;

      ctx.putImageData(imageData, 0, 0);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = isEraser ? "#ffffff" : brushColor;
      ctx.lineWidth = brushSize;
    };

    window.addEventListener("resize", handleResize);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [["$", "$"], ["\\(", "\\)"]],
            processEscapes: true,
          },
        });
        console.log("MathJax loaded and configured");
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }
    };

    script.onerror = () => {
      console.error("Failed to load MathJax script");
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      document.head.removeChild(script);
    };
  }, [brushColor, brushSize, isEraser, showSolution, canvasHistory, historyIndex]);

  useEffect(() => {
    if (!canvasContextRef.current) return;

    canvasContextRef.current.strokeStyle = isEraser ? "#ffffff" : brushColor;
    canvasContextRef.current.lineWidth = brushSize;
  }, [brushColor, brushSize, isEraser]);

  useEffect(() => {
    console.log("Debug latexExpressions:", JSON.stringify(latexExpressions, null, 2));
  }, [latexExpressions]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasContextRef.current) return;

    setIsDrawing(true);

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setLastX(x);
    setLastY(y);

    canvasContextRef.current.beginPath();
    canvasContextRef.current.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasContextRef.current) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    canvasContextRef.current.lineTo(x, y);
    canvasContextRef.current.stroke();

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    setIsDrawing(false);

    if (canvasContextRef.current) {
      canvasContextRef.current.closePath();
    }

    saveCanvasState();
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    const ctx = canvasContextRef.current;
    if (!canvas || !ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (historyIndex < canvasHistory.length - 1) {
        setCanvasHistory((prev) => prev.slice(0, historyIndex + 1));
      }

      setCanvasHistory((prev) => [...prev, imageData]);
      setHistoryIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error saving canvas state:", error);
    }
  };

  const undo = () => {
    if (historyIndex <= 0) return;

    const canvas = canvasRef.current;
    const ctx = canvasContextRef.current;
    if (!canvas || !ctx) return;

    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);

    ctx.putImageData(canvasHistory[newIndex], 0, 0);
  };

  const redo = () => {
    if (historyIndex >= canvasHistory.length - 1) return;

    const canvas = canvasRef.current;
    const ctx = canvasContextRef.current;
    if (!canvas || !ctx) return;

    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);

    ctx.putImageData(canvasHistory[newIndex], 0, 0);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvasContextRef.current;
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setSolution(null);
    setSteps([]);
    setEquation("");
    setShowSolution(false);
    setErrorMessage(null);
    setLatexExpressions([]); // Clear LaTeX expressions as well

    saveCanvasState();
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const solveEquation = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available");

      const dataURL = canvas.toDataURL("image/png");
      console.log("Sending request to backend with image length:", dataURL.length);

      const response = await fetch("https://smart-cal-backend.onrender.com/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataURL, dict_of_vars: {} }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend responded with ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("Backend Response (Full):", JSON.stringify(result, null, 2));

      const { data } = result;
      if (!data || typeof data.equation === "undefined" || typeof data.solution === "undefined" || !data.steps) {
        throw new Error("Invalid response structure from the server");
      }

      const { equation, solution, steps } = data;
      console.log("Extracted values:", { equation, solution, steps });

      setEquation(equation);
      setSolution(solution);
      setSteps(steps);
      setShowSolution(false); // Start with panel hidden

      // Clear the canvas before adding the new LaTeX expression
      const ctx = canvasContextRef.current;
      if (canvas && ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveCanvasState();
      }

      // Handle all cases for LaTeX rendering
      let latex = "";
      if (equation && solution && steps.some((step: string) => step.includes("Assign"))) {
        // Case 3: Assignment
        latex = `${equation} = ${solution}`;
      } else if (equation && solution && !steps.some((step: string) => step.includes("Assign"))) {
        // Case 1, 4, or 5: Expression, Graphical, or Abstract
        latex = `${equation} = ${solution}`;
      } else if (equation && equation !== "Unrecognized drawing" && equation !== "Error") {
        // Partial result
        latex = `${equation}`;
      }
      console.log("Rendering LaTeX:", latex, "at position:", { x: lastX, y: lastY });

      // Only add valid, non-empty latex
      if (latex.trim() && equation !== "Unrecognized drawing" && equation !== "Error") {
        setLatexExpressions((prev) => [
          ...prev,
          { latex, x: lastX, y: lastY },
        ]);
      } else {
        console.warn("Skipping invalid or empty LaTeX:", { equation, solution, steps });
        if (equation === "Unrecognized drawing") {
          setErrorMessage("Unable to recognize the drawing.");
        }
      }
    } catch (error) {
      console.error("Error solving equation:", error);
      setErrorMessage(`Failed to solve equation: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "math-equation.png";
    link.href = dataURL;
    link.click();
  };

  const handleLatexPositionChange = (index: number, x: number, y: number) => {
    setLatexExpressions((prev) => {
      const updatedExpressions = [...prev];
      updatedExpressions[index] = { ...updatedExpressions[index], x, y };
      console.log(`Moved LaTeX element ${index} to:`, { x, y });
      return updatedExpressions;
    });
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="h-[60px] border-b flex justify-between items-center px-4 bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onExit} className="h-9 w-9">
            <Home className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Math Solver</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={solveEquation} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Solving...
              </>
            ) : (
              "Solve Equation"
            )}
          </Button>
          {solution && (
            <Button variant="outline" onClick={() => setShowSolution(!showSolution)} className="flex items-center">
              {showSolution ? "Hide Solution" : "Show Solution"}
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 relative" style={{ height: "calc(100vh - 60px)" }}>
        <div className="absolute inset-0 w-full h-full" style={{ position: "relative", zIndex: 1 }}>
          <canvas
            ref={canvasRef}
            className="touch-none"
            style={{ position: "absolute", zIndex: 1, height: "100%" }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {latexExpressions.length > 0 ? (
            latexExpressions.map((expr, index) => (
              <LatexExpressionComponent
                key={index}
                expr={expr}
                index={index}
                onPositionChange={handleLatexPositionChange}
              />
            ))
          ) : null}

          {errorMessage && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
              <span>{errorMessage}</span>
            </div>
          )}

          <FloatingToolbar position="left">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={isEraser ? "outline" : "default"} size="icon" className="h-10 w-10">
                  <Pencil className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Brush Settings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Size: {brushSize}px</span>
                    </div>
                    <Slider
                      value={[brushSize]}
                      min={1}
                      max={20}
                      step={1}
                      onValueChange={(value) => setBrushSize(value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <span>Color:</span>
                    <div className="grid grid-cols-4 gap-2">
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          className={`h-8 w-8 rounded-full border-2 ${
                            brushColor === color ? "border-primary" : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setBrushColor(color);
                            setIsEraser(false);
                          }}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={brushColor}
                      onChange={(e) => {
                        setBrushColor(e.target.value);
                        setIsEraser(false);
                      }}
                      className="w-full h-10 mt-2"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button variant={isEraser ? "default" : "outline"} size="icon" className="h-10 w-10" onClick={toggleEraser}>
              <Eraser className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="icon" className="h-10 w-10" onClick={undo} disabled={historyIndex <= 0}>
              <Undo className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={redo}
              disabled={historyIndex >= canvasHistory.length - 1}
            >
              <Redo className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="icon" className="h-10 w-10" onClick={clearCanvas}>
              <Trash2 className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="icon" className="h-10 w-10" onClick={downloadCanvas}>
              <Download className="h-5 w-5" />
            </Button>
          </FloatingToolbar>
        </div>

        {solution && showSolution && (
          <MotionConfig transition={{ type: "spring", damping: 20 }}>
            <motion.div
              key={solution}
              className="absolute right-0 top-0 bottom-0 bg-card border-l w-[400px] overflow-auto p-4 z-50"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              layout
            >
              <div className="space-y-6">
                <Card className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Equation/Problem</h2>
                  <p className="text-lg font-mono">{equation || "No equation"}</p>
                </Card>
                <Card className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Solution/Result</h2>
                  <p className="text-lg font-mono">{solution || "No solution provided"}</p>
                  <div className="mt-4">
                    <Button variant="outline" onClick={() => setShowSteps(!showSteps)} className="flex items-center">
                      {showSteps ? (
                        <>
                          <ChevronUp className="mr-2 h-4 w-4" />
                          Hide Steps
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-2 h-4 w-4" />
                          Show Steps
                        </>
                      )}
                    </Button>
                    {showSteps && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2 overflow-hidden"
                      >
                        {steps.length > 0 ? (
                          steps.map((step, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-3 border rounded-md bg-muted"
                            >
                              {step}
                            </motion.div>
                          ))
                        ) : (
                          <p>No steps available</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                </Card>
              </div>
            </motion.div>
          </MotionConfig>
        )}
      </div>
    </div>
  );
}