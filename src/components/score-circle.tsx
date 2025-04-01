
"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ScoreCircleProps {
  score: number;
  size?: number;
}

const ScoreCircle = ({ score, size = 150 }: ScoreCircleProps) => {
  // Define color based on score
  const getColor = (score: number) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 70) return "#3b82f6"; // blue
    if (score >= 60) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  const color = getColor(score);

  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        styles={buildStyles({
          textSize: "20px",
          pathColor: color,
          textColor: "white",
          trailColor: "rgba(255, 255, 255, 0.1)",
        })}
      />
      <div className="text-center mt-4 text-sm text-muted-foreground">
        {score >= 80 && "Excellent"}
        {score >= 70 && score < 80 && "Good"}
        {score >= 60 && score < 70 && "Satisfactory"}
        {score < 60 && "Needs Improvement"}
      </div>
    </div>
  );
};

export default ScoreCircle;
