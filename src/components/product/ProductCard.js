import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { IoAdd, IoCart, IoRemove, IoEyeOutline } from "react-icons/io5";
import { useCart } from "react-use-cart";
import dynamic from "next/dynamic";
import Price from "@components/common/Price";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import useGetSetting from "@hooks/useGetSetting";
import Discount from "@components/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@components/modal/ProductModal";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import { handleLogEvent } from "src/lib/analytics";
import RenderStars from "@components/common/RatingStars";

const ProductCard = ({ product, attributes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { globalSetting } = useGetSetting();
  const { showingTranslateValue, getNumber } = useUtilsFunction();

  const currency = globalSetting?.default_currency || "$";
  const isInCart = inCart(product?._id);
  const cartItem = useMemo(() => {
    return items?.find((item) => item?.id === product?._id);
  }, [items, product?._id]);

  const productTitle = showingTranslateValue(product?.title);
  const productDescription = showingTranslateValue(product?.description);
  const categoryName = showingTranslateValue(product?.category?.name);
  const productImages = product?.image || [];
  const isOutOfStock = product?.stock < 1;

  const productPrice = {
    price: product?.isCombination
      ? getNumber(product?.variants?.[0]?.price)
      : getNumber(product?.prices?.price),
    originalPrice: product?.isCombination
      ? getNumber(product?.variants?.[0]?.originalPrice)
      : getNumber(product?.prices?.originalPrice),
  };

  productPrice.hasDiscount =
    productPrice.originalPrice > productPrice.price &&
    productPrice.originalPrice > 0;

  const handleAddProductToCart = (productData) => {
    if (!productData) {
      notifyError("Product not found");
      return;
    }

    if (isOutOfStock) {
      notifyError("This product is out of stock!");
      return;
    }

    if (productData?.variants?.length > 0) {
      setModalOpen(true);
      return;
    }

    const { slug, variants, categories, description, ...updatedProduct } =
      productData;

    addItem({
      ...updatedProduct,
      title: productTitle,
      id: productData._id,
      variant: productData.prices,
      price: productData.prices?.price,
      originalPrice: productData.prices?.originalPrice,
    });
  };

  const handleOpenQuickView = () => {
    setModalOpen(true);
    if (productTitle) {
      handleLogEvent("product", `opened ${productTitle}`);
    }
  };

  const handleDecreaseProductQuantity = () => {
    if (cartItem && cartItem.quantity > 0) {
      updateItemQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };

  const handleIncreaseProductQuantity = () => {
    if (!cartItem) return;

    if (cartItem?.variants?.length > 0) {
      handleAddProductToCart(cartItem);
    } else {
      handleIncreaseQuantity(cartItem);
    }
  };

  const handleAddCurrentProductToCart = () => {
    handleAddProductToCart(product);
  };

  const handleProductCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleProductCardMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSwitchToNextImage = () => {
    if (productImages.length > 0) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % productImages.length
      );
    }
  };

  const handleQuickViewClick = (event) => {
    event.preventDefault();
    handleOpenQuickView();
  };

  const RenderImageIndicators = useCallback(() => {
    return productImages.map((_, index) => (
      <div
        key={index}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          index === currentImageIndex
            ? "bg-white w-6"
            : "bg-white bg-opacity-50 w-1.5"
        }`}
      />
    ));
  }, [productImages, currentImageIndex]);

  const RenderLoadingSkeleton = () => {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
        <div className="h-52 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        <div className="p-4">
          <div className="h-3 bg-gray-200 rounded mb-2 w-20"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="flex gap-2 mb-3">
            <div className="h-5 bg-gray-200 rounded w-20"></div>
            <div className="h-5 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (productImages.length <= 1 || isHovered) return;

    const imageInterval = setInterval(handleSwitchToNextImage, 3000);
    return () => clearInterval(imageInterval);
  }, [productImages.length, isHovered]);

  if (!product) {
    return <RenderLoadingSkeleton />;
  }

  const currentImage = productImages[currentImageIndex] || productImages[0];

  return (
    <>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product}
        currency={currency}
        attributes={attributes}
      />

      <div
        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 hover:scale-[1.02] transition-all duration-300 flex flex-col h-full group"
        onMouseEnter={handleProductCardMouseEnter}
        onMouseLeave={handleProductCardMouseLeave}
      >
        <div className="relative overflow-hidden flex-shrink-0">
          <Discount product={product} card={true} />

          <Link href={`/product/${product?.slug || "#"}`} className="block">
            <div className="relative h-52 w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
              {currentImage ? (
                <ImageWithFallback
                  src={currentImage}
                  alt={productTitle || "Product"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              ) : (
                <Image
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  fill
                  className="object-cover"
                  alt="product placeholder"
                />
              )}

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={handleQuickViewClick}
                  disabled={isOutOfStock}
                  className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-800 rounded-full p-3 shadow-xl hover:bg-gray-50 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Quick view"
                >
                  <IoEyeOutline size={20} />
                </button>
              </div>
            </div>
          </Link>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                OUT OF STOCK
              </span>
            </div>
          )}

          {productImages.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
              <RenderImageIndicators />
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          {categoryName && (
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1.5">
              {categoryName}
            </span>
          )}

          <Link
            href={`/product/${product?.slug || "#"}`}
            className="flex-grow-0 mb-0.5"
          >
            <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-1 hover:text-leather-brown-700 transition-colors min-h-[1.5rem]">
              {productTitle || "Untitled Product"}
            </h2>
          </Link>
          <div className="flex items-center gap-0.5 mb-1.5">
            <RenderStars rating={5} />
          </div>

          {productDescription && (
            <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-4">
              {productDescription}
            </p>
          )}

          <div className="mb-3">
            <Price
              product={product}
              price={productPrice.price}
              originalPrice={productPrice.originalPrice}
              currency={currency}
              card={true}
            />
          </div>

          {isInCart && cartItem ? (
            <div className="w-full bg-leather-brown-600 text-white flex items-center justify-between h-10 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <button
                onClick={handleDecreaseProductQuantity}
                disabled={isOutOfStock}
                className="hover:bg-leather-brown-700 rounded-full p-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                aria-label="Decrease quantity"
              >
                <IoRemove size={16} />
              </button>
              <span className="text-sm font-semibold min-w-[2rem] text-center">
                {cartItem?.quantity || 0}
              </span>
              <button
                onClick={handleIncreaseProductQuantity}
                disabled={isOutOfStock}
                className="hover:bg-leather-brown-700 rounded-full p-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                aria-label="Increase quantity"
              >
                <IoAdd size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddCurrentProductToCart}
              disabled={isOutOfStock}
              className="w-full bg-white border-2 border-leather-brown-600 text-leather-brown-600 py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-leather-brown-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-leather-brown-600 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <IoCart size={18} />
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
