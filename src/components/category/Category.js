import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";

//internal import
import Loading from "@components/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import CategoryServices from "@services/CategoryServices";
import CategoryCard from "@components/category/CategoryCard";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Category = () => {
  const { categoryDrawerOpen, closeCategoryDrawer } =
    useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  const { data, error, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await CategoryServices.getShowingCategory(),
  });

  const handleCloseDrawer = () => {
    closeCategoryDrawer();
  };

  return (
    <div className="flex flex-col w-full h-full bg-white cursor-pointer scrollbar-hide">
      {categoryDrawerOpen && (
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-leather-brown text-white border-b border-gray-200">
          <h2 className="font-semibold font-serif text-lg m-0 text-white flex align-center">
            <Link href="/" className="mr-10">
              <Image
                width={100}
                height={38}
                src="/logo/logo-color.svg"
                alt="logo"
              />
            </Link>
          </h2>
          <button
            onClick={handleCloseDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-white text-gray-600 p-2 focus:outline-none transition-all hover:bg-gray-100 hover:text-gray-800"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      )}
      <div className="w-full max-h-full">
        {categoryDrawerOpen && (
          <h2 className="font-semibold font-serif text-lg m-0 text-gray-900 flex align-center border-b border-gray-200 px-8 py-3 bg-gray-50">
            All Categories
          </h2>
        )}
        {isLoading ? (
          <Loading loading={isLoading} />
        ) : error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            {error?.response?.data?.message || error?.message}
          </p>
        ) : (
          <div className="relative grid gap-1 p-6 scrollbar-hide">
            {data[0]?.children?.map((category) => (
              <CategoryCard
                key={category._id}
                id={category._id}
                icon={category.icon}
                nested={category.children}
                title={showingTranslateValue(category?.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
