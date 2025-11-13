import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { IoLockOpenOutline } from "react-icons/io5";
import { FiPhoneCall, FiUser } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const NavBarTop = () => {
  const userInfo = getUserSession();
  const router = useRouter();
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const handleLogOut = () => {
    signOut();
    Cookies.remove("couponInfo");
    router.push("/");
  };

  const handleTokenExpiration = () => {
    if (userInfo) {
      const decoded = jwtDecode(userInfo?.token);
      const expireTime = new Date(decoded?.exp * 1000);
      const currentTime = new Date();

      if (currentTime >= expireTime) {
        handleLogOut();
      }
    }
  };

  useEffect(() => {
    handleTokenExpiration();
  }, [userInfo]);

  const renderNavItem = (href, text) => {
    return (
      <div>
        <Link href={href} className="font-medium hover:text-leather-brown">
          {showingTranslateValue(text)}
        </Link>
        <span className="mx-2">|</span>
      </div>
    );
  };

  return (
    <div className="hidden lg:block bg-leather-cream-100">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
        <div className="text-leather-charcoal-700 py-2 font-sans text-xs font-medium border-b border-leather-border flex justify-between items-center">
          <span className="flex items-center">
            <FiPhoneCall className="mr-2" />
            {showingTranslateValue(
              storeCustomizationSetting?.navbar?.help_text
            )}
            <a
              href={`tel:${
                storeCustomizationSetting?.navbar?.phone || "+099949343"
              }`}
              className="font-bold text-leather-brown ml-1"
            >
              {storeCustomizationSetting?.navbar?.phone || "+099949343"}
            </a>
          </span>

          <div className="lg:text-right flex items-center navBar">
            {storeCustomizationSetting?.navbar?.about_menu_status &&
              renderNavItem(
                "/about-us",
                storeCustomizationSetting?.navbar?.about_us
              )}
            {storeCustomizationSetting?.navbar?.contact_menu_status &&
              renderNavItem(
                "/contact-us",
                storeCustomizationSetting?.navbar?.contact_us
              )}
            <Link
              href="/user/my-account"
              className="font-medium hover:text-leather-brown"
            >
              {showingTranslateValue(
                storeCustomizationSetting?.navbar?.my_account
              )}
            </Link>
            <span className="mx-2">|</span>
            {userInfo?.email ? (
              <button
                onClick={handleLogOut}
                className="flex items-center font-medium hover:text-leather-brown"
              >
                <span className="mr-1">
                  <IoLockOpenOutline />
                </span>
                {showingTranslateValue(
                  storeCustomizationSetting?.navbar?.logout
                )}
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center font-medium hover:text-leather-brown"
              >
                <span className="mr-1">
                  <FiUser />
                </span>
                {showingTranslateValue(
                  storeCustomizationSetting?.navbar?.login
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(NavBarTop), { ssr: false });
