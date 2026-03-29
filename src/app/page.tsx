"use client";

import Link from "next/link";

export default function DashboardOverview() {
  return (
    <>
      {/* Emergency Alert Banner */}
      <section className="bg-error/5 border-l-4 border-error p-6 rounded-xl flex items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="min-w-12 h-12 rounded-full bg-error flex items-center justify-center text-white animate-[pulse_2s_ease-in-out_infinite]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-error">Critical Supply Shortage: O-Negative</h2>
            <p className="text-on-surface-variant text-sm mt-1">Stock levels have fallen below 15%. Immediate action required for the Central Region Blood Bank.</p>
          </div>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 whitespace-nowrap shadow-md shadow-primary/20">
          Dispatch Alert
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </section>

      {/* Summary Cards Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Donors */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] group hover:translate-y-[-4px] transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="text-xs font-bold text-tertiary bg-tertiary-fixed/40 px-2 py-1 rounded-full">+12% vs last month</span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium">Total Donors</p>
          <h3 className="font-headline text-3xl font-extrabold text-on-surface mt-1">12,842</h3>
          <div className="mt-4 h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-tertiary w-3/4 rounded-full"></div>
          </div>
        </div>

        {/* Active Donors */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] group hover:translate-y-[-4px] transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">Active Status</span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium">Active Donors</p>
          <h3 className="font-headline text-3xl font-extrabold text-on-surface mt-1">4,291</h3>
          <div className="mt-4 h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-1/2 rounded-full"></div>
          </div>
        </div>

        {/* Total Requests */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] group hover:translate-y-[-4px] transition-transform duration-300 border-l-4 border-primary">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-fixed text-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">emergency</span>
            </div>
            <span className="text-xs font-bold text-primary bg-secondary-fixed/50 px-2 py-1 rounded-full">High Urgency</span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium">Total Requests</p>
          <h3 className="font-headline text-3xl font-extrabold text-on-surface mt-1">842</h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium"><strong className="text-primary font-bold">45</strong> pending today</span>
          </div>
        </div>

        {/* Fulfilled Requests */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] group hover:translate-y-[-4px] transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-full border border-purple-100">94% Success</span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium">Fulfilled Requests</p>
          <h3 className="font-headline text-3xl font-extrabold text-on-surface mt-1">792</h3>
          <div className="mt-4 h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 w-[94%] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Tables Section */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Recent Blood Requests */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] overflow-hidden flex flex-col">
          <div className="p-8 flex justify-between items-center border-b border-surface-container-low">
            <h3 className="font-headline text-xl font-bold text-on-surface">Recent Blood Requests</h3>
            <Link href="/requests" className="text-primary text-sm font-bold hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-on-surface-variant text-[11px] uppercase tracking-widest font-bold">
                <tr>
                  <th className="px-8 py-4 font-bold">Patient/Hospital</th>
                  <th className="px-4 py-4 font-bold">Type</th>
                  <th className="px-4 py-4 font-bold">Urgency</th>
                  <th className="px-4 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="font-bold text-sm text-on-surface">City General Hospital</div>
                    <div className="text-[11px] text-on-surface-variant font-medium mt-0.5">Request #REQ-8429</div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="px-2 py-1 bg-secondary-fixed text-primary text-xs font-bold rounded">O-</span>
                  </td>
                  <td className="px-4 py-5">
                    <span className="flex items-center gap-1.5 text-xs text-error font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                      Emergency
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <span className="text-[11px] font-bold px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed-variant">Pending</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center ml-auto">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="font-bold text-sm text-on-surface">Sarah Jenkins</div>
                    <div className="text-[11px] text-on-surface-variant font-medium mt-0.5">Request #REQ-8427</div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="px-2 py-1 bg-tertiary-fixed/50 text-tertiary text-xs font-bold rounded">A+</span>
                  </td>
                  <td className="px-4 py-5">
                    <span className="flex items-center gap-1.5 text-xs text-on-surface-variant font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/40"></span>
                      Normal
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <span className="text-[11px] font-bold px-2 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant">Processing</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center ml-auto">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="font-bold text-sm text-on-surface">Metropolitan Clinic</div>
                    <div className="text-[11px] text-on-surface-variant font-medium mt-0.5">Request #REQ-8425</div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded">B+</span>
                  </td>
                  <td className="px-4 py-5">
                    <span className="flex items-center gap-1.5 text-xs text-orange-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                      Urgent
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <span className="text-[11px] font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-700">Fulfilled</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center ml-auto">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Donor Registrations */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] overflow-hidden">
          <div className="p-8 flex justify-between items-center border-b border-surface-container-low mb-6">
            <h3 className="font-headline text-xl font-bold text-on-surface">New Donors</h3>
            <Link href="/donors" className="text-primary text-sm font-bold hover:underline">Manage Directory</Link>
          </div>
          <div className="px-8 pb-8 space-y-4">
            
            <div className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container-low/70 transition-colors rounded-xl cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">DM</div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">David Miller</h4>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Registered 2 hours ago • New York</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center bg-surface-container-lowest py-1.5 px-3 rounded-lg border border-outline-variant/20 shadow-sm group-hover:border-primary/20 transition-colors">
                  <span className="block text-primary font-black text-sm leading-tight">O+</span>
                  <span className="block text-[8px] uppercase font-bold text-on-surface-variant mt-0.5">Type</span>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container-low/70 transition-colors rounded-xl cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary font-bold">SC</div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Sophia Chen</h4>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Registered 5 hours ago • Seattle</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center bg-surface-container-lowest py-1.5 px-3 rounded-lg border border-outline-variant/20 shadow-sm group-hover:border-primary/20 transition-colors">
                  <span className="block text-primary font-black text-sm leading-tight">AB-</span>
                  <span className="block text-[8px] uppercase font-bold text-on-surface-variant mt-0.5">Type</span>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container-low/70 transition-colors rounded-xl cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold">MT</div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Marcus Thompson</h4>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Registered 1 day ago • Chicago</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center bg-surface-container-lowest py-1.5 px-3 rounded-lg border border-outline-variant/20 shadow-sm group-hover:border-primary/20 transition-colors">
                  <span className="block text-primary font-black text-sm leading-tight">A+</span>
                  <span className="block text-[8px] uppercase font-bold text-on-surface-variant mt-0.5">Type</span>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
