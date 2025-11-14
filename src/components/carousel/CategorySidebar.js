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

const CategorySidebar = ({ onPriceRangeChange, priceRange }) => {
  const router = useRouter();
  const { showingTranslateValue } = useUtilsFunction();
  const [localPriceRange, setLocalPriceRange] = useState(
    priceRange || [0, 1000]
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await CategoryServices.getShowingCategory(),
  });

  const handlePriceChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = parseInt(value);

    // Ensure min <= max
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1];
    }

    setLocalPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

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
      <div className="mb-6 p-4 border rounded-lg bg-gray-50 my-2 mt-6">
        <h4 className="text-sm font-semibold mb-3">Price Range</h4>

        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <label className="text-xs text-gray-600">Min</label>
            <input
              type="number"
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="w-full p-1 text-sm border rounded"
              min="0"
              max="1000"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600">Max</label>
            <input
              type="number"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="w-full p-1 text-sm border rounded"
              min="0"
              max="1000"
            />
          </div>
        </div>

        <div className="relative pt-6">
          <div className="relative h-2">
            <div className="absolute w-full h-1 bg-leather-border-light rounded-full"></div>

            <div
              className="absolute h-1 bg-leather-brown rounded-full"
              style={{
                left: `${(localPriceRange[0] / 1000) * 100}%`,
                width: `${
                  ((localPriceRange[1] - localPriceRange[0]) / 1000) * 100
                }%`,
              }}
            ></div>

            <input
              type="range"
              min="0"
              max="1000"
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="absolute w-full h-1 opacity-0 cursor-pointer z-20"
            />

            <input
              type="range"
              min="0"
              max="1000"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="absolute w-full h-1 opacity-0 cursor-pointer z-20"
            />

            <div
              className="absolute w-4 h-4 bg-leather-brown rounded-full border-2 border-leather-white shadow-leather z-10 transform -translate-y-1.5 -translate-x-2"
              style={{ left: `${(localPriceRange[0] / 1000) * 100}%` }}
            ></div>

            <div
              className="absolute w-4 h-4 bg-leather-brown rounded-full border-2 border-leather-white shadow-leather z-10 transform -translate-y-1.5 -translate-x-2"
              style={{ left: `${(localPriceRange[1] / 1000) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-leather-charcoal-600 mt-4">
            <span className="font-medium">{localPriceRange[0]}</span>
            <span className="font-medium">{localPriceRange[1]}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
