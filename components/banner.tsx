// components/Banner.tsx
import React from "react";
import Image from "next/image";
import { Banner as BannerType } from "@/types";

interface BannerProps {
  data: BannerType;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      {/* Container utama dengan aspect ratio responsif */}
      <div className="relative aspect-square sm:aspect-[2.4/1] rounded-xl overflow-hidden">
        {/* Gambar sebagai background */}
        <Image
          src={data.imageUrl}
          alt={data.label}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />

        {/* Overlay konten (tombol/teks) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#ebf2f5] font-bold text-5xl sm:text-7xl lg:text-9xl leading-tight sm:max-w-xl max-w-xs">
            {data.label}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
