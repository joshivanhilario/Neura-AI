import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  metadataBase: new URL("https://neura-ais.vercel.app/"),
};

export default function RootLayout({ children }) {
  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer
          position="top-center"
          autoClose={5000}
        />
      </body>
    </html>
  );
}
