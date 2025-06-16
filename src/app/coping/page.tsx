'use client';

import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CopingPage() {
  const [scale, setScale] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.5 : 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const copingItems = [
    {
      emoji: null,
      label: 'Latihan Pernapasan',
      type: 'circle',
      onClick: () => {}, // kosong dulu
    },
    {
      emoji: '🌊',
      label: 'Suara Alam',
      onClick: () => {}, // kosong dulu
    },
    {
      emoji: '🧘‍♂️',
      label: 'Istirahat Sensorik',
      onClick: () => router.push('/sensorik'),
    },
    {
      emoji: '📝',
      label: 'Ekspresikan Perasaanmu',
      onClick: () => router.push('/ekspresikan'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative overflow-hidden">
      <Navbar />

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-10">Panduan Coping</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {copingItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-blue-100 text-black text-center py-8 rounded-xl shadow-md text-lg font-medium flex flex-col items-center justify-center cursor-pointer hover:bg-blue-200 transition"
              onClick={item.onClick}
            >
              {item.type === 'circle' ? (
                <div
                  className="w-12 h-12 rounded-full bg-blue-300 mb-3 transition-transform duration-[4000ms]"
                  style={{ transform: `scale(${scale})` }}
                />
              ) : (
                <div className="text-3xl mb-3">{item.emoji}</div>
              )}
              {item.label}
            </div>
          ))}
        </div>
      </main>

      <div className="absolute -bottom-16 -left-16 z-0">
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
