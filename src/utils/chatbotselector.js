import { useMode } from "../hooks/useMode";

export function useChatbotSelector() {
  const [mode] = useMode();

  const getApiRoute = () => {
    if (mode === "Groq") return "/api/groq-ai";
    if (mode === "Gemini") return "/api/gemini-ai";
    return "/api/groq-ai";
  };

  return { getApiRoute };
}
