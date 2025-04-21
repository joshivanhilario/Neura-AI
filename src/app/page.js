'use client';

import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import AI from "../components/NeuraAI";
import dynamic from "next/dynamic";
import { getUserIp } from "../lib/getUserIp";

const Floating = dynamic(() => import("../components/common/FloatingBtn"));

export default function pageWrapper() {
  const [userIp, setUserIp] = useState(null);

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const ip = await getUserIp();
        setUserIp(ip);
      } catch (error) {
        console.error("Error fetching user IP:", error);
        setUserIp("0.0.0.0/0");
      }
    };

    fetchUserIp();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex flex-1 mt-4 items-center justify-center">
        {userIp && <AI userIp={userIp} />}
        <Floating />
      </main>
    </div>
  );
}
