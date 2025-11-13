import React from "react";
import Link from "next/link";
import Image from "next/image";

//internal import
import { ctaCardData } from "@utils/data";

const Card = () => {
  const renderCard = (item) => {
    return (
      <div
        key={item.id}
        className="mx-auto w-full relative rounded-leather overflow-hidden transition ease-out duration-400 delay-150 transform hover:shadow-leather-lg"
      >
        <Link href={item.url} className="block">
          <Image
            width={550}
            height={234}
            src={item.image}
            alt={item.title}
            priority
            className="object-cover"
          />
          <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full text-center justify-center">
            <div className="pt-4">
              <h2 className="font-serif text-base sm:text-lg md:text-lg lg:text-lg font-semibold text-leather-white">
                {item.title} <br />
                <span className="text-lg sm:text-2xl md:text-2xl lg:text-2xl font-bold text-leather-white">
                  {item.subTitle}
                </span>
              </h2>
              <p className="text-sm font-sans text-leather-cream-100">
                Weekend discount offer
              </p>
              <button className="hidden sm:block lg:block text-xs mx-auto leading-6 font-serif font-medium mt-4 px-4 py-1 bg-leather-brown text-center rounded-leather text-leather-white hover:bg-leather-brown-600">
                Shop Now
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return <>{ctaCardData.map(renderCard)}</>;
};

export default Card;
