import Image from "next/image";
import Header from "../components/common/Header";
import AI from "../components/NeuraAI";
import dynamic from "next/dynamic";
import { getUserIp } from "../lib/getUserIp";

const Floating = dynamic(() => import("../components/common/FloatingBtn"));

export default async function Home() {
  const userIp = await getUserIp();
  return (
    <div>
      <Header />
      <main className="flex items-center bg-black justify-center h-screen">
        <>
          <AI userIp={userIp} />
        </>
      </main>
    </div>
  );
}