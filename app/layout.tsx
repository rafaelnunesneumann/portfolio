import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LangProvider } from "@/contexts/LangContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafael Nunes Neumann | Software Developer",
  description:
    "Portfólio profissional de Rafael Nunes Neumann, desenvolvedor de software especializado em soluções web modernas e escaláveis.",
  keywords: ["desenvolvedor", "software", "react", "next.js", "typescript", "portfolio"],
  authors: [{ name: "Rafael Nunes Neumann" }],
  openGraph: {
    title: "Rafael Nunes Neumann | Software Developer",
    description: "Portfólio profissional de Rafael Nunes Neumann",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LangProvider>
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
