import Button from "@/components/ui/button";
import Link from "next/link";

const FailurePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-5xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Pembayaran Gagal
        </h1>
        <p className="text-gray-700 mb-6">
          Maaf, pembayaran Anda gagal diproses. Silakan coba lagi atau hubungi
          layanan pelanggan kami.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/cart" className="w-full sm:w-auto">
            <Button className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              Kembali ke Keranjang
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FailurePage;
