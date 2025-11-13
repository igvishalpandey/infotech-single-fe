import React from "react";

const Tags = ({ product }) => {
  return (
    <>
      {product.tag.length !== 0 && (
        <div className="flex flex-row">
          {JSON.parse(product?.tag).map((t, i) => (
            <span
              key={i + 1}
              className="bg-leather-cream-100 mr-2 border-0 text-leather-charcoal-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Tags;
