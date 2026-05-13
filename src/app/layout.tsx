import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "@/providers/theme-providers";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garden Nest | Social Platform for Garden Enthusiasts",
  description: "Connect with fellow gardeners, share tips, and explore local garden events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProviders>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProviders>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
