import { google } from "@ai-sdk/google";
import { smoothStream, streamText } from "ai";

export const dynamic = "force-dynamic";
export const maxDuration = 35;

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, selectedModel } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format. Must be an array." }),
        { status: 400 }
      );
    }

    const model = selectedModel ? google(selectedModel) : google();

    const result = streamText({
      model,
      system: "You are a helpful assistant",
      messages,
      maxRetries: 3,
      experimental_transform: smoothStream({
        chunking: "word",
      }),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong while processing your request." }),
      { status: 500 }
    );
  }
}
