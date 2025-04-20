import { groq } from "@ai-sdk/groq";
import { smoothStream, streamText } from "ai";

export const dynamic = "force-dynamic";
export const maxDuration = 35;

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body.messages;
    const selectedModel = body.selectedModel;

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
    console.error(error);
    throw error;
  }
}
