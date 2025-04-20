import Image from "next/image";
import Header from "../components/common/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex items-center justify-center h-screen">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}