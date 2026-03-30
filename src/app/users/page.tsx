"use client";

import { useState } from "react";
import {
  UserPlus,
  SlidersHorizontal,
  TrendingUp,
  ShieldAlert,
  Clock,
  Users,
  Pencil,
  Ban,
  MoreVertical,
  ChevronDown,
  Droplets,
  CheckCircle2,
  // XCircle,
  Activity,
  BadgeCheck,
} from "lucide-react";

const TABS = ["All Users", "Donors", "Requesters", "Administrators"];

const users = [
  {
    id: "BL-9201",
    name: "Marcus Thorne",
    email: "marcus.t@clinical-network.com",
    joined: "Oct 2023",
    role: "Donor",
    badge: {
      label: "O− Negative",
      color: "text-rose-600 bg-rose-50 border-rose-200",
    },
    metric: { label: "Donations", value: 12 },
    activity: "2 hours ago",
    status: "active",
    initials: "MT",
    avatarBg: "from-rose-400 to-red-500",
  },
  {
    id: "BL-8842",
    name: "Sarah Jenkins",
    email: "s.jenkins@hospital.org",
    joined: "Jan 2024",
    role: "Requester",
    badge: {
      label: "Requester",
      color: "text-teal-700 bg-teal-50 border-teal-200",
    },
    metric: { label: "Requests", value: 4 },
    activity: "1 day ago",
    status: "idle",
    initials: "SJ",
    avatarBg: "from-teal-400 to-emerald-500",
  },
  {
    id: "BL-7104",
    name: "Kevin O'Neil",
    email: "k.oneil@mail.com",
    joined: "Aug 2022",
    role: "Donor",
    badge: {
      label: "Blocked",
      color: "text-slate-600 bg-slate-100 border-slate-200",
    },
    metric: { label: "Donations", value: 0 },
    activity: "6 months ago",
    status: "blocked",
    initials: "KO",
    avatarBg: "from-slate-300 to-slate-400",
  },
  {
    id: "BL-6033",
    name: "Priya Sharma",
    email: "p.sharma@medcenter.in",
    joined: "Mar 2024",
    role: "Administrator",
    badge: {
      label: "Admin",
      color: "text-indigo-700 bg-indigo-50 border-indigo-200",
    },
    metric: { label: "Managed", value: 320 },
    activity: "Just now",
    status: "active",
    initials: "PS",
    avatarBg: "from-indigo-400 to-violet-500",
  },
];

const StatusDot = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    active: "bg-emerald-400 shadow-emerald-300",
    idle: "bg-amber-400 shadow-amber-200",
    blocked: "bg-red-500 shadow-red-200",
  };
  return (
    <span
      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white shadow-md ${map[status] ?? "bg-slate-400"}`}
    />
  );
};

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("All Users");

  const filteredUsers =
    activeTab === "All Users"
      ? users
      : users.filter((u) =>
          activeTab === "Administrators"
            ? u.role === "Administrator"
            : u.role === activeTab.slice(0, -1),
        );

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="w-5 h-5 text-rose-500" />
              <span className="text-xs font-bold tracking-widest text-rose-500 uppercase">
                Admin Console
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              User Management
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium max-w-md">
              Oversee the network&apos;s human layer — permissions, roles, and
              clinical integrity.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filter View</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold shadow-md shadow-rose-200 hover:bg-rose-700 transition-all">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Invite User</span>
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Active Connectivity */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Active Connectivity
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                <Activity className="w-3 h-3" />
                REAL-TIME
              </span>
            </div>
            <div className="flex items-end gap-3 mb-5">
              <p className="text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
                1,284
              </p>
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                +12%
              </span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
              <div className="bg-rose-500 w-[45%] rounded-l-full" />
              <div className="bg-teal-400 w-[35%]" />
              <div className="bg-slate-200 flex-1 rounded-r-full" />
            </div>
            <div className="flex flex-wrap gap-4 mt-3">
              {[
                { color: "bg-rose-500", label: "Donors" },
                { color: "bg-teal-400", label: "Requesters" },
                { color: "bg-slate-300", label: "Staff" },
              ].map(({ color, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"
                >
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Pending Verification */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Pending Verification
              </span>
              <BadgeCheck className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-5xl font-extrabold text-slate-900 tracking-tight leading-none mt-6">
              18
            </p>
            <p className="text-sm text-slate-500 mt-4 font-medium leading-relaxed">
              Identity checks required for new donor profiles.
            </p>
          </div>

          {/* Restricted Accounts */}
          <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
                Restricted Accounts
              </span>
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <p className="text-5xl font-extrabold text-rose-600 tracking-tight leading-none mt-6">
              4
            </p>
            <p className="text-sm text-rose-500/80 mt-4 font-medium leading-relaxed cursor-pointer hover:text-rose-700 transition-colors">
              Accounts currently under review or blocked for policy violations.
            </p>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex gap-1 bg-white border border-slate-100 rounded-xl p-1 shadow-sm w-max min-w-full sm:min-w-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── User Table ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden lg:grid grid-cols-[2fr_1.2fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <span>User</span>
            <span>Role</span>
            <span className="text-center">Activity</span>
            <span className="text-center">Last Seen</span>
            <span className="w-28" />
          </div>

          <div className="divide-y divide-slate-50">
            {filteredUsers.length === 0 && (
              <div className="py-16 text-center text-slate-400 text-sm font-medium">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                No users in this category.
              </div>
            )}

            {filteredUsers.map((user) => {
              const isBlocked = user.status === "blocked";
              return (
                <div
                  key={user.id}
                  className={`group transition-colors ${
                    isBlocked
                      ? "bg-slate-50/60 opacity-75"
                      : "hover:bg-slate-50/70"
                  }`}
                >
                  {/* ── Mobile / Tablet Layout ── */}
                  <div className="lg:hidden flex items-start gap-4 p-4 sm:p-5">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className={`w-11 h-11 rounded-full bg-linear-to-br ${user.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow`}
                      >
                        {user.initials}
                      </div>
                      <StatusDot status={user.status} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Name + badge */}
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-sm text-slate-900 truncate">
                          {user.name}
                        </p>
                        <span
                          className={`text-[10px] font-black uppercase border px-2 py-0.5 rounded-full ${user.badge.color}`}
                        >
                          {user.badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {user.email}
                      </p>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-1">
                        {user.id} · Joined {user.joined}
                      </p>

                      {/* Stats row */}
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className="flex items-center gap-1 text-slate-600 font-semibold">
                          <Droplets className="w-3.5 h-3.5 text-rose-400" />
                          {user.metric.value} {user.metric.label}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400 font-medium text-xs">
                          <Clock className="w-3 h-3" />
                          {user.activity}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3">
                        {isBlocked ? (
                          <button className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-rose-700 transition-colors">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Unblock
                          </button>
                        ) : (
                          <>
                            <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition-colors">
                              <Ban className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Desktop Layout ── */}
                  <div className="hidden lg:grid grid-cols-[2fr_1.2fr_1fr_1fr_auto] gap-4 items-center px-6 py-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative shrink-0">
                        <div
                          className={`w-11 h-11 rounded-full bg-linear-to-br ${user.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow`}
                        >
                          {user.initials}
                        </div>
                        <StatusDot status={user.status} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-sm text-slate-900 truncate">
                            {user.name}
                          </p>
                          <span
                            className={`text-[10px] font-black uppercase border px-2 py-0.5 rounded-full shrink-0 ${user.badge.color}`}
                          >
                            {user.badge.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {user.email}
                        </p>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-1">
                          {user.id} · Joined {user.joined}
                        </p>
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
                        {user.role}
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    {/* Metric */}
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {user.metric.label}
                      </p>
                      <p className="text-2xl font-extrabold text-slate-800">
                        {user.metric.value}
                      </p>
                    </div>

                    {/* Last Seen */}
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Last Seen
                      </p>
                      <p className="text-sm font-semibold text-slate-700 flex items-center justify-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-300" />
                        {user.activity}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-1 w-28">
                      {isBlocked ? (
                        <button className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-rose-700 transition-colors shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Unblock
                        </button>
                      ) : (
                        <>
                          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                            <Ban className="w-4 h-4" />
                          </button>
                          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
            <span className="font-medium">
              Showing{" "}
              <strong className="text-slate-700">{filteredUsers.length}</strong>{" "}
              of <strong className="text-slate-700">{users.length}</strong>{" "}
              users
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-100 transition-colors text-xs">
                Previous
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors text-xs shadow-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
