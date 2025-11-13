import NextImage from "next/image";
import { useImageZoom } from "@hooks/useImageZoom";

const ImageZoom = ({ src, alt = "Product Image", zoomScale = 2.5 }) => {
  const {
    showZoom,
    lensPos,
    zoomPos,
    containerRef,
    lensRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useImageZoom();

  return (
    <div className="w-full">
      <div className="relative inline-block w-full">
        <div
          ref={containerRef}
          className="relative w-full h-96 border-2 border-gray-300 overflow-hidden bg-white cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="object-contain select-none"
              draggable={false}
              priority
              style={{ pointerEvents: "none" }}
            />
          </div>
          {showZoom && (
            <div
              className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"
              style={{ zIndex: 5 }}
            />
          )}

          {showZoom && (
            <div
              ref={lensRef}
              className="absolute w-24 h-24 border-2 border-orange-500 bg-white bg-opacity-40 pointer-events-none"
              style={{
                left: `${lensPos.x}px`,
                top: `${lensPos.y}px`,
                zIndex: 10,
              }}
            />
          )}
        </div>
        {showZoom && (
          <div
            className="hidden lg:block absolute border-3 border-gray-400 bg-white shadow-2xl"
            style={{
              left: "calc(100% + 20px)",
              top: 0,
              width: "500px",
              height: "500px",
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoomScale * 100}%`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundRepeat: "no-repeat",
              zIndex: 100,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageZoom;
