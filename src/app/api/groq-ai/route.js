import { groq } from "@ai-sdk/groq";
import { smoothStream, streamText } from "ai";

export const dynamic = "force-dynamic";
export const maxDuration = 35;

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, selectedModel } = body;

    const result = streamText({
      model: groq(selectedModel || ""),
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
    return new Response(JSON.stringify({ error: "Something went wrong!" }), { status: 500 });
  }
}
