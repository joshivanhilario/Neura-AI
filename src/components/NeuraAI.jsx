"use client";
import { useChat } from "ai/react";
import Image from "next/image";
import Markdown from "react-markdown";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Copy, Send, Sparkles } from "lucide-react";
import UserImg from "../assets/UserProfile.png";
import Bot from "../assets/ChatBot.png";

const parseContent = (content) => {
  const thinkRegex = /<think>([\s\S]*?)<\/think>/;
  const match = content.match(thinkRegex);
  if (!match) return { think: null, rest: content.trim() };

  const thinkContent = match[1].trim();
  const restContent = content.replace(thinkRegex, "").trim();
  return { think: thinkContent, rest: restContent };
};

const models = [
  { value: "meta-llama/llama-4-scout-17b-16e-instruct", label: "🦙 Llama 4 Scout - 17B 16e" },
  { value: "mistral-saba-24b", label: "🌪️ Mistral Saba - 24B" },
  { value: "deepseek-r1-distill-llama-70b", label: "🔍 Deepseek R1 Llama - 70B" },
  { value: "meta-llama/llama-4-maverick-17b-128e-instruct", label: "⚡ Llama 4 Maverick - 17B 128e" },
  { value: "llama-3.3-70b-versatile", label: "🦙 Llama 3.3 - 70B Versatile" },
  { value: "gemma2-9b-it", label: "💎 Gemma 2 - 9B IT" },
  { value: "llama-3.1-8b-instant", label: "⚡ Llama 3.1 - 8B Instant" },
  { value: "llama3-70b-8192", label: "🦙 Llama 3 - 70B 8192" },
  { value: "llama3-8b-8192", label: "🦙 Llama 3 - 8B 8192" },
];

const NeuraAI = memo(({ userIp }) => {
  const [selectedModel, setSelectedModel] = useState("llama-3.3-70b-versatile");
  const [responseTimes, setResponseTimes] = useState({});
  const messagesEndRef = useRef(null);
  const startTimeRef = useRef(0);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    error,
  } = useChat({
    body: {
      selectedModel,
    },
    onFinish: (message) => {
      const endTime = Date.now();
      const duration = (endTime - startTimeRef.current) / 1000;
      setResponseTimes((prev) => ({
        ...prev,
        [message.id]: duration,
      }));
    },
  });

  const handleSubmit = useCallback(
    (e) => {
      startTimeRef.current = Date.now();
      originalHandleSubmit(e);
    },
    [originalHandleSubmit]
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      const event = {
        target: { value: suggestion },
      };
      handleInputChange(event);
    },
    [handleInputChange]
  );

  const handleModelChange = useCallback((event) => {
    setSelectedModel(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="flex flex-col h-screen w-full max-w-7xl mx-auto text-neutral-100 px-2 py-2 font-sans">
      <div className="flex-1 mt-20 overflow-y-auto rounded-2xl bg-neutral-900 p-6 border border-neutral-800 shadow-inner">
        {messages.length > 0 ? (
          messages.map((m) => {
            const { think, rest } = parseContent(m.content);
            return (
              <div key={m.id} className="mb-5 mt-2">
                {m.role === "user" ? (
                  <div className="flex items-start gap-4">
                    <Image
                      alt="User profile picture"
                      src={UserImg}
                      width={36}
                      height={36}
                      className="rounded-full shadow-sm"
                    />
                    <div className="bg-neutral-800 rounded-xl px-5 py-2 max-w-3xl shadow-md border border-neutral-300">
                      <p className="text-md md:text-base text-neutral-100 leading-relaxed">
                        {m.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <Image
                      alt="User profile picture"
                      src={Bot}
                      width={36}
                      height={36}
                      className="rounded-full shadow-sm"
                    />
                    <div className="relative bg-neutral-800 border border-neutral-300 p-5 rounded-2xl max-w-7xl shadow-md">
                      <div className="text-neutral-100 text-sm sm:text-base leading-relaxed">
                        {think && (
                          <div className="bg-stone-900 border border-stone-700 rounded-lg p-3 text-orange-400">
                            <p className="font-md mb-1 animate-pulse">
                              Thinking...
                            </p>
                            <Markdown>{think}</Markdown>
                          </div>
                        )}
                        <Markdown>{rest}</Markdown>
                        {responseTimes[m.id] && (
                          <p className="text-xs text-neutral-500 mt-2">
                            ⏱ Response time: {responseTimes[m.id].toFixed(3)}s
                          </p>
                        )}
                      </div>
                      <button
                        title="Copy to clipboard"
                        className="absolute top-3 right-3 p-2 rounded-full bg-neutral-700 hover:bg-orange-600 transition-all text-white"
                        onClick={() => {
                          navigator.clipboard.writeText(m.content);
                          alert("Copied to clipboard");
                        }}
                      >
                        <Copy size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-stone-400">
            <p className="text-xl font-medium mb-2">Start chatting with</p>
            <h1 className="text-4xl font-bold text-orange-500">Groq.AI</h1>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 mt-4 text-orange-400 animate-pulse">
            <Sparkles size={22} />
            <span>Generating...</span>
          </div>
        )}

        {error && (
          <p className="text-red-500 mt-3 font-medium">
            ⚠ Something went wrong. Try again.
          </p>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="mt-3 flex w-full gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide text-sm sm:text-base py-1">
        <select
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          className="min-w-[180px] shrink-0 mr-2 rounded-2xl bg-neutral-800 border border-neutral-700 px-4 py-2 text-neutral-100 focus:ring-1 focus:ring-orange-500 transition"
        >
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => handleSuggestionClick("Make it Shorter and simpler.")}
          className="shrink-0 rounded-full px-4 py-2 bg-neutral-800 border border-neutral-700 hover:bg-orange-600 hover:text-white transition-all"
        >
          Make Shorter
        </button>
        <button
          onClick={() =>
            handleSuggestionClick("Make it longer. explain it nicely")
          }
          className="shrink-0 rounded-full px-4 py-2 bg-neutral-800 border border-neutral-700 hover:bg-orange-600 hover:text-white transition-all"
        >
          Make Longer
        </button>
        <button
          onClick={() =>
            handleSuggestionClick("Write it in a more professional tone.")
          }
          className="shrink-0 rounded-full px-4 py-2 bg-neutral-800 border border-neutral-700 hover:bg-orange-600 hover:text-white transition-all"
        >
          More Professional
        </button>
        <button
          onClick={() =>
            handleSuggestionClick("Write it in a more casual and light tone.")
          }
          className="shrink-0 rounded-full px-4 py-2 bg-neutral-800 border border-neutral-700 hover:bg-orange-600 hover:text-white transition-all"
        >
          More Casual
        </button>
        <button
          onClick={() => handleSuggestionClick("Paraphrase it")}
          className="shrink-0 rounded-full px-4 py-2 bg-neutral-800 border border-neutral-700 hover:bg-orange-600 hover:text-white transition-all"
        >
          Paraphrase
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <textarea
            id="chat-input"
            rows={1}
            value={input}
            required
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full resize-y rounded-xl bg-neutral-800 border border-neutral-500 p-4 pr-24 text-sm text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your prompt here..."
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute bottom-4 right-3 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium flex items-center gap-2 transition-all"
          >
            {isLoading ? (
              <>
                Generating
                <Sparkles size={18} className="animate-pulse" />
              </>
            ) : (
              <>
                Send <Send size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
});

export default NeuraAI;
