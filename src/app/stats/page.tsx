"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/Navbar"

const EMOTIONS = [
  { id: "senang", name: "Senang", emoji: "😊", color: "#4ADE80" },
  { id: "marah", name: "Marah", emoji: "😠", color: "#F87171" },
  { id: "sedih", name: "Sedih", emoji: "😢", color: "#60A5FA" },
  { id: "takut", name: "Takut", emoji: "😨", color: "#A78BFA" },
  { id: "bantuan", name: "Bantuan", emoji: "SOS", color: "#EF4444" },
]

interface EmotionEntry {
  id: string
  date: string
  emotions: string[]
  timestamp: number
}

type ViewMode = "monthly" | "weekly" | "daily"

export default function StatsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("monthly")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [emotionEntries, setEmotionEntries] = useState<EmotionEntry[]>([])

  useEffect(() => {
    const sampleData: EmotionEntry[] = [
      {
        id: "1",
        date: "2025-01-16",
        emotions: ["senang", "senang", "marah", "sedih", "takut", "bantuan"],
        timestamp: Date.now(),
      },
      {
        id: "2",
        date: "2025-01-15",
        emotions: ["senang", "senang"],
        timestamp: Date.now(),
      },
      {
        id: "3",
        date: "2025-01-14",
        emotions: ["marah"],
        timestamp: Date.now(),
      },
      {
        id: "4",
        date: "2025-01-13",
        emotions: ["sedih", "takut"],
        timestamp: Date.now(),
      },
      {
        id: "5",
        date: "2025-01-12",
        emotions: ["senang"],
        timestamp: Date.now(),
      },
      {
        id: "6",
        date: "2025-01-17",
        emotions: ["marah", "sedih"],
        timestamp: Date.now(),
      },
      {
        id: "7",
        date: "2025-01-18",
        emotions: ["takut", "bantuan"],
        timestamp: Date.now(),
      },
      {
        id: "8",
        date: "2025-01-19",
        emotions: ["senang", "marah"],
        timestamp: Date.now(),
      },
      {
        id: "9",
        date: "2025-01-20",
        emotions: ["sedih"],
        timestamp: Date.now(),
      },
      {
        id: "10",
        date: "2025-01-21",
        emotions: ["takut"],
        timestamp: Date.now(),
      },
    ]
    setEmotionEntries(sampleData)
  }, [])
  const getEmotionById = (id: string) => {
    return EMOTIONS.find((emotion) => emotion.id === id)
  }

  const generateGradientColor = (emotionIds: string[]): string => {
    if (emotionIds.length === 0) return "#E5E7EB"
    if (emotionIds.length === 1) {
      const emotion = getEmotionById(emotionIds[0])
      return emotion?.color || "#E5E7EB"
    }

    const colors = emotionIds.map((id) => getEmotionById(id)?.color).filter(Boolean) as string[]
    const percentage = 100 / colors.length
    const gradientStops = colors
      .map((color, index) => {
        const start = index * percentage
        const end = (index + 1) * percentage
        return `${color} ${start}% ${end}%`
      })
      .join(", ")

    return `linear-gradient(45deg, ${gradientStops})`
  }

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  const getMonthDates = (date: Date): Date[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const lastDay = new Date(year, month + 1, 0)
    const dates = []

    for (let day = 1; day <= lastDay.getDate(); day++) {
      dates.push(new Date(year, month, day))
    }
    return dates
  }

  const getWeekDates = (date: Date): Date[] => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek)
      weekDate.setDate(startOfWeek.getDate() + i)
      week.push(weekDate)
    }
    return week
  }

  const getEmotionsForDate = (date: Date): string[] => {
    const dateStr = formatDate(date)
    const entry = emotionEntries.find((entry) => entry.date === dateStr)
    return entry?.emotions || []
  }

  const getEntriesForDate = (date: Date): EmotionEntry[] => {
    const dateStr = formatDate(date)
    return emotionEntries.filter((entry) => entry.date === dateStr)
  }

  const getEntriesForWeek = (date: Date): EmotionEntry[] => {
    const weekStart = new Date(date)
    const day = weekStart.getDay()
    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1)
    weekStart.setDate(diff)
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    weekEnd.setHours(23, 59, 59, 999)

    return emotionEntries.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate >= weekStart && entryDate <= weekEnd
    })
  }

  const getEmotionCounts = (entries: EmotionEntry[]) => {
    const counts: { [key: string]: number } = {}

    entries.forEach((entry) => {
      entry.emotions.forEach((emotionId) => {
        counts[emotionId] = (counts[emotionId] || 0) + 1
      })
    })

    return Object.entries(counts)
      .map(([emotionId, count]) => ({
        emotion: getEmotionById(emotionId)!,
        count,
      }))
      .filter((item) => item.emotion)
      .sort((a, b) => b.count - a.count)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setViewMode("daily")
    setCurrentDate(date)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() + 7)
    }
    setCurrentDate(newDate)
  }

  const navigateDay = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
    setSelectedDate(newDate)
  }


  const MonthlyView = () => {
    const monthDates = getMonthDates(currentDate)
    const monthName = currentDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm mx-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigateMonth("prev")} className="p-2">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-medium text-gray-700">
            1 - 31 {monthName.split(" ")[1]} {monthName.split(" ")[2]}
          </h2>
          <button onClick={() => navigateMonth("next")} className="p-2">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                viewMode === "monthly" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
              }`}
            >
              Bulan
            </button>
            <button
              onClick={() => setViewMode("weekly")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                viewMode === "weekly" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
              }`}
            >
              Minggu
            </button>
            <button
              onClick={() => setViewMode("daily")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                viewMode === "daily" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
              }`}
            >
              Hari
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 max-w-md mx-auto">
          {monthDates.map((date, index) => {
            const emotions = getEmotionsForDate(date)
            const hasEmotions = emotions.length > 0
            const gradientColor = generateGradientColor(emotions)

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-sm transition-transform hover:scale-105"
                style={{
                  background: hasEmotions ? gradientColor : "#E5E7EB",
                  color: hasEmotions ? "white" : "#6B7280",
                }}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Weekly View Component
  const WeeklyView = () => {
    const weekDates = getWeekDates(currentDate)
    const weekDays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Ming"]

    const startDate = weekDates[0].getDate()
    const endDate = weekDates[6].getDate()
    const monthYear = weekDates[0].toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    })

    return (
      <>
        <div className="bg-white rounded-2xl p-6 shadow-sm mx-4">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigateWeek("prev")} className="p-2">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-medium text-gray-700">
              {startDate} - {endDate} {monthYear}
            </h2>
            <button onClick={() => navigateWeek("next")} className="p-2">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setViewMode("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  viewMode === "monthly" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
                }`}
              >
                Bulan
              </button>
              <button
                onClick={() => setViewMode("weekly")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  viewMode === "weekly" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
                }`}
              >
                Minggu
              </button>
              <button
                onClick={() => setViewMode("daily")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  viewMode === "daily" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
                }`}
              >
                Hari
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 max-w-md mx-auto">
            {weekDates.map((date, index) => {
              const emotions = getEmotionsForDate(date)
              const hasEmotions = emotions.length > 0
              const gradientColor = generateGradientColor(emotions)
              const mainEmotion = emotions.length > 0 ? getEmotionById(emotions[0]) : null

              return (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-sm text-gray-600 mb-2">{weekDays[index]}</p>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                    style={{
                      background: hasEmotions ? gradientColor : "#E5E7EB",
                    }}
                  >
                    {mainEmotion?.emoji || ""}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <EmotionSummary entries={getEntriesForWeek(currentDate)} title="Rekap Mingguan" />
      </>
    )
  }

  const DailyView = () => {
    const selectedDateStr = (selectedDate || currentDate).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const emotions = getEmotionsForDate(selectedDate || currentDate)
    const gradientColor = generateGradientColor(emotions)
    const mainEmotion = emotions.length > 0 ? getEmotionById(emotions[0]) : null

    return (
      <>
        <div className="bg-white rounded-2xl p-6 shadow-sm mx-4">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigateDay("prev")} className="p-2">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-medium text-gray-700">{selectedDateStr}</h2>
            <button onClick={() => navigateDay("next")} className="p-2">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setViewMode("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  viewMode === "monthly" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
                }`}
              >
                Bulan
              </button>
              <button
                onClick={() => setViewMode("weekly")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  viewMode === "weekly" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
                }`}
              >
                Minggu
              </button>
              <button
                onClick={() => setViewMode("daily")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  viewMode === "daily" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"
                }`}
              >
                Hari
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{ background: gradientColor }}
            >
              {mainEmotion?.emoji || ""}
            </div>
          </div>
        </div>

        <EmotionSummary
          entries={getEntriesForDate(selectedDate || currentDate)}
          title="Rekap Harian"
          selectedDate={selectedDate || currentDate}
        />
      </>
    )
  }

  const EmotionSummary = ({ entries, title, selectedDate }: { entries: EmotionEntry[]; title: string; selectedDate?: Date }) => {
    const emotionCounts = getEmotionCounts(entries)

    if (emotionCounts.length === 0) {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-sm mx-4">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">{title}</h3>
          <p className="text-gray-500 text-center py-8">Belum ada data emosi</p>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm mx-4">
        <h3 className="text-xl font-semibold text-blue-600 mb-6">{title}</h3>

        <div className="space-y-4">
          {emotionCounts.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: item.emotion.color }}
              >
                {item.emotion.emoji === "SOS" ? (
                  <span className="text-white text-xs font-bold">SOS</span>
                ) : (
                  item.emotion.emoji
                )}
              </div>
              <span className="text-gray-600 font-medium text-lg">{item.count} kali</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (viewMode) {
      case "monthly":
        return <MonthlyView />
      case "weekly":
        return <WeeklyView />
      case "daily":
        return <DailyView />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
    
      <Navbar />
      
      
      <h1 className="text-center text-blue-600 font-semibold text-2xl mb-8 pt-16">
        {viewMode === "monthly" ? "Kalender" : "Riwayat Emosi"}
      </h1>

      
      <div className="space-y-6">{renderContent()}</div>
    </div>
  )
}