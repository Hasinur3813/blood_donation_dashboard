"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  Bell,
  Settings,
  ChevronDown,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Clock,
  LogOut,
  UserCircle,
  SlidersHorizontal,
  Dot,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type TopbarProps = {
  mobileMenuOpen?: boolean;
  onMenuClick?: () => void;
};

interface Notification {
  id: string;
  type: "critical" | "warning" | "success" | "info";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

// ── Dummy Data ─────────────────────────────────────────────────────────────────
const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "critical",
    title: "Critical: O− Supply Low",
    body: "City General is below 12% threshold. Auto-routing initiated.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Donation Drive Reminder",
    body: "Upcoming drive at St. Luke's starts in 3 hours.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "3",
    type: "success",
    title: "Transfer Confirmed",
    body: "48 units of AB+ delivered to Memorial Hospital.",
    time: "3 hr ago",
    read: true,
  },
  {
    id: "4",
    type: "info",
    title: "Weekly Report Ready",
    body: "Your Monday digest for March 30 is available.",
    time: "Yesterday",
    read: true,
  },
];

const NOTIFICATION_ICONS: Record<Notification["type"], React.ReactNode> = {
  critical: <Droplets size={15} className="text-red-500" />,
  warning: <AlertTriangle size={15} className="text-amber-500" />,
  success: <CheckCircle2 size={15} className="text-green-500" />,
  info: <Clock size={15} className="text-primary" />,
};

const NOTIFICATION_BG: Record<Notification["type"], string> = {
  critical: "bg-red-50 border-red-100",
  warning: "bg-amber-50 border-amber-100",
  success: "bg-green-50 border-green-100",
  info: "bg-surface-container border-outline-variant/10",
};

// ── Dropdown wrapper ───────────────────────────────────────────────────────────
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return { open, setOpen, ref };
}

// ── Notifications Panel ────────────────────────────────────────────────────────
function NotificationsDropdown() {
  const { open, setOpen, ref } = useDropdown();
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const unread = notes.filter((n) => !n.read).length;

  const markAll = () =>
    setNotes((prev) => prev.map((n) => ({ ...n, read: true })));
  const markOne = (id: string) =>
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={`Notifications — ${unread} unread`}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <Bell size={19} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white ring-2 ring-surface">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 rounded-2xl border border-outline-variant/10 bg-surface shadow-xl shadow-black/8 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-container">
            <div>
              <p className="text-sm font-bold text-on-surface">Notifications</p>
              <p className="text-xs text-on-surface-variant">{unread} unread</p>
            </div>
            {unread > 0 && (
              <button
                onClick={markAll}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <ul className="max-h-80 overflow-y-auto divide-y divide-surface-container">
            {notes.map((n) => (
              <li
                key={n.id}
                onClick={() => markOne(n.id)}
                className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-surface-container/50 ${n.read ? "opacity-60" : ""}`}
              >
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${NOTIFICATION_BG[n.type]}`}
                >
                  {NOTIFICATION_ICONS[n.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-on-surface leading-snug">
                      {n.title}
                    </p>
                    {!n.read && (
                      <Dot
                        size={20}
                        className="text-primary shrink-0 -mt-0.5"
                      />
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                    {n.body}
                  </p>
                  <p className="text-[10px] text-on-surface-variant/60 mt-1 font-medium">
                    {n.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-surface-container">
            <button className="w-full text-center text-xs font-semibold text-primary hover:underline py-1">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── User Menu ──────────────────────────────────────────────────────────────────
function UserMenu() {
  const { open, setOpen, ref } = useDropdown();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 transition-colors hover:bg-surface-container-high focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:gap-2.5 sm:pl-2 sm:pr-3"
        aria-expanded={open}
        aria-label="User menu"
      >
        {/* Avatar */}
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 text-primary sm:h-9 sm:w-9">
          <span className="text-sm font-black">AU</span>
          {/* Online dot */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-surface" />
        </div>

        {/* Name — hidden on small */}
        <div className="hidden text-left sm:block">
          <p className="text-xs font-bold text-on-surface leading-tight">
            Admin User
          </p>
          <p className="text-[10px] font-medium text-on-surface-variant leading-tight">
            Super Admin
          </p>
        </div>

        <ChevronDown
          size={14}
          className={`hidden text-on-surface-variant transition-transform duration-200 sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-outline-variant/10 bg-surface shadow-xl shadow-black/8 overflow-hidden">
          {/* Profile card */}
          <div className="px-4 py-3 border-b border-surface-container bg-surface-container/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-black border-2 border-primary/20">
                AU
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Admin User</p>
                <p className="text-xs text-on-surface-variant">
                  admin@metrohealth.system
                </p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <ul className="py-1.5">
            {[
              { icon: <UserCircle size={15} />, label: "My Profile" },
              { icon: <SlidersHorizontal size={15} />, label: "Preferences" },
              { icon: <Settings size={15} />, label: "System Settings" },
            ].map((item) => (
              <li key={item.label}>
                <button className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-surface-container py-1.5">
            <button className="flex w-full items-center gap-3 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Search Bar ─────────────────────────────────────────────────────────────────
function SearchBar() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div
      className={`group relative min-w-0 flex-1 transition-all duration-200 ${focused ? "max-w-lg" : "max-w-xs sm:max-w-sm"}`}
    >
      <Search
        size={16}
        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused ? "text-primary" : "text-on-surface-variant"} sm:left-4`}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search donors, requests…"
        className={`
          w-full rounded-xl border py-2 pl-9 pr-3 text-sm text-on-surface
          transition-all duration-200 outline-none
          placeholder:text-on-surface-variant/50
          sm:pl-11 sm:pr-4
          ${
            focused
              ? "border-primary/40 bg-surface ring-2 ring-primary/10 shadow-sm"
              : "border-transparent bg-surface-container-high hover:bg-surface-container-highest"
          }
        `}
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// ── Main Topbar ────────────────────────────────────────────────────────────────
export default function Topbar({
  mobileMenuOpen = false,
  onMenuClick,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex w-full shrink-0 items-center justify-between gap-3 border-b border-surface-container bg-surface/80 px-3 py-2.5 antialiased backdrop-blur-md sm:gap-4 sm:px-6">
      {/* ── Left: hamburger + search ── */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-expanded={mobileMenuOpen}
          aria-controls="dashboard-nav"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 lg:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <SearchBar />
      </div>

      {/* ── Right: actions + user ── */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        {/* Notifications */}
        <NotificationsDropdown />

        {/* Settings shortcut */}
        <button
          type="button"
          aria-label="Settings"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Settings size={19} />
        </button>

        {/* Divider */}
        <div className="mx-1 hidden h-6 w-px bg-outline-variant/30 md:block" />

        {/* User menu */}
        <UserMenu />
      </div>
    </header>
  );
}
