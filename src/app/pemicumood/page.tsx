"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PemicuMood() {
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([])
  const router = useRouter()

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(trigger) ? prev.filter((t) => t !== trigger) : [...prev, trigger],
    )
  }

  const triggers = [
    {
      id: "perubahan-rutinitas",
      title: "Perubahan Rutinitas",
      description: "Ketika jadwal berubah tiba-tiba",
      emoji: "😟",
      bgColor: "bg-red-100",
    },
    {
      id: "lingkungan-ramai",
      title: "Lingkungan Ramai",
      description: "Tempat dengan banyak orang",
      emoji: "😰",
      bgColor: "bg-yellow-100",
    },
    {
      id: "aktivitas-favorite",
      title: "Aktivitas Favorite",
      description: "Saat melakukan kegiatan yang disukai",
      emoji: "😊",
      bgColor: "bg-green-100",
    },
  ]

  return (
    
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-100">
      <div className="flex">
        <div className="w-1/2 flex flex-col items-center justify-center p-8">
          <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center mb-8">
            <span className="text-8xl">😊</span>
          </div>
          <h1 className="text-6xl font-bold text-blue-800 mb-4">MoodMate</h1>
          <p className="text-white text-xl">Teman untuk mengenal emosimu</p>
        </div>

        <div className="w-1/2 bg-white p-8 flex flex-col justify-between min-h-screen">
          <div className="mb-8">
            <div className="flex space-x-2">
              <div className="flex-1 h-2 bg-blue-600 rounded"></div>
              <div className="flex-1 h-2 bg-blue-600 rounded"></div>
              <div className="flex-1 h-2 bg-gray-300 rounded"></div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Pemicu Mood</h2>
            <p className="text-gray-600 mb-8">Pilih situasi yang biasanya mempengaruhi mood anak</p>

            <div className="space-y-4 mb-8">
              {triggers.map((trigger) => (
                <div
                  key={trigger.id}
                  onClick={() => toggleTrigger(trigger.id)}
                  className={`cursor-pointer p-6 border rounded-lg flex items-center space-x-4 transition-all ${
                    selectedTriggers.includes(trigger.id)
                      ? "bg-blue-50 border-blue-500"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <div
                    className={`w-16 h-16 ${trigger.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <span className="text-2xl">{trigger.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{trigger.title}</h3>
                    <p className="text-gray-600">{trigger.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/preferensisensorik")}
              className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
            >
              Kembali
            </button>
            <button
              onClick={() => router.push("/strategicoping")}
              className="flex-1 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
