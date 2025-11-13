import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = ({ loading }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <ScaleLoader
        color="#8B4513"
        loading={loading}
        height={30}
        width={3}
        radius={3}
        margin={2}
      />
    </div>
  );
};

export default Loading;
