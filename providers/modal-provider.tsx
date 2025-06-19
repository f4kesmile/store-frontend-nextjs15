"use client";

import PreviewModal from "@/components/preview-modal";
import { useEffect, useState, ReactNode } from "react";

type ModalProviderProps = {
  children: ReactNode;
};

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {children}
      <PreviewModal />
    </>
  );
};

export default ModalProvider;
