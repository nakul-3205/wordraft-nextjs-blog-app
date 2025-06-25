import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomSessionProvider from "@/components/session-provider";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
// import { getServerSession } from 'next-auth';
// import { authOptions } from "@/lib/auth";

// const session=await getServerSession(authOptions)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wordraft",
  description: "A full-stack blogging platform by Nakul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <CustomSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
             {/* {session && <Navbar />} */}
            <main className="pt-20 px-4">{children}</main>
            
          </ThemeProvider>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
