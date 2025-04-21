import { useState, useEffect } from "react";

export const useMode = () => {
  const [mode, setMode] = useState("Groq");

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  const updateMode = (newMode) => {
    localStorage.setItem("mode", newMode);
    setMode(newMode);
  };

  return [mode, updateMode];
};
