"use client";

import { useState } from "react";
import {
  Send,
  Users,
  Droplets,
  BadgeCheck,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Megaphone,
  RotateCcw,
  ChevronRight,
  Zap,
  Info,
  Loader2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Audience = "all" | "oneg" | "staff" | "regional";
// type Priority = "normal" | "high";

interface HistoryItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  body: string;
  time: string;
  recipients: string;
  status: "delivered" | "partial" | "pending";
}

// ── Dummy data ─────────────────────────────────────────────────────────────────
const HISTORY: HistoryItem[] = [
  {
    id: "1",
    badge: "Urgent",
    badgeColor: "bg-red-50 text-red-600 border border-red-100",
    title: "Critical O− Supply Shortage",
    body: "Immediate donations needed at Metropolitan Center. All eligible O− donors are requested to visit within 24 hours.",
    time: "2h ago",
    recipients: "842",
    status: "delivered",
  },
  {
    id: "2",
    badge: "Update",
    badgeColor: "bg-primary/10 text-primary border border-primary/20",
    title: "New Donation Tracking Feature",
    body: "The BloodLink app now allows you to track your donation from storage to clinical use in real time.",
    time: "Yesterday",
    recipients: "12.4k",
    status: "delivered",
  },
  {
    id: "3",
    badge: "Reminder",
    badgeColor: "bg-amber-50 text-amber-600 border border-amber-100",
    title: "Upcoming Donation Drive — St. Luke's",
    body: "Join us this Saturday at St. Luke's Community Hall from 9 AM to 4 PM. Walk-ins welcome.",
    time: "2 days ago",
    recipients: "3.1k",
    status: "delivered",
  },
  {
    id: "4",
    badge: "Info",
    badgeColor:
      "bg-surface-container text-on-surface-variant border border-outline-variant/20",
    title: "System Maintenance Scheduled",
    body: "BloodLink will undergo maintenance on Friday from 2:00–4:00 AM EST. No donor-facing disruption expected.",
    time: "3 days ago",
    recipients: "Staff",
    status: "delivered",
  },
];

const AUDIENCE_OPTIONS: {
  id: Audience;
  icon: React.ReactNode;
  label: string;
  count: string;
}[] = [
  { id: "all", icon: <Users size={18} />, label: "All Donors", count: "18.2k" },
  {
    id: "oneg",
    icon: <Droplets size={18} />,
    label: "O− Negative",
    count: "1.4k",
  },
  {
    id: "staff",
    icon: <BadgeCheck size={18} />,
    label: "Staff Only",
    count: "94",
  },
  {
    id: "regional",
    icon: <MapPin size={18} />,
    label: "Regional",
    count: "5.8k",
  },
];

const STATUS_ICON: Record<HistoryItem["status"], React.ReactNode> = {
  delivered: <CheckCircle2 size={16} className="text-green-500" />,
  partial: <AlertTriangle size={16} className="text-amber-500" />,
  pending: <Clock size={16} className="text-on-surface-variant" />,
};

// ── Toggle ─────────────────────────────────────────────────────────────────────
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
        transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
        ${checked ? "bg-error" : "bg-surface-container-high"}`}
    >
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0
        transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

// ── History Card ───────────────────────────────────────────────────────────────
function HistoryCard({ item }: { item: HistoryItem }) {
  return (
    <div className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-lg ${item.badgeColor}`}
        >
          {item.badge}
        </span>
        <span className="text-xs text-on-surface-variant font-medium shrink-0">
          {item.time}
        </span>
      </div>

      <h4 className="font-bold text-on-surface text-sm mb-1.5 leading-snug">
        {item.title}
      </h4>
      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
        {item.body}
      </p>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant/10">
        <div className="flex items-center gap-2">
          {/* Avatar stack */}
          <div className="flex -space-x-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-5 w-5 rounded-full bg-surface-container border-2 border-surface"
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-on-surface-variant">
            {item.recipients} recipient
            {item.recipients.includes("k") || parseInt(item.recipients) > 1
              ? "s"
              : ""}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {STATUS_ICON[item.status]}
          <span className="text-xs font-semibold text-on-surface-variant capitalize">
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Notifications() {
  const [audience, setAudience] = useState<Audience>("all");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const charLimit = 320;
  const remaining = charLimit - body.length;

  const handleSend = () => {
    if (!title.trim() || !body.trim() || sending) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 1800);
  };

  const handleReset = () => {
    setTitle("");
    setBody("");
    setPriority(false);
    setAudience("all");
    setSent(false);
  };

  const selectedAudience = AUDIENCE_OPTIONS.find((a) => a.id === audience);
  const canSend = title.trim().length > 0 && body.trim().length > 0;

  return (
    <div className="space-y-8 container mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Communication Hub
          </h1>
          <p className="text-on-surface-variant mt-1.5 text-sm font-medium">
            Dispatch vital information to your donor network or internal teams.
          </p>
        </div>

        {/* MTD stat */}
        <div className="flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl px-5 py-3 shadow-sm shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Send size={18} />
          </div>
          <div>
            <p className="font-headline text-2xl font-extrabold leading-none text-on-surface">
              1,284
            </p>
            <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mt-1">
              Messages Sent (MTD)
            </p>
          </div>
        </div>
      </div>

      {/* ── Body grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Compose ── */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 border-l-4 border-l-primary shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Megaphone size={17} />
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Compose Broadcast
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>

          {/* Audience */}
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2.5">
              Target Audience
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AUDIENCE_OPTIONS.map((opt) => {
                const active = audience === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setAudience(opt.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all cursor-pointer
                      ${
                        active
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-transparent bg-surface-container hover:border-outline-variant/30 text-on-surface-variant"
                      }`}
                  >
                    {opt.icon}
                    <p className="text-xs font-bold leading-tight">
                      {opt.label}
                    </p>
                    <p
                      className={`text-[10px] font-semibold ${active ? "text-primary/70" : "text-on-surface-variant/60"}`}
                    >
                      {opt.count}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">
              Notification Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Urgent: Blood Shortage at City General"
              className="w-full rounded-xl border border-outline-variant/20 bg-surface-container py-2.5 px-4 text-sm outline-none transition-all placeholder:text-on-surface-variant/40 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Body */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-on-surface">
                Message Content
              </label>
              <span
                className={`text-xs font-semibold ${remaining < 40 ? "text-error" : "text-on-surface-variant"}`}
              >
                {remaining} left
              </span>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value.slice(0, charLimit))}
              placeholder="Compose your message here…"
              rows={4}
              className="w-full resize-none rounded-xl border border-outline-variant/20 bg-surface-container py-2.5 px-4 text-sm outline-none transition-all placeholder:text-on-surface-variant/40 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Priority toggle */}
          <div
            className={`flex items-center justify-between rounded-xl border p-4 transition-colors
            ${priority ? "bg-red-50 border-red-100" : "bg-surface-container border-outline-variant/10"}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors
                ${priority ? "bg-error text-white" : "bg-surface-container-high text-on-surface-variant"}`}
              >
                <Zap size={15} />
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${priority ? "text-error" : "text-on-surface"}`}
                >
                  Mark as High Priority
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Triggers push notifications and SMS bypass
                </p>
              </div>
            </div>
            <Toggle checked={priority} onChange={setPriority} />
          </div>

          {/* Preview pill */}
          {(title || body) && (
            <div className="flex items-start gap-2.5 rounded-xl bg-surface-container p-3">
              <Info size={14} className="text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Will be sent to{" "}
                <span className="font-bold text-on-surface">
                  {selectedAudience?.count} {selectedAudience?.label}
                </span>{" "}
                recipients
                {priority && (
                  <span className="text-error font-bold">
                    {" "}
                    as HIGH PRIORITY
                  </span>
                )}
                .
              </p>
            </div>
          )}

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend || sending}
            className={`w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-bold transition-all shadow-sm
              ${
                sent
                  ? "bg-green-600 text-white shadow-green-200"
                  : canSend && !sending
                    ? "bg-primary text-white hover:opacity-90 shadow-primary/20"
                    : "bg-surface-container text-on-surface-variant cursor-not-allowed"
              }`}
          >
            {sending ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Dispatching…
              </>
            ) : sent ? (
              <>
                <CheckCircle2 size={16} /> Dispatched Successfully!
              </>
            ) : (
              <>
                <Send size={15} /> Dispatch Notification
              </>
            )}
          </button>
        </section>

        {/* ── History ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-headline font-bold text-xl text-on-surface">
              Recent History
            </h3>
            <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {HISTORY.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
