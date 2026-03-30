"use client";

import { useState, useMemo } from "react";
import {
  Heart,
  Droplets,
  MapPin,
  Timer,
  TrendingUp,
  TrendingDown,
  Download,
  CalendarDays,
} from "lucide-react";

// ─── Types & Data ─────────────────────────────────────────────────────────────

const RANGES = [
  "Last 7 Days",
  "Last 30 Days",
  "Last 90 Days",
  "Last Year",
] as const;
type Range = (typeof RANGES)[number];

interface KPIData {
  donations: number;
  donationsDelta: number;
  pending: number;
  pendingDelta: number;
  donors: number;
  donorsDelta: number;
  fulfillment: string;
}

const KPI_DATA: Record<Range, KPIData> = {
  "Last 7 Days": {
    donations: 302,
    donationsDelta: 5.1,
    pending: 12,
    pendingDelta: -8.3,
    donors: 1820,
    donorsDelta: 2.4,
    fulfillment: "3.8h",
  },
  "Last 30 Days": {
    donations: 1284,
    donationsDelta: 12.4,
    pending: 42,
    pendingDelta: -3.2,
    donors: 8420,
    donorsDelta: 8.1,
    fulfillment: "4.2h",
  },
  "Last 90 Days": {
    donations: 3940,
    donationsDelta: 9.7,
    pending: 130,
    pendingDelta: 1.5,
    donors: 9200,
    donorsDelta: 11.2,
    fulfillment: "4.5h",
  },
  "Last Year": {
    donations: 13840,
    donationsDelta: 18.2,
    pending: 480,
    pendingDelta: 2.1,
    donors: 9800,
    donorsDelta: 22.0,
    fulfillment: "4.9h",
  },
};

interface TrendPoint {
  month: string;
  value: number;
  target: number;
}

const TREND_DATA: Record<Range, TrendPoint[]> = {
  "Last 7 Days": [
    { month: "Mon", value: 38, target: 40 },
    { month: "Tue", value: 52, target: 40 },
    { month: "Wed", value: 45, target: 40 },
    { month: "Thu", value: 60, target: 40 },
    { month: "Fri", value: 55, target: 40 },
    { month: "Sat", value: 30, target: 40 },
    { month: "Sun", value: 22, target: 40 },
  ],
  "Last 30 Days": [
    { month: "Jan", value: 980, target: 900 },
    { month: "Feb", value: 860, target: 900 },
    { month: "Mar", value: 1100, target: 900 },
    { month: "Apr", value: 1020, target: 1000 },
    { month: "May", value: 1180, target: 1000 },
    { month: "Jun", value: 950, target: 1000 },
    { month: "Jul", value: 1050, target: 1000 },
    { month: "Aug", value: 1284, target: 1100 },
  ],
  "Last 90 Days": [
    { month: "Jan", value: 980, target: 900 },
    { month: "Feb", value: 860, target: 900 },
    { month: "Mar", value: 1100, target: 900 },
    { month: "Apr", value: 1020, target: 1000 },
    { month: "May", value: 1180, target: 1000 },
    { month: "Jun", value: 950, target: 1000 },
    { month: "Jul", value: 1050, target: 1000 },
    { month: "Aug", value: 1284, target: 1100 },
    { month: "Sep", value: 1320, target: 1100 },
    { month: "Oct", value: 1150, target: 1100 },
    { month: "Nov", value: 1400, target: 1200 },
    { month: "Dec", value: 1280, target: 1200 },
  ],
  "Last Year": [
    { month: "Jan", value: 980, target: 900 },
    { month: "Feb", value: 860, target: 900 },
    { month: "Mar", value: 1100, target: 900 },
    { month: "Apr", value: 1020, target: 1000 },
    { month: "May", value: 1180, target: 1000 },
    { month: "Jun", value: 950, target: 1000 },
    { month: "Jul", value: 1050, target: 1000 },
    { month: "Aug", value: 1284, target: 1100 },
    { month: "Sep", value: 1320, target: 1100 },
    { month: "Oct", value: 1150, target: 1100 },
    { month: "Nov", value: 1400, target: 1200 },
    { month: "Dec", value: 1280, target: 1200 },
  ],
};

const BLOOD_FULFILLMENT: {
  label: string;
  short: string;
  pct: number;
  colorClass: string;
}[] = [
  { label: "O+ Positive", short: "O+", pct: 94, colorClass: "bg-primary" },
  { label: "A− Negative", short: "A−", pct: 72, colorClass: "bg-secondary" },
  { label: "B+ Positive", short: "B+", pct: 88, colorClass: "bg-tertiary" },
  {
    label: "AB− Negative",
    short: "AB−",
    pct: 65,
    colorClass: "bg-on-surface-variant",
  },
];

// ─── SVG Line Chart ───────────────────────────────────────────────────────────

function TrendChart({ data }: { data: TrendPoint[] }) {
  const W = 800,
    H = 200;
  const PAD = { t: 16, r: 8, b: 8, l: 8 };

  const maxVal =
    Math.max(...data.map((d) => Math.max(d.value, d.target))) * 1.1;
  const px = (i: number) =>
    PAD.l + (i / (data.length - 1)) * (W - PAD.l - PAD.r);
  const py = (v: number) => PAD.t + (1 - v / maxVal) * (H - PAD.t - PAD.b);

  const valuePath = data
    .map(
      (d, i) =>
        `${i === 0 ? "M" : "L"}${px(i).toFixed(2)},${py(d.value).toFixed(2)}`,
    )
    .join(" ");
  const areaPath = `${valuePath} L${px(data.length - 1).toFixed(2)},${H} L${PAD.l},${H} Z`;
  const targetPath = data
    .map(
      (d, i) =>
        `${i === 0 ? "M" : "L"}${px(i).toFixed(2)},${py(d.target).toFixed(2)}`,
    )
    .join(" ");

  return (
    <div className="h-64 w-full relative flex flex-col">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full flex-1"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b7131a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#b7131a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* subtle horizontal grid */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={PAD.l}
            y1={py(maxVal * f)}
            x2={W - PAD.r}
            y2={py(maxVal * f)}
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="1"
          />
        ))}
        {/* area */}
        <path d={areaPath} fill="url(#trendGrad)" />
        {/* target dashed */}
        <path
          d={targetPath}
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />
        {/* value line */}
        <path
          d={valuePath}
          fill="none"
          stroke="#b7131a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* dots */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={px(i)}
            cy={py(d.value)}
            r="5"
            fill="white"
            stroke="#b7131a"
            strokeWidth="2.5"
          />
        ))}
      </svg>
      {/* X labels */}
      <div className="flex justify-between mt-3 px-1">
        {data.map((d) => (
          <span
            key={d.month}
            className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"
          >
            {d.month}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Delta Badge ──────────────────────────────────────────────────────────────

function DeltaBadge({
  value,
  inverse = false,
}: {
  value: number;
  inverse?: boolean;
}) {
  const positive = inverse ? value < 0 : value > 0;
  return (
    <span
      className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-0.5 ${
        positive ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"
      }`}
    >
      {positive ? (
        <TrendingUp className="w-3 h-3" />
      ) : (
        <TrendingDown className="w-3 h-3" />
      )}
      {value > 0 ? "+" : ""}
      {value}%
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Analytics() {
  const [range, setRange] = useState<Range>("Last 30 Days");
  const [showRangeMenu, setShowRangeMenu] = useState(false);

  const kpi = KPI_DATA[range];
  const trend = TREND_DATA[range];

  // derived efficiency note
  const efficiencyNote = useMemo(() => {
    const map: Record<Range, string> = {
      "Last 7 Days": "up 8% vs prev week",
      "Last 30 Days": "up 14% vs last Q",
      "Last 90 Days": "up 11% vs last period",
      "Last Year": "up 22% vs prior year",
    };
    return map[range];
  }, [range]);

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">
            Reports & Analytics
          </h1>
          <p className="text-on-surface-variant mt-2 text-sm font-medium">
            Operational insights and performance tracking for the blood donation
            supply chain.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {/* Range picker */}
          <div className="relative">
            <button
              onClick={() => setShowRangeMenu((v) => !v)}
              className="bg-surface-container hover:bg-surface-container-high transition-colors px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold text-on-surface shadow-sm text-sm"
            >
              <CalendarDays className="w-4 h-4" />
              {range}
            </button>
            {showRangeMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-outline-variant/20 z-10 overflow-hidden">
                {RANGES.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRange(r);
                      setShowRangeMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-container ${
                      range === r
                        ? "font-bold text-primary bg-secondary-fixed/30"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="bg-primary hover:opacity-90 transition-opacity text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-md shadow-primary/20 text-sm">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-primary">
          <div className="flex justify-between items-start mb-5 sm:mb-6">
            <div className="w-10 h-10 bg-secondary-fixed/50 text-error rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <DeltaBadge value={kpi.donationsDelta} />
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">
            Monthly Donations
          </p>
          <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
            {kpi.donations.toLocaleString()}
          </h3>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-tertiary">
          <div className="flex justify-between items-start mb-5 sm:mb-6">
            <div className="w-10 h-10 bg-tertiary-fixed/30 text-tertiary rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <DeltaBadge value={kpi.pendingDelta} inverse />
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">
            Pending Requests
          </p>
          <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
            {kpi.pending.toLocaleString()}
          </h3>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-primary">
          <div className="flex justify-between items-start mb-5 sm:mb-6">
            <div className="w-10 h-10 bg-secondary-fixed/30 text-primary rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <DeltaBadge value={kpi.donorsDelta} />
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">
            Active Donors
          </p>
          <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
            {kpi.donors.toLocaleString()}
          </h3>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-on-surface">
          <div className="flex justify-between items-start mb-5 sm:mb-6">
            <div className="w-10 h-10 bg-surface-container-highest text-on-surface rounded-xl flex items-center justify-center">
              <Timer className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
              Fast
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">
            Avg. Fulfillment
          </p>
          <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
            {kpi.fulfillment}
          </h3>
        </div>
      </section>

      {/* ── Charts Row ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-8 sm:mb-12">
            <div>
              <h3 className="font-headline text-xl font-bold">
                Monthly Donation Trends
              </h3>
              <p className="text-on-surface-variant text-sm mt-1">
                Donation volume recorded across all centers
              </p>
            </div>
            <div className="flex gap-4 text-sm font-bold shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                Current
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
                Target
              </div>
            </div>
          </div>

          <TrendChart data={trend} />
        </div>

        {/* Fulfillment Bars */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] flex flex-col justify-between">
          <div>
            <h3 className="font-headline text-xl font-bold">
              Request Fulfillment
            </h3>
            <p className="text-on-surface-variant text-sm mt-1">
              Supply vs Demand per blood type
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6 mt-6 sm:mt-8">
            {BLOOD_FULFILLMENT.map((b) => (
              <div key={b.short}>
                <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                  <span>{b.label}</span>
                  <span>{b.pct}%</span>
                </div>
                <div className="w-full bg-surface-container-high h-4 rounded overflow-hidden">
                  <div
                    className={`h-full ${b.colorClass} transition-all duration-700`}
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-outline-variant/20 flex gap-3 text-primary font-bold text-sm items-center">
            <TrendingUp className="w-5 h-5 shrink-0" />
            Efficiencies are {efficiencyNote}
          </div>
        </div>
      </section>
    </div>
  );
}
