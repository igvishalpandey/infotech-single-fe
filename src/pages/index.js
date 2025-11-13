import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@layout/Layout";
import Banner from "@components/banner/Banner";
import CardTwo from "@components/cta-card/CardTwo";
import OfferCard from "@components/offer/OfferCard";
import StickyCart from "@components/cart/StickyCart";
import Loading from "@components/preloader/Loading";
import ProductCard from "@components/product/ProductCard";
import MainCarousel from "@components/carousel/MainCarousel";
import FeatureCategory from "@components/category/FeatureCategory";
import CMSkeleton from "@components/preloader/CMSkeleton";

import { SidebarContext } from "@context/SidebarContext";
import useGetSetting from "@hooks/useGetSetting";
import ProductServices from "@services/ProductServices";
import AttributeServices from "@services/AttributeServices";

const SectionTitle = ({ title, description, loading, error }) => (
  <div className="text-center w-full lg:w-2/5 mx-auto mb-12">
    <h2 className="text-2xl lg:text-3xl mb-1 font-playfair font-semibold tracking-wide text-leather-chocolate">
      <CMSkeleton count={1} height={36} loading={loading} data={title} />
    </h2>

    <p className="text-base font-sans text-gray-600 leading-6">
      <CMSkeleton
        count={4}
        height={10}
        error={error}
        loading={loading}
        data={description}
      />
    </p>
  </div>
);

const ProductGrid = ({ products, attributes, limit, loading, error }) => {
  if (loading) {
    return (
      <CMSkeleton count={20} height={20} error={error} loading={loading} />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 lg:gap-4">
      {products?.slice(0, limit).map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          attributes={attributes}
        />
      ))}
    </div>
  );
};

const Home = ({ popularProducts, discountProducts, attributes }) => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();

  useEffect(() => {
    setIsLoading(false);
  }, [router, setIsLoading]);

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <Layout>
      <div className="min-h-screen">
        <StickyCart />

        <div className="bg-white">
          <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
            <div className="flex w-full gap-4">
              {/* <div className="flex-shrink-0 xl:pr-6 lg:block w-full"> */}
              <MainCarousel />
              {/* </div> */}
              {/* <div className="w-full hidden lg:flex">
                <OfferCard />
              </div> */}
            </div>

            {storeCustomizationSetting?.home?.promotion_banner_status && (
              <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6">
                <Banner />
              </div>
            )}
          </div>
        </div>

        {storeCustomizationSetting?.home?.featured_status && (
          <div className="bg-gray-100 lg:py-16 py-10">
            <SectionTitle
              title={storeCustomizationSetting?.home?.feature_title}
              description={storeCustomizationSetting?.home?.feature_description}
              loading={loading}
              error={error}
            />
            <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
              <FeatureCategory />
            </div>
          </div>
        )}

        {storeCustomizationSetting?.home?.popular_products_status && (
          <div className="bg-gray-50 lg:py-16 py-10">
            <SectionTitle
              title={storeCustomizationSetting?.home?.popular_title}
              description={storeCustomizationSetting?.home?.popular_description}
              loading={loading}
              error={error}
            />
            <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
              <ProductGrid
                products={popularProducts}
                attributes={attributes}
                limit={storeCustomizationSetting?.home?.popular_product_limit}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        )}

        {storeCustomizationSetting?.home?.discount_product_status &&
          discountProducts?.length > 0 && (
            <div className="bg-gray-50 lg:py-16 py-10" id="discount">
              <SectionTitle
                title={storeCustomizationSetting?.home?.latest_discount_title}
                description={
                  storeCustomizationSetting?.home?.latest_discount_description
                }
                loading={loading}
                error={error}
              />
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <ProductGrid
                  products={discountProducts}
                  attributes={attributes}
                  limit={
                    storeCustomizationSetting?.home
                      ?.latest_discount_product_limit
                  }
                  loading={loading}
                  error={error}
                />
              </div>
            </div>
          )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id || "",
      title: query || "",
    }),
    AttributeServices.getShowingAttributes(),
  ]);

  return {
    props: {
      attributes,
      cookies,
      popularProducts: data.popularProducts,
      discountProducts: data.discountedProducts,
    },
  };
};

export default Home;
