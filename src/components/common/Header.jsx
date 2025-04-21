'use client';

import { useState, useEffect } from "react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '900'] });

const Header = () => {
  const [mode, setMode] = useState("Groq");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem("mode", newMode);
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full flex fixed justify-center z-50">
      <div className="bg-black rounded-full w-full max-w-full mt-1 mx-4 px-5 py-2 flex items-center justify-between shadow-xl">
        <h1 className={`${orbitron.className} text-white font-extrabold text-xl sm:text-2xl tracking-wider`}>
          NEURA<span className="text-white">-AI</span>
        </h1>

        <div className="flex items-center space-x-4">
          <div className="flex bg-black rounded-full px-1 py-1 border border-gray-600 shadow-md">
            {["Groq", "Gemini"].map((item) => (
              <button
                key={item}
                onClick={() => handleModeChange(item)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${
                  mode === item
                    ? "bg-white text-black shadow-xl transform scale-105"
                    : "text-white hover:bg-gray-900"
                }`}
              >
                <span>{item}</span>
                {mode === item && (
                  <span className="w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
          {/* <button
            aria-label="Menu"
            onClick={toggleMenu}
            className="flex flex-col justify-between items-center w-7 h-7 sm:w-8 sm:h-8 cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out relative"
          >
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 absolute top-0' : ''}`}></span>
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 absolute bottom-0' : ''}`}></span>
          </button> */}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-6 bg-white p-2 mt-7 rounded-lg shadow-lg flex flex-col items-center transition-all duration-300 ease-in-out transform opacity-100 z-40">
          <button className={`${orbitron.className} text-[#0F1113] text-lg font-semibold hover:bg-gray-200 px-4 py-2 rounded-full w-full text-center transition-all duration-300 ease-in-out`}>
            About
          </button>
          <button className={`${orbitron.className} text-[#0F1113] text-lg font-semibold hover:bg-gray-200 px-4 py-2 rounded-full w-full text-center transition-all duration-300 ease-in-out`}>
            Contact
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
