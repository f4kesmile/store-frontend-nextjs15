"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

// 1. Perbaikan: Hapus storeId yang tidak digunakan
type CartItem = Product & {
  quantity: number;
};

// 2. Perbaikan: Ganti 'any' dengan tipe khusus
interface SnapTransactionResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  [key: string]: unknown; // Untuk properti tambahan
}

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: SnapTransactionResult) => void;
          onPending?: (result: SnapTransactionResult) => void;
          onError?: (result: SnapTransactionResult) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const Summary = () => {
  // 3. Hapus storeId dari props
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSnapReady, setIsSnapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const items = useCart((state) => state.items) as CartItem[];
  const removeAll = useCart((state) => state.removeAll);

  // Load Midtrans script
  useEffect(() => {
    // 4. Perbaikan: Ganti any dengan type assertion yang aman
    if (
      typeof window !== "undefined" &&
      (window as typeof window & { snap?: unknown }).snap
    ) {
      setIsSnapReady(true);
      return;
    }

    const scriptId = "midtrans-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
    );
    script.async = true;

    script.onload = () => {
      setIsSnapReady(true);
      console.log("Midtrans script loaded");
    };

    script.onerror = () => {
      console.error("Failed to load Midtrans script");
      toast.error("Gagal memuat sistem pembayaran");
    };

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Pembayaran berhasil!");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Pembayaran dibatalkan.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    if (!isSnapReady) {
      toast.error(
        "Sistem pembayaran belum siap, coba lagi dalam beberapa detik"
      );
      return;
    }

    if (items.length === 0) {
      toast.error("Keranjang belanja kosong");
      return;
    }

    if (!phone.trim()) {
      toast.error("Nomor HP harus diisi");
      return;
    }

    if (!address.trim()) {
      toast.error("Alamat pengiriman harus diisi");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          items: items.map((item) => ({
            productId: item.id,
            price: item.price,
          })),
          phone: phone,
          address: address,
        }
      );

      const { token } = response.data;

      if (!token) {
        toast.error("Token pembayaran tidak tersedia");
        return;
      }

      // 5. Perbaikan: Gunakan tipe yang telah didefinisikan
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("Payment success", result);
          toast.success("Pembayaran berhasil!");
          removeAll();
          router.push("/success");
        },
        onPending: (result) => {
          console.log("Payment pending", result);
          toast("Pembayaran menunggu konfirmasi");
        },
        onError: (error) => {
          console.error("Payment error", error);
          toast.error("Pembayaran gagal");
          router.push("/failure");
        },
        onClose: () => {
          console.log("Payment popup closed");
          toast("Pembayaran dibatalkan");
        },
      });
    } catch (error) {
      // 6. Perbaikan: Hapus tipe any
      console.error("Checkout error", error);

      let errorMessage = "Gagal memproses checkout";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Ringkasan Order</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b border-gray-200 pb-4"
          >
            <div className="text-gray-700">{item.name}</div>
            <Currency value={Number(item.price)} />
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Total Order</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      {/* Form Input for Phone and Address */}
      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Nomor HP
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            placeholder="08123456789"
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Alamat Lengkap
          </label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            placeholder="Jl. Contoh No. 123, Kota"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <Button
        onClick={onCheckout}
        disabled={!isSnapReady || isLoading || items.length === 0}
        className="w-full mt-6"
      >
        {isLoading ? "Memproses..." : "Checkout"}
      </Button>

      {!isSnapReady && (
        <p className="mt-2 text-sm text-yellow-600">
          Sedang memuat sistem pembayaran...
        </p>
      )}
    </div>
  );
};

export default Summary;
