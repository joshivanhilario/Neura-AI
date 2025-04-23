import { SpeechClient } from "@google-cloud/speech";
import { Readable } from "stream";

export async function POST(req) {
  try {
    const body = await req.json();
    const { audioContent } = body;

    if (!audioContent) {
      return new Response("No audio content provided", { status: 400 });
    }

    const client = new SpeechClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    const audioBuffer = Buffer.from(audioContent, "base64");

    const request = {
      config: {
        encoding: "WEBM_OPUS",
        sampleRateHertz: 48000,
        languageCode: "en-US",
      },
      audio: {
        content: audioBuffer.toString("base64"),
      },
    };

    const [response] = await client.recognize(request);

    const transcript = response.results
      .map((result) => result.alternatives[0].transcript)
      .join(" ");

    return new Response(JSON.stringify({ transcript }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in transcription:", error);
    return new Response(
      JSON.stringify({ error: "Transcription failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
