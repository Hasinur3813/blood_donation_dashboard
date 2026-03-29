"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/", icon: "dashboard" },
    { name: "Donors", href: "/donors", icon: "group" },
    { name: "Blood Requests", href: "/requests", icon: "bloodtype" },
    { name: "Users", href: "/users", icon: "person_search" },
    { name: "Donations", href: "/donations", icon: "volunteer_activism" },
    { name: "Reports & Analytics", href: "/analytics", icon: "analytics" },
  ];

  const bottomLinks = [
    { name: "Notifications", href: "/notifications", icon: "notifications" },
    { name: "Settings", href: "/settings", icon: "settings" },
  ];

  return (
    <aside className="h-screen sticky left-0 top-0 w-64 bg-surface-container-low flex flex-col p-4 gap-y-2 font-headline text-sm font-medium z-50">
      <div className="px-4 py-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bloodtype</span>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-on-surface leading-none">The Living Ledger</h1>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Clinical Precision</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2 overflow-y-auto w-full">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "relative text-primary bg-surface-container hover:bg-surface-container before:absolute before:left-[-16px] before:w-1 before:h-6 before:bg-primary before:rounded-r-full font-bold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-6 border-t border-outline-variant/20 space-y-2">
          {bottomLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "relative text-primary bg-surface-container hover:bg-surface-container before:absolute before:left-[-16px] before:w-1 before:h-6 before:bg-primary before:rounded-r-full font-bold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
          
          <button className="w-full text-error mt-4 flex items-center gap-3 px-4 py-3 hover:bg-error-container rounded-lg transition-all text-left font-bold">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
