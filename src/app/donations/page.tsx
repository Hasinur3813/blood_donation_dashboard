export default function Donations() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">Central Registry</p>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">Donations Ledger</h1>
          <p className="text-on-surface-variant mt-2 text-sm font-medium">Maintaining clinical precision in the flow of life-saving units across the network.</p>
        </div>
        <div className="flex items-center bg-surface-container rounded-lg p-1">
          <button className="px-4 py-1.5 text-sm font-bold bg-surface-container-lowest text-on-surface rounded shadow-sm">All Time</button>
          <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Pending</button>
          <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Verified</button>
        </div>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-t-2 border-transparent hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-secondary-fixed text-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">water_drop</span>
            </div>
            <span className="text-[10px] font-bold text-tertiary">+12.4%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Monthly Units</p>
            <div className="flex items-baseline gap-1">
               <h3 className="font-headline text-4xl font-extrabold text-on-surface">1,284</h3>
               <span className="text-on-surface-variant font-medium">ml</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-t-2 border-transparent hover:border-tertiary transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-tertiary-fixed text-tertiary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">pending_actions</span>
            </div>
            <span className="text-[10px] font-bold text-error">Priority</span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Pending Verification</p>
            <div className="flex items-baseline gap-1">
               <h3 className="font-headline text-4xl font-extrabold text-on-surface">42</h3>
               <span className="text-on-surface-variant font-medium text-sm">records</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-t-2 border-transparent hover:border-on-surface transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-surface-container text-on-surface-variant rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Active Locations</p>
            <div className="flex items-baseline gap-1">
               <h3 className="font-headline text-4xl font-extrabold text-on-surface">18</h3>
               <span className="text-on-surface-variant font-medium text-sm">centers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ledger Table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
           <h3 className="font-headline font-bold text-lg">Recent Activity</h3>
           <div className="bg-surface py-2 px-4 rounded-lg flex items-center gap-2 text-sm font-medium text-on-surface border border-outline-variant/20 shadow-sm cursor-pointer hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Jan 01, 2024 - Jan 30, 2024
           </div>
        </div>
        <div className="p-8 w-full">
          {/* Header Row */}
          <div className="grid grid-cols-5 text-[11px] uppercase tracking-widest font-bold text-on-surface-variant mb-6 px-4">
            <div>Donor Name</div>
            <div>Date & Time</div>
            <div>Blood Type</div>
            <div>Location</div>
            <div>Status</div>
          </div>

          {/* Rows */}
          <div className="space-y-2">
            
            <div className="grid grid-cols-5 items-center p-4 rounded-xl border border-transparent hover:border-surface-container-highest hover:bg-surface/50 transition-colors group cursor-pointer">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center font-bold text-primary text-xs">SM</div>
                 <div>
                   <p className="font-bold text-sm text-on-surface">Sarah Mitchell</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">ID: #DL-9021</p>
                 </div>
              </div>
              <div className="text-sm font-medium">
                 <div>Oct 24, 2023</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">09:15 AM</div>
              </div>
              <div><span className="w-8 h-8 flex items-center justify-center rounded bg-secondary-fixed/80 text-primary font-black text-xs shadow-sm">A+</span></div>
              <div className="text-sm font-medium">
                 <div className="text-on-surface truncate">St. Jude's Medical</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">Central Wing, Floor 4</div>
              </div>
              <div className="text-sm font-bold flex items-center justify-between w-full">
                 <span className="bg-emerald-100/50 text-emerald-700 px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified</span>
                 <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[20px]">open_in_new</span></button>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center p-4 rounded-xl border border-transparent hover:border-surface-container-highest hover:bg-surface/50 transition-colors group cursor-pointer">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-tertiary-fixed/30 flex items-center justify-center font-bold text-tertiary text-xs">RK</div>
                 <div>
                   <p className="font-bold text-sm text-on-surface">Robert Kincaid</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">ID: #DL-8842</p>
                 </div>
              </div>
              <div className="text-sm font-medium">
                 <div>Oct 23, 2023</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">02:30 PM</div>
              </div>
              <div><span className="w-8 h-8 flex items-center justify-center rounded bg-secondary-fixed text-primary font-black text-xs shadow-sm">O-</span></div>
              <div className="text-sm font-medium">
                 <div className="text-on-surface truncate">Community Bank</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">Mobile Unit 4</div>
              </div>
              <div className="text-sm font-bold flex items-center justify-between w-full">
                 <span className="bg-orange-100/50 text-orange-700 px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Processing</span>
                 <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[20px]">open_in_new</span></button>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center p-4 rounded-xl border border-transparent hover:border-surface-container-highest hover:bg-surface/50 transition-colors group cursor-pointer">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-on-surface text-xs">EC</div>
                 <div>
                   <p className="font-bold text-sm text-on-surface">Elena Chen</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">ID: #DL-7731</p>
                 </div>
              </div>
              <div className="text-sm font-medium">
                 <div>Oct 22, 2023</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">11:00 AM</div>
              </div>
              <div><span className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-highest font-black text-xs shadow-sm">B+</span></div>
              <div className="text-sm font-medium">
                 <div className="text-on-surface truncate">East-Side General</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">Trauma Center</div>
              </div>
              <div className="text-sm font-bold flex items-center justify-between w-full">
                 <span className="bg-emerald-100/50 text-emerald-700 px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified</span>
                 <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[20px]">open_in_new</span></button>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center p-4 rounded-xl border border-transparent hover:border-surface-container-highest hover:bg-surface/50 transition-colors group cursor-pointer opacity-70">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center font-bold text-error text-xs">JD</div>
                 <div>
                   <p className="font-bold text-sm text-on-surface line-through">James Donovan</p>
                   <p className="text-[11px] text-error mt-0.5">ID: #DL-4410</p>
                 </div>
              </div>
              <div className="text-sm font-medium">
                 <div className="line-through">Oct 22, 2023</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">08:45 AM</div>
              </div>
              <div><span className="w-8 h-8 flex items-center justify-center rounded bg-secondary-fixed text-primary font-black text-xs shadow-sm">AB+</span></div>
              <div className="text-sm font-medium">
                 <div className="text-on-surface truncate">Metro Health Hub</div>
              </div>
              <div className="text-sm font-bold flex items-center justify-between w-full">
                 <span className="bg-error/10 text-error px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-error"></span> Rejected</span>
                 <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[20px]">open_in_new</span></button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
