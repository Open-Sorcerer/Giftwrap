import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Gift Store",
  description: "Gift storage to your frend, pay on any chain and get deals on FIL",
  icons: "/giftStore.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#1c1c1c]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
