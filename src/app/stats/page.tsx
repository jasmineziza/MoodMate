"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { EmotionCircle } from "@/components/EmotionCircle"
import { EmotionInput } from "@/components/EmotionInput"
import { useEmotionState } from "@/hooks/useEmotionState"
import { EMOTION_COLORS } from "@/utils/colorMixer"

type ViewType = "month" | "week" | "day"

const EMOTION_LABELS = {
  senang: "Senang",
  marah: "Marah",
  sedih: "Sedih",
  takut: "Takut",
}

const EMOTION_EMOJIS = {
  senang: "😊",
  marah: "😠",
  sedih: "😢",
  takut: "😨",
}

export default function StatistikPage() {
  const [currentView, setCurrentView] = useState<ViewType>("month")
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 16))
  const [selectedMonth, setSelectedMonth] = useState(new Date(2025, 0, 1))

  const {
    emotionState,
    loading,
    addEmotionEntry,
    removeEmotionEntry,
    getEmotionData,
    getMonthData,
    simulateEmotionInput,
    loadSampleData,
  } = useEmotionState()

  // Load sample data on mount
  useEffect(() => {
    loadSampleData()
  }, [loadSampleData])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const handleDateClick = (date: number) => {
    const newDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), date)
    setSelectedDate(newDate)
    setCurrentView("day")
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(selectedMonth)
    if (direction === "prev") {
      newMonth.setMonth(selectedMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(selectedMonth.getMonth() + 1)
    }
    setSelectedMonth(newMonth)
  }

  const navigateDay = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate)
    if (direction === "prev") {
      newDate.setDate(selectedDate.getDate() - 1)
    } else {
      newDate.setDate(selectedDate.getDate() + 1)
    }
    setSelectedDate(newDate)
  }

  // Get current day data
  const currentDayData = getEmotionData(selectedDate.toISOString().split("T")[0])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header dengan navigasi view */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <Button
              variant={currentView === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("month")}
              className="text-xs"
            >
              Bulan
            </Button>
            <Button
              variant={currentView === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("week")}
              className="text-xs"
            >
              Minggu
            </Button>
            <Button
              variant={currentView === "day" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("day")}
              className="text-xs"
            >
              Hari
            </Button>
          </div>
        </div>

        {/* Month View */}
        {currentView === "month" && (
          <Card className="mb-6">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-blue-600">Kalender</CardTitle>
              <div className="flex items-center justify-between mt-4">
                <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-gray-600">
                  {selectedMonth.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                </span>
                <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
                  <div key={day} className="text-center text-xs text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1
                  const dateString = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                  const emotionData = getEmotionData(dateString)

                  return (
                    <EmotionCircle
                      key={day}
                      day={day}
                      emotionData={emotionData}
                      onClick={handleDateClick}
                      isSelected={
                        selectedDate.getDate() === day && selectedDate.getMonth() === selectedMonth.getMonth()
                      }
                      showAnimation={true}
                    />
                  )
                })}
              </div>

              {/* Real-time color legend */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Keterangan Warna Real-time:</div>
                <div className="text-xs text-gray-500">
                  • Warna berubah setiap kali Anda input emosi
                  <br />• Gradasi = campuran emosi dalam satu hari
                  <br />• Klik tanggal untuk input emosi
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Day View */}
        {currentView === "day" && (
          <>
            {/* Emotion Input */}
            <EmotionInput
              selectedDate={selectedDate}
              onEmotionAdd={addEmotionEntry}
              onSimulateInput={simulateEmotionInput}
            />

            <Card className="mb-6">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-blue-600">Riwayat Emosi</CardTitle>
                <div className="flex items-center justify-between mt-4">
                  <Button variant="ghost" size="sm" onClick={() => navigateDay("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-gray-600">{formatDate(selectedDate)}</span>
                  <Button variant="ghost" size="sm" onClick={() => navigateDay("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <EmotionCircle
                    day={selectedDate.getDate()}
                    emotionData={currentDayData}
                    onClick={() => {}}
                    size="lg"
                    showAnimation={true}
                  />
                </div>

                {currentDayData && currentDayData.total > 0 ? (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-blue-600">Rekap Harian</h3>
                    <div className="space-y-3">
                      {Object.entries(EMOTION_LABELS).map(([emotion, label]) => {
                        const count = currentDayData.emotionCounts[emotion as keyof typeof currentDayData.emotionCounts]
                        const color = EMOTION_COLORS[emotion]
                        const emoji = EMOTION_EMOJIS[emotion as keyof typeof EMOTION_EMOJIS]
                        const percentage = currentDayData.total > 0 ? (count / currentDayData.total) * 100 : 0

                        return (
                          <div key={emotion} className="bg-gray-100 rounded-lg p-3 flex items-center space-x-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                              style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                            >
                              {emoji}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{label}</div>
                              <div className="text-sm text-gray-500">{count} kali</div>
                            </div>
                            {count > 0 && (
                              <div className="text-right">
                                <div className="text-xs text-gray-400">{percentage.toFixed(1)}%</div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Timeline of emotions */}
                    <div className="mt-6">
                      <h4 className="text-md font-semibold text-blue-600 mb-3">Timeline Emosi</h4>
                      <div className="space-y-2">
                        {currentDayData.emotions
                          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                          .map((entry) => {
                            const color = EMOTION_COLORS[entry.emotion]
                            const emoji = EMOTION_EMOJIS[entry.emotion]
                            const time = new Date(entry.timestamp).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })

                            return (
                              <div
                                key={entry.id}
                                className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-gray-200"
                              >
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                                  style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                                >
                                  {emoji}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium capitalize">{entry.emotion}</div>
                                  <div className="text-xs text-gray-500">{time}</div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeEmotionEntry(currentDayData.date, entry.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ✕
                                </Button>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">😐</div>
                    <div>Belum ada emosi tercatat hari ini</div>
                    <div className="text-sm">Tambahkan emosi pertama Anda!</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
