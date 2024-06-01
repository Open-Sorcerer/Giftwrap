"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <Image
        className="hidden lg:block absolute top-0 left-0 w-32 md:w-auto z-10"
        src="https://shuffle.dev/saturn-assets/images/headers/star-header-dark.png"
        alt=""
        height={150}
        width={150}
      />
      <div className="flex flex-wrap container p-5 mx-auto xl:px-20 2xl:px-20">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-cyan-200 lg:text-5xl lg:leading-tight 2xl:text-6xl xl:leading-tight">
              Send storage as Gift <br /> Pay on any chain
            </h1>
            <p className="py-5 text-lg leading-normal text-neutral-300 2xl:text-2xl">
              Airdrop your frens a storage on Filecoin. Pay with stables or native token on any
              chain. Redeem your gift card as storage deal.
            </p>
            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <button
                onClick={() => {
                  router.push("create");
                }}
                className="px-10 py-2.5 text-lg font-medium text-center bg-amber-400 hover:bg-amber-500 rounded-3xl"
              >
                Gift now
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src="/hero.png"
              width="500"
              height="500"
              className="object-cover"
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
