"use client";

import { useState } from "react";
import {
  Settings2,
  ShieldCheck,
  BellRing,
  Link2,
  Trash2,
  Save,
  Undo2,
  ChevronRight,
  Eye,
  EyeOff,
  Globe,
  Phone,
  Mail,
  Building2,
  AlertTriangle,
  Droplets,
  Users,
  Clock,
  Database,
  Lock,
  KeyRound,
  UserCog,
  BellPlus,
  Webhook,
  Activity,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  danger?: boolean;
}

// ── Dummy Data ─────────────────────────────────────────────────────────────────
const TABS: TabItem[] = [
  { id: "general", label: "General", icon: <Settings2 size={16} /> },
  {
    id: "security",
    label: "Security & Access",
    icon: <ShieldCheck size={16} />,
  },
  { id: "alerts", label: "Alerts & Routing", icon: <BellRing size={16} /> },
  { id: "integrations", label: "Integrations", icon: <Link2 size={16} /> },
  {
    id: "danger",
    label: "Danger Zone",
    icon: <Trash2 size={16} />,
    danger: true,
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────
function Toggle({ id, checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
        transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        ${checked ? "bg-primary" : "bg-surface-container-high"}`}
    >
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0
          transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

function FieldCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6">
      {children}
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 pb-4 border-b border-surface-container">
      <h3 className="font-headline text-lg font-bold text-on-surface">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-on-surface-variant mt-1">{subtitle}</p>
      )}
    </div>
  );
}

function InputField({
  label,
  type = "text",
  defaultValue,
  hint,
  icon,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  hint?: string;
  icon?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-1.5">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-on-surface-variant">
            {icon}
          </span>
        )}
        <input
          type={isPassword && show ? "text" : type}
          defaultValue={defaultValue}
          className={`w-full bg-surface-container-low border border-outline-variant/20 rounded-xl 
            py-2.5 text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30
            ${icon ? "pl-10 pr-4" : "px-4"}
            ${isPassword ? "pr-10" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {hint && <p className="text-xs text-on-surface-variant mt-1.5">{hint}</p>}
    </div>
  );
}

// ── Tab Panels ─────────────────────────────────────────────────────────────────
function GeneralPanel() {
  const [autoRouting, setAutoRouting] = useState(true);
  const [publicPortal, setPublicPortal] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [threshold, setThreshold] = useState(15);

  return (
    <div className="space-y-10">
      {/* Hospital Info */}
      <div>
        <SectionHeader
          title="Hospital Identity"
          subtitle="Visible across all public-facing donor portals."
        />
        <div className="space-y-4">
          <FieldCard>
            <InputField
              label="Hospital Network Name"
              defaultValue="Metropolitan Health System"
              icon={<Building2 size={15} />}
              hint="This name appears on all patient-facing and donor-facing portals."
            />
          </FieldCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldCard>
              <InputField
                label="Primary Contact Email"
                type="email"
                defaultValue="admin@metrohealth.system"
                icon={<Mail size={15} />}
              />
            </FieldCard>
            <FieldCard>
              <InputField
                label="Emergency Hotline"
                type="tel"
                defaultValue="+1 (555) 019-2843"
                icon={<Phone size={15} />}
              />
            </FieldCard>
          </div>
          <FieldCard>
            <InputField
              label="Public Portal URL"
              type="url"
              defaultValue="https://donate.metrohealth.system"
              icon={<Globe size={15} />}
            />
          </FieldCard>
        </div>
      </div>

      {/* Operational Thresholds */}
      <div>
        <SectionHeader
          title="Operational Thresholds"
          subtitle="Configure system-wide operational behaviour and limits."
        />
        <div className="space-y-3">
          {/* Toggle rows */}
          {[
            {
              id: "autoRouting",
              icon: <Activity size={18} className="text-primary" />,
              title: "Automated Emergency Routing",
              desc: "Automatically dispatch available O− units to highest priority centers.",
              checked: autoRouting,
              set: setAutoRouting,
            },
            {
              id: "publicPortal",
              icon: <Users size={18} className="text-primary" />,
              title: "Public Registration Portal",
              desc: "Allow new donors to register online via the public-facing application.",
              checked: publicPortal,
              set: setPublicPortal,
            },
            {
              id: "maintenance",
              icon: <Clock size={18} className="text-amber-500" />,
              title: "Maintenance Mode",
              desc: "Temporarily suspend all incoming requests and show a maintenance page.",
              checked: maintenanceMode,
              set: setMaintenanceMode,
            },
          ].map((item) => (
            <FieldCard key={item.id}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-surface-container rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <Toggle
                  id={item.id}
                  checked={item.checked}
                  onChange={item.set}
                />
              </div>
            </FieldCard>
          ))}

          {/* Number input */}
          <FieldCard>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 bg-surface-container rounded-lg">
                  <Droplets size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-on-surface text-sm">
                    Critical Supply Low-Water Mark
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Triggers system-wide alert when any blood type drops below
                    this level.
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden shrink-0">
                <button
                  onClick={() => setThreshold(Math.max(0, threshold - 1))}
                  className="px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors font-bold text-lg leading-none"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-sm text-on-surface">
                  {threshold}
                </span>
                <button
                  onClick={() => setThreshold(Math.min(100, threshold + 1))}
                  className="px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors font-bold text-lg leading-none"
                >
                  +
                </button>
                <span className="px-3 py-2 text-xs font-bold text-on-surface-variant bg-surface-container-high border-l border-outline-variant/20">
                  %
                </span>
              </div>
            </div>
          </FieldCard>
        </div>
      </div>
    </div>
  );
}

function SecurityPanel() {
  const [twoFA, setTwoFA] = useState(true);
  const [auditLog, setAuditLog] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  const roles = [
    {
      name: "Dr. Sarah Chen",
      role: "System Admin",
      status: "Active",
      avatar: "SC",
    },
    {
      name: "Mark Okafor",
      role: "Blood Bank Mgr",
      status: "Active",
      avatar: "MO",
    },
    {
      name: "Linda Park",
      role: "Read-Only Auditor",
      status: "Suspended",
      avatar: "LP",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <SectionHeader
          title="Authentication"
          subtitle="Control how users access the system."
        />
        <div className="space-y-3">
          {[
            {
              id: "2fa",
              icon: <KeyRound size={18} className="text-primary" />,
              title: "Two-Factor Authentication",
              desc: "Require 2FA for all admin and manager roles.",
              checked: twoFA,
              set: setTwoFA,
            },
            {
              id: "audit",
              icon: <Database size={18} className="text-primary" />,
              title: "Audit Logging",
              desc: "Record all configuration changes with user attribution.",
              checked: auditLog,
              set: setAuditLog,
            },
            {
              id: "ip",
              icon: <Lock size={18} className="text-amber-500" />,
              title: "IP Allowlist",
              desc: "Restrict access to a predefined list of IP addresses.",
              checked: ipWhitelist,
              set: setIpWhitelist,
            },
          ].map((item) => (
            <FieldCard key={item.id}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-surface-container rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <Toggle
                  id={item.id}
                  checked={item.checked}
                  onChange={item.set}
                />
              </div>
            </FieldCard>
          ))}
          <FieldCard>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 bg-surface-container rounded-lg">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-on-surface text-sm">
                    Session Timeout
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Auto-logout idle sessions after this duration.
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden shrink-0">
                <button
                  onClick={() =>
                    setSessionTimeout(Math.max(5, sessionTimeout - 5))
                  }
                  className="px-3 py-2 hover:bg-surface-container-high transition-colors font-bold text-lg leading-none text-on-surface-variant"
                >
                  −
                </button>
                <span className="w-14 text-center font-bold text-sm text-on-surface">
                  {sessionTimeout}m
                </span>
                <button
                  onClick={() =>
                    setSessionTimeout(Math.min(480, sessionTimeout + 5))
                  }
                  className="px-3 py-2 hover:bg-surface-container-high transition-colors font-bold text-lg leading-none text-on-surface-variant"
                >
                  +
                </button>
              </div>
            </div>
          </FieldCard>
        </div>
      </div>

      <div>
        <SectionHeader
          title="Access Control"
          subtitle="Manage users and their roles."
        />
        <FieldCard>
          <div className="space-y-3">
            {roles.map((u) => (
              <div
                key={u.name}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                    {u.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      {u.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">{u.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                  >
                    {u.status}
                  </span>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <UserCog size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
            <Users size={15} /> Manage All Users
          </button>
        </FieldCard>
      </div>
    </div>
  );
}

function AlertsPanel() {
  const [criticalEmail, setCriticalEmail] = useState(true);
  const [criticalSms, setCriticalSms] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [escalation, setEscalation] = useState(true);

  const channels = [
    {
      id: "critEmail",
      icon: <Mail size={18} className="text-primary" />,
      title: "Critical Alert Emails",
      desc: "Send email for P1 critical stock shortages.",
      checked: criticalEmail,
      set: setCriticalEmail,
    },
    {
      id: "critSms",
      icon: <Phone size={18} className="text-primary" />,
      title: "SMS Notifications",
      desc: "Text the on-call coordinator for emergency dispatches.",
      checked: criticalSms,
      set: setCriticalSms,
    },
    {
      id: "digest",
      icon: <Activity size={18} className="text-primary" />,
      title: "Weekly Digest",
      desc: "Send a summary report every Monday at 08:00.",
      checked: weeklyDigest,
      set: setWeeklyDigest,
    },
    {
      id: "escalate",
      icon: <BellPlus size={18} className="text-amber-500" />,
      title: "Auto-Escalation",
      desc: "Escalate unacknowledged alerts to department heads after 15 min.",
      checked: escalation,
      set: setEscalation,
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <SectionHeader
          title="Notification Channels"
          subtitle="Choose how and when the system communicates critical events."
        />
        <div className="space-y-3">
          {channels.map((c) => (
            <FieldCard key={c.id}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-surface-container rounded-lg">
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface text-sm">
                      {c.title}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {c.desc}
                    </p>
                  </div>
                </div>
                <Toggle id={c.id} checked={c.checked} onChange={c.set} />
              </div>
            </FieldCard>
          ))}
        </div>
      </div>
      <div>
        <SectionHeader
          title="Recipients"
          subtitle="Alert destination addresses."
        />
        <FieldCard>
          <div className="space-y-4">
            <InputField
              label="Primary Alert Email"
              type="email"
              defaultValue="alerts@metrohealth.system"
              icon={<Mail size={15} />}
            />
            <InputField
              label="Secondary Alert Email"
              type="email"
              defaultValue="oncall@metrohealth.system"
              icon={<Mail size={15} />}
            />
            <InputField
              label="SMS Recipient Number"
              type="tel"
              defaultValue="+1 (555) 987-6543"
              icon={<Phone size={15} />}
            />
          </div>
        </FieldCard>
      </div>
    </div>
  );
}

function IntegrationsPanel() {
  const integrations = [
    {
      name: "HL7 FHIR v4",
      desc: "Clinical data exchange standard",
      status: "Connected",
      icon: "🏥",
    },
    {
      name: "Twilio SMS",
      desc: "Emergency SMS dispatch gateway",
      status: "Connected",
      icon: "📱",
    },
    {
      name: "SendGrid Email",
      desc: "Transactional email provider",
      status: "Connected",
      icon: "✉️",
    },
    {
      name: "AWS S3 Backup",
      desc: "Encrypted off-site data backup",
      status: "Disconnected",
      icon: "☁️",
    },
    {
      name: "Slack Webhooks",
      desc: "Team channel notifications",
      status: "Disconnected",
      icon: "💬",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <SectionHeader
          title="Active Integrations"
          subtitle="External systems connected to this network."
        />
        <div className="space-y-3">
          {integrations.map((int) => (
            <FieldCard key={int.name}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{int.icon}</span>
                  <div>
                    <p className="font-semibold text-on-surface text-sm">
                      {int.name}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {int.desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${int.status === "Connected" ? "bg-green-100 text-green-700" : "bg-surface-container text-on-surface-variant"}`}
                  >
                    {int.status}
                  </span>
                  <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    {int.status === "Connected" ? "Configure" : "Connect"}{" "}
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </FieldCard>
          ))}
        </div>
      </div>
      <div>
        <SectionHeader
          title="Webhook Endpoint"
          subtitle="Send events to your own infrastructure."
        />
        <FieldCard>
          <div className="space-y-4">
            <InputField
              label="Webhook URL"
              type="url"
              defaultValue="https://hooks.yourinfra.io/blood-bank"
              icon={<Webhook size={15} />}
              hint="POST requests will be sent on every critical inventory change."
            />
            <InputField
              label="Signing Secret"
              type="password"
              defaultValue="whs_a8f3k2j9lq..."
              icon={<KeyRound size={15} />}
              hint="Used to verify the authenticity of webhook payloads."
            />
          </div>
        </FieldCard>
      </div>
    </div>
  );
}

function DangerPanel() {
  const [confirmText, setConfirmText] = useState("");
  const CONFIRM_PHRASE = "DELETE ALL DATA";

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
        <AlertTriangle size={18} className="text-red-600 mt-0.5 shrink-0" />
        <p className="text-sm text-red-700 font-medium">
          Actions in this section are{" "}
          <strong>permanent and irreversible</strong>. Proceed only if you are
          absolutely certain.
        </p>
      </div>

      {[
        {
          title: "Reset All Alerts",
          desc: "Clear all pending and historical alert records. This cannot be undone.",
          label: "Reset Alerts",
          variant: "warn",
        },
        {
          title: "Revoke All API Keys",
          desc: "Immediately invalidate all issued API keys. All integrations will disconnect.",
          label: "Revoke Keys",
          variant: "warn",
        },
      ].map((item) => (
        <FieldCard key={item.title}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-on-surface text-sm">
                {item.title}
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {item.desc}
              </p>
            </div>
            <button className="shrink-0 px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors">
              {item.label}
            </button>
          </div>
        </FieldCard>
      ))}

      <FieldCard>
        <p className="font-semibold text-red-600 text-sm mb-1">
          Delete All Data & Reset System
        </p>
        <p className="text-xs text-on-surface-variant mb-4">
          Permanently wipe all donor records, inventory data, and
          configurations. Type{" "}
          <code className="bg-surface-container px-1 py-0.5 rounded text-red-600 font-mono">
            {CONFIRM_PHRASE}
          </code>{" "}
          to confirm.
        </p>
        <input
          type="text"
          placeholder={CONFIRM_PHRASE}
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="w-full bg-surface-container-low border border-red-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-300 font-mono"
        />
        <button
          disabled={confirmText !== CONFIRM_PHRASE}
          className="w-full py-2.5 text-sm font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Permanently Delete Everything
        </button>
      </FieldCard>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const panelMap: Record<string, React.ReactNode> = {
    general: <GeneralPanel />,
    security: <SecurityPanel />,
    alerts: <AlertsPanel />,
    integrations: <IntegrationsPanel />,
    danger: <DangerPanel />,
  };

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="container mx-auto space-y-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-surface-container">
          <div>
            <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              System Configuration
            </h1>
            <p className="text-sm text-on-surface-variant mt-1.5 font-medium">
              Manage hospital integration parameters, alerts, and system
              policies.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-2">
              <Undo2 size={15} /> Discard
            </button>
            <button
              onClick={handleSave}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 shadow-sm transition-all
                ${saved ? "bg-green-600" : "bg-primary hover:opacity-90"}`}
            >
              <Save size={15} />
              {saved ? "Saved!" : "Save Configuration"}
            </button>
          </div>
        </div>

        {/* ── Tab Bar (horizontal scroll on mobile, vertical on md+) ── */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs — horizontal + scrollable on small, vertical on md+ */}
          <nav
            aria-label="Settings navigation"
            className="
              flex flex-row overflow-x-auto md:overflow-x-visible
              md:flex-col
              gap-1 shrink-0
              md:w-52
              pb-1 md:pb-0
              scrollbar-none
            "
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap
                    transition-all shrink-0
                    ${
                      tab.danger
                        ? isActive
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "text-red-500 hover:bg-red-50"
                        : isActive
                          ? "bg-surface-container text-primary"
                          : "text-on-surface-variant hover:bg-surface-container/50"
                    }
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {isActive && !tab.danger && (
                    <ChevronRight
                      size={14}
                      className="ml-auto hidden md:block text-primary"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Panel */}
          <div className="flex-1 min-w-0">{panelMap[activeTab]}</div>
        </div>
      </div>
    </div>
  );
}
