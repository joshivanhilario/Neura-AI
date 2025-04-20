"use server";

import { cookies } from "next/headers";

export async function getUserIp() {
  const cookieStore = cookies();
  const ip = cookieStore.get("user-ip")?.value;
  return ip || "default";
}
