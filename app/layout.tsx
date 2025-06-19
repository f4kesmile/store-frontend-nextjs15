import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

const font = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toko Online",
  description: "Toko Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <ModalProvider>
          <ToastProvider />
          <Navbar />
          {children}
        </ModalProvider>
        <Footer />
      </body>
    </html>
  );
}
