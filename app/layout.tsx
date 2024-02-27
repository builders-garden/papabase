import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "@particle-network/connect-react-ui/dist/index.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "papabase",
  description: "Crowdfunding platform for web3 developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light bg-white">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
