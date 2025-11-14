import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useCart } from "react-use-cart";
import { IoClose, IoBagHandle, IoCart } from "react-icons/io5";

import { getUserSession } from "@lib/auth";
import CartItem from "@components/cart/CartItem";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Cart = () => {
  const router = useRouter();
  const { isEmpty, items, cartTotal, totalUniqueItems } = useCart();
  const { closeCartDrawer } = useContext(SidebarContext);
  const { currency } = useUtilsFunction();
  const userInfo = getUserSession();

  const handleCheckout = () => {
    if (!items || items.length <= 0) {
      closeCartDrawer();
      return;
    }


    if (!userInfo) {
      router.push(`/auth/login?redirectUrl=checkout`);
      closeCartDrawer();
    } else {
      router.push("/checkout");
      closeCartDrawer();
    }
  };

  const handleContinueShopping = () => {
    closeCartDrawer();
  };

  const displayTotal = cartTotal ? cartTotal.toFixed(2) : "0.00";
  const itemCount = totalUniqueItems || 0;

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-leather">
      <div className="w-full flex justify-between items-center px-6 py-4 border-b border-leather-border ">
        <div className="flex items-center">
          <div className="bg-leather-brown-600 text-white p-2 rounded-full mr-3">
            <IoCart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-leather-chocolate-800">
              Shopping Cart
            </h2>
            <p className="text-xs text-leather-charcoal-600">
              {itemCount} {itemCount === 1 ? "item" : "items"} in cart
            </p>
          </div>
        </div>
        <button
          onClick={closeCartDrawer}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
        >
          <IoClose className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {isEmpty ? (
          <div className="flex flex-col h-full justify-center items-center px-6 py-12">
            <div className="bg-leather-cream-200 p-6 rounded-full mb-6">
              <IoBagHandle className="w-16 h-16 text-leather-brown-500" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-leather-chocolate-800 mb-3">
              Your cart is empty
            </h3>
            <p className="text-leather-charcoal-600 text-center text-sm max-w-sm">
              No items added in your cart. Explore our collection and add some
              premium products to your cart.
            </p>
            <button
              onClick={handleContinueShopping}
              className="mt-6 px-6 py-3 bg-leather-brown-600 hover:bg-leather-brown-700 text-leather-cream-100 rounded-leather font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="p-4">
            {items &&
              items.map((item, i) => (
                <CartItem key={item.id || i} item={item} currency={currency} />
              ))}
          </div>
        )}
      </div>

      {!isEmpty && items && items.length > 0 && (
        <div className="border-t border-leather-border-light">
          <div className="px-6 py-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-base text-leather-charcoal-600">
                  Subtotal
                </span>
                <span className="font-semibold text-leather-chocolate-800">
                  {currency}
                  {displayTotal}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 px-6 bg-transparent border-2 border-leather-brown-600 text-leather-brown-600 hover:bg-leather-brown-600 hover:text-white rounded-lg font-semibold flex items-center justify-between transition-all duration-300 group"
            >
              <span>Proceed To Checkout</span>
              <span className="bg-leather-brown-600 text-white group-hover:bg-white group-hover:text-leather-brown-600 px-3 py-1 rounded-full text-sm font-bold transition-all duration-300">
                {currency}
                {displayTotal}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
