import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Pastikan path ini sesuai dengan lokasi file utils Anda

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div className="relative w-full h-full">
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <Image fill src={image.url} alt="" className="object-cover" />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
