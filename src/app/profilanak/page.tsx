"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [autism, setAutism] = useState(false)
  const [adhd, setAdhd] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const router = useRouter()

  const handleSubmit = () => {
    // Simpan data ke localStorage
    localStorage.setItem("childProfile", JSON.stringify({
      name,
      age,
      avatar: selectedAvatar,
      autism,
      adhd,
    }))

    router.push("/preferensisensorik")
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-blue-300 flex flex-col items-center justify-center p-8">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center mb-8">
          <span className="text-6xl">😊</span>
        </div>
        <h1 className="text-6xl font-bold text-blue-700 mb-4">MoodMate</h1>
        <p className="text-xl text-white">Teman untuk mengenal emosimu</p>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-8">Profil Anak</h2>

          <div className="space-y-6">
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Nama Anak *</label>
              <input
                type="text"
                placeholder="Nama Anak"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm mb-2 block">Usia *</label>
              <input
                type="text"
                placeholder="Usia"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm mb-3 block">Pilih Avatar</label>
              <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedAvatar(index)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-colors ${
                      selectedAvatar === index ? "bg-blue-500" : "bg-blue-100 hover:bg-blue-200"
                    }`}
                  >
                    {index === 0 && "👦🏻"}
                    {index === 1 && "👧🏻"}
                    {index === 2 && "👦🏽"}
                    {index === 3 && "👶🏻"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-sm mb-4 block">Kondisi</label>

              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Autisme</span>
                <button
                  type="button"
                  onClick={() => setAutism(!autism)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autism ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autism ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">ADHD</span>
                <button
                  type="button"
                  onClick={() => setAdhd(!adhd)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    adhd ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      adhd ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-8 rounded-md font-medium transition-colors"
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
