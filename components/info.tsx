"use client";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";

import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./ui/button";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [linkWa, setLinkWa] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && data?.price) {
      const URL = `${window.location.origin}/product/${data.id}`;
      const nomorTelepon = process.env.NEXT_PUBLIC_TELP;

      // Format harga ke dalam Rupiah
      const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Menghindari .00 di akhir angka
      }).format(Number(data.price));

      const pesan = `Halo saya ingin membeli ${data.name} - ${formattedPrice} dengan link : ${URL}`;
      const linkWhatsApp = `https://wa.me/${nomorTelepon}?text=${encodeURIComponent(
        pesan
      )}`;
      setLinkWa(linkWhatsApp);
    }
  }, [data]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>

      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>

      <hr className="my-4" />

      <div className="mt-10 flex items-center gap-x-3">
        {linkWa && (
          <Link href={linkWa} target="_blank" rel="noopener noreferrer">
            <Button className="flex items-center gap-x-2">
              Chat Penjual
              <MessageCircleIcon size={20} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Info;
