"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    console.log("Start Recording clicked");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted");
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorder.ondataavailable = async (event) => {
        console.log("Data available from recorder");
        const reader = new FileReader();
        reader.onload = async () => {
          const base64Audio = reader.result.split(",")[1];
          console.log("Audio Base64:", base64Audio);

          try {
            const response = await fetch("/api/transcribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ audioContent: base64Audio }),
            });

            console.log("API Response Status:", response.status);
            if (!response.ok) {
              const errorData = await response.json();
              console.error("Error from API:", errorData);
              return;
            }

            const data = await response.json();
            setTranscript(data.transcript);
          } catch (fetchError) {
            console.error("Fetch error:", fetchError);
          }
        };
        reader.readAsDataURL(event.data);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    console.log("Stop Recording clicked");
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Real-time Audio to Text</h1>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded ${
          isRecording ? "bg-red-500" : "bg-green-500"
        } text-white`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <div className="mt-4 p-2 border rounded">
        <p>{transcript || "Start speaking to see the transcript..."}</p>
      </div>
    </div>
  );
}
