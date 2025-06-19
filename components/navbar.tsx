import Link from "next/link";
import Container from "./ui/container";
import NavbarActions from "./ui/navbar-actions";
import MainNav from "./main-nav";
import { Category } from "@/types";
import getCategories from "@/actions/get-categories";

export const revalidate = 0;

const Navbar = async () => {
  const storeId = "9fe8fe68-3a3a-4878-92fc-88f271da9d52";
  let categories: Category[] = [];

  try {
    categories = await getCategories(storeId);
  } catch (error) {
    console.error("Error loading categories:", error);
  }

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Link href="/" className="ml-4 flex lg:ml-8 gap-x-2">
              <p className="font-bold text-xl">Toko</p>
            </Link>

            {/* Safe render even if categories is empty */}
            {categories.length > 0 && <MainNav data={categories} />}
          </div>
          <NavbarActions storeId={storeId} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
