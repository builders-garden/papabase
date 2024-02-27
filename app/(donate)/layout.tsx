import type { Metadata } from "next";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "papabase | Donate",
  description: "Crowdfunding platform for web3 developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="max-w-6xl w-full mx-auto">{children}</section>
    </main>
  );
}
