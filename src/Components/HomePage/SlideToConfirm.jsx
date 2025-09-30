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
        onConfirm(); // call OTP modal
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
      className="relative mt-5 mb-24 bg-black rounded-3xl text-white py-3 flex items-center"
    >
      <div
        className="absolute top-0 left-0 bg-red-700 rounded-full p-4 flex items-center cursor-pointer select-none"
        style={{ transform: `translateX(${sliderPos}px)` }}
        onTouchStart={handleTouchStart}
      >
        <FaChevronRight />
        <FaChevronRight />
      </div>
      <p className="w-full text-center">Slide to confirm delivery</p>
    </div>
  );
}

export default SlideToConfirm;
