"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";

const FloatingBtn = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://github.com/UjjwalSaini07"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Ujjwal's website"
      className="fixed bottom-4 right-4 md:right-5 z-50"
    >
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          className={`flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg transition-all duration-300 ease-in-out overflow-hidden active:scale-95
            ${
              isHovered
                ? "w-40 md:w-55 h-8 md:h-12 pr-2 justify-center"
                : "w-10 h-10 md:w-14 md:h-14 justify-center"
            }
            rounded-full group`}
          style={{
            boxShadow: isHovered
              ? "0 8px 20px rgba(255, 87, 34, 0.5)"
              : "0 4px 10px rgba(255, 87, 34, 0.3)",
          }}
        >
          {!isHovered ? (
            <Heart
              className={`transition-transform duration-300 ease-in-out ${
                isHovered ? "scale-110 text-white drop-shadow-md" : "scale-100"
              }`}
              size={isHovered ? 28 : 25}
              aria-hidden="true"
            />
          ) : (
            <span
              className={`ml-2 whitespace-nowrap text-sm md:text-base font-semibold transition-all duration-300 ease-in-out ${
                isHovered
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-90 -translate-x-2"
              }`}
            >
              Made with ❤️ by Ujjwal
            </span>
          )}
        </button>
      </div>
    </a>
  );
};

export default FloatingBtn;
