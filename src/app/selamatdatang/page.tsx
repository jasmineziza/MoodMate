"use client"

import React from "react"
import { useRouter } from "next/navigation"

export default function SelamatDatang() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-md">
        {/* Success Icon */}
        <div className="w-48 h-48 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <div className="w-24 h-24 bg-green-500 rounded-2xl flex items-center justify-center">
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-blue-800">Selamat Datang!</h1>
          <p className="text-xl text-gray-600">Profil kamu sudah siap digunakan</p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push("/homepage")}
          className="w-full max-w-sm py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition duration-200"
        >
          Mulai Menggunakan MoodMate
        </button>
      </div>
    </div>
  )
}
