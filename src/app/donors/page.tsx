"use client";

import { useState, useMemo } from "react";
import {
  UserPlus,
  Users,
  UserCheck,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BloodGroup = "O+" | "O-" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-";

type DonorStatus = "Available" | "Busy" | "Inactive";

interface Donor {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  bloodGroup: BloodGroup;
  location: string;
  lastDonation: string;
  status: DonorStatus;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const ALL_DONORS: Donor[] = [
  {
    id: "#BL-8821",
    name: "Julian Black",
    initials: "JB",
    avatarBg: "#F1F5F9",
    avatarColor: "#475569",
    bloodGroup: "O+",
    location: "Downtown Clinic",
    lastDonation: "Oct 12, 2023",
    status: "Available",
  },
  {
    id: "#BL-7204",
    name: "Elena Rodriguez",
    initials: "ER",
    avatarBg: "#F5F3FF",
    avatarColor: "#7C3AED",
    bloodGroup: "AB-",
    location: "North General",
    lastDonation: "Jan 04, 2024",
    status: "Busy",
  },
  {
    id: "#BL-9910",
    name: "Marcus Chen",
    initials: "MC",
    avatarBg: "#EFF6FF",
    avatarColor: "#2563EB",
    bloodGroup: "B+",
    location: "Westside Medical",
    lastDonation: "Nov 28, 2023",
    status: "Available",
  },
  {
    id: "#BL-4456",
    name: "Sarah Miller",
    initials: "SM",
    avatarBg: "#FEF2F2",
    avatarColor: "#DC2626",
    bloodGroup: "A-",
    location: "Downtown Clinic",
    lastDonation: "Feb 10, 2024",
    status: "Available",
  },
  {
    id: "#BL-3312",
    name: "David Okafor",
    initials: "DO",
    avatarBg: "#F0FDF4",
    avatarColor: "#16A34A",
    bloodGroup: "O-",
    location: "East Side Hospital",
    lastDonation: "Mar 02, 2024",
    status: "Available",
  },
  {
    id: "#BL-5501",
    name: "Priya Nair",
    initials: "PN",
    avatarBg: "#FFFBEB",
    avatarColor: "#D97706",
    bloodGroup: "A+",
    location: "North General",
    lastDonation: "Dec 15, 2023",
    status: "Busy",
  },
  {
    id: "#BL-6678",
    name: "Thomas Brewer",
    initials: "TB",
    avatarBg: "#F1F5F9",
    avatarColor: "#475569",
    bloodGroup: "B-",
    location: "Westside Medical",
    lastDonation: "Sep 29, 2023",
    status: "Inactive",
  },
  {
    id: "#BL-2290",
    name: "Aisha Kamara",
    initials: "AK",
    avatarBg: "#FEF2F2",
    avatarColor: "#DC2626",
    bloodGroup: "O+",
    location: "Downtown Clinic",
    lastDonation: "Jan 22, 2024",
    status: "Available",
  },
  {
    id: "#BL-1183",
    name: "Liam Foster",
    initials: "LF",
    avatarBg: "#EFF6FF",
    avatarColor: "#2563EB",
    bloodGroup: "AB+",
    location: "Central Lab",
    lastDonation: "Feb 28, 2024",
    status: "Available",
  },
  {
    id: "#BL-7799",
    name: "Nadia Petrov",
    initials: "NP",
    avatarBg: "#F5F3FF",
    avatarColor: "#7C3AED",
    bloodGroup: "A-",
    location: "North General",
    lastDonation: "Mar 10, 2024",
    status: "Busy",
  },
  {
    id: "#BL-8840",
    name: "Carlos Mendez",
    initials: "CM",
    avatarBg: "#F0FDF4",
    avatarColor: "#16A34A",
    bloodGroup: "B+",
    location: "East Side Hospital",
    lastDonation: "Oct 05, 2023",
    status: "Available",
  },
  {
    id: "#BL-3357",
    name: "Sophie Laurent",
    initials: "SL",
    avatarBg: "#FFFBEB",
    avatarColor: "#D97706",
    bloodGroup: "O-",
    location: "Central Lab",
    lastDonation: "Nov 11, 2023",
    status: "Inactive",
  },
];

const BLOOD_GROUPS: BloodGroup[] = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];
const LOCATIONS = [
  "Downtown Clinic",
  "North General",
  "Westside Medical",
  "East Side Hospital",
  "Central Lab",
];
const STATUSES: DonorStatus[] = ["Available", "Busy", "Inactive"];

const ITEMS_PER_PAGE = 8;

// ─── Config Maps ──────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  DonorStatus,
  { dot: string; label: string; color: string }
> = {
  Available: { dot: "#16A34A", label: "Available", color: "#15803D" },
  Busy: { dot: "#94A3B8", label: "Busy", color: "#64748B" },
  Inactive: { dot: "#FCA5A5", label: "Inactive", color: "#DC2626" },
};

const BLOOD_COLOR: Record<BloodGroup, { bg: string; color: string }> = {
  "O+": { bg: "#FEF2F2", color: "#DC2626" },
  "O-": { bg: "#FEF2F2", color: "#DC2626" },
  "A+": { bg: "#EFF6FF", color: "#2563EB" },
  "A-": { bg: "#EFF6FF", color: "#2563EB" },
  "B+": { bg: "#F0FDF4", color: "#16A34A" },
  "B-": { bg: "#F0FDF4", color: "#16A34A" },
  "AB+": { bg: "#F5F3FF", color: "#7C3AED" },
  "AB-": { bg: "#F5F3FF", color: "#7C3AED" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBloodGroup(g: BloodGroup) {
  return g.replace("+", " Positive").replace("-", " Negative");
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

interface SelectDropdownProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
}

function SelectDropdown({
  // label,
  icon,
  options,
  value,
  onChange,
  allLabel,
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const display = value || allLabel;

  return (
    <div className="relative flex-1 min-w-[140px]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300"
      >
        <span className="flex items-center gap-2 truncate">
          {icon}
          <span className="truncate">{display}</span>
        </span>
        <ChevronDown size={14} className="shrink-0 text-slate-400" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-full rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          <button
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-slate-400 hover:bg-slate-50"
          >
            {allLabel}
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm transition hover:bg-slate-50 ${
                value === opt ? "font-semibold text-red-600" : "text-slate-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Donors() {
  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState<BloodGroup | "">("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<DonorStatus | "">("");
  const [page, setPage] = useState(1);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const filtered = useMemo(() => {
    return ALL_DONORS.filter((d) => {
      const q = search.toLowerCase();
      if (
        q &&
        !d.name.toLowerCase().includes(q) &&
        !d.id.toLowerCase().includes(q)
      )
        return false;
      if (bloodFilter && d.bloodGroup !== bloodFilter) return false;
      if (locationFilter && d.location !== locationFilter) return false;
      if (statusFilter && d.status !== statusFilter) return false;
      return true;
    });
  }, [search, bloodFilter, locationFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const clearFilters = () => {
    setSearch("");
    setBloodFilter("");
    setLocationFilter("");
    setStatusFilter("");
    setPage(1);
  };

  const hasFilters = search || bloodFilter || locationFilter || statusFilter;

  const activeCount = ALL_DONORS.filter((d) => d.status === "Available").length;

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Donor Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor and manage donors. Keep the registry accurate and ready for
            critical requests.
          </p>
        </div>
        <button
          onClick={() => setShowRegisterModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 sm:w-auto"
        >
          <UserPlus size={16} />
          Register New Donor
        </button>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-400">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <Users size={17} className="text-blue-600" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Total Donors
            </p>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-900">1,284</h3>
            <span className="mb-1 text-xs font-bold text-blue-600">+12%</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-400">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <UserCheck size={17} className="text-emerald-600" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Active Now
            </p>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-900">{activeCount}</h3>
            <span className="mb-1.5 h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </section>

      {/* ── Search + Filters ───────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Search */}
        <div className="relative mb-3">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by name or ID…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-2">
          <SelectDropdown
            label="Blood Group"
            icon={<SlidersHorizontal size={14} className="text-slate-400" />}
            options={BLOOD_GROUPS}
            value={bloodFilter}
            onChange={(v) => {
              setBloodFilter(v as BloodGroup | "");
              setPage(1);
            }}
            allLabel="All Blood Groups"
          />
          <SelectDropdown
            label="Location"
            icon={<MapPin size={14} className="text-slate-400" />}
            options={LOCATIONS}
            value={locationFilter}
            onChange={(v) => {
              setLocationFilter(v);
              setPage(1);
            }}
            allLabel="All Locations"
          />
          <SelectDropdown
            label="Status"
            icon={<UserCheck size={14} className="text-slate-400" />}
            options={STATUSES}
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v as DonorStatus | "");
              setPage(1);
            }}
            allLabel="All Statuses"
          />
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 shadow-sm transition hover:text-red-600"
            >
              <X size={13} /> Clear
            </button>
          )}
        </div>
      </section>

      {/* ── Donor Table ────────────────────────────────────────────────────── */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {[
                  "Donor Name",
                  "Blood Group",
                  "Location",
                  "Last Donation",
                  "Status",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center text-sm text-slate-400"
                  >
                    No donors match your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((d) => {
                  const sc = STATUS_CONFIG[d.status];
                  const bc = BLOOD_COLOR[d.bloodGroup];
                  return (
                    <tr
                      key={d.id}
                      className="cursor-pointer transition-colors hover:bg-slate-50 group"
                    >
                      {/* Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                            style={{
                              background: d.avatarBg,
                              color: d.avatarColor,
                            }}
                          >
                            {d.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {d.name}
                            </p>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {d.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* Blood Group */}
                      <td className="px-6 py-4">
                        <span
                          className="rounded-full px-3 py-1 font-mono text-xs font-bold"
                          style={{ background: bc.bg, color: bc.color }}
                        >
                          {formatBloodGroup(d.bloodGroup)}
                        </span>
                      </td>
                      {/* Location */}
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin
                            size={13}
                            className="shrink-0 text-slate-400"
                          />
                          {d.location}
                        </span>
                      </td>
                      {/* Last Donation */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {d.lastDonation}
                      </td>
                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className="flex items-center gap-2 text-sm font-semibold"
                          style={{ color: sc.color }}
                        >
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: sc.dot }}
                          />
                          {sc.label}
                        </span>
                      </td>
                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 opacity-0 transition hover:border-red-300 hover:text-red-600 group-hover:opacity-100">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col divide-y divide-slate-100 md:hidden">
          {paginated.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-400">
              No donors match your filters.
            </p>
          ) : (
            paginated.map((d) => {
              const sc = STATUS_CONFIG[d.status];
              const bc = BLOOD_COLOR[d.bloodGroup];
              return (
                <div
                  key={d.id}
                  className="flex items-center gap-3 p-4 transition hover:bg-slate-50"
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: d.avatarBg, color: d.avatarColor }}
                  >
                    {d.initials}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-slate-800">
                        {d.name}
                      </span>
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[11px] font-bold"
                        style={{ background: bc.bg, color: bc.color }}
                      >
                        {d.bloodGroup}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {d.location}
                      </span>
                      <span>{d.lastDonation}</span>
                    </div>
                    <span
                      className="flex items-center gap-1.5 text-[11px] font-semibold"
                      style={{ color: sc.color }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: sc.dot }}
                      />
                      {sc.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row">
          <p className="text-xs text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filtered.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(safePage * ITEMS_PER_PAGE, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filtered.length}
            </span>{" "}
            donors
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - safePage) <= 1,
              )
              .reduce<(number | "…")[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1)
                  acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="flex h-8 w-8 items-center justify-center text-xs text-slate-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition ${
                      safePage === p
                        ? "bg-red-600 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Register Modal (lightweight) ────────────────────────────────────── */}
      {showRegisterModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          onClick={() => setShowRegisterModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Register New Donor
              </h2>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "Full Name",
                  placeholder: "e.g. John Appleseed",
                  type: "text",
                },
                {
                  label: "Email",
                  placeholder: "donor@example.com",
                  type: "email",
                },
                { label: "Phone", placeholder: "+1 555 000 0000", type: "tel" },
              ].map(({ label, placeholder, type }) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-semibold text-slate-500">
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-500">
                  Blood Group
                </label>
                <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:ring-2 focus:ring-red-100">
                  <option value="">Select blood group</option>
                  {BLOOD_GROUPS.map((g) => (
                    <option key={g} value={g}>
                      {formatBloodGroup(g)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-500">
                  Location / Clinic
                </label>
                <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:ring-2 focus:ring-red-100">
                  <option value="">Select location</option>
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Register Donor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
