export default function Requests() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">Blood Requests</h1>
          <p className="text-on-surface-variant mt-2 text-sm font-medium">Real-time patient requirements and logistics management.</p>
        </div>
        <button className="bg-primary hover:opacity-90 transition-opacity text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-md shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Request
        </button>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border border-primary/20 flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-error/10 text-error rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">emergency</span>
            </div>
            <span className="text-[10px] font-bold text-error bg-error/10 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Active Emergencies</p>
            <h3 className="font-headline text-4xl font-black text-on-surface">14</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">hourglass_empty</span>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-highest px-2 py-1 rounded-full">Static</span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Pending Approval</p>
            <h3 className="font-headline text-4xl font-black text-on-surface">28</h3>
          </div>
        </div>

        <div className="bg-tertiary p-6 rounded-xl shadow-[0px_20px_40px_rgba(0,128,151,0.2)] text-white relative overflow-hidden group">
          <div className="absolute right-[-20%] top-[-20%] w-64 h-64 bg-tertiary-container/30 rounded-full blur-3xl group-hover:bg-tertiary-container/50 transition-colors"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-6">
               <div className="w-10 h-10 bg-white/20 text-white rounded-lg flex items-center justify-center backdrop-blur-md">
                 <span className="material-symbols-outlined">inventory</span>
               </div>
               <div className="flex gap-2">
                 <span className="text-[10px] font-bold text-white bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">A+ Critical</span>
                 <span className="text-[10px] font-bold text-white bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">O- Stable</span>
               </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white/80 mb-1">Global Supply Pulse</p>
              <h3 className="font-headline text-4xl font-black">82% Capacity</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl shadow-sm">
         <h3 className="font-headline font-bold text-lg px-2">Request Queue</h3>
         <div className="flex gap-2">
           <button className="px-5 py-2 text-sm bg-surface-container hover:bg-surface-container-highest transition-colors font-bold rounded-lg text-on-surface-variant">Filter</button>
           <button className="px-5 py-2 text-sm bg-surface-container hover:bg-surface-container-highest transition-colors font-bold rounded-lg text-on-surface-variant">Export CSV</button>
         </div>
      </section>

      {/* Requests List */}
      <section className="bg-surface-container-lowest rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] overflow-hidden p-8">
        <div className="w-full">
          {/* Header Row */}
          <div className="grid grid-cols-6 text-[11px] uppercase tracking-widest font-bold text-on-surface-variant mb-6 px-4">
            <div className="col-span-2">Patient Details</div>
            <div>Group</div>
            <div>Location</div>
            <div>Alert Level</div>
            <div>Status</div>
          </div>

          {/* Rows (Borderless, spaced) */}
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-6 items-center p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="col-span-2 flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">EP</div>
                 <div>
                   <p className="font-bold text-sm">Elena Petrov</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">Req #BL-9042 • 12m ago</p>
                 </div>
              </div>
              <div><span className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-fixed/50 text-error font-black text-sm">A-</span></div>
              <div className="text-sm font-medium">
                 <div>Central General</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">Unit 402, ICU</div>
              </div>
              <div><span className="px-3 py-1.5 rounded-full bg-error text-white text-[10px] uppercase font-black tracking-wider flex items-center gap-1 w-max"><span className="material-symbols-outlined text-[14px]">error</span> EMERGENCY</span></div>
              <div className="text-sm font-bold flex items-center justify-between w-full">
                 <span className="flex items-center gap-1.5 text-orange-600"><span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span> Pending</span>
                 <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button className="w-8 h-8 rounded-full hover:bg-surface-container flex justify-center items-center text-on-surface"><span className="material-symbols-outlined text-[18px]">done</span></button>
                    <button className="w-8 h-8 rounded-full hover:bg-error-container text-error flex justify-center items-center"><span className="material-symbols-outlined text-[18px]">close</span></button>
                 </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-6 items-center p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="col-span-2 flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">MK</div>
                 <div>
                   <p className="font-bold text-sm">Marcus Knight</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">Req #BL-8951 • 1h ago</p>
                 </div>
              </div>
              <div><span className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container text-on-surface font-black text-sm">O+</span></div>
              <div className="text-sm font-medium">
                 <div>St. Jude Medical</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">Surgery Ward</div>
              </div>
              <div><span className="px-3 py-1.5 rounded-full bg-secondary-fixed text-primary text-[10px] uppercase font-black tracking-wider flex items-center gap-1 w-max"><span className="material-symbols-outlined text-[14px]">bolt</span> URGENT</span></div>
              <div className="text-sm font-bold flex items-center justify-between w-full">
                 <span className="flex items-center gap-1.5 text-tertiary"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Fulfilled</span>
                 <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 text-on-surface-variant">
                    <button className="w-8 h-8 rounded-full hover:bg-surface-container flex justify-center items-center"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                 </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-6 items-center p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="col-span-2 flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">SC</div>
                 <div>
                   <p className="font-bold text-sm">Sarah Chen</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">Req #BL-8922 • 3h ago</p>
                 </div>
              </div>
              <div><span className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container text-on-surface font-black text-sm">B+</span></div>
              <div className="text-sm font-medium">
                 <div>Riverside Memorial</div>
                 <div className="text-[11px] text-on-surface-variant mt-0.5">General Ward</div>
              </div>
              <div><span className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] uppercase font-black tracking-wider flex items-center gap-1 w-max"><span className="material-symbols-outlined text-[14px]">schedule</span> NORMAL</span></div>
              <div className="text-sm font-bold flex items-center justify-between w-full">
                 <span className="flex items-center gap-1.5 text-orange-600"><span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span> Pending</span>
                 <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 text-on-surface-variant">
                    <button className="w-8 h-8 rounded-full hover:bg-surface-container flex justify-center items-center text-on-surface"><span className="material-symbols-outlined text-[18px]">done</span></button>
                    <button className="w-8 h-8 rounded-full hover:bg-error-container text-error flex justify-center items-center"><span className="material-symbols-outlined text-[18px]">close</span></button>
                 </div>
              </div>
            </div>

          </div>
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-outline-variant/10">
            <p className="text-xs text-on-surface-variant font-medium">Showing 3 of 28 requests</p>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-highest text-sm text-on-surface-variant flex items-center justify-center"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
              <button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-highest text-sm text-on-surface-variant flex items-center justify-center"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
