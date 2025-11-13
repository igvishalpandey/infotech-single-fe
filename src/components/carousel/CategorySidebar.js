import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import CategoryServices from "@services/CategoryServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Loading from "@components/preloader/Loading";

const RecursiveList = ({ items, translate, router }) => {
  const [open, setOpen] = useState(null);

  return (
    <ul className="space-y-1 pl-2">
      {items?.map((item) => {
        const name = translate(item.name);
        const hasChildren = item.children && item.children.length > 0;
        const toggle = () => setOpen(open === item._id ? null : item._id);
        const go = () =>
          router.push(
            `/search?category=${name
              .toLowerCase()
              .replace(/[^A-Z0-9]+/gi, "-")}&_id=${item._id}`
          );

        return (
          <li key={item._id}>
            <div
              className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100"
              onClick={hasChildren ? toggle : go}
            >
              <div className="flex gap-2 items-center">
                {item.icon && (
                  <Image
                    src={item.icon}
                    width={22}
                    height={22}
                    alt={name}
                    className="object-contain"
                  />
                )}
                <span className="text-sm font-medium">{name}</span>
              </div>
              {hasChildren && (
                <span className="text-xs">{open === item._id ? "–" : "+"}</span>
              )}
            </div>

            {hasChildren && open === item._id && (
              <div className="pl-4 border-l border-gray-200">
                <RecursiveList
                  items={item.children}
                  translate={translate}
                  router={router}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const CategorySidebar = () => {
  const router = useRouter();
  const { showingTranslateValue } = useUtilsFunction();

  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await CategoryServices.getShowingCategory(),
  });

  if (isLoading) return <Loading loading={isLoading} />;
  if (error) return null;

  const categories = data?.[0]?.children || [];

  return (
    <aside className="hidden md:block w-64 h-screen overflow-y-auto border-r bg-white px-4 py-6 sticky top-0 scrollbar-hide">
      <h3 className="text-base font-semibold mb-4">Categories</h3>
      <RecursiveList
        items={categories}
        translate={showingTranslateValue}
        router={router}
      />
    </aside>
  );
};

export default CategorySidebar;
