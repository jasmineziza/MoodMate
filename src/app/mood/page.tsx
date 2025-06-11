import { Navbar } from '@/components/Navbar';
import Image from 'next/image';

export default function MoodPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />

      {/* Konten Utama */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
        
        {/* Judul */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#4A6FA5] mb-10">
          Bagaimana Perasaanmu?
        </h1>

        {/* Kotak Deteksi Emosi */}
        <div className="bg-[#DDE8F7] rounded-xl shadow-md px-8 py-10 flex flex-col items-center justify-center mb-10 w-full max-w-md">
          <Image src="/images/camera.png" alt="Camera" width={40} height={40} className="mb-4" />
          <button className="text-[#4A6FA5] font-semibold text-lg">
            Mulai Deteksi
          </button>
        </div>

        {/* Deskripsi */}
        <p className="text-gray-600 text-center mb-1">
          Deteksi Emosi dari Ekspresi Wajahmu
        </p>
        <p className="text-gray-600 text-center mb-10">
          atau <br />
          Pilih Emosi Kamu Hari Ini
        </p>

        {/* Emoji Pilihan */}
        <div className="flex gap-6">
          {[
            { emoji: '😠', bg: 'bg-red-400' },
            { emoji: '😊', bg: 'bg-green-400' },
            { emoji: '😢', bg: 'bg-blue-400' },
            { emoji: '😨', bg: 'bg-purple-400' },
          ].map(({ emoji, bg }, index) => (
            <div
              key={index}
              className={`${bg} rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-sm hover:scale-110 transition-transform cursor-pointer`}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-16 -right-16 z-0">
        <Image
          alt="star"
          src="/images/Star-7.png"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      
      <div className="absolute -up-16 -left-48">
        <Image
          alt="star"
          src="/images/Star-7.png"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </div>
  );
}
