import React, { useState, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";

function SlideToConfirm({ onConfirm }) {
  const [sliderPos, setSliderPos] = useState(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    const startX = e.touches[0].clientX;
    const initialPos = sliderPos;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const buttonWidth = 50;
    const maxSlide = containerWidth - buttonWidth;

    const handleTouchMove = (moveEvent) => {
      let newX = moveEvent.touches[0].clientX - startX + initialPos;
      if (newX < 0) newX = 0;
      if (newX > maxSlide) newX = maxSlide;
      setSliderPos(newX);
    };

    const handleTouchEnd = () => {
      if (sliderPos >= maxSlide) {
        setSliderPos(maxSlide);
        onConfirm(); // trigger OTP modal
      } else {
        setSliderPos(0); // reset
      }
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div
      ref={containerRef}
      className="relative mt-5 mb-24 bg-black rounded-3xl text-white py-3 flex items-center overflow-hidden"
    >
      {/* Red fill background */}
      <div
        className="absolute top-0 left-0 bg-red-700 h-full rounded-3xl transition-all duration-100"
        style={{ width: `${sliderPos + 50}px` }} // +50 to fill behind the button
      />
      
      {/* Slider button */}
      <div
        className="absolute top-0 left-0 bg-red-700 rounded-full p-4 flex items-center cursor-pointer select-none z-10"
        style={{ transform: `translateX(${sliderPos}px)` }}
        onTouchStart={handleTouchStart}
      >
        <FaChevronRight />
        <FaChevronRight />
      </div>

      <p className="w-full text-center z-0">Slide to confirm delivery</p>
    </div>
  );
}

export default SlideToConfirm;
