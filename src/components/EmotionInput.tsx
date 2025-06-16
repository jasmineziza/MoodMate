"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import type { EmotionType } from "@/types/emotion"
import { EMOTION_COLORS } from "@/utils/colorMixer"

interface EmotionInputProps {
  selectedDate: Date
  onEmotionAdd: (date: string, emotion: EmotionType) => void
  onSimulateInput?: (date: string, emotions: EmotionType[]) => void
}

const EMOTION_OPTIONS = [
  { type: "senang" as EmotionType, label: "Senang", emoji: "😊" },
  { type: "marah" as EmotionType, label: "Marah", emoji: "😠" },
  { type: "sedih" as EmotionType, label: "Sedih", emoji: "😢" },
  { type: "takut" as EmotionType, label: "Takut", emoji: "😨" },
]

export function EmotionInput({ selectedDate, onEmotionAdd, onSimulateInput }: EmotionInputProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleEmotionClick = async (emotion: EmotionType) => {
    setIsAdding(true)
    const dateString = selectedDate.toISOString().split("T")[0]

    // Add emotion with slight delay to show animation
    setTimeout(() => {
      onEmotionAdd(dateString, emotion)
      setIsAdding(false)
    }, 200)
  }

  const handleSimulateDay = () => {
    if (!onSimulateInput) return

    const dateString = selectedDate.toISOString().split("T")[0]
    const randomEmotions: EmotionType[] = []

    // Generate 2-4 random emotions for the day
    const numEmotions = Math.floor(Math.random() * 3) + 2
    for (let i = 0; i < numEmotions; i++) {
      const randomEmotion = EMOTION_OPTIONS[Math.floor(Math.random() * EMOTION_OPTIONS.length)]
      randomEmotions.push(randomEmotion.type)
    }

    onSimulateInput(dateString, randomEmotions)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg text-blue-600">
          Tambah Emosi - {selectedDate.toLocaleDateString("id-ID")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {EMOTION_OPTIONS.map(({ type, label, emoji }) => {
            const color = EMOTION_COLORS[type]

            return (
              <button
                key={type}
                onClick={() => handleEmotionClick(type)}
                disabled={isAdding}
                className="h-16 flex flex-col items-center justify-center space-y-1 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:opacity-90"
                style={{
                  backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                  color: "white",
                }}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-xs">{label}</span>
              </button>
            )
          })}
        </div>

        {onSimulateInput && (
          <Button onClick={handleSimulateDay} variant="outline" className="w-full">
            🎲 Simulasi Hari Ini
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
