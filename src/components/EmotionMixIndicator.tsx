"use client"

import type { EmotionSummary } from "@/types/emotion"
import { EMOTION_COLORS } from "@/utils/colorMixer"

interface EmotionMixIndicatorProps {
  emotions: EmotionSummary["emotions"]
  size?: "sm" | "md" | "lg"
}

const EMOTION_LABELS = {
  senang: "Senang",
  marah: "Marah",
  sedih: "Sedih",
  takut: "Takut",
}

export function EmotionMixIndicator({ emotions, size = "md" }: EmotionMixIndicatorProps) {
  const total = emotions.senang + emotions.marah + emotions.sedih + emotions.takut

  if (total === 0) {
    return <div className="text-gray-500 text-sm">Tidak ada data emosi</div>
  }

  const sizeClasses = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Komposisi Emosi:</div>
      <div className={`w-full ${sizeClasses[size]} bg-gray-200 rounded-full overflow-hidden flex`}>
        {Object.entries(emotions).map(([emotion, count]) => {
          if (count === 0) return null

          const percentage = (count / total) * 100
          const color = EMOTION_COLORS[emotion]

          return (
            <div
              key={emotion}
              className="transition-all duration-300"
              style={{
                width: `${percentage}%`,
                backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
              }}
              title={`${EMOTION_LABELS[emotion as keyof typeof EMOTION_LABELS]}: ${count} kali (${percentage.toFixed(1)}%)`}
            />
          )
        })}
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {Object.entries(emotions).map(([emotion, count]) => {
          if (count === 0) return null

          const color = EMOTION_COLORS[emotion]
          const percentage = (count / total) * 100

          return (
            <div key={emotion} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
              />
              <span>
                {EMOTION_LABELS[emotion as keyof typeof EMOTION_LABELS]}: {count} ({percentage.toFixed(1)}%)
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
