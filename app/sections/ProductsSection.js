import { getAllProducts } from "../backend/queries/ProductQuery";
import PageTitle from "../components/PageTitle";
import ProductItem from "../components/ProductItem";
import NoProductsFound from "./_components/NoProductsFound";

export default async function ProductsSection() {
  const products = await getAllProducts();
  return (
    <>
      {products && products.length > 0 ? (
        <section className="min-h-screen py-[50px]">
          <PageTitle
            title="Our Products"
            subTitle="Discover a wide range of products designed to bring comfort, style, and quality into your everyday life."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {products.length > 0 && products
              ? products.map((product) => (
                  <ProductItem
                    id={product?._id}
                    thumbnail={product?.thumbnail}
                    title={product?.title}
                    description={product?.description}
                    price={product?.price}
                    discount={product?.discount}
                    key={product?._id}
                    slug={product?.slug}
                    stock={product?.stock}
                    quantity={product?.quantity}
                  />
                ))
              : "No Products Found!"}
          </div>
        </section>
      ) : (
        <NoProductsFound />
      )}
    </>
  );
}
