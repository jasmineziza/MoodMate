"use client";

import { Navbar } from "@/components/Navbar";
import { useState } from "react";

export default function EkspresikanPage() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("ekspresi", text);
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Ekspresikan Perasaanmu
        </h1>
        <textarea
          className="w-full max-w-3xl mx-auto block p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-300 min-h-[200px]"
          placeholder="Tulis perasaanmu di sini..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="text-center mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Simpan
          </button>
          {saved && <p className="text-green-600 mt-2">Tersimpan!</p>}
        </div>
      </main>
    </div>
  );
}


