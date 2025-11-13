import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCart } from "react-use-cart";
import { FiHome, FiUser, FiShoppingCart, FiAlignLeft } from "react-icons/fi";
import { getUserSession } from "@lib/auth";
import { SidebarContext } from "@context/SidebarContext";
import CategoryDrawer from "@components/drawer/CategoryDrawer";

const MobileFooter = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { toggleCartDrawer, toggleCategoryDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const userInfo = getUserSession();

  return (
    <>
      <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow scrollbar-hide w-full">
        <CategoryDrawer className="w-6 h-6 drop-shadow-xl" />
      </div>
      <footer className="lg:hidden fixed z-30 bottom-0 bg-leather-chocolate flex items-center justify-between w-full h-16 px-3 sm:px-10 shadow-leather-up">
        <button
          aria-label="Bar"
          onClick={toggleCategoryDrawer}
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none hover:bg-leather-brown-700 p-2 rounded-lg transition-colors"
        >
          <span className="text-xl text-leather-cream-100">
            <FiAlignLeft className="w-6 h-6 drop-shadow-xl" />
          </span>
        </button>

        <Link
          href="/"
          className="text-xl text-leather-cream-100 hover:bg-leather-brown-700 p-2 rounded-lg transition-colors"
          rel="noreferrer"
          aria-label="Home"
        >
          <FiHome className="w-6 h-6 drop-shadow-xl" />
        </Link>

        <button
          onClick={toggleCartDrawer}
          className="h-9 w-9 relative whitespace-nowrap inline-flex items-center justify-center text-leather-cream-100 hover:bg-leather-brown-700 p-2 rounded-lg transition-colors"
        >
          <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-bold leading-none text-leather-cream-100 transform translate-x-1/2 bg-leather-chocolate-800 rounded-full">
            {totalItems}
          </span>
          <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
        </button>

        <button
          aria-label="User"
          type="button"
          className="text-xl text-leather-cream-100 indicator justify-center hover:bg-leather-brown-700 p-2 rounded-lg transition-colors"
        >
          {userInfo?.image ? (
            <Link href="/user/dashboard" className="relative top-1 w-6 h-6">
              <Image
                width={29}
                height={29}
                src={userInfo.image}
                alt="user"
                className="rounded-full border-2 border-leather-cream-100"
              />
            </Link>
          ) : userInfo?.name ? (
            <Link
              href="/user/dashboard"
              className="leading-none font-bold font-serif block text-leather-cream-100 hover:text-leather-cream-200"
            >
              {userInfo?.name[0]}
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center justify-center"
            >
              <FiUser className="w-6 h-6 drop-shadow-xl" />
            </Link>
          )}
        </button>
      </footer>
    </>
  );
};

export default dynamic(() => Promise.resolve(MobileFooter), { ssr: false });
