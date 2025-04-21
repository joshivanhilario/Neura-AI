import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Neura-AI",
  description:
    "Experience the next generation of conversational AI 🌟 with this ultra-fast chatbot built using AI SDK, Groq AI, and Gemini AI. Designed for lightning-fast performance and human-like intelligence, this chatbot is perfect for real-time applications",
  metadataBase: new URL("http://http://localhost:3000/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
