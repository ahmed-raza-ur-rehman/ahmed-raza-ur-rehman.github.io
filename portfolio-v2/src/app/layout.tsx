import type { Metadata } from "next";
import "./globals.css";
import { GlowCursor } from "./components/GlowCursor";

export const metadata: Metadata = {
  title: "Ahmed Raza Ur Rehman | Computer Engineer",
  description: "Building computing from first principles. FPGA, Embedded Systems, PCB Design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <GlowCursor />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
