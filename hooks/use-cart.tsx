import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";

import { create } from "zustand";
import { get } from "http";
import toast from "react-hot-toast";

interface CartStore {
  items: Product[];
  additem: (item: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      additem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Produk sudah ada di keranjang");
        }

        set({ items: [...get().items, data] });
        toast.success("Produk berhasil ditambahkan ke keranjang");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Produk berhasil dihapus dari keranjang");
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("Semua produk berhasil dihapus dari keranjang");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
