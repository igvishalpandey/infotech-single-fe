import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RenderStars = ({ rating, size = 16, className = "" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar
          key={`full-${index}`}
          size={size}
          className="text-yellow-400 fill-current"
        />
      ))}

      {hasHalfStar && (
        <FaStarHalfAlt size={size} className="text-yellow-400 fill-current" />
      )}

      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar
          key={`empty-${index}`}
          size={size}
          className="text-yellow-400 fill-current"
        />
      ))}
    </div>
  );
};

export default RenderStars;
