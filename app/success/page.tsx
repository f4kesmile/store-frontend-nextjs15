"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect ke home setelah 3 detik
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Pembayaran Berhasil!
        </h1>
        <p className="text-gray-600 mb-6">
          Terima kasih atas pembelian Anda. Anda akan diarahkan ke halaman utama
          dalam beberapa detik.
        </p>

        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>

        <div className="mt-6">
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Kembali ke Home Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
