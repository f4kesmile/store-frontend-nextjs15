"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

interface NavbarActionsProps {
  storeId: string;
}

const NavbarActions: React.FC<NavbarActionsProps> = ({ storeId }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push(`/${storeId}/cart`)}
        className="relative flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        {cart.items.length > 0 && (
          <span className="ml-2 text-sm font-medium text-white">
            {cart.items.length}
          </span>
        )}
      </Button>
    </div>
  );
};

export default NavbarActions;
