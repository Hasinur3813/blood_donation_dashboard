import type { Metadata } from "next";
import "./globals.css";
import DashboardShell from "@/components/DashboardShell";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "BloodLink Admin | The Living Ledger",
  description: "Clinical precision dashboard for blood donation management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-background font-body text-on-surface flex min-h-screen min-w-0 selection:bg-primary/20 selection:text-primary antialiased">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
