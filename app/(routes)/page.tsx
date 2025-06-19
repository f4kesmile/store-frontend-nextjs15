import getBanner from "@/actions/get-banner";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import ProductsList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Product, Banner as BannerType } from "@/types";

export const revalidate = 0;

const HomePage = async () => {
  let products: Product[] = [];
  let banner: BannerType | null = null;

  try {
    [products, banner] = await Promise.all([
      getProducts({ isFeatured: true }),
      getBanner("c1859c4f-a15a-4346-be19-19890ee4497b"),
    ]);
  } catch (error) {
    console.error("Error loading page data:", error);
  }

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {banner && <Banner data={banner} />}

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductsList title="Produk Unggulan" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
