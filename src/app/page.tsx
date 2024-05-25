import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Welcome to Gift Store</h1>
      <ConnectButton />
    </main>
  );
}
