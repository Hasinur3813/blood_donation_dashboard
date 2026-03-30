"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TriangleAlert,
  Send,
  Users,
  UserCheck,
  Activity,
  CircleCheck,
  Download,
  Plus,
  ChevronRight,
  Bell,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

type Urgency = "Emergency" | "Urgent" | "Normal";
type RequestStatus = "Pending" | "Processing" | "Fulfilled";
type AvatarColor = "blue" | "purple" | "slate" | "green";

interface BloodRequest {
  id: string;
  patient: string;
  type: string;
  urgency: Urgency;
  status: RequestStatus;
  time: string;
}

interface Donor {
  name: string;
  initials: string;
  type: string;
  time: string;
  city: string;
  color: AvatarColor;
}

interface ActivityItem {
  boldPart: string;
  restPart: string;
  time: string;
  dotColor: string;
}

interface WeeklyDatum {
  day: string;
  donations: number;
}

interface StatCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  label: string;
  value: string;
  bar?: { width: string; color: string };
  sub?: string;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const REQUESTS: BloodRequest[] = [
  {
    id: "REQ-8429",
    patient: "City General Hospital",
    type: "O-",
    urgency: "Emergency",
    status: "Pending",
    time: "2m ago",
  },
  {
    id: "REQ-8427",
    patient: "Sarah Jenkins",
    type: "A+",
    urgency: "Normal",
    status: "Processing",
    time: "18m ago",
  },
  {
    id: "REQ-8425",
    patient: "Metropolitan Clinic",
    type: "B+",
    urgency: "Urgent",
    status: "Fulfilled",
    time: "1h ago",
  },
  {
    id: "REQ-8420",
    patient: "St. Luke's Hospital",
    type: "AB-",
    urgency: "Urgent",
    status: "Processing",
    time: "2h ago",
  },
  {
    id: "REQ-8418",
    patient: "James Whitfield",
    type: "O+",
    urgency: "Normal",
    status: "Fulfilled",
    time: "3h ago",
  },
];

const DONORS: Donor[] = [
  {
    name: "David Miller",
    initials: "DM",
    type: "O+",
    time: "2 hours ago",
    city: "New York",
    color: "blue",
  },
  {
    name: "Sophia Chen",
    initials: "SC",
    type: "AB-",
    time: "5 hours ago",
    city: "Seattle",
    color: "purple",
  },
  {
    name: "Marcus Thompson",
    initials: "MT",
    type: "A+",
    time: "1 day ago",
    city: "Chicago",
    color: "slate",
  },
  {
    name: "Elena Rodriguez",
    initials: "ER",
    type: "B+",
    time: "1 day ago",
    city: "Miami",
    color: "green",
  },
];

const ACTIVITY: ActivityItem[] = [
  {
    boldPart: "O- shipment dispatched",
    restPart: " to City General Hospital",
    dotColor: "#DC2626",
    time: "3 min ago",
  },
  {
    boldPart: "New donor registered:",
    restPart: " Elena Rodriguez (B+)",
    dotColor: "#16A34A",
    time: "18 min ago",
  },
  {
    boldPart: "Request REQ-8425 fulfilled",
    restPart: " — B+ delivered to Metropolitan Clinic",
    dotColor: "#2563EB",
    time: "1h ago",
  },
  {
    boldPart: "Stock alert:",
    restPart: " B- below 25% threshold",
    dotColor: "#D97706",
    time: "2h ago",
  },
  {
    boldPart: "Drive scheduled:",
    restPart: " Downtown Center on Apr 5",
    dotColor: "#7C3AED",
    time: "3h ago",
  },
];

const WEEKLY_DATA: WeeklyDatum[] = [
  { day: "Mon", donations: 42 },
  { day: "Tue", donations: 58 },
  { day: "Wed", donations: 35 },
  { day: "Thu", donations: 71 },
  { day: "Fri", donations: 63 },
  { day: "Sat", donations: 88 },
  { day: "Sun", donations: 54 },
];

// ─── Config Maps ──────────────────────────────────────────────────────────────

const URGENCY_CONFIG: Record<
  Urgency,
  { bg: string; color: string; dot: string }
> = {
  Emergency: { bg: "#FEF2F2", color: "#DC2626", dot: "#DC2626" },
  Urgent: { bg: "#FFFBEB", color: "#D97706", dot: "#D97706" },
  Normal: { bg: "#F8FAFC", color: "#64748B", dot: "#CBD5E1" },
};

const STATUS_CONFIG: Record<RequestStatus, { bg: string; color: string }> = {
  Pending: { bg: "#EFF6FF", color: "#2563EB" },
  Processing: { bg: "#FFFBEB", color: "#D97706" },
  Fulfilled: { bg: "#F0FDF4", color: "#16A34A" },
};

const AVATAR_CONFIG: Record<AvatarColor, { bg: string; color: string }> = {
  blue: { bg: "#EFF6FF", color: "#2563EB" },
  purple: { bg: "#F5F3FF", color: "#7C3AED" },
  slate: { bg: "#F1F5F9", color: "#475569" },
  green: { bg: "#F0FDF4", color: "#16A34A" },
};

// ─── Sub-Components ───────────────────────────────────────────────────────────

function AlertBanner() {
  const [sent, setSent] = useState(false);

  return (
    <section className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 animate-pulse items-center justify-center rounded-full bg-red-600 text-white">
          <TriangleAlert size={18} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-red-600">
            Critical Supply Shortage: O-Negative
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Stock at 12% — below critical threshold. Immediate dispatch required
            for Central Region.
          </p>
        </div>
      </div>
      <button
        onClick={() => setSent(true)}
        className={`flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold text-white transition-all ${
          sent ? "bg-green-600" : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {sent ? "✓ Alert Sent!" : "Dispatch Alert"}
        {!sent && <Send size={13} />}
      </button>
    </section>
  );
}

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  badge,
  badgeBg,
  badgeColor,
  label,
  value,
  bar,
  sub,
}: StatCardProps) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: iconBg }}
        >
          <Icon size={18} style={{ color: iconColor }} />
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ background: badgeBg, color: badgeColor }}
        >
          {badge}
        </span>
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <h3 className="mt-1 text-3xl font-bold text-slate-800">{value}</h3>
      {bar && (
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full"
            style={{ width: bar.width, background: bar.color }}
          />
        </div>
      )}
      {sub && (
        <p
          className="mt-2.5 text-xs text-slate-400"
          dangerouslySetInnerHTML={{ __html: sub }}
        />
      )}
    </div>
  );
}

function RequestsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h3 className="text-sm font-bold text-slate-800">
          Recent Blood Requests
        </h3>
        <Link
          href="/requests"
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-6 py-3">Patient / Hospital</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Urgency</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {REQUESTS.map((r) => {
              const uConf = URGENCY_CONFIG[r.urgency];
              const sConf = STATUS_CONFIG[r.status];
              return (
                <tr
                  key={r.id}
                  className="cursor-pointer transition-colors hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-800">
                      {r.patient}
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-400">
                      {r.id}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className="rounded px-2 py-0.5 font-mono text-xs font-bold"
                      style={{ background: "#FEF2F2", color: "#DC2626" }}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: uConf.color }}
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: uConf.dot }}
                      />
                      {r.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className="rounded px-2 py-0.5 text-[11px] font-bold"
                      style={{ background: sConf.bg, color: sConf.color }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-400">{r.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DonorList() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h3 className="text-sm font-bold text-slate-800">New Donors</h3>
        <Link
          href="/donors"
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          Manage Directory →
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {DONORS.map((d) => {
          const av = AVATAR_CONFIG[d.color];
          return (
            <div
              key={d.name}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-3 transition-all hover:border-slate-200 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: av.bg, color: av.color }}
                >
                  {d.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {d.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-400">
                    {d.time} · {d.city}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-md border border-slate-200 bg-white px-3 py-1.5">
                  <span className="font-mono text-sm font-bold text-red-600">
                    {d.type}
                  </span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeeklyChart() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h3 className="text-sm font-bold text-slate-800">
          Donations This Week
        </h3>
        <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
          <TrendingUp size={13} />
          +8% vs last week
        </span>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={WEEKLY_DATA}
            barSize={28}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F1F5F9"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "#F8FAFC" }}
              contentStyle={{
                border: "1px solid #E2E8F0",
                borderRadius: 8,
                fontSize: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,.06)",
              }}
              formatter={(value) =>
                value !== undefined ? [`${value} donations`, ""] : ["", ""]
              }
            />
            <Bar dataKey="donations" fill="#FCA5A5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h3 className="text-sm font-bold text-slate-800">Activity Feed</h3>
        <Bell size={15} className="text-slate-400" />
      </div>
      <div className="flex flex-col gap-0 p-5">
        {ACTIVITY.map((a, i) => (
          <div key={i} className="flex gap-3">
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              <div
                className="mt-1 h-2 w-2 shrink-0 rounded-full"
                style={{ background: a.dotColor }}
              />
              {i < ACTIVITY.length - 1 && (
                <div
                  className="mt-1 w-px flex-1 bg-slate-100"
                  style={{ minHeight: 24 }}
                />
              )}
            </div>
            {/* Content */}
            <div className="pb-4">
              <p className="text-xs leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">
                  {a.boldPart}
                </span>
                {a.restPart}
              </p>
              <span className="mt-0.5 block text-[10px] text-slate-400">
                {a.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-5 p-1">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Blood Bank Dashboard
          </h1>
          <p className="mt-0.5 text-xs text-slate-500">
            Central Regional Command — Live Overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            <Download size={13} />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700">
            <Plus size={13} />
            Add Donor
          </button>
        </div>
      </div>

      {/* Emergency Alert */}
      <AlertBanner />

      {/* Summary Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
          badge="+12% vs last month"
          badgeBg="#EFF6FF"
          badgeColor="#2563EB"
          label="Total Donors"
          value="12,842"
          bar={{ width: "75%", color: "#2563EB" }}
        />
        <StatCard
          icon={UserCheck}
          iconBg="#F0FDF4"
          iconColor="#16A34A"
          badge="Active"
          badgeBg="#F0FDF4"
          badgeColor="#16A34A"
          label="Active Donors"
          value="4,291"
          bar={{ width: "50%", color: "#16A34A" }}
        />
        <StatCard
          icon={Activity}
          iconBg="#FEF2F2"
          iconColor="#DC2626"
          badge="High Urgency"
          badgeBg="#FEF2F2"
          badgeColor="#DC2626"
          label="Total Requests"
          value="842"
          sub='<strong style="color:#DC2626">45</strong> pending today'
        />
        <StatCard
          icon={CircleCheck}
          iconBg="#F5F3FF"
          iconColor="#7C3AED"
          badge="94% Success"
          badgeBg="#F5F3FF"
          badgeColor="#7C3AED"
          label="Fulfilled Requests"
          value="792"
          bar={{ width: "94%", color: "#7C3AED" }}
        />
      </section>

      {/* Requests + Donors */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <RequestsTable />
        <DonorList />
      </section>

      {/* Chart + Activity */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <WeeklyChart />
        <ActivityFeed />
      </section>
    </div>
  );
}
