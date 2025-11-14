// hooks/useFilter.js
import { useMemo, useState } from "react";
import { useRouter } from "next/router";

const useFilter = (data, priceRange = [0, 1000]) => {
  const [pending, setPending] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [sortedField, setSortedField] = useState("");
  const router = useRouter();

  const productData = useMemo(() => {
    let services = data;

    if (!services) return [];

    if (router.pathname === "/user/dashboard") {
      const orderPending = services.filter(
        (statusP) => statusP.status === "Pending"
      );
      setPending(orderPending);

      const orderProcessing = services.filter(
        (statusO) => statusO.status === "Processing"
      );
      setProcessing(orderProcessing);

      const orderDelivered = services.filter(
        (statusD) => statusD.status === "Delivered"
      );
      setDelivered(orderDelivered);
    }

    services = services.filter(
      (item) =>
        item.prices?.price >= priceRange[0] &&
        item.prices?.price <= priceRange[1]
    );

    if (sortedField === "Low") {
      services = services.sort((a, b) => a.prices?.price - b.prices?.price);
    }
    if (sortedField === "High") {
      services = services.sort((a, b) => b.prices?.price - a.prices?.price);
    }

    return services;
  }, [sortedField, data, priceRange, router.pathname]);

  return {
    productData,
    pending,
    processing,
    delivered,
    setSortedField,
  };
};

export default useFilter;
