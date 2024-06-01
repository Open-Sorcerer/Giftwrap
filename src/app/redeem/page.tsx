import { Discover } from "@/components";
import { Metadata } from "next";

export function generateMetadata(): Promise<Metadata> {
  return Promise.resolve({
    title: "Redeem Gift Card",
    icons: "/giftStore.png",
  });
}

export default function Redeem() {
  return <Discover />;
}
