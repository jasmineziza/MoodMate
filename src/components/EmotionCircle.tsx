"use client"

import { useState, useEffect } from "react"
import type { DayEmotionData } from "@/types/emotion"
import { calculateDynamicColor } from "@/utils/colorMixer"

interface EmotionCircleProps {
  day: number
  emotionData?: DayEmotionData
  onClick: (day: number) => void
  isSelected?: boolean
  size?: "sm" | "md" | "lg"
  showAnimation?: boolean
}

export function EmotionCircle({
  day,
  emotionData,
  onClick,
  isSelected = false,
  size = "md",
  showAnimation = true,
}: EmotionCircleProps) {
  const [currentColor, setCurrentColor] = useState<string>("rgb(229, 231, 235)")
  const [isAnimating, setIsAnimating] = useState(false)

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  }

  // Update color when emotion data changes
  useEffect(() => {
    if (emotionData) {
      const newColor = calculateDynamicColor(emotionData)

      if (newColor !== currentColor && showAnimation) {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentColor(newColor)
          setIsAnimating(false)
        }, 150)
      } else {
        setCurrentColor(newColor)
      }
    } else {
      setCurrentColor("rgb(229, 231, 235)")
    }
  }, [emotionData, currentColor, showAnimation])

  const hasData = emotionData && emotionData.total > 0
  const hasMixedEmotions =
    emotionData && Object.values(emotionData.emotionCounts).filter((count) => count > 0).length > 1

  return (
    <button
      onClick={() => onClick(day)}
      className={`
        ${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-medium
        transition-all duration-300 hover:scale-110 hover:shadow-lg
        ${isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""}
        ${hasData ? "cursor-pointer" : "cursor-default"}
        ${hasMixedEmotions ? "border-2 border-white shadow-md" : ""}
        ${isAnimating ? "animate-pulse" : ""}
      `}
      style={{
        background: currentColor,
        opacity: hasData ? 0.9 : 0.5,
      }}
      title={
        hasData
          ? `${emotionData!.total} emosi tercatat\n${Object.entries(emotionData!.emotionCounts)
              .filter(([_, count]) => count > 0)
              .map(([emotion, count]) => `${emotion}: ${count}`)
              .join(", ")}`
          : "Tidak ada data"
      }
    >
      {day}
    </button>
  )
}
