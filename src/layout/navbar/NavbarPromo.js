import { Fragment, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import SettingServices from "@services/SettingServices";
import CategoryServices from "@services/CategoryServices";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

import useGetSetting from "@hooks/useGetSetting";
import Category from "@components/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const LanguageOption = ({ language, onLanguageChange }) => {
  const handleLanguageSelect = () => {
    onLanguageChange(language);
  };

  if (!language?.iso_code) return null;

  return (
    <button
      onClick={handleLanguageSelect}
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <div
        className={`flot-l flag ${language?.flag?.toLowerCase() || ""}`}
      ></div>
      <span className="ml-2">{language?.name}</span>
    </button>
  );
};

const SubCategoryItem = ({
  subCategory,
  onSubCategoryClick,
  showingTranslateValue,
}) => {
  const handleClick = () => {
    onSubCategoryClick(
      subCategory._id,
      showingTranslateValue(subCategory?.name)
    );
  };

  return (
    <button
      onClick={handleClick}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-leather-brown"
    >
      {showingTranslateValue(subCategory?.name)}
    </button>
  );
};

const SubCategoriesList = ({
  category,
  onSubCategoryClick,
  showingTranslateValue,
}) => {
  const subCategories = category.children.slice(0, 8);

  return (
    <div className="py-2">
      {subCategories.map((subCategory) => (
        <SubCategoryItem
          key={subCategory._id}
          subCategory={subCategory}
          onSubCategoryClick={onSubCategoryClick}
          showingTranslateValue={showingTranslateValue}
        />
      ))}
    </div>
  );
};

const CategoryDropdown = ({
  category,
  showingTranslateValue,
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
}) => {
  const router = useRouter();
  const { setIsLoading } = useContext(SidebarContext);

  const hasSubCategories = category?.children?.length > 0;
  const isActive = activeDropdown === category._id;

  const handleMouseEnter = () => {
    if (hasSubCategories) {
      onDropdownEnter(category._id);
    }
  };

  const handleMouseLeave = () => {
    onDropdownLeave();
  };

  const handleSubCategoryClick = (subCategoryId, subCategoryName) => {
    const formattedName = subCategoryName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");
    router.push(`/search?category=${formattedName}&_id=${subCategoryId}`);
    setIsLoading((prev) => !prev);
  };

  const handleCategoryButtonClick = () => {
    const formattedName = showingTranslateValue(category?.name)
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-");
    router.push(`/search?category=${formattedName}&_id=${category._id}`);
    setIsLoading((prev) => !prev);
  };

  return (
    <div
      className="relative font-serif"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleCategoryButtonClick}
        className="group inline-flex items-center py-2 hover:text-leather-brown focus:outline-none transition-colors"
      >
        <span className="font-serif text-sm font-medium">
          {showingTranslateValue(category?.name)}
        </span>
        {hasSubCategories && (
          <ChevronDownIcon
            className="ml-1 h-3 w-3 group-hover:text-leather-brown transition-colors"
            aria-hidden="true"
          />
        )}
      </button>

      {hasSubCategories && (
        <Transition
          as={Fragment}
          show={isActive}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className="absolute z-20 left-0 mt-1 w-56 bg-white shadow-lg rounded-md border border-gray-200">
            <SubCategoriesList
              category={category}
              onSubCategoryClick={handleSubCategoryClick}
              showingTranslateValue={showingTranslateValue}
            />
          </div>
        </Transition>
      )}
    </div>
  );
};

const MainCategoriesDropdown = ({
  categories,
  categoriesLoading,
  storeCustomizationSetting,
  showingTranslateValue,
}) => {
  if (!storeCustomizationSetting?.navbar?.categories_menu_status) return null;

  return (
    <Popover className="relative font-serif">
      <Popover.Button className="group inline-flex items-center py-2 hover:text-leather-brown focus:outline-none transition-colors">
        <span className="font-serif text-sm font-medium">
          {showingTranslateValue(storeCustomizationSetting?.navbar?.categories)}
        </span>
        <ChevronDownIcon
          className="ml-1 h-3 w-3 group-hover:text-leather-brown transition-colors"
          aria-hidden="true"
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs c-h-65vh bg-white">
          <div className="rounded-md shadow-leather ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
            <Category categories={categories} isLoading={categoriesLoading} />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

const LanguageOptionsList = ({ languages, onLanguageChange }) => {
  return (
    <div className="py-1">
      {languages?.map((language, index) => (
        <LanguageOption
          key={index}
          language={language}
          onLanguageChange={onLanguageChange}
        />
      ))}
    </div>
  );
};

const LanguageDropdown = ({ languages, currentLang, onLanguageChange }) => {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center space-x-2 py-2 text-sm font-medium hover:text-leather-brown transition-colors">
        <div
          className={`flot-l flag ${currentLang?.flag?.toLowerCase() || ""}`}
        ></div>
        <span>{currentLang?.name || "Select Language"}</span>
        <ChevronDownIcon className="h-3 w-3" aria-hidden="true" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 right-0 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200">
          <LanguageOptionsList
            languages={languages}
            onLanguageChange={onLanguageChange}
          />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

const CategoryDropdownsList = ({
  categories,
  showingTranslateValue,
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
}) => {
  return categories.map((category) => (
    <CategoryDropdown
      key={category._id}
      category={category}
      showingTranslateValue={showingTranslateValue}
      activeDropdown={activeDropdown}
      onDropdownEnter={onDropdownEnter}
      onDropdownLeave={onDropdownLeave}
    />
  ));
};

const NavbarPromo = () => {
  const router = useRouter();
  const { lang, storeCustomizationSetting } = useGetSetting();
  const { setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await CategoryServices.getShowingCategory(),
  });

  const currentLanguageCookie = Cookies.get("_curr_lang");
  let currentLang = {};

  if (currentLanguageCookie && currentLanguageCookie !== "undefined") {
    try {
      currentLang = JSON.parse(currentLanguageCookie);
    } catch (error) {
      currentLang = {};
    }
  }

  const handleLanguageChange = (language) => {
    if (!language?.iso_code) return;

    Cookies.set("_lang", language.iso_code, {
      sameSite: "None",
      secure: true,
    });
    Cookies.set("_curr_lang", JSON.stringify(language), {
      sameSite: "None",
      secure: true,
    });
  };

  const handleDropdownEnter = (categoryId) => {
    setActiveDropdown(categoryId);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const { data: languages, isFetched } = useQuery({
    queryKey: ["languages"],
    queryFn: SettingServices.getShowingLanguage,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  const currentLanguage = Cookies.get("_curr_lang");
  if (!currentLanguage && isFetched) {
    const result = languages?.find((language) => language?.iso_code === lang);
    Cookies.set("_curr_lang", JSON.stringify(result || languages?.[0]), {
      sameSite: "None",
      secure: true,
    });
  }

  const categories = categoriesData?.[0]?.children || [];
  const firstFiveCategories = categories.slice(0, 5);

  return (
    <div className="hidden lg:block xl:block bg-white border-b border-leather-border">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
        <div className="inline-flex items-center space-x-6">
          <MainCategoriesDropdown
            categories={categories}
            categoriesLoading={categoriesLoading}
            storeCustomizationSetting={storeCustomizationSetting}
            showingTranslateValue={showingTranslateValue}
          />

          <CategoryDropdownsList
            categories={firstFiveCategories}
            showingTranslateValue={showingTranslateValue}
            activeDropdown={activeDropdown}
            onDropdownEnter={handleDropdownEnter}
            onDropdownLeave={handleDropdownLeave}
          />
        </div>

        <div className="flex">
          <LanguageDropdown
            languages={languages}
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarPromo;
