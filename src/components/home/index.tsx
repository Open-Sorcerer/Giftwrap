"use client";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <h1 className="text-3xl font-medium text-white">Welcome to Gift Store</h1>
      <button
        className="w-fit bg-[#46c4ff] hover:bg-sky-400 font-medium px-7 py-2.5 rounded-xl"
        onClick={() => {
          router.push("/create");
        }}
      >
        Gift now
      </button>
    </main>
  );
}
