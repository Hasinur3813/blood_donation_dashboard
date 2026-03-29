import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export const metadata: Metadata = {
  title: "BloodLink Admin | The Living Ledger",
  description: "Clinical precision dashboard for blood donation management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,-50..200,20..48&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-body text-on-surface flex min-h-screen selection:bg-primary/20 selection:text-primary antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col relative w-[calc(100%-16rem)] overflow-hidden">
          <Topbar />
          <main className="p-8 space-y-10 max-w-[1600px] mx-auto w-full overflow-y-auto h-[calc(100vh-65px)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
