import { useContext } from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

import useAddToCart from "@hooks/useAddToCart";
import { SidebarContext } from "@context/SidebarContext";
import Discount from "@components/common/Discount";
import Price from "@components/common/Price";

const CartItem = ({ item, currency }) => {
  const { updateItemQuantity, removeItem } = useCart();
  const { closeCartDrawer } = useContext(SidebarContext);
  const { handleIncreaseQuantity } = useAddToCart();

  const hasDiscount = item.prices?.discount > 0;
  const categoryName = item.category?.name?.en || "Men";
  const itemPrice = item.price || 0;
  const itemQuantity = item.quantity || 0;
  const itemTotal = itemPrice * itemQuantity;
  const originalPrice = item.originalPrice || 0;
  const originalTotal = originalPrice * itemQuantity;

  const handleDecrease = () => {
    updateItemQuantity(item.id, itemQuantity - 1);
  };

  const handleIncrease = () => {
    handleIncreaseQuantity(item);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="group w-full flex items-start p-4 border-b border-leather-border-light hover:border-leather-border-dark transition-all duration-300 hover:bg-leather-cream-50">
      <div className="relative flex-shrink-0 mr-4">
        <div className="relative rounded-leather overflow-hidden border border-leather-border-light bg-white">
          <Link href={`/product/${item.slug || "#"}`} onClick={closeCartDrawer}>
            <img
              src={item.image || "/placeholder-image.jpg"}
              width={100}
              height={100}
              alt={item.title || "Product image"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${item.slug || "#"}`}
          onClick={closeCartDrawer}
          className="block text-base font-semibold text-leather-chocolate-800 hover:text-leather-brown-600 transition-colors line-clamp-2"
        >
          {item.title}
        </Link>

        <div className="mb-3">
          <span className="text-xs text-white bg-leather-brown-600 py-1 px-2 rounded-full">
            {categoryName}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                {currency}
                {itemTotal.toFixed(2)}
              </span>

              {hasDiscount && (
                <del className="text-sm font-normal text-red-400 strike-through">
                  {currency}
                  {originalTotal.toFixed(2)}
                </del>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-leather-border rounded-leather bg-white">
              <button
                onClick={handleDecrease}
                className="p-2 text-leather-charcoal-500 hover:text-leather-brown-600 hover:bg-leather-cream-50 transition-colors"
              >
                <FiMinus className="w-3 h-3" />
              </button>

              <span className="px-3 py-2 text-sm font-semibold text-leather-chocolate-800 min-w-[40px] text-center">
                {itemQuantity}
              </span>

              <button
                onClick={handleIncrease}
                className="p-2 text-leather-charcoal-500 hover:text-leather-brown-600 hover:bg-leather-cream-50 transition-colors"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={handleRemove}
              className="p-2 text-leather-charcoal-400 hover:text-red-600 hover:bg-red-50  transition-colors rounded-full"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-leather-border-light">
          <span className="text-sm text-leather-charcoal-500">
            Item: {currency}
            {itemPrice.toFixed(2)}
          </span>

          <span className="text-sm font-medium text-leather-brown-600">
            Total: {currency}
            {itemTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
