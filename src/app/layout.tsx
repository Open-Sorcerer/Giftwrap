import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "./providers";
import { Navbar } from "@/components";
import { Toaster } from "react-hot-toast";

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
      <body className="bg-[url('/background.png')] bg-cover">
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
