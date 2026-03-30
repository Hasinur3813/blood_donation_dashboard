"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Droplet,
  UserSearch,
  HeartHandshake,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  X,
} from "lucide-react";

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleNav = () => {
    onClose?.();
  };

  const navLinks = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Donors", href: "/donors", icon: Users },
    { name: "Blood Requests", href: "/requests", icon: Droplet },
    { name: "Users", href: "/users", icon: UserSearch },
    { name: "Donations", href: "/donations", icon: HeartHandshake },
    { name: "Reports & Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const bottomLinks = [
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside
      id="dashboard-nav"
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 max-w-[min(100vw,20rem)] flex-col gap-y-2 bg-surface-container-low p-4 font-headline text-sm font-medium shadow-xl transition-transform duration-300 ease-out lg:static lg:z-auto lg:max-w-none lg:translate-x-0 lg:shadow-none ${
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="mb-4 px-4 py-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
              <Droplet className="w-5 h-5 fill-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-black leading-none tracking-tight text-on-surface">
                The Living Ledger
              </h1>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Clinical Precision
              </p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface lg:hidden"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto w-full">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={handleNav}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "relative text-primary bg-surface-container hover:bg-surface-container before:absolute before:left-[-16px] before:w-1 before:h-6 before:bg-primary before:rounded-r-full font-bold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-6 border-t border-outline-variant/20 space-y-2">
          {bottomLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleNav}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "relative text-primary bg-surface-container hover:bg-surface-container before:absolute before:left-[-16px] before:w-1 before:h-6 before:bg-primary before:rounded-r-full font-bold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <button
            type="button"
            className="mt-4 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-bold text-error transition-all hover:bg-error-container"
            onClick={handleNav}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
