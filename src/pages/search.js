import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import Layout from "@layout/Layout";
import useFilter from "@hooks/useFilter";
import Card from "@components/cta-card/Card";
import Loading from "@components/preloader/Loading";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import { SidebarContext } from "@context/SidebarContext";
import AttributeServices from "@services/AttributeServices";
import CategorySidebar from "@components/carousel/CategorySidebar";

const Search = ({ products, attributes }) => {
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const [visibleProduct, setVisibleProduct] = useState(18);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Add price range state

  // Pass priceRange to useFilter hook
  const { setSortedField, productData } = useFilter(products, priceRange);

  useEffect(() => {
    setIsLoading(false);
  }, [products]);

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  return (
    <Layout title="Search" description="This is search page">
      <div className="flex">
        {/* Pass price range props to CategorySidebar */}
        <CategorySidebar
          onPriceRangeChange={handlePriceRangeChange}
          priceRange={priceRange}
        />

        <div className="flex-1 max-w-screen-2xl mx-auto px-3 sm:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 2xl:gap-6 mb-6">
            <Card />
          </div>

          {productData?.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-leather-cream-100 border border-leather-border rounded-leather p-3 mb-6">
              <div>
                <h6 className="text-sm font-serif text-leather-charcoal-700">
                  {productData.length} products found
                </h6>
                <p className="text-xs text-leather-charcoal-500 mt-1">
                  Price range: {priceRange[0]} - {priceRange[1]}
                </p>
              </div>

              <select
                onChange={(e) => setSortedField(e.target.value)}
                className="text-sm font-serif font-medium bg-leather-white rounded-leather border border-leather-border px-3 py-2 cursor-pointer focus:ring-0 focus:border-leather-brown focus:outline-none text-leather-charcoal-700"
              >
                <option value="" hidden>
                  {t("common:sortByPrice")}
                </option>
                <option value="Low">{t("common:lowToHigh")}</option>
                <option value="High">{t("common:highToLow")}</option>
              </select>
            </div>
          )}

          {!isLoading && (
            <>
              {productData?.length === 0 ? (
                <div className="text-center py-12">
                  <Image
                    src="/no-result.svg"
                    alt="no-result"
                    width={380}
                    height={340}
                    className="mx-auto mb-4"
                  />
                  <h2 className="text-lg md:text-xl font-medium text-leather-charcoal-600">
                    {t("common:sorryText")} 😞
                  </h2>
                  <p className="text-sm text-leather-charcoal-500 mt-2">
                    No products found in the price range ${priceRange[0]} - $
                    {priceRange[1]}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {productData
                      .slice(0, visibleProduct)
                      .map((product, index) => (
                        <ProductCard
                          key={index}
                          product={product}
                          attributes={attributes}
                        />
                      ))}
                  </div>

                  {productData.length > visibleProduct && (
                    <button
                      onClick={() => setVisibleProduct((p) => p + 10)}
                      className="block mx-auto mt-6 bg-leather-cream-100 hover:bg-leather-brown hover:text-white px-8 py-3 rounded-leather text-sm transition"
                    >
                      {t("common:loadMoreBtn")}
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id || "",
      title: query ? encodeURIComponent(query) : "",
    }),
    AttributeServices.getShowingAttributes({}),
  ]);

  return {
    props: {
      attributes,
      products: data?.products,
    },
  };
};
