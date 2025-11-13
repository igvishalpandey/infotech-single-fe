import useUtilsFunction from "@hooks/useUtilsFunction";

const Discount = ({ discount, product, slug, modal, card }) => {
  const { getNumber } = useUtilsFunction();

  const price = product?.isCombination
    ? getNumber(product?.variants?.[0]?.price)
    : getNumber(product?.prices?.price);
  const originalPrice = product?.isCombination
    ? getNumber(product?.variants?.[0]?.originalPrice)
    : getNumber(product?.prices?.originalPrice);

  const discountPercentage =
    originalPrice > 0
      ? getNumber(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const calculatedDiscount = discount || discountPercentage;

  if (calculatedDiscount < 1) return null;

  const getDiscountClasses = () => {
    if (modal) {
      return "absolute text-white text-sm bg-red-500 py-1 px-3 rounded-lg font-bold z-10 left-4 top-4 shadow-md";
    }
    if (card) {
      return "absolute text-white text-sm bg-red-500 px-3 py-1.5 rounded-full font-bold z-10 left-3 top-3 shadow-lg";
    }
    if (slug) {
      return "text-white text-xs bg-red-500 px-3 rounded-lg font-bold z-10 left-0 top-4 shadow-md";
    }
    return "absolute text-white text-xs bg-red-500 py-1.5 px-2.5 rounded-lg font-bold z-10 right-2 top-2 shadow-md";
  };

  return (
    <span className={getDiscountClasses()}>
      {Number(calculatedDiscount).toFixed(0)}%
    </span>
  );
};

export default Discount;
