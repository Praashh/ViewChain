import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./_provider";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";

const aeonik = localFont({
  src: [
    {
      path: "../fonts/Aeonik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Aeonik-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Aeonik-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../fonts/Aeonik-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Aeonik-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../fonts/Aeonik-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-aeonik",
});

export const metadata: Metadata = {
  title: "ViewChain",
  description: "Transparent your assets's views and interactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen antialiased overflow-x-hidden font-primary",
          aeonik.variable
        )}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
