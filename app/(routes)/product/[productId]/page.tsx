import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductsList from "@/components/product-list";
import Container from "@/components/ui/container";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const awaitedParams = await params;
  const product = await getProduct(awaitedParams.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
        </div>
        <hr className="my-10" />
        <ProductsList title="produk terkait" items={suggestedProducts} />
      </Container>
    </div>
  );
};

export default ProductPage;
