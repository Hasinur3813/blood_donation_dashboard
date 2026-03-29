export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">Reports & Analytics</h1>
          <p className="text-on-surface-variant mt-2 text-sm font-medium">Operational insights and performance tracking for the blood donation supply chain.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-surface-container hover:bg-surface-container-high transition-colors px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold text-on-surface shadow-sm">
             <span className="material-symbols-outlined text-[20px]">calendar_month</span>
             Last 30 Days
           </button>
           <button className="bg-primary hover:opacity-90 transition-opacity text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-md shadow-primary/20">
             <span className="material-symbols-outlined text-[20px]">download</span>
             Export Report
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-primary">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-secondary-fixed/50 text-error rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">+12.4%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Monthly Donations</p>
            <h3 className="font-headline text-3xl font-extrabold text-on-surface">1,284</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-tertiary">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-tertiary-fixed/30 text-tertiary rounded-xl flex items-center justify-center">
               <span className="material-symbols-outlined text-[20px]">water_drop</span>
            </div>
            <span className="text-[10px] font-bold text-error bg-error/10 px-2 py-1 rounded">-3.2%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Pending Requests</p>
            <h3 className="font-headline text-3xl font-extrabold text-on-surface">42</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-primary">
          <div className="flex justify-between items-start mb-6">
             <div className="w-10 h-10 bg-secondary-fixed/30 text-primary rounded-xl flex items-center justify-center">
               <span className="material-symbols-outlined text-[20px]">pin_drop</span>
             </div>
             <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">+8.1%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Active Donors</p>
            <h3 className="font-headline text-3xl font-extrabold text-on-surface">8,420</h3>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border-b-2 border-on-surface">
          <div className="flex justify-between items-start mb-6">
             <div className="w-10 h-10 bg-surface-container-highest text-on-surface rounded-xl flex items-center justify-center">
               <span className="material-symbols-outlined text-[20px]">timer</span>
             </div>
             <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Fast</span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">Avg. Fulfillment</p>
            <h3 className="font-headline text-3xl font-extrabold text-on-surface">4.2h</h3>
          </div>
        </div>
      </section>

      {/* Main Charts Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Large Chart Area (Static Visual for minimalism) */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="font-headline text-xl font-bold">Monthly Donation Trends</h3>
              <p className="text-on-surface-variant text-sm mt-1">Donation volume recorded across all centers</p>
            </div>
            <div className="flex gap-4 text-sm font-bold">
               <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Current Year</div>
               <div className="flex items-center gap-2 text-on-surface-variant"><span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span> Target</div>
            </div>
          </div>
          
          <div className="h-64 w-full relative flex items-end">
             {/* Simple SVG Graph Representation */}
             <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <path d="M0,150 Q100,120 200,130 T400,80 T600,40 T800,90 L800,200 L0,200 Z" fill="rgba(183, 19, 26, 0.05)" />
                <path d="M0,150 Q100,120 200,130 T400,80 T600,40 T800,90" fill="none" stroke="#b7131a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-on-surface-variant mt-4 px-4 uppercase tracking-widest">
             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
          </div>
        </div>

        {/* Request Fulfillment Bars */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] flex flex-col justify-between">
            <div>
              <h3 className="font-headline text-xl font-bold">Request Fulfillment</h3>
              <p className="text-on-surface-variant text-sm mt-1">Supply vs Demand per blood type</p>
            </div>
            
            <div className="flex flex-col gap-6 mt-8">
               
               <div>
                 <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                    <span>O+ POSITIVE</span><span>94%</span>
                 </div>
                 <div className="w-full bg-surface-container-high h-4 rounded overflow-hidden flex">
                    <div className="bg-primary w-[94%]"></div>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                    <span>A- NEGATIVE</span><span>72%</span>
                 </div>
                 <div className="w-full bg-surface-container-high h-4 rounded overflow-hidden flex">
                    <div className="bg-secondary w-[72%]"></div>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                    <span>B+ POSITIVE</span><span>88%</span>
                 </div>
                 <div className="w-full bg-surface-container-high h-4 rounded overflow-hidden flex">
                    <div className="bg-tertiary w-[88%]"></div>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                    <span>AB- NEGATIVE</span><span>65%</span>
                 </div>
                 <div className="w-full bg-surface-container-high h-4 rounded overflow-hidden flex">
                    <div className="bg-outline-variant w-[65%]"></div>
                 </div>
               </div>

            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/20 flex gap-3 text-primary font-bold text-sm">
               <span className="material-symbols-outlined">trending_up</span>
               Efficiencies are up 14% vs last Q
            </div>
        </div>

      </section>
    </div>
  );
}
