'use client';

import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import { useState } from 'react';

const moodColors: Record<string, string> = {
  Senang: 'bg-green-100',
  Sedih: 'bg-blue-100',
  Marah: 'bg-red-100',
  Takut: 'bg-purple-100',
};

const emojiData = {
  Senang: '😊',
  Sedih: '😢',
  Marah: '😠',
  Takut: '😨',
};

const weeklyData = [
  ['Senang', 'Sedih', 'Sedih', '', '', '', ''],
  ['Sedih', 'Marah', 'Senang', 'Takut', 'Senang', 'Takut', ''],
  ['Senang', 'Sedih', 'Marah', 'Sedih', 'Marah', 'Senang', 'Senang'],
];

const recapData = {
  Harian: [
    { mood: 'Senang', count: 2 },
    { mood: 'Marah', count: 1 },
    { mood: 'Sedih', count: 1 },
    { mood: 'Takut', count: 1 },
  ],
  Mingguan: [
    { mood: 'Senang', count: 4 },
    { mood: 'Sedih', count: 4 },
    { mood: 'Marah', count: 2 },
    { mood: 'Takut', count: 3 },
  ],
};

export default function StatsPage() {
  const [mode, setMode] = useState<'Harian' | 'Mingguan'>('Harian');

  const gridData = mode === 'Harian' ? [weeklyData[0]] : weeklyData;

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      <main className="flex-grow p-6 z-10">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">Riwayat Emosi</h1>

        {/* Tombol toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-1 rounded-full font-medium ${
              mode === 'Mingguan' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => setMode('Mingguan')}
          >
            Mingguan
          </button>
          <button
            className={`px-4 py-1 rounded-full font-medium ${
              mode === 'Harian' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => setMode('Harian')}
          >
            Harian
          </button>
        </div>

        {/* Grid emosi */}
        <div className={`grid ${mode === 'Mingguan' ? 'grid-rows-3' : 'grid-rows-1'} grid-cols-7 gap-3 mb-6`}>
          {gridData.flat().map((mood, idx) => (
            <div
              key={idx}
              className={`h-20 w-full flex items-center justify-center rounded-xl text-2xl font-bold ${
                moodColors[mood] || 'bg-gray-100'
              }`}
            >
              {emojiData[mood] || ''}
            </div>
          ))}
        </div>

        {/* Label legenda */}
        <div className="flex justify-center gap-4 mb-10">
          {Object.entries(emojiData).map(([mood, emoji]) => (
            <div key={mood} className="flex items-center gap-1 text-sm">
              <div className={`w-4 h-4 rounded-full ${moodColors[mood]}`}></div>
              <span>{mood}</span>
            </div>
          ))}
        </div>

        {/* Rekap */}
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          {mode === 'Harian' ? '📅 Rekap Harian' : '📈 Rekap Mingguan'}
        </h2>

        <div className={`grid ${mode === 'Harian' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
          {recapData[mode].map((item) => (
            <div
              key={item.mood}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-100 shadow-sm"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${moodColors[item.mood]}`}
              >
                {emojiData[item.mood]}
              </div>
              <div>
                <div className="font-semibold">{item.mood}</div>
                <div className="text-sm text-gray-600">{item.count} kali</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Background dekorasi */}
      <div className="absolute -top-12 -left-10 z-0">
        <Image
          alt="star"
          src="/images/Star-7.png"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
      <div className="absolute -bottom-20 -right-20 z-0">
        <Image
          alt="star"
          src="/images/Star-7.png"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  );
}
