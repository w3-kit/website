"use client";

import React, { useState } from "react";
import Link from "next/link";

interface PreviewComponent {
  name: string;
  description: string;
  path: string;
  preview: React.ReactNode;
}

interface Position {
  x: number;
  y: number;
  placement: "top" | "bottom";
  maxHeight: number;
}

interface PreviewCardProps {
  component: PreviewComponent;
}

export function PreviewCard({ component }: PreviewCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
    placement: "top",
    maxHeight: 0,
  });
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Constants for preview card dimensions
  const PADDING = 20;

  const calculatePosition = (mouseX: number, mouseY: number): Position => {
    const windowHeight = window.innerHeight;
    const availableHeight = windowHeight - PADDING * 2;
    const previewHeight = Math.min(availableHeight * 0.8, 600);
    const spaceAbove = mouseY;
    const spaceBelow = windowHeight - mouseY;

    // Choose placement based on which side has more space
    const placement = spaceAbove > spaceBelow ? "top" : "bottom";

    return {
      x: mouseX,
      y: mouseY,
      placement,
      maxHeight: previewHeight,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition(calculatePosition(e.clientX, e.clientY));
    });
  };

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => setShowPreview(true), 150);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setShowPreview(false);
  };

  const getPreviewStyles = () => ({
    left: `${position.x}px`,
    top:
      position.placement === "top"
        ? `${position.y - PADDING}px`
        : `${position.y + PADDING}px`,
    transform:
      position.placement === "top"
        ? "translate(-50%, -100%)"
        : "translate(-50%, 0)",
    maxHeight: `${position.maxHeight}px`,
    maxWidth: "calc(100vw - 40px)",
  });

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Component Card */}
      <Link href={component.path} className="block">
        <div
          className="flex items-center justify-center h-32 w-48 rounded-xl 
          border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 
          transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-700"
        >
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {component.name}
          </span>
        </div>
      </Link>

      {/* Preview Popup */}
      <div
        className={`fixed z-[100] w-[90vw] sm:w-[400px] md:w-[480px] lg:w-[520px] 
          bg-white dark:bg-gray-900 rounded-xl shadow-xl 
          border border-gray-200 dark:border-gray-800 overflow-hidden 
          transition-all duration-200
          ${showPreview ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={getPreviewStyles()}
      >
        <div className="p-3 sm:p-4 overflow-auto">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            {component.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {component.description}
          </p>
          <div
            className="rounded-lg border border-gray-200 dark:border-gray-800 
            p-3 sm:p-4 bg-gray-50 dark:bg-gray-950"
          >
            {component.preview}
          </div>
        </div>
      </div>
    </div>
  );
} 