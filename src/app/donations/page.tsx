"use client";

import { useState, useMemo } from "react";
import {
  Droplets,
  ClipboardList,
  MapPin,
  TrendingUp,
  CalendarDays,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  Download,
  X,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type Status = "Verified" | "Processing" | "Rejected" | "Pending";
type SortKey = "name" | "date" | "bloodType" | "location" | "status";

interface Donation {
  id: string;
  donorId: string;
  name: string;
  initials: string;
  avatarColor: string;
  date: string;
  time: string;
  bloodType: string;
  location: string;
  sublocation: string;
  status: Status;
  units: number;
}

// ─── Dummy Data ──────────────────────────────────────────────────────────────

const ALL_DONATIONS: Donation[] = [
  {
    id: "DL-9021",
    donorId: "BL-1101",
    name: "Sarah Mitchell",
    initials: "SM",
    avatarColor: "from-rose-400 to-pink-500",
    date: "Oct 24, 2023",
    time: "09:15 AM",
    bloodType: "A+",
    location: "St. Jude's Medical",
    sublocation: "Central Wing, Fl 4",
    status: "Verified",
    units: 450,
  },
  {
    id: "DL-8842",
    donorId: "BL-2204",
    name: "Robert Kincaid",
    initials: "RK",
    avatarColor: "from-teal-400 to-emerald-500",
    date: "Oct 23, 2023",
    time: "02:30 PM",
    bloodType: "O-",
    location: "Community Bank",
    sublocation: "Mobile Unit 4",
    status: "Processing",
    units: 350,
  },
  {
    id: "DL-7731",
    donorId: "BL-3307",
    name: "Elena Chen",
    initials: "EC",
    avatarColor: "from-indigo-400 to-violet-500",
    date: "Oct 22, 2023",
    time: "11:00 AM",
    bloodType: "B+",
    location: "East-Side General",
    sublocation: "Trauma Center",
    status: "Verified",
    units: 500,
  },
  {
    id: "DL-4410",
    donorId: "BL-4401",
    name: "James Donovan",
    initials: "JD",
    avatarColor: "from-slate-400 to-slate-500",
    date: "Oct 22, 2023",
    time: "08:45 AM",
    bloodType: "AB+",
    location: "Metro Health Hub",
    sublocation: "Lab B",
    status: "Rejected",
    units: 0,
  },
  {
    id: "DL-6610",
    donorId: "BL-5502",
    name: "Aisha Okonkwo",
    initials: "AO",
    avatarColor: "from-amber-400 to-orange-500",
    date: "Oct 21, 2023",
    time: "03:00 PM",
    bloodType: "O+",
    location: "Westfield Clinic",
    sublocation: "Donation Suite",
    status: "Verified",
    units: 450,
  },
  {
    id: "DL-5523",
    donorId: "BL-6603",
    name: "Marcus Thorne",
    initials: "MT",
    avatarColor: "from-sky-400 to-blue-500",
    date: "Oct 20, 2023",
    time: "10:30 AM",
    bloodType: "A-",
    location: "Harbor Point Med",
    sublocation: "Floor 2",
    status: "Pending",
    units: 350,
  },
  {
    id: "DL-3398",
    donorId: "BL-7704",
    name: "Priya Sharma",
    initials: "PS",
    avatarColor: "from-fuchsia-400 to-purple-500",
    date: "Oct 19, 2023",
    time: "01:15 PM",
    bloodType: "B-",
    location: "North Creek Hospital",
    sublocation: "Wing C",
    status: "Verified",
    units: 500,
  },
  {
    id: "DL-2271",
    donorId: "BL-8805",
    name: "David Osei",
    initials: "DO",
    avatarColor: "from-lime-400 to-green-500",
    date: "Oct 18, 2023",
    time: "04:00 PM",
    bloodType: "AB-",
    location: "St. Jude's Medical",
    sublocation: "Annex",
    status: "Processing",
    units: 450,
  },
  {
    id: "DL-1144",
    donorId: "BL-9906",
    name: "Yuki Tanaka",
    initials: "YT",
    avatarColor: "from-rose-300 to-red-400",
    date: "Oct 17, 2023",
    time: "09:00 AM",
    bloodType: "O+",
    location: "Riverside Clinic",
    sublocation: "Bay 3",
    status: "Verified",
    units: 350,
  },
  {
    id: "DL-0987",
    donorId: "BL-0007",
    name: "Liam Brennan",
    initials: "LB",
    avatarColor: "from-cyan-400 to-teal-500",
    date: "Oct 16, 2023",
    time: "11:45 AM",
    bloodType: "A+",
    location: "Downtown Donor Hub",
    sublocation: "Hall A",
    status: "Rejected",
    units: 0,
  },
  {
    id: "DL-0854",
    donorId: "BL-1108",
    name: "Fatima Al-Hassan",
    initials: "FA",
    avatarColor: "from-orange-400 to-red-500",
    date: "Oct 15, 2023",
    time: "02:00 PM",
    bloodType: "O-",
    location: "East-Side General",
    sublocation: "Suite 12",
    status: "Verified",
    units: 500,
  },
  {
    id: "DL-0731",
    donorId: "BL-2209",
    name: "Carlos Rivera",
    initials: "CR",
    avatarColor: "from-emerald-400 to-teal-500",
    date: "Oct 14, 2023",
    time: "10:00 AM",
    bloodType: "B+",
    location: "Harbor Point Med",
    sublocation: "Basement Unit",
    status: "Pending",
    units: 450,
  },
];

const PAGE_SIZE = 6;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<Status, { icon: React.ReactNode; pill: string }> = {
  Verified: {
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    pill: "text-emerald-700 bg-emerald-50 border border-emerald-200",
  },
  Processing: {
    icon: <Clock3 className="w-3.5 h-3.5" />,
    pill: "text-amber-700  bg-amber-50  border border-amber-200",
  },
  Pending: {
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    pill: "text-sky-700    bg-sky-50    border border-sky-200",
  },
  Rejected: {
    icon: <XCircle className="w-3.5 h-3.5" />,
    pill: "text-red-700    bg-red-50    border border-red-200",
  },
};

const BLOOD_COLORS: Record<string, string> = {
  "A+": "bg-rose-100 text-rose-700 border-rose-200",
  "A-": "bg-rose-50  text-rose-600 border-rose-200",
  "B+": "bg-amber-100 text-amber-700 border-amber-200",
  "B-": "bg-amber-50  text-amber-600 border-amber-200",
  "O+": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "O-": "bg-red-100 text-red-700 border-red-200",
  "AB+": "bg-violet-100 text-violet-700 border-violet-200",
  "AB-": "bg-violet-50  text-violet-600 border-violet-200",
};

function StatusPill({ status }: { status: Status }) {
  const { icon, pill } = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${pill}`}
    >
      {icon}
      {status}
    </span>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({
  donation,
  onClose,
}: {
  donation: Donation;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div className={`h-1.5 bg-linear-to-r ${donation.avatarColor}`} />

        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-linear-to-br ${donation.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
              >
                {donation.initials}
              </div>
              <div>
                <p className="font-extrabold text-lg text-slate-900">
                  {donation.name}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  Donor ID: {donation.donorId}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Record ID", value: `#${donation.id}` },
              {
                label: "Blood Type",
                value: donation.bloodType,
                special: "blood",
              },
              { label: "Date", value: donation.date },
              { label: "Time", value: donation.time },
              {
                label: "Units",
                value: donation.units > 0 ? `${donation.units} ml` : "—",
              },
              { label: "Status", value: donation.status, special: "status" },
              { label: "Location", value: donation.location },
              { label: "Sub-location", value: donation.sublocation },
            ].map(({ label, value, special }) => (
              <div
                key={label}
                className="bg-slate-50 rounded-xl p-3 border border-slate-100"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                  {label}
                </p>
                {special === "status" ? (
                  <StatusPill status={value as Status} />
                ) : special === "blood" ? (
                  <span
                    className={`inline-flex items-center justify-center px-2 py-0.5 rounded-lg text-sm font-black border ${BLOOD_COLORS[value] ?? "bg-slate-100 text-slate-700"}`}
                  >
                    {value}
                  </span>
                ) : (
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
            <button className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200">
              Edit Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Donations() {
  const [filter, setFilter] = useState<"All Time" | "Pending" | "Verified">(
    "All Time",
  );
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Donation | null>(null);

  // Filter + search + sort
  const processed = useMemo(() => {
    let list = ALL_DONATIONS.filter((d) => {
      if (filter === "Pending")
        return d.status === "Pending" || d.status === "Processing";
      if (filter === "Verified") return d.status === "Verified";
      return true;
    }).filter(
      (d) =>
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase()) ||
        d.bloodType.toLowerCase().includes(search.toLowerCase()),
    );

    list = [...list].sort((a, b) => {
      let va: string | number = "";
      let vb: string | number = "";
      if (sortKey === "name") {
        va = a.name;
        vb = b.name;
      }
      if (sortKey === "date") {
        va = a.id;
        vb = b.id;
      } // id is sequential proxy
      if (sortKey === "bloodType") {
        va = a.bloodType;
        vb = b.bloodType;
      }
      if (sortKey === "location") {
        va = a.location;
        vb = b.location;
      }
      if (sortKey === "status") {
        va = a.status;
        vb = b.status;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [filter, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
  const pageData = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(
    () => ({
      units: ALL_DONATIONS.filter((d) => d.status === "Verified").reduce(
        (s, d) => s + d.units,
        0,
      ),
      pending: ALL_DONATIONS.filter(
        (d) => d.status === "Processing" || d.status === "Pending",
      ).length,
      locations: [...new Set(ALL_DONATIONS.map((d) => d.location))].length,
    }),
    [],
  );

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronDown className="w-3 h-3 opacity-30" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-rose-500" />
    ) : (
      <ChevronDown className="w-3 h-3 text-rose-500" />
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="w-4 h-4 text-rose-500" />
              <span className="text-[10px] font-bold tracking-widest text-rose-500 uppercase">
                Central Registry
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              Donations Ledger
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium max-w-md">
              Maintaining clinical precision in the flow of life-saving units
              across the network.
            </p>
          </div>

          {/* Filter toggle */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm shrink-0">
            {(["All Time", "Pending", "Verified"] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  filter === f
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                <TrendingUp className="w-3 h-3" /> +12.4%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-400 mb-1">
              Total Verified Units
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {stats.units.toLocaleString()}
              </span>
              <span className="text-slate-400 font-medium text-sm">ml</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-200">
                Priority
              </span>
            </div>
            <p className="text-sm font-medium text-slate-400 mb-1">
              Pending Verification
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {stats.pending}
              </span>
              <span className="text-slate-400 font-medium text-sm">
                records
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-400 mb-1">
              Active Locations
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {stats.locations}
              </span>
              <span className="text-slate-400 font-medium text-sm">
                centers
              </span>
            </div>
          </div>
        </div>

        {/* ── Ledger ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-extrabold text-lg text-slate-900">
              Recent Activity
            </h3>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all w-44 sm:w-56"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Date range pill (decorative) */}
              <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                <span className="hidden lg:inline text-xs">
                  Oct 01 – Oct 31, 2023
                </span>
              </button>

              {/* Export */}
              <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">Export</span>
              </button>
            </div>
          </div>

          {/* Desktop Column Headers */}
          <div className="hidden lg:grid grid-cols-[2fr_1.2fr_0.8fr_1.4fr_1fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100">
            {(
              [
                { label: "Donor", key: "name" },
                { label: "Date & Time", key: "date" },
                { label: "Blood Type", key: "bloodType" },
                { label: "Location", key: "location" },
                { label: "Status", key: "status" },
              ] as { label: string; key: SortKey }[]
            ).map(({ label, key }) => (
              <button
                key={key}
                onClick={() => toggleSort(key)}
                className="flex items-center gap-1 text-[11px] uppercase tracking-widest font-bold text-slate-400 hover:text-slate-700 transition-colors"
              >
                {label} <SortIcon col={key} />
              </button>
            ))}
            <div className="w-8" />
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-50">
            {pageData.length === 0 && (
              <div className="py-16 text-center">
                <SlidersHorizontal className="w-10 h-10 mx-auto mb-3 text-slate-200" />
                <p className="text-slate-400 text-sm font-medium">
                  No records match your filters.
                </p>
              </div>
            )}

            {pageData.map((d) => {
              const isRejected = d.status === "Rejected";
              return (
                <div
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className={`group cursor-pointer transition-colors hover:bg-slate-50/80 ${isRejected ? "opacity-60" : ""}`}
                >
                  {/* ── Mobile card ── */}
                  <div className="lg:hidden flex items-start gap-4 p-4 sm:p-5">
                    <div
                      className={`w-10 h-10 rounded-full shrink-0 bg-linear-to-br ${d.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow`}
                    >
                      {d.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p
                          className={`font-bold text-sm text-slate-900 ${isRejected ? "line-through" : ""}`}
                        >
                          {d.name}
                        </p>
                        <span
                          className={`text-[10px] font-black uppercase border px-2 py-0.5 rounded-lg ${BLOOD_COLORS[d.bloodType] ?? "bg-slate-100 text-slate-600"}`}
                        >
                          {d.bloodType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">#{d.id}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <CalendarDays className="w-3 h-3" /> {d.date} ·{" "}
                          {d.time}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" /> {d.location}
                        </span>
                      </div>
                      <div className="mt-2">
                        <StatusPill status={d.status} />
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 mt-1" />
                  </div>

                  {/* ── Desktop row ── */}
                  <div className="hidden lg:grid grid-cols-[2fr_1.2fr_0.8fr_1.4fr_1fr_auto] gap-4 items-center px-6 py-4">
                    {/* Donor */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 shrink-0 rounded-full bg-linear-to-br ${d.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow`}
                      >
                        {d.initials}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`font-bold text-sm text-slate-900 truncate ${isRejected ? "line-through" : ""}`}
                        >
                          {d.name}
                        </p>
                        <p
                          className={`text-[11px] mt-0.5 truncate ${isRejected ? "text-red-400" : "text-slate-400"}`}
                        >
                          #{d.id}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <p
                        className={`text-sm font-medium ${isRejected ? "line-through text-slate-400" : "text-slate-800"}`}
                      >
                        {d.date}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {d.time}
                      </p>
                    </div>

                    {/* Blood Type */}
                    <div>
                      <span
                        className={`inline-flex items-center justify-center w-10 h-8 rounded-lg text-xs font-black border ${BLOOD_COLORS[d.bloodType] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
                      >
                        {d.bloodType}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {d.location}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {d.sublocation}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <StatusPill status={d.status} />
                    </div>

                    {/* Action */}
                    <div className="w-8 flex justify-center">
                      <ExternalLink className="w-4 h-4 text-slate-200 group-hover:text-slate-500 transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Pagination ── */}
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <span className="text-slate-400 font-medium">
              Showing{" "}
              <strong className="text-slate-700">
                {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, processed.length)}
              </strong>{" "}
              of <strong className="text-slate-700">{processed.length}</strong>{" "}
              records
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl border text-sm font-semibold transition-colors ${
                    p === page
                      ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <DetailModal donation={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
