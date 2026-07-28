import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { spaceGrotesk } from "@/data/constants/fonts";
import SmoothScroll from "@/components/smooth-scroll";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "ZIRCON — Zayn Abbas | AI Engineer & Full-Stack Developer",
  description:
    "Award-winning portfolio of Zayn Abbas — an AI Engineer & Full-Stack Developer crafting intelligent digital experiences that bridge creativity and technology.",
  keywords: ["AI Engineer", "Full-Stack Developer", "Portfolio", "Zayn Abbas", "ZIRCON"],
  authors: [{ name: "Zayn Abbas" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} antialiased bg-[#0a0a0a] text-white relative noise-overlay`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
