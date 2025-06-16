"use client"

import type { EmotionSummary } from "@/types/emotion"
import {
  mixEmotionColors,
  createRadialEmotionGradient,
  hasMixedEmotions,
  getEmotionIntensity,
} from "@/utils/colorMixer"

interface EmotionCalendarDayProps {
  day: number
  emotionData?: EmotionSummary
  onClick: (day: number) => void
  isSelected?: boolean
}

export function EmotionCalendarDay({ day, emotionData, onClick, isSelected = false }: EmotionCalendarDayProps) {
  const hasData = emotionData && emotionData.total > 0

  const getBackgroundStyle = () => {
    if (!hasData) {
      return { backgroundColor: "#e5e7eb" } // Gray for no data
    }

    const intensity = getEmotionIntensity(emotionData.emotions)
    const isMixed = hasMixedEmotions(emotionData.emotions)

    if (isMixed) {
      // Use radial gradient for mixed emotions to show blend
      return {
        background: createRadialEmotionGradient(emotionData.emotions),
        opacity: 0.8 + intensity * 0.2,
      }
    }

    // Single color for single emotion
    return {
      backgroundColor: mixEmotionColors(emotionData.emotions),
      opacity: 0.8 + intensity * 0.2,
    }
  }

  return (
    <button
      onClick={() => onClick(day)}
      className={`
        w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm
        transition-all duration-200 hover:scale-110 hover:shadow-lg
        ${isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""}
        ${hasData ? "cursor-pointer" : "cursor-default"}
        ${hasData && hasMixedEmotions(emotionData!.emotions) ? "border-2 border-white" : ""}
      `}
      style={getBackgroundStyle()}
      title={hasData ? `${emotionData!.total} emosi tercatat` : "Tidak ada data"}
    >
      {day}
    </button>
  )
}
