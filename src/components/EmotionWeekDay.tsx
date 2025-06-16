"use client"

import type { EmotionSummary } from "@/types/emotion"
import { createEmotionGradient, getDominantEmotion, hasMixedEmotions, EMOTION_COLORS } from "@/utils/colorMixer"

interface EmotionWeekDayProps {
  dayName: string
  date: number
  emotionData?: EmotionSummary
  onClick: (date: number) => void
}

const EMOTION_EMOJIS = {
  senang: "😊",
  marah: "😠",
  sedih: "😢",
  takut: "😨",
}

export function EmotionWeekDay({ dayName, date, emotionData, onClick }: EmotionWeekDayProps) {
  const hasData = emotionData && emotionData.total > 0

  const getBackgroundStyle = () => {
    if (!hasData) {
      return { backgroundColor: "#e5e7eb" }
    }

    const isMixed = hasMixedEmotions(emotionData.emotions)

    if (isMixed) {
      // Use gradient for mixed emotions in weekly view
      return {
        background: createEmotionGradient(emotionData.emotions),
      }
    }

    // Single emotion
    const dominant = getDominantEmotion(emotionData.emotions)
    const color = EMOTION_COLORS[dominant]
    return {
      backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
    }
  }

  const getDisplayEmoji = () => {
    if (!hasData) return "😐"

    const isMixed = hasMixedEmotions(emotionData.emotions)

    if (isMixed) {
      // Show mixed emoji or dominant emotion emoji
      return "🎭" // Theater mask for mixed emotions
    }

    const dominant = getDominantEmotion(emotionData.emotions)
    return EMOTION_EMOJIS[dominant as keyof typeof EMOTION_EMOJIS] || "😐"
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-gray-600 mb-2">{dayName}</span>
      <button
        onClick={() => onClick(date)}
        className={`
          w-14 h-14 rounded-xl flex items-center justify-center text-2xl 
          transition-all duration-200 hover:scale-110 hover:shadow-lg
          ${hasData && hasMixedEmotions(emotionData!.emotions) ? "border-2 border-white shadow-md" : ""}
        `}
        style={getBackgroundStyle()}
        title={hasData ? `${emotionData!.total} emosi tercatat` : "Tidak ada data"}
      >
        {getDisplayEmoji()}
      </button>
    </div>
  )
}
