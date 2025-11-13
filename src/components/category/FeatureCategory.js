import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

import CategoryServices from "@services/CategoryServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const FeatureCategory = () => {
  const router = useRouter();
  const { setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();
  const swiperRef = useRef(null);

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: CategoryServices.getShowingCategory,
  });

  const handleCategoryClick = useCallback(
    (id, name) => {
      const formatted = name?.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
      router.push(`/search?category=${formatted}&_id=${id}`);
      setIsLoading((prev) => !prev);
    },
    [router, setIsLoading]
  );

  const handlePrevClick = () => {
    if (swiperRef.current) swiperRef.current.slidePrev(1000);
  };

  const handleNextClick = () => {
    if (swiperRef.current) swiperRef.current.slideNext(1000);
  };

  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };

  const renderCategorySlide = (cat) => {
    const name = showingTranslateValue(cat?.name);
    const onClickSlide = () => handleCategoryClick(cat._id, name);

    return (
      <SwiperSlide
        key={cat._id}
        className="!w-auto flex flex-col items-center cursor-pointer"
        onClick={onClickSlide}
      >
        <div className="w-36 h-36 rounded-full flex items-center justify-center bg-white shadow-md hover:shadow-xl transition-all">
          <Image
            src={
              cat.icon ||
              "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
            }
            width={110}
            height={110}
            alt={name}
            className="object-contain"
          />
        </div>
        <p className="text-sm text-center mt-3 font-semibold line-clamp-2">
          {name}
        </p>
      </SwiperSlide>
    );
  };

  if (loading) {
    return <CMSkeleton count={8} height={20} error={error} loading={loading} />;
  }

  const categories = data?.[0]?.children || [];

  return (
    <div className="relative pb-10 px-4">
      <div className="max-w-screen-2xl mx-auto relative">
        <button
          onClick={handlePrevClick}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all"
        >
          <FiChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all"
        >
          <FiChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView="auto"
            spaceBetween={30}
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="category-swiper"
            style={{ transitionTimingFunction: "linear" }}
          >
            {categories.map(renderCategorySlide)}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FeatureCategory;
