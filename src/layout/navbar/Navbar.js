import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiBell, FiMenu, FiX } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";

import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import { handleLogEvent } from "src/lib/analytics";
import NavbarPromo from "@layout/navbar/NavbarPromo";
import CartDrawer from "@components/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";

const Navbar = () => {
  const { t } = useTranslation("common");
  const [searchText, setSearchText] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();

  const userInfo = getUserSession();
  const { storeCustomizationSetting } = useGetSetting();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/search?query=${searchText}`, null, { scroll: false });
      setSearchText("");
      setIsSearchOpen(false);
      handleLogEvent("search", `searched ${searchText}`);
    } else {
      router.push(`/ `, null, { scroll: false });
      setSearchText("");
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const MobileUserSection = () => {
    if (userInfo?.image) {
      return (
        <Link
          href="/user/dashboard"
          className="flex items-center space-x-3"
          onClick={handleMobileLinkClick}
        >
          <Image
            width={40}
            height={40}
            src={userInfo?.image}
            alt="user"
            className="w-10 h-10 rounded-full ring-2 ring-leather-gold"
          />
          <span className="text-leather-white font-medium">
            {userInfo?.name}
          </span>
        </Link>
      );
    }

    if (userInfo?.name) {
      return (
        <Link
          href="/user/dashboard"
          className="flex items-center space-x-3"
          onClick={handleMobileLinkClick}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-leather-gold text-leather-chocolate font-bold">
            {userInfo?.name[0].toUpperCase()}
          </div>
          <span className="text-leather-white font-medium">
            {userInfo?.name}
          </span>
        </Link>
      );
    }

    return (
      <Link
        href="/auth/login"
        className="flex items-center space-x-3 text-leather-gold hover:text-leather-gold-400 transition-leather"
        onClick={handleMobileLinkClick}
      >
        <FiUser className="w-6 h-6" />
        <span className="font-medium">Sign In</span>
      </Link>
    );
  };

  const MobileMenuLink = ({ href, text }) => {
    return (
      <Link
        href={href}
        className="block px-4 py-3 rounded-lg text-leather-white hover:bg-leather-tan/10 hover:text-leather-gold transition-leather"
        onClick={handleMobileLinkClick}
      >
        {text}
      </Link>
    );
  };

  const UserProfile = () => {
    if (userInfo?.image) {
      return (
        <Link
          href="/user/dashboard"
          className="block w-10 h-10 rounded-full ring-2 ring-leather-tan/30 hover:ring-leather-gold transition-all overflow-hidden"
        >
          <Image
            width={40}
            height={40}
            src={userInfo?.image}
            alt="user"
            className="w-full h-full object-cover"
          />
        </Link>
      );
    }

    if (userInfo?.name) {
      return (
        <Link
          href="/user/dashboard"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-leather-gold text-leather-chocolate font-bold text-lg hover:scale-110 transition-transform"
        >
          {userInfo?.name[0].toUpperCase()}
        </Link>
      );
    }

    return (
      <Link
        href="/auth/login"
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-leather-gold hover:bg-leather-gold-600 text-leather-chocolate font-medium transition-all hover:scale-105 active:scale-95"
      >
        <FiUser className="w-5 h-5" />
        <span className="hidden xl:inline">Sign In</span>
      </Link>
    );
  };

  return (
    <>
      <CartDrawer />

      <nav className="bg-leather-chocolate sticky top-0 z-30 shadow-leather-md backdrop-blur-sm bg-opacity-95">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden text-leather-white hover:text-leather-gold transition-leather p-2"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>

            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-36 h-12 lg:w-40 lg:h-14 transition-transform group-hover:scale-105 duration-300">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-full object-contain"
                  priority
                  src={
                    storeCustomizationSetting?.navbar?.logo ||
                    "/logo/logo-light.svg"
                  }
                  alt="logo"
                />
              </div>
            </Link>

            <div className="hidden lg:flex flex-1 max-w-2xl mx-8 xl:mx-12">
              <form onSubmit={handleSubmit} className="w-full relative group">
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  className="w-full h-12 pl-5 pr-12 bg-white/10 backdrop-blur-sm border-2 border-leather-tan/30 rounded-full text-leather-white placeholder-leather-white/60 focus:bg-white/20 focus:border-leather-gold focus:ring-4 focus:ring-leather-gold/20 transition-all duration-300 outline-none"
                  placeholder={
                    t("search-placeholder") ||
                    "Search for premium leather goods..."
                  }
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-leather-gold hover:bg-leather-gold-600 text-leather-chocolate transition-all hover:scale-110 active:scale-95"
                  aria-label="Search"
                >
                  <IoSearchOutline className="w-5 h-5" />
                </button>
              </form>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <button
                className="relative text-leather-white hover:text-leather-gold transition-leather group"
                aria-label="Notifications"
              >
                <FiBell className="w-6 h-6 group-hover:animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-leather-gold rounded-full"></span>
              </button>

              <button
                onClick={toggleCartDrawer}
                className="relative text-leather-white hover:text-leather-gold transition-leather group"
                aria-label="Shopping Cart"
              >
                <FiShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-leather-chocolate bg-leather-gold rounded-full group-hover:scale-110 transition-transform">
                    {totalItems}
                  </span>
                )}
              </button>

              <div className="relative">
                <UserProfile />
              </div>
            </div>

            <div className="flex lg:hidden items-center space-x-4">
              <button
                onClick={handleSearchToggle}
                className="text-leather-white hover:text-leather-gold transition-leather"
                aria-label="Search"
              >
                <IoSearchOutline className="w-6 h-6" />
              </button>

              <button
                onClick={toggleCartDrawer}
                className="relative text-leather-white hover:text-leather-gold transition-leather"
                aria-label="Cart"
              >
                <FiShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-leather-chocolate bg-leather-gold rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {isSearchOpen && (
            <div className="lg:hidden pb-4 animate-in slide-in-from-top duration-300">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  className="w-full h-12 pl-5 pr-12 bg-white/10 backdrop-blur-sm border-2 border-leather-tan/30 rounded-full text-leather-white placeholder-leather-white/60 focus:bg-white/20 focus:border-leather-gold transition-all outline-none"
                  placeholder={t("search-placeholder") || "Search..."}
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-leather-gold hover:bg-leather-gold-600 text-leather-chocolate transition-all"
                  aria-label="Search"
                >
                  <IoSearchOutline className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-leather-tan/20 bg-leather-chocolate/98 backdrop-blur-sm">
              <div className="px-4 py-6 space-y-4">
                <div className="flex items-center space-x-4 pb-4 border-b border-leather-tan/20">
                  <MobileUserSection />
                </div>

                <div className="space-y-2">
                  <MobileMenuLink href="/" text="Home" />
                  <MobileMenuLink href="/products" text="Shop" />
                  <MobileMenuLink href="/about" text="About" />
                  <button
                    className="w-full text-left px-4 py-3 rounded-lg text-leather-white hover:bg-leather-tan/10 hover:text-leather-gold transition-leather flex items-center space-x-2"
                    aria-label="Notifications"
                  >
                    <FiBell className="w-5 h-5" />
                    <span>Notifications</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <NavbarPromo />
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
