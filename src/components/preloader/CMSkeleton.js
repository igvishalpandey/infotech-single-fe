import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import parse from "html-react-parser";
import useUtilsFunction from "@hooks/useUtilsFunction";

const CMSkeleton = ({
  html,
  count = 6,
  height = 25,
  loading = false,
  error = null,
  data = null,
  color = "#f9f5f0",
  highlightColor = "#f1d59b",
}) => {
  const { showingTranslateValue } = useUtilsFunction();

  if (loading) {
    return (
      <Skeleton
        count={count}
        height={height}
        baseColor={color}
        highlightColor={highlightColor}
        borderRadius={8}
      />
    );
  }

  if (error) {
    return (
      <span className="text-center mx-auto text-leather-brown font-semibold">
        {error?.response?.data?.message || error?.message}
      </span>
    );
  }

  if (data) {
    return html ? (
      parse(showingTranslateValue(data))
    ) : (
      <span className="text-leather-chocolate">
        {showingTranslateValue(data)}
      </span>
    );
  }

  return null;
};

export default CMSkeleton;
