"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function MoodPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [hasStartedDetection, setHasStartedDetection] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  // Modal helper
  const openModal = (message: string, confirmAction: () => void) => {
    setModalMessage(message);
    setOnConfirm(() => confirmAction);
    setShowModal(true);
  };

  const handleDetectClick = () => {
    openModal("Kamu yakin ingin mulai deteksi emosi melalui kamera?", () => {
      setHasStartedDetection(true);
    });
  };

  const handleEmojiClick = (emoji: string) => {
    openModal(`Kamu memilih emosi ${emoji}. Lanjutkan?`, () => {
      setSelectedEmotion(emoji);
    });
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center">
            <p className="text-lg text-gray-800 mb-6">{modalMessage}</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => {
                  onConfirm();
                  setShowModal(false);
                }}
              >
                Ya
              </button>
              <button
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Konten Utama */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#4A6FA5] mb-10">
          Bagaimana Perasaanmu?
        </h1>

        <div className="bg-[#DDE8F7] rounded-xl shadow-md px-8 py-10 flex flex-col items-center justify-center mb-10 w-full max-w-md">
          <Image src="/images/camera.png" alt="Camera" width={40} height={40} className="mb-4" />
          <button
            onClick={handleDetectClick}
            className="text-[#4A6FA5] font-semibold text-lg"
          >
            Mulai Deteksi
          </button>
        </div>

        <p className="text-gray-600 text-center mb-1">
          Deteksi Emosi dari Ekspresi Wajahmu
        </p>
        <p className="text-gray-600 text-center mb-10">
          atau <br />
          Pilih Emosi Kamu Hari Ini
        </p>

        <div className="flex gap-6">
          {[
            { emoji: "😠", bg: "bg-red-400" },
            { emoji: "😊", bg: "bg-green-400" },
            { emoji: "😢", bg: "bg-blue-400" },
            { emoji: "😨", bg: "bg-purple-400" },
          ].map(({ emoji, bg }, index) => (
            <div
              key={index}
              onClick={() => handleEmojiClick(emoji)}
              className={`${bg} rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-sm hover:scale-110 transition-transform cursor-pointer`}
            >
              {emoji}
            </div>
          ))}
        </div>

        {(selectedEmotion || hasStartedDetection) && (
          <div className="mt-10 text-center text-blue-700 text-lg font-medium">
            {selectedEmotion && <p>Emosi yang dipilih: {selectedEmotion}</p>}
            {hasStartedDetection && <p>Deteksi emosi sudah dimulai.</p>}
          </div>
        )}
      </div>

      {/* Ornamen Star */}
      <div className="absolute -bottom-16 -right-16 z-0">
        <Image
          alt="star"
          src="/images/Star-7.png"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      <div className="absolute -top-16 -left-48">
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
