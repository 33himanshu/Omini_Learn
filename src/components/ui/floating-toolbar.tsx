
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FloatingToolbarProps {
  children: React.ReactNode;
  position?: "top" | "left";
}

export function FloatingToolbar({ children, position = "top" }: FloatingToolbarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check for dark mode on component mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && mutation.target === document.documentElement) {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartDragPos({ x: pos.x, y: pos.y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setStartDragPos({ x: pos.x, y: pos.y });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;

      setPos({
        x: startDragPos.x + dx,
        y: startDragPos.y + dy,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const dx = e.touches[0].clientX - startPos.x;
      const dy = e.touches[0].clientY - startPos.y;

      setPos({
        x: startDragPos.x + dx,
        y: startDragPos.y + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, startPos, startDragPos]);

  return (
    <motion.div
      className={`absolute flex bg-card border rounded-lg shadow-lg p-2 z-10 cursor-move ${
        isDarkMode ? 'bg-opacity-80 backdrop-blur-sm' : 'bg-opacity-95'
      }`}
      style={{
        left: position === "top" ? pos.x : 20,
        top: position === "top" ? pos.y : pos.y,
        flexDirection: position === "top" ? "row" : "column",
        touchAction: "none",
      }}
      animate={{ x: isDragging ? 5 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className={`grid ${position === "top" ? "grid-flow-col" : "grid-flow-row"} gap-2`}>{children}</div>
    </motion.div>
  );
}
