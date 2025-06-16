
"use client";

import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function SensorikPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Istirahat Sensorik
        </h1>
        <p className="mb-6 text-gray-700 max-w-xl mx-auto">
          Arahkan perhatianmu pada inderamu. Matikan notifikasi. Perhatikan suara,
          tekstur benda, atau aroma di sekitarmu. Nikmati sesaat istirahat ini.
        </p>
        <Image
          src="/images/sensorik.png"
          alt="Sensorik"
          width={300}
          height={300}
          className="mx-auto mb-4"
        />
        <p className="text-gray-500">Coba pejamkan mata selama 1 menit dan fokus pada napasmu...</p>
      </main>
    </div>
  );
}