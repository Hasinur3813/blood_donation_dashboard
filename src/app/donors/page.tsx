export default function Donors() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">Donor Management</h1>
          <p className="text-on-surface-variant mt-2 text-sm font-medium">Monitor and manage the lifeblood of our operation. Keep the ledger accurate, updated, and ready for critical requests.</p>
        </div>
        <button className="bg-primary hover:opacity-90 transition-opacity text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-md shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Register New Donor
        </button>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-transparent hover:border-blue-500 transition-colors">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Total Donors</p>
          <div className="flex items-end gap-3 mt-2">
            <h3 className="font-headline text-3xl font-extrabold">1,284</h3>
            <span className="text-xs font-bold text-blue-600 mb-1">+12%</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-transparent hover:border-emerald-500 transition-colors">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Active Now</p>
          <div className="flex items-end gap-3 mt-2">
            <h3 className="font-headline text-3xl font-extrabold">842</h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 mb-2"></span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-transparent hover:border-primary transition-colors">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Critical Stock</p>
          <div className="flex items-end gap-3 mt-2">
            <h3 className="font-headline text-3xl font-extrabold text-error">O-</h3>
            <span className="text-xs font-bold text-error mb-1">Low</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-transparent hover:border-on-surface transition-colors">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Last 24H</p>
          <div className="flex items-end gap-3 mt-2">
            <h3 className="font-headline text-3xl font-extrabold">42</h3>
            <span className="text-xs font-medium text-on-surface-variant mb-1">Units</span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="flex gap-4 p-4 bg-surface-container-lowest rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] opacity-70">
        <div className="flex-1 bg-surface-container px-4 py-2 rounded-lg flex items-center justify-between text-sm cursor-pointer hover:bg-surface-container-high transition-colors text-on-surface font-medium">
          <div className="flex gap-2 items-center"><span className="material-symbols-outlined text-[18px]">filter_list</span> All Blood Groups</div>
          <span className="material-symbols-outlined text-[18px]">expand_more</span>
        </div>
        <div className="flex-1 bg-surface-container px-4 py-2 rounded-lg flex items-center justify-between text-sm cursor-pointer hover:bg-surface-container-high transition-colors text-on-surface font-medium">
          <div className="flex gap-2 items-center"><span className="material-symbols-outlined text-[18px]">location_on</span> All Locations</div>
          <span className="material-symbols-outlined text-[18px]">expand_more</span>
        </div>
        <div className="flex-1 bg-surface-container px-4 py-2 rounded-lg flex items-center justify-between text-sm cursor-pointer hover:bg-surface-container-high transition-colors text-on-surface font-medium">
          <div className="flex gap-2 items-center"><span className="material-symbols-outlined text-[18px]">calendar_today</span> Last Donation</div>
          <span className="material-symbols-outlined text-[18px]">expand_more</span>
        </div>
        <button className="px-6 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">
          Clear Filters
        </button>
      </section>

      {/* Donors List */}
      <section className="bg-surface-container-lowest rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] overflow-hidden p-8">
        <div className="w-full">
          {/* Header Row */}
          <div className="grid grid-cols-5 text-[11px] uppercase tracking-widest font-bold text-on-surface-variant mb-6 px-4">
            <div>Donor Name</div>
            <div>Blood Group</div>
            <div>Location</div>
            <div>Last Donation</div>
            <div>Status</div>
          </div>

          {/* Rows (Borderless, spaced) */}
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-5 items-center p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">JB</div>
                 <div>
                   <p className="font-bold text-sm">Julian Black</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">ID: #BL-8821</p>
                 </div>
              </div>
              <div><span className="px-3 py-1.5 rounded-full bg-secondary-fixed text-primary text-xs font-bold">O Positive</span></div>
              <div className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-[16px] text-on-surface-variant">location_on</span> Downtown Clinic</div>
              <div className="text-sm font-medium">Oct 12, 2023</div>
              <div className="flex items-center gap-2 text-sm font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available</div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-5 items-center p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">ER</div>
                 <div>
                   <p className="font-bold text-sm">Elena Rodriguez</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">ID: #BL-7204</p>
                 </div>
              </div>
              <div><span className="px-3 py-1.5 rounded-full bg-secondary-fixed text-primary text-xs font-bold">AB Negative</span></div>
              <div className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-[16px] text-on-surface-variant">location_on</span> North General</div>
              <div className="text-sm font-medium">Jan 04, 2024</div>
              <div className="flex items-center gap-2 text-sm font-bold text-on-surface-variant"><span className="w-2 h-2 rounded-full bg-outline-variant"></span> Busy</div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-5 items-center p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">MC</div>
                 <div>
                   <p className="font-bold text-sm">Marcus Chen</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">ID: #BL-9910</p>
                 </div>
              </div>
              <div><span className="px-3 py-1.5 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold">B Positive</span></div>
              <div className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-[16px] text-on-surface-variant">location_on</span> Westside Medical</div>
              <div className="text-sm font-medium">Nov 28, 2023</div>
              <div className="flex items-center gap-2 text-sm font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available</div>
            </div>
            
             {/* Row 4 */}
            <div className="grid grid-cols-5 items-center p-4 rounded-xl bg-surface hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700">SM</div>
                 <div>
                   <p className="font-bold text-sm">Sarah Miller</p>
                   <p className="text-[11px] text-on-surface-variant mt-0.5">ID: #BL-4456</p>
                 </div>
              </div>
              <div><span className="px-3 py-1.5 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold">A Negative</span></div>
              <div className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-[16px] text-on-surface-variant">location_on</span> Downtown Clinic</div>
              <div className="text-sm font-medium">Feb 10, 2024</div>
              <div className="flex items-center gap-2 text-sm font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-outline-variant/10">
            <p className="text-xs text-on-surface-variant font-medium">Showing 4 of 1,284 donors</p>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-highest text-sm text-on-surface-variant flex items-center justify-center"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
              <button className="w-8 h-8 rounded bg-primary text-white font-bold text-sm flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded hover:bg-surface-container text-sm font-bold text-on-surface flex items-center justify-center">2</button>
              <button className="w-8 h-8 rounded hover:bg-surface-container text-sm font-bold text-on-surface flex items-center justify-center">3</button>
              <span className="w-8 h-8 flex items-center justify-center text-on-surface-variant text-sm">...</span>
              <button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-highest text-sm text-on-surface-variant flex items-center justify-center"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
