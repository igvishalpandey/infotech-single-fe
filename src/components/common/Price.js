import useUtilsFunction from "@hooks/useUtilsFunction";

const Price = ({
  product,
  price,
  card,
  currency,
  originalPrice,
  primaryTextClasses = "",
  secondaryTextClasses = "",
  showPropPrice = false,
  showPropOriginalPrice = false,
}) => {
  const { getNumberTwo } = useUtilsFunction();

  const displayPrice = showPropPrice
    ? price
    : product?.isCombination
    ? price
    : product?.prices?.price;

  const displayOriginalPrice = showPropOriginalPrice
    ? originalPrice
    : product?.isCombination
    ? originalPrice
    : product?.prices?.originalPrice;
  const hasDiscount = displayOriginalPrice > displayPrice;

  return (
    <div
      className={`font-serif product-price font-bold ${
        card ? "flex items-center justify-between" : "flex flex-row items-center"
      }`}
    >
      <span
        className={`${
          card ? "text-lg font-bold text-gray-900" : "text-2xl text-gray-900"
        }  ${primaryTextClasses}`}
      >
        {currency}
        {getNumberTwo(displayPrice)}
      </span>
      {hasDiscount && (
        <del
          className={`text-sm font-bold text-red-400 ${secondaryTextClasses} ml-${
            card ? 0 : 2
          }`}
        >
          {currency}
          {getNumberTwo(displayOriginalPrice)}
        </del>
      )}
    </div>
  );
};

export default Price;
