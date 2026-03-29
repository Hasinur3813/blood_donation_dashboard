export default function Users() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">
            Users Management
          </h1>
          <p className="text-on-surface-variant mt-2 text-sm font-medium">
            Oversee the system&apos;s human network. Manage access permissions
            and clinical integrity.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container hover:bg-surface-container-high transition-colors px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold text-on-surface shadow-sm">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
            Filter View
          </button>
          <button className="bg-primary hover:opacity-90 transition-opacity text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">
              person_add
            </span>
            Invite New User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-transparent hover:border-tertiary transition-colors flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
              Active Connectivity
            </span>
            <span className="text-[10px] font-bold text-tertiary bg-tertiary-fixed px-2 py-1 rounded">
              REAL-TIME
            </span>
          </div>
          <div>
            <div className="flex items-end gap-3 mb-4">
              <h3 className="font-headline text-5xl font-extrabold text-on-surface">
                1,284
              </h3>
              <span className="text-sm font-bold text-tertiary mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  trending_up
                </span>{" "}
                +12% this month
              </span>
            </div>
            <div className="flex h-2 rounded overflow-hidden">
              <div className="bg-primary w-[45%]"></div>
              <div className="bg-tertiary w-[35%]"></div>
              <div className="bg-surface-variant w-[20%]"></div>
            </div>
            <div className="flex gap-4 mt-3 text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary"></span> DONORS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>{" "}
                REQUESTERS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-surface-variant"></span>{" "}
                STAFF
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)]">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
              Pending Verification
            </span>
          </div>
          <div className="mt-8">
            <h3 className="font-headline text-5xl font-extrabold text-on-surface">
              18
            </h3>
            <p className="text-sm text-on-surface-variant mt-4 font-medium leading-relaxed">
              Identity checks required for new donor profiles.
            </p>
          </div>
        </div>

        <div className="bg-secondary-fixed/30 p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border border-primary/10">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
              Restricted Accounts
            </span>
          </div>
          <div className="mt-8">
            <h3 className="font-headline text-5xl font-extrabold text-primary">
              4
            </h3>
            <p className="text-sm text-primary/80 mt-4 font-medium leading-relaxed hover:text-primary cursor-pointer transition-colors">
              Accounts currently under review or blocked for policy violations.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="flex gap-8 border-b border-surface-container-high pb-4 pt-4 px-2">
        <button className="text-primary font-bold border-b-2 border-primary pb-2 -mb-4.5 px-2">
          All Users
        </button>
        <button className="text-on-surface-variant font-bold hover:text-on-surface transition-colors pb-2 px-2">
          Donors
        </button>
        <button className="text-on-surface-variant font-bold hover:text-on-surface transition-colors pb-2 px-2">
          Requesters
        </button>
        <button className="text-on-surface-variant font-bold hover:text-on-surface transition-colors pb-2 px-2">
          Administrators
        </button>
      </section>

      {/* Users Table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] overflow-hidden">
        <div className="p-4 w-full">
          <div className="space-y-4">
            {/* User Row 1 */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-surface-container-highest hover:bg-surface/50 transition-colors group">
              <div className="flex gap-4 items-center w-1/4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-[24px]">
                      person
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface flex items-center gap-2">
                    Marcus Thorne{" "}
                    <span className="bg-secondary-fixed/50 text-error px-2 py-0.5 rounded text-[10px] font-black uppercase">
                      O- Negative
                    </span>
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    marcus.t@clinical-network.com
                  </p>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant mt-1.5 opacity-70">
                    ID: BL-9201 • Joined Oct 2023
                  </p>
                </div>
              </div>
              <div className="w-1/4">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant text-center mb-1">
                  Assigned Role
                </p>
                <div className="bg-surface-container-low px-4 py-2 rounded-lg flex justify-between items-center text-sm font-bold mx-auto w-3/4">
                  <span>Donor</span>
                  <span className="material-symbols-outlined text-[16px]">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="flex-1 text-center">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant text-center mb-1 flex items-center justify-center gap-1 border-r border-outline-variant/20">
                  Donations
                </p>
                <p className="font-headline text-2xl font-bold border-r border-outline-variant/20">
                  12
                </p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant text-center mb-1">
                  Last Activity
                </p>
                <p className="text-sm font-bold text-on-surface">2 hours ago</p>
              </div>
              <div className="flex justify-end gap-2 pr-4">
                <button className="w-10 h-10 rounded hover:bg-surface-container flex justify-center items-center text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="w-10 h-10 rounded hover:bg-surface-container flex justify-center items-center text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined">block</span>
                </button>
                <button className="w-10 h-10 rounded hover:bg-surface-container flex justify-center items-center text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            {/* User Row 2 */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-surface-container-highest hover:bg-surface/50 transition-colors group">
              <div className="flex gap-4 items-center w-1/4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-[24px]">
                      person
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-surface-variant rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface flex items-center gap-2">
                    Sarah Jenkins{" "}
                    <span className="bg-tertiary-fixed/30 text-tertiary px-2 py-0.5 rounded text-[10px] font-black uppercase">
                      Requester
                    </span>
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    s.jenkins@hospital.org
                  </p>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant mt-1.5 opacity-70">
                    ID: BL-8842 • Joined Jan 2024
                  </p>
                </div>
              </div>
              <div className="w-1/4">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant text-center mb-1">
                  Assigned Role
                </p>
                <div className="bg-surface-container-low px-4 py-2 rounded-lg flex justify-between items-center text-sm font-bold mx-auto w-3/4">
                  <span>Requester</span>
                  <span className="material-symbols-outlined text-[16px]">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="flex-1 text-center">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant text-center mb-1 flex items-center justify-center gap-1 border-r border-outline-variant/20">
                  Requests
                </p>
                <p className="font-headline text-2xl font-bold border-r border-outline-variant/20">
                  4
                </p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant text-center mb-1">
                  Last Activity
                </p>
                <p className="text-sm font-bold text-on-surface">1 day ago</p>
              </div>
              <div className="flex justify-end gap-2 pr-4">
                <button className="w-10 h-10 rounded hover:bg-surface-container flex justify-center items-center text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="w-10 h-10 rounded hover:bg-surface-container flex justify-center items-center text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined">block</span>
                </button>
                <button className="w-10 h-10 rounded hover:bg-surface-container flex justify-center items-center text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            {/* User Row 3 - Blocked */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-secondary-fixed/10 hover:bg-secondary-fixed/20 transition-colors group">
              <div className="flex gap-4 items-center w-1/4 opacity-60">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-on-surface-variant text-sm border-2 border-surface">
                    <span className="material-symbols-outlined text-[24px]">
                      person
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[8px] text-white font-bold">
                      close
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface flex items-center gap-2">
                    Kevin O'Neil{" "}
                    <span className="bg-secondary-fixed text-primary px-2 py-0.5 rounded text-[10px] font-black uppercase">
                      Blocked
                    </span>
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    k.oneil@mail.com
                  </p>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant mt-1.5 opacity-70">
                    ID: BL-7104 • Joined Aug 2022
                  </p>
                </div>
              </div>
              <div className="w-1/4 opacity-60">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant text-center mb-1">
                  Assigned Role
                </p>
                <div className="bg-surface-container-high px-4 py-2 rounded-lg flex justify-between items-center text-sm font-bold mx-auto w-3/4">
                  <span>Donor</span>
                  <span className="material-symbols-outlined text-[16px]">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="flex-1 text-center opacity-60">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant text-center mb-1 flex items-center justify-center gap-1 border-r border-outline-variant/20">
                  Donations
                </p>
                <p className="font-headline text-2xl font-bold border-r border-outline-variant/20 text-on-surface-variant">
                  0
                </p>
              </div>
              <div className="flex-1 text-center opacity-60">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant text-center mb-1">
                  Last Activity
                </p>
                <p className="text-sm font-bold text-on-surface-variant">
                  6 months ago
                </p>
              </div>
              <div className="flex justify-end gap-2 pr-4">
                <button className="bg-primary hover:bg-primary-container text-white px-4 py-2 rounded text-sm font-bold shadow-sm transition-colors w-[150px]">
                  Unblock Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
