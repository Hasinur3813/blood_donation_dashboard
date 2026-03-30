"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  AlertTriangle,
  Hourglass,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  X,
  Check,
  Eye,
  Zap,
  Clock,
  SlidersHorizontal,
  MapPin,
  Download,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertLevel = "Emergency" | "Urgent" | "Normal";
type ReqStatus = "Pending" | "Fulfilled" | "Cancelled" | "Processing";
type BloodGroup = "O+" | "O-" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-";

interface BloodRequest {
  id: string;
  patientName: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  bloodGroup: BloodGroup;
  hospital: string;
  ward: string;
  alertLevel: AlertLevel;
  status: ReqStatus;
  timeAgo: string;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const ALL_REQUESTS: BloodRequest[] = [
  {
    id: "#BL-9042",
    patientName: "Elena Petrov",
    initials: "EP",
    avatarBg: "#FEF2F2",
    avatarColor: "#DC2626",
    bloodGroup: "A-",
    hospital: "Central General",
    ward: "Unit 402, ICU",
    alertLevel: "Emergency",
    status: "Pending",
    timeAgo: "12m ago",
  },
  {
    id: "#BL-8951",
    patientName: "Marcus Knight",
    initials: "MK",
    avatarBg: "#F1F5F9",
    avatarColor: "#475569",
    bloodGroup: "O+",
    hospital: "St. Jude Medical",
    ward: "Surgery Ward",
    alertLevel: "Urgent",
    status: "Fulfilled",
    timeAgo: "1h ago",
  },
  {
    id: "#BL-8922",
    patientName: "Sarah Chen",
    initials: "SC",
    avatarBg: "#EFF6FF",
    avatarColor: "#2563EB",
    bloodGroup: "B+",
    hospital: "Riverside Memorial",
    ward: "General Ward",
    alertLevel: "Normal",
    status: "Pending",
    timeAgo: "3h ago",
  },
  {
    id: "#BL-8800",
    patientName: "James Okafor",
    initials: "JO",
    avatarBg: "#F0FDF4",
    avatarColor: "#16A34A",
    bloodGroup: "O-",
    hospital: "North General",
    ward: "Trauma Bay",
    alertLevel: "Emergency",
    status: "Processing",
    timeAgo: "4h ago",
  },
  {
    id: "#BL-8790",
    patientName: "Priya Sharma",
    initials: "PS",
    avatarBg: "#FFFBEB",
    avatarColor: "#D97706",
    bloodGroup: "AB+",
    hospital: "Westside Medical",
    ward: "Maternity",
    alertLevel: "Normal",
    status: "Fulfilled",
    timeAgo: "5h ago",
  },
  {
    id: "#BL-8755",
    patientName: "David Müller",
    initials: "DM",
    avatarBg: "#F5F3FF",
    avatarColor: "#7C3AED",
    bloodGroup: "A+",
    hospital: "St. Jude Medical",
    ward: "Cardiology",
    alertLevel: "Urgent",
    status: "Pending",
    timeAgo: "6h ago",
  },
  {
    id: "#BL-8700",
    patientName: "Aisha Kamara",
    initials: "AK",
    avatarBg: "#FEF2F2",
    avatarColor: "#DC2626",
    bloodGroup: "B-",
    hospital: "Central General",
    ward: "Oncology",
    alertLevel: "Emergency",
    status: "Cancelled",
    timeAgo: "7h ago",
  },
  {
    id: "#BL-8680",
    patientName: "Liam Foster",
    initials: "LF",
    avatarBg: "#EFF6FF",
    avatarColor: "#2563EB",
    bloodGroup: "AB-",
    hospital: "Riverside Memorial",
    ward: "Neuro ICU",
    alertLevel: "Urgent",
    status: "Fulfilled",
    timeAgo: "9h ago",
  },
  {
    id: "#BL-8640",
    patientName: "Nadia Petrov",
    initials: "NP",
    avatarBg: "#F5F3FF",
    avatarColor: "#7C3AED",
    bloodGroup: "O+",
    hospital: "North General",
    ward: "General Ward",
    alertLevel: "Normal",
    status: "Pending",
    timeAgo: "10h ago",
  },
  {
    id: "#BL-8600",
    patientName: "Carlos Mendez",
    initials: "CM",
    avatarBg: "#F0FDF4",
    avatarColor: "#16A34A",
    bloodGroup: "A-",
    hospital: "Westside Medical",
    ward: "Surgery Ward",
    alertLevel: "Urgent",
    status: "Processing",
    timeAgo: "11h ago",
  },
  {
    id: "#BL-8570",
    patientName: "Sophie Laurent",
    initials: "SL",
    avatarBg: "#FFFBEB",
    avatarColor: "#D97706",
    bloodGroup: "O-",
    hospital: "Central General",
    ward: "Emergency Room",
    alertLevel: "Emergency",
    status: "Fulfilled",
    timeAgo: "12h ago",
  },
  {
    id: "#BL-8540",
    patientName: "Thomas Brewer",
    initials: "TB",
    avatarBg: "#F1F5F9",
    avatarColor: "#475569",
    bloodGroup: "B+",
    hospital: "St. Jude Medical",
    ward: "Paediatrics",
    alertLevel: "Normal",
    status: "Cancelled",
    timeAgo: "14h ago",
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
const ALERT_LEVELS: AlertLevel[] = ["Emergency", "Urgent", "Normal"];
const STATUSES: ReqStatus[] = [
  "Pending",
  "Processing",
  "Fulfilled",
  "Cancelled",
];
const HOSPITALS = [...new Set(ALL_REQUESTS.map((r) => r.hospital))];

const ITEMS_PER_PAGE = 8;

// ─── Config Maps ──────────────────────────────────────────────────────────────

const ALERT_CONFIG: Record<
  AlertLevel,
  {
    bg: string;
    color: string;
    icon: React.ReactNode;
    pill: string;
    pillText: string;
  }
> = {
  Emergency: {
    bg: "#FEF2F2",
    color: "#DC2626",
    pill: "#FEF2F2",
    pillText: "#DC2626",
    icon: <AlertTriangle size={12} />,
  },
  Urgent: {
    bg: "#FFFBEB",
    color: "#D97706",
    pill: "#FFFBEB",
    pillText: "#D97706",
    icon: <Zap size={12} />,
  },
  Normal: {
    bg: "#F8FAFC",
    color: "#64748B",
    pill: "#F8FAFC",
    pillText: "#64748B",
    icon: <Clock size={12} />,
  },
};

const STATUS_CONFIG: Record<
  ReqStatus,
  { dot: string; color: string; label: string }
> = {
  Pending: { dot: "#F97316", color: "#EA580C", label: "Pending" },
  Processing: { dot: "#3B82F6", color: "#2563EB", label: "Processing" },
  Fulfilled: { dot: "#16A34A", color: "#15803D", label: "Fulfilled" },
  Cancelled: { dot: "#94A3B8", color: "#64748B", label: "Cancelled" },
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

// ─── Dropdown ─────────────────────────────────────────────────────────────────

interface DropdownProps {
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
}

function Dropdown({ icon, options, value, onChange, allLabel }: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex-1 min-w-[130px]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300"
      >
        <span className="flex items-center gap-2 truncate">
          {icon}
          <span className="truncate">{value || allLabel}</span>
        </span>
        <ChevronDown size={13} className="shrink-0 text-slate-400" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-full min-w-max rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
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

// ─── New Request Modal ────────────────────────────────────────────────────────

function NewRequestModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            New Blood Request
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            {
              label: "Patient Name",
              placeholder: "e.g. John Appleseed",
              type: "text",
            },
            {
              label: "Hospital / Clinic",
              placeholder: "e.g. Central General",
              type: "text",
            },
            {
              label: "Ward / Unit",
              placeholder: "e.g. ICU, Surgery Ward",
              type: "text",
            },
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">
                Blood Group
              </label>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:ring-2 focus:ring-red-100">
                <option value="">Select</option>
                {BLOOD_GROUPS.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">
                Alert Level
              </label>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:ring-2 focus:ring-red-100">
                <option value="">Select</option>
                {ALERT_LEVELS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Requests() {
  const [search, setSearch] = useState("");
  const [alertFilter, setAlertFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [hospitalFilter, setHospitalFilter] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // derive stats
  const activeEmergencies = ALL_REQUESTS.filter(
    (r) => r.alertLevel === "Emergency" && r.status !== "Cancelled",
  ).length;
  const pendingCount = ALL_REQUESTS.filter(
    (r) => r.status === "Pending" || r.status === "Processing",
  ).length;

  const filtered = useMemo(() => {
    return ALL_REQUESTS.filter((r) => {
      const q = search.toLowerCase();
      if (
        q &&
        !r.patientName.toLowerCase().includes(q) &&
        !r.id.toLowerCase().includes(q) &&
        !r.hospital.toLowerCase().includes(q)
      )
        return false;
      if (alertFilter && r.alertLevel !== alertFilter) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      if (hospitalFilter && r.hospital !== hospitalFilter) return false;
      if (bloodFilter && r.bloodGroup !== bloodFilter) return false;
      return true;
    });
  }, [search, alertFilter, statusFilter, hospitalFilter, bloodFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );
  const hasFilters =
    search || alertFilter || statusFilter || hospitalFilter || bloodFilter;

  const clearFilters = () => {
    setSearch("");
    setAlertFilter("");
    setStatusFilter("");
    setHospitalFilter("");
    setBloodFilter("");
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Blood Requests
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time patient requirements and logistics management.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 sm:w-auto"
        >
          <Plus size={16} />
          New Request
        </button>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-4">
        {/* Active Emergencies */}
        <div className="rounded-xl border border-red-200 bg-white p-5 shadow-sm transition-all hover:border-red-400">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
              <AlertTriangle size={17} className="text-red-600" />
            </div>
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
              +12%
            </span>
          </div>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Active Emergencies
          </p>
          <h3 className="mt-1 text-3xl font-bold text-slate-900">
            {activeEmergencies}
          </h3>
        </div>

        {/* Pending Approval */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-orange-300">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
              <Hourglass size={17} className="text-orange-500" />
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
              Today
            </span>
          </div>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Pending Approval
          </p>
          <h3 className="mt-1 text-3xl font-bold text-slate-900">
            {pendingCount}
          </h3>
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
            placeholder="Search by patient, ID or hospital…"
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
          <Dropdown
            icon={<AlertTriangle size={13} className="text-slate-400" />}
            options={ALERT_LEVELS}
            value={alertFilter}
            onChange={(v) => {
              setAlertFilter(v);
              setPage(1);
            }}
            allLabel="All Alert Levels"
          />
          <Dropdown
            icon={<SlidersHorizontal size={13} className="text-slate-400" />}
            options={STATUSES}
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
            allLabel="All Statuses"
          />
          <Dropdown
            icon={<MapPin size={13} className="text-slate-400" />}
            options={HOSPITALS}
            value={hospitalFilter}
            onChange={(v) => {
              setHospitalFilter(v);
              setPage(1);
            }}
            allLabel="All Hospitals"
          />
          <Dropdown
            icon={<SlidersHorizontal size={13} className="text-slate-400" />}
            options={BLOOD_GROUPS}
            value={bloodFilter}
            onChange={(v) => {
              setBloodFilter(v);
              setPage(1);
            }}
            allLabel="All Blood Groups"
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

      {/* ── Request Queue ──────────────────────────────────────────────────── */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Queue header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-sm font-bold text-slate-800">
            Request Queue
            <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
              {filtered.length}
            </span>
          </h3>
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300">
            <Download size={13} /> Export CSV
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {[
                  "Patient",
                  "Blood Group",
                  "Hospital / Ward",
                  "Alert Level",
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
                    No requests match your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((r) => {
                  const ac = ALERT_CONFIG[r.alertLevel];
                  const sc = STATUS_CONFIG[r.status];
                  const bc = BLOOD_COLOR[r.bloodGroup];
                  return (
                    <tr
                      key={r.id}
                      className="group cursor-pointer transition-colors hover:bg-slate-50"
                    >
                      {/* Patient */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                            style={{
                              background: r.avatarBg,
                              color: r.avatarColor,
                            }}
                          >
                            {r.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {r.patientName}
                            </p>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {r.id} · {r.timeAgo}
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* Blood Group */}
                      <td className="px-6 py-4">
                        <span
                          className="rounded-lg px-3 py-1.5 font-mono text-sm font-bold"
                          style={{ background: bc.bg, color: bc.color }}
                        >
                          {r.bloodGroup}
                        </span>
                      </td>
                      {/* Hospital */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-800">
                          {r.hospital}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {r.ward}
                        </p>
                      </td>
                      {/* Alert Level */}
                      <td className="px-6 py-4">
                        <span
                          className="flex w-max items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
                          style={{ background: ac.pill, color: ac.pillText }}
                        >
                          {ac.icon}
                          {r.alertLevel}
                        </span>
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
                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          {(r.status === "Pending" ||
                            r.status === "Processing") && (
                            <>
                              <button
                                title="Approve"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-green-300 hover:text-green-600"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                title="Cancel"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-300 hover:text-red-600"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                          <button
                            title="View"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-300 hover:text-blue-600"
                          >
                            <Eye size={14} />
                          </button>
                        </div>
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
              No requests match your filters.
            </p>
          ) : (
            paginated.map((r) => {
              const ac = ALERT_CONFIG[r.alertLevel];
              const sc = STATUS_CONFIG[r.status];
              const bc = BLOOD_COLOR[r.bloodGroup];
              return (
                <div
                  key={r.id}
                  className="flex items-start gap-3 p-4 transition hover:bg-slate-50"
                >
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: r.avatarBg, color: r.avatarColor }}
                  >
                    {r.initials}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-slate-800">
                        {r.patientName}
                      </span>
                      <span
                        className="shrink-0 rounded-lg px-2 py-0.5 font-mono text-xs font-bold"
                        style={{ background: bc.bg, color: bc.color }}
                      >
                        {r.bloodGroup}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-400">
                      <span>
                        {r.hospital} · {r.ward}
                      </span>
                      <span>{r.timeAgo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: ac.pill, color: ac.pillText }}
                      >
                        {ac.icon} {r.alertLevel}
                      </span>
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
            requests
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

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {showModal && <NewRequestModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
