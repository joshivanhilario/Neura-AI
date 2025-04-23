"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let recognition;

    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const interimTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => recognition.stop();
    }
  }, [isListening]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Real-time Audio to Text</h1>
      <button
        onClick={() => setIsListening(!isListening)}
        className={`px-4 py-2 rounded ${
          isListening ? "bg-red-500" : "bg-green-500"
        } text-white`}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <div className="mt-4 p-2 border rounded">
        <p>{transcript || "Start speaking to see the transcript..."}</p>
      </div>
    </div>
  );
}
