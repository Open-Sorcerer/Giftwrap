import { CreateGiftCard } from "@/components";
import { Metadata } from "next";

export function generateMetadata(): Promise<Metadata> {
  return Promise.resolve({
    title: "Create Gift",
    icons: "/giftStore.png",
  });
}

export default function CreateCard() {
  return <CreateGiftCard />;
}
