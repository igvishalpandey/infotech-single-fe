import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import Tags from "@components/common/Tags";
import Layout from "@layout/Layout";
import { notifyError } from "@utils/toast";
import Card from "@components/slug-card/Card";
import useAddToCart from "@hooks/useAddToCart";
import Loading from "@components/preloader/Loading";
import ProductCard from "@components/product/ProductCard";
import VariantList from "@components/variants/VariantList";
import { SidebarContext } from "@context/SidebarContext";
import AttributeServices from "@services/AttributeServices";
import ProductServices from "@services/ProductServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Discount from "@components/common/Discount";
import ImageZoom from "@components/image-zoom/ImageZoom";

const ProductScreen = ({ product, attributes, relatedProducts }) => {
  const router = useRouter();
  const { lang, showingTranslateValue, getNumber, currency } =
    useUtilsFunction();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { handleAddItem, item, setItem } = useAddToCart();
  const { t } = useTranslation();

  const [selectedValue, setSelectedValue] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [isReadMore, setIsReadMore] = useState(true);
  const [selectedVariantAttributes, setSelectedVariantAttributes] = useState(
    {}
  );
  const [variantAttributes, setVariantAttributes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);

  const productImages = product?.image || [];

  const calculateProductPricing = (productData) => {
    const priceValue = getNumber(productData?.price);
    const originalPriceValue = getNumber(productData?.originalPrice);
    const discountPercentage =
      originalPriceValue > 0
        ? getNumber(
            ((originalPriceValue - priceValue) / originalPriceValue) * 100
          )
        : 0;

    setPrice(priceValue);
    setOriginalPrice(originalPriceValue);
    setDiscount(discountPercentage);
  };

  const handleImageChange = (newImage) => {
    if (!newImage) return;
    setSelectedImage(newImage);
  };

  const handleReadMoreToggle = () => {
    setIsReadMore(!isReadMore);
  };

  const handleQuantityDecrease = () => {
    if (item > 1) setItem(item - 1);
  };

  const handleQuantityIncrease = () => {
    if (stock > item) setItem(item + 1);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setItem(1);
      return;
    }

    const parsedValue = parseInt(numericValue, 10);

    if (!isNaN(parsedValue)) {
      if (parsedValue >= 1 && parsedValue <= stock) {
        setItem(parsedValue);
      } else if (parsedValue > stock) {
        setItem(stock);
      } else if (parsedValue < 1) {
        setItem(1);
      }
    }
  };

  const handleInputBlur = (event) => {
    const value = event.target.value;

    if (value === "" || isNaN(parseInt(value, 10)) || parseInt(value, 10) < 1) {
      setItem(1);
    }
  };

  const handleCategoryClick = () => {
    setIsLoading(!isLoading);
  };

  const handleAddToCart = () => {
    if (!product) {
      notifyError("Product not found");
      return;
    }

    if (stock <= 0) {
      notifyError("Insufficient stock");
      return;
    }

    const isVariantSelected = product?.variants?.some(
      (variant) =>
        Object.entries(variant).sort().toString() ===
        Object.entries(selectedVariant).sort().toString()
    );

    if (
      isVariantSelected ||
      !product?.variants ||
      product.variants.length === 0
    ) {
      const { variants, categories, description, ...updatedProduct } = product;

      const variantIdentifier = variantAttributes
        ?.map((att) => selectedVariant[att._id])
        .join("-");

      const variantNameParts = variantAttributes
        ?.map((att) =>
          att.variants?.find((v) => v._id === selectedVariant[att._id])
        )
        .map((el) => showingTranslateValue(el?.name));

      const newItem = {
        ...updatedProduct,
        id:
          product?.variants?.length <= 0
            ? product._id
            : `${product._id}-${variantIdentifier}`,
        title:
          product?.variants?.length <= 0
            ? showingTranslateValue(product.title)
            : `${showingTranslateValue(product.title)}-${variantNameParts.join(
                "-"
              )}`,
        image: selectedImage,
        variant: selectedVariant || {},
        price:
          product.variants?.length === 0
            ? getNumber(product.prices?.price)
            : getNumber(price),
        originalPrice:
          product.variants?.length === 0
            ? getNumber(product.prices?.originalPrice)
            : getNumber(originalPrice),
      };

      handleAddItem(newItem);
    } else {
      notifyError("Please select all variant first!");
    }
  };

  const variantFilter = (variant) => {
    return Object.keys(selectedVariantAttributes).every(
      (key) => selectedVariantAttributes[key] === variant[key]
    );
  };

  const attributeFilter = (attribute) => {
    const variantKeys = Object.keys(Object.assign({}, ...product?.variants));
    return attribute?._id && variantKeys.includes(attribute._id);
  };

  useEffect(() => {
    if (productImages.length > 0 && !selectedImage) {
      setSelectedImage(productImages[0]);
    }
  }, [productImages, selectedImage]);

  useEffect(() => {
    if (!product?.variants) return;

    if (selectedValue) {
      const result = product.variants.filter(variantFilter);

      const filterKey = Object.keys(
        Object.assign(
          {},
          ...result.map((variant) => {
            const {
              originalPrice,
              price,
              discount,
              quantity,
              barcode,
              sku,
              productId,
              image,
              ...rest
            } = variant;
            return rest;
          })
        )
      );

      const selectVar = filterKey.reduce(
        (obj, key) => ({ ...obj, [key]: selectedVariant[key] }),
        {}
      );

      const newObj = Object.entries(selectVar).reduce(
        (acc, [key, val]) => (val ? { ...acc, [key]: val } : acc),
        {}
      );

      const matchedVariant = result.find((variant) =>
        Object.keys(newObj).every((key) => newObj[key] === variant[key])
      );

      if (result.length <= 0 || !matchedVariant) {
        setStock(0);
        return;
      }

      setSelectedVariant(matchedVariant);
      setSelectedVariantAttributes(matchedVariant);
      setSelectedImage(matchedVariant?.image || productImages[0]);
      setStock(matchedVariant?.quantity || 0);
      calculateProductPricing(matchedVariant);
    } else if (product.variants.length > 0) {
      const firstVariant = product.variants[0];
      setStock(firstVariant?.quantity || 0);
      setSelectedVariant(firstVariant);
      setSelectedVariantAttributes(firstVariant);
      setSelectedImage(firstVariant?.image || productImages[0]);
      calculateProductPricing(firstVariant);
    } else {
      setStock(product?.stock || 0);
      setSelectedImage(productImages[0] || "");
      calculateProductPricing(product?.prices || {});
    }
  }, [product, selectedValue, selectedVariantAttributes, selectedVariant]);

  useEffect(() => {
    if (!product?.variants) return;

    const matchedAttributes = attributes?.filter(attributeFilter);
    setVariantAttributes(matchedAttributes?.sort() || []);
  }, [attributes, product]);

  useEffect(() => {
    setIsLoading(false);
  }, [product, setIsLoading]);

  useEffect(() => {
    const currentItem = Number(item) || 1;
    const calculatedTotal = currentItem * Number(price);
    const calculatedTotalOriginal = currentItem * Number(originalPrice);
    setTotalPrice(calculatedTotal);
    setTotalOriginalPrice(calculatedTotalOriginal);
  }, [item, price, originalPrice]);

  const category_name = showingTranslateValue(product?.category?.name)
    ?.toLowerCase()
    ?.replace(/[^A-Z0-9]+/gi, "-");

  const mainImage = selectedImage || productImages[0];
  const productDescription = showingTranslateValue(product?.description) || "";
  const shouldShowReadMore = productDescription.length > 230;

  const socialShareButtons = [
    { Component: FacebookShareButton, Icon: FacebookIcon },
    { Component: TwitterShareButton, Icon: TwitterIcon },
    { Component: RedditShareButton, Icon: RedditIcon },
    { Component: WhatsappShareButton, Icon: WhatsappIcon },
    { Component: LinkedinShareButton, Icon: LinkedinIcon },
  ];

  // Pre-computed JSX elements
  const thumbnailImages = productImages.map((image, index) => (
    <button
      key={index}
      onClick={() => handleImageChange(image)}
      className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
        selectedImage === image
          ? "border-leather-brown-600 shadow-leather"
          : "border-leather-border hover:border-leather-border-dark"
      }`}
    >
      <Image
        src={image}
        alt={`Product thumbnail ${index + 1}`}
        width={64}
        height={64}
        className="w-full h-full object-cover"
      />
    </button>
  ));

  const socialShareIcons = socialShareButtons.map((socialButton, index) => {
    const ButtonComp = socialButton.Component;
    const IconComp = socialButton.Icon;
    return (
      <li key={index}>
        <ButtonComp
          url={`https://yourdomain.com/product/${router.query.slug}`}
          className="hover:opacity-80 transition-opacity"
        >
          <IconComp size={36} round />
        </ButtonComp>
      </li>
    );
  });

  const variantAttributeSections = variantAttributes.map((attribute) => (
    <div key={attribute._id} className="mb-4">
      <h4 className="text-sm font-semibold text-leather-chocolate-800 py-1">
        {showingTranslateValue(attribute?.name)}:
      </h4>
      <div className="flex flex-row">
        <VariantList
          att={attribute._id}
          lang={lang}
          option={attribute.option}
          setValue={setSelectedValue}
          varTitle={variantAttributes}
          setSelectVa={setSelectedVariantAttributes}
          variants={product.variants || []}
          selectVariant={selectedVariant}
          setSelectVariant={setSelectedVariant}
        />
      </div>
    </div>
  ));

  const relatedProductCards = relatedProducts
    .slice(1, 11)
    .map((relatedProduct) => (
      <ProductCard
        key={relatedProduct._id}
        product={relatedProduct}
        attributes={attributes}
      />
    ));

  const QuantityCounter = () => (
    <div className="group flex items-center justify-between rounded-lg overflow-hidden flex-shrink-0 border h-12 border-leather-border bg-white">
      <button
        onClick={handleQuantityDecrease}
        disabled={item === 1}
        className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-12 text-leather-charcoal-600 border-e border-leather-border hover:text-leather-brown-600 hover:bg-leather-cream-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiMinus className="w-4 h-4" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={item}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="font-semibold text-center transition-colors duration-250 ease-in-out cursor-text flex-shrink-0 text-base text-leather-chocolate-800 w-10 md:w-20 xl:w-24 bg-transparent border-0 focus:outline-none focus:ring-0"
      />

      <button
        onClick={handleQuantityIncrease}
        disabled={stock <= item}
        className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-10 md:w-12 text-leather-charcoal-600 border-s border-leather-border hover:text-leather-brown-600 hover:bg-leather-cream-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </div>
  );

  const AddToCartButton = () => (
    <button
      onClick={handleAddToCart}
      className="bg-leather-brown-600 hover:bg-leather-brown-700 text-leather-cream-100 text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-lg focus-visible:outline-none focus:outline-none px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-full h-12 shadow-leather hover:shadow-leather-md"
    >
      {t("common:addToCart")}
    </button>
  );

  const CategoryLink = () => (
    <Link
      href={`/search?category=${category_name}&_id=${product?.category?._id}`}
    >
      <button
        type="button"
        className="text-leather-brown-600 font-serif font-medium underline ml-2 hover:text-leather-brown-700"
        onClick={handleCategoryClick}
      >
        {category_name}
      </button>
    </Link>
  );

  const ReadMoreButton = () => (
    <button
      onClick={handleReadMoreToggle}
      className="text-leather-brown-600 hover:text-leather-brown-700 font-medium text-sm"
    >
      {isReadMore ? t("common:moreInfo") : t("common:showLess")}
    </button>
  );

  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Product Not Found
            </h1>
            <Link href="/">
              <button className="px-6 py-3 bg-leather-brown-600 text-white rounded-lg hover:bg-leather-brown-700 transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          title={showingTranslateValue(product?.title) || "Product"}
          description={productDescription}
        >
          <div className="px-0 py-10 lg:py-12 bg-leather-white">
            <div className="mx-auto px-4 lg:px-8 max-w-screen-2xl">
              <div className="flex items-center pb-6">
                <ol className="flex items-center space-x-2 text-sm text-leather-charcoal-600">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-leather-brown-600 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <FiChevronRight className="w-4 h-4" />
                  </li>
                  <li>
                    <Link
                      href={`/search?category=${category_name}&_id=${product?.category?._id}`}
                      className="hover:text-leather-brown-600 transition-colors"
                    >
                      {category_name}
                    </Link>
                  </li>
                  <li>
                    <FiChevronRight className="w-4 h-4" />
                  </li>
                  <li className="text-leather-chocolate-800 font-medium truncate max-w-xs">
                    {showingTranslateValue(product?.title)}
                  </li>
                </ol>
              </div>

              <div className="w-full rounded-2xl p-6 lg:p-8 bg-white border border-leather-border shadow-leather">
                <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
                  <div
                    className="flex-shrink-0 xl:pr-10 w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12"
                    style={{ position: "relative" }}
                  >
                    {mainImage ? (
                      <ImageZoom src={mainImage} alt="Product Image" />
                    ) : (
                      <div className="w-full h-96 bg-leather-cream-100 flex items-center justify-center rounded-2xl border border-leather-border">
                        <span className="text-leather-charcoal-400">
                          No Image Available
                        </span>
                      </div>
                    )}

                    {productImages.length > 1 && (
                      <div className="mt-6">
                        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                          {thumbnailImages}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                      <div className="xl:pr-6 md:pr-6 md:w-2/3 w-full">
                        <div className="mb-6">
                          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-leather-chocolate-800 mb-2">
                            {showingTranslateValue(product?.title)}
                          </h1>

                          <div className="flex flex-row items-center gap-2">
                            <Discount
                              slug
                              product={product}
                              discount={discount}
                            />
                            <Stock stock={stock} />
                          </div>
                        </div>

                        <div className="mb-6">
                          <Price
                            product={product}
                            price={totalPrice}
                            currency={currency}
                            showPropOriginalPrice={true}
                            showPropPrice={true}
                            originalPrice={
                              originalPrice > price
                                ? totalOriginalPrice
                                : totalPrice
                            }
                            primaryTextClasses="text-2xl text-leather-brown-600"
                            secondaryTextClasses="text-lg text-leather-charcoal-400 ml-2"
                          />

                          <div className="mt-2 flex flex-row items-center">
                            <Price
                              product={product}
                              price={price}
                              currency={currency}
                              originalPrice={originalPrice}
                              primaryTextClasses="text-sm text-leather-charcoal-600"
                              secondaryTextClasses="text-xs text-leather-charcoal-400 ml-1"
                            />
                            <span className="text-xs text-leather-charcoal-500 ml-1">
                              /per item
                            </span>
                          </div>
                        </div>

                        <div className="mb-6">{variantAttributeSections}</div>

                        <div>
                          <div className="text-sm leading-4 text-leather-charcoal-600 ">
                            {isReadMore && shouldShowReadMore
                              ? `${productDescription.slice(0, 230)}...`
                              : productDescription}

                            {shouldShowReadMore && <ReadMoreButton />}
                          </div>

                          <div className="flex items-center mt-6">
                            <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                              <QuantityCounter />
                              <AddToCartButton />
                            </div>
                          </div>

                          <div className="flex flex-col mt-6">
                            <span className="font-serif font-semibold py-1 text-sm d-block">
                              <span className="text-leather-chocolate-800">
                                {t("common:category")}:
                              </span>{" "}
                              <CategoryLink />
                            </span>
                            <Tags product={product} />
                          </div>

                          <div className="mt-6 p-4 bg-leather-cream-50 border border-leather-border rounded-lg">
                            <p className="text-sm text-leather-charcoal-700 font-medium">
                              Call Us To Order By Mobile Number :{" "}
                              <span className="text-leather-brown-600 font-semibold">
                                +0044235234
                              </span>
                            </p>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-base font-semibold mb-2 font-serif text-leather-chocolate-800">
                              {t("common:shareYourSocial")}
                            </h3>
                            <p className="font-sans text-sm text-leather-charcoal-600 mb-3">
                              {t("common:shareYourSocialText")}
                            </p>
                            <ul className="flex space-x-2">
                              {socialShareIcons}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                        <div className="mt-6 md:mt-0 lg:mt-0 bg-leather-cream-50 border border-leather-border p-4 lg:p-6 rounded-xl">
                          <Card />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {relatedProducts?.length >= 2 && (
                <div className="pt-10 lg:pt-16">
                  <h3 className="text-xl lg:text-2xl font-bold font-serif text-leather-chocolate-800 mb-6">
                    {t("common:relatedProducts")}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {relatedProductCards}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.params;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    const [productsData, attributesData] = await Promise.all([
      ProductServices.getShowingStoreProducts({
        category: "",
        slug: slug,
      }),
      AttributeServices.getShowingAttributes({}),
    ]);

    const foundProduct =
      productsData?.products?.find(
        (productItem) => productItem?.slug === slug
      ) || null;

    if (!foundProduct) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product: foundProduct,
        attributes: attributesData || [],
        relatedProducts: productsData?.relatedProducts || [],
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        product: null,
        attributes: [],
        relatedProducts: [],
      },
    };
  }
};

export default ProductScreen;
