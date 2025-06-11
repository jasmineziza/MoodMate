'use client';

import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfilePage() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [userType, setUserType] = useState<'anak' | 'ortu' | 'pendamping' | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6">
        {/* Judul */}
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">Profil & Pengaturan</h1>

        {/* Profil */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/avatar-girl.png"
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full mb-2"
          />
          <h2 className="text-xl font-semibold">Jocelyn</h2>
          <p className="text-gray-500">Usia : 10 Tahun</p>
        </div>

        {/* Siapa yang menggunakan aplikasi */}
        <div className="mb-6">
          <h3 className="text-blue-600 font-semibold mb-2">Pengguna Aplikasi</h3>
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
            <p className="mb-2">Siapa yang menggunakan aplikasi ini?</p>
            <div className="flex gap-3">
              {[
                { label: 'Anak', value: 'anak' },
                { label: 'Orang Tua', value: 'ortu' },
                { label: 'Pendamping', value: 'pendamping' },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setUserType(value as any)}
                  className={`px-4 py-2 rounded-xl border text-sm ${
                    userType === value
                      ? 'bg-blue-100 text-blue-700 border-blue-400'
                      : 'bg-gray-100 text-gray-600 border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pilih Warna */}
        <div className="mb-6">
          <h3 className="text-blue-600 font-semibold mb-2">Pilih Warna</h3>
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
            <p className="mb-2">Pilih Warna</p>
            <div className="flex gap-3">
              {['#BFDBFE', '#FEF3C7', '#E9D5FF', '#FBCFE8'].map((color, idx) => (
                <button
                  key={idx}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? 'border-blue-500' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pengaturan Sensorik */}
        <div className="mb-6">
          <h3 className="text-blue-600 font-semibold mb-2">Pengaturan Sensorik</h3>

          <div className="space-y-3">
            <SettingOption label="Notifikasi Suara" icon="/icons/sound.png" />
            <SettingOption label="Getaran" icon="/icons/vibration.png" />
            <SettingOption label="Animasi" icon="/icons/check.png" />
          </div>
        </div>
      </main>
    </div>
  );
}

// Komponen untuk 1 baris pengaturan
function SettingOption({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="bg-white flex justify-between items-center px-4 py-3 rounded-xl shadow-sm">
      <p>{label}</p>
      <Image src={icon} alt={label} width={24} height={24} />
    </div>
  );
}
