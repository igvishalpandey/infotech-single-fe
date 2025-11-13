import React from "react";
import { FiTruck } from "react-icons/fi";

const InputShipping = ({
  register,
  value,
  time,
  cost,
  currency,
  description,
  handleShippingCost,
}) => {
  return (
    <div>
      <div className="p-3 card border border-gray-200 bg-white rounded-leather">
        <label className="cursor-pointer label">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3 text-leather-charcoal-600">
                <FiTruck />
              </span>
              <div>
                <h6 className="font-serif font-medium text-sm text-leather-charcoal-600">
                  {value}
                </h6>
                <p className="text-xs text-leather-charcoal-600 font-medium">
                  {description}
                  <span className="font-medium text-leather-charcoal-600">
                    {currency}
                    {parseFloat(cost).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            <input
              onClick={() => handleShippingCost(cost)}
              {...register(`shippingOption`, {
                required: `Shipping Option is required!`,
              })}
              name="shippingOption"
              type="radio"
              value={value}
              className="form-radio outline-none focus:ring-0 text-leather-brown"
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default InputShipping;
