'use client';

import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HelpPage() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.2 : 1));
    }, 500); // animasi cepat

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">
      <Navbar />

      <main className="flex-grow px-16 py-16 flex flex-col items-center text-center">
        {/* Judul */}
        <h1 className="text-4xl font-bold text-blue-700 mb-10">Tombol Bantuan</h1>

        {/* Ikon Sirine */}
        <div
          className="rounded-full bg-red-200 w-40 h-40 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="text-6xl">🚨</div>
        </div>

        {/* Deskripsi */}
        <p className="mt-10 text-gray-700 text-2xl max">
          Tekan tombol ini jika kamu merasa <i>overwhelmed</i> atau membutuhkan bantuan
        </p>
      </main>

      {/* Dekorasi */}
      <div className="absolute -bottom-24 -left-24 z-0">
        <Image
          alt="star"
          src="/images/Star-7.png"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      <div className="absolute -up-16 -right-16 z-0">
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
