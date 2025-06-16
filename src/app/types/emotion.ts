export interface EmotionEntry {
    id: string
    userId: string
    date: string
    emotion: EmotionType
    timestamp: string
    createdAt: string
  }
  
  export interface DayEmotionData {
    date: string
    emotions: EmotionEntry[]
    emotionCounts: {
      senang: number
      marah: number
      sedih: number
      takut: number
    }
    total: number
  }
  
  export interface EmotionColor {
    r: number
    g: number
    b: number
  }
  
  export type EmotionType = "senang" | "marah" | "sedih" | "takut"
  
  export interface EmotionState {
    [date: string]: DayEmotionData
  }
  