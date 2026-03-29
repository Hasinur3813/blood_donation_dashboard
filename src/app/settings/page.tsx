export default function Settings() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-surface-container pb-8">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">System Configuration</h1>
          <p className="text-on-surface-variant mt-2 text-sm font-medium">Manage hospital integration parameters, alerts, and system policies.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-surface-container hover:bg-surface-container-high transition-colors px-6 py-2.5 rounded-lg font-bold text-on-surface">Discard Changes</button>
           <button className="bg-primary hover:opacity-90 transition-opacity text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-md shadow-primary/20">
             Save Configuration
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-4">
         {/* Sidebar Navigation */}
         <nav className="md:col-span-3 space-y-2">
            <button className="w-full text-left px-4 py-3 bg-surface-container rounded-lg text-primary font-bold text-sm tracking-wide flex items-center gap-3">
               <span className="material-symbols-outlined text-[20px]">tune</span> General
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-surface-container/50 rounded-lg text-on-surface-variant font-bold text-sm tracking-wide transition-colors flex items-center gap-3 group">
               <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span> Security & Access
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-surface-container/50 rounded-lg text-on-surface-variant font-bold text-sm tracking-wide transition-colors flex items-center gap-3 group">
               <span className="material-symbols-outlined text-[20px]">notifications_active</span> Alerts & Routing
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-surface-container/50 rounded-lg text-on-surface-variant font-bold text-sm tracking-wide transition-colors flex items-center gap-3 group">
               <span className="material-symbols-outlined text-[20px]">link</span> Integrations
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-surface-container/50 rounded-lg text-error font-bold text-sm tracking-wide transition-colors mt-8 flex items-center gap-3">
               <span className="material-symbols-outlined text-[20px]">delete_forever</span> Danger Zone
            </button>
         </nav>

         {/* Configuration Forms */}
         <section className="col-span-1 md:col-span-9 space-y-12">
            
            {/* General Preferences */}
            <div>
               <h3 className="font-headline text-xl font-bold border-b border-surface-container pb-4 mb-6 text-on-surface">General Information</h3>
               
               <div className="space-y-6">
                  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-[0px_20px_40px_rgba(25,28,29,0.02)]">
                     <label className="block text-sm font-bold text-on-surface mb-2">Hospital Network Name</label>
                     <input 
                        type="text" 
                        defaultValue="Metropolitan Health System"
                        className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-lg px-4 py-2.5 text-sm transition-all"
                     />
                     <p className="text-xs text-on-surface-variant mt-2 font-medium">This name is visible across all public-facing donor portals.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-[0px_20px_40px_rgba(25,28,29,0.02)]">
                        <label className="block text-sm font-bold text-on-surface mb-2">Primary Contact Email</label>
                        <input 
                           type="email" 
                           defaultValue="admin@metrohealth.system"
                           className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-lg px-4 py-2.5 text-sm transition-all"
                        />
                     </div>
                     <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-[0px_20px_40px_rgba(25,28,29,0.02)]">
                        <label className="block text-sm font-bold text-on-surface mb-2">Emergency Hotline</label>
                        <input 
                           type="tel" 
                           defaultValue="+1 (555) 019-2843"
                           className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-lg px-4 py-2.5 text-sm transition-all"
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Application Settings Toggle Area */}
            <div>
               <h3 className="font-headline text-xl font-bold border-b border-surface-container pb-4 mb-6 text-on-surface">Operational Thresholds</h3>
               <div className="space-y-4">
                  
                  {/* Toggle Card */}
                  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-[0px_20px_40px_rgba(25,28,29,0.02)] flex items-center justify-between">
                     <div>
                        <h4 className="font-bold text-on-surface">Automated Emergency Routing</h4>
                        <p className="text-sm font-medium text-on-surface-variant mt-1">Automatically dispatch available O- units to highest priority centers.</p>
                     </div>
                     <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle1" id="toggle1" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-primary appearance-none cursor-pointer" style={{ right: 0 }}/>
                        <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-primary/30 cursor-pointer"></label>
                     </div>
                  </div>

                  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-[0px_20px_40px_rgba(25,28,29,0.02)] flex items-center justify-between">
                     <div className="flex-1">
                        <h4 className="font-bold text-on-surface">Critical Supply Low-Water Mark</h4>
                        <p className="text-sm font-medium text-on-surface-variant mt-1">Triggers system-wide warning when supply drops below this threshold.</p>
                     </div>
                     <div className="w-1/4">
                        <div className="flex bg-surface-container-low rounded-lg overflow-hidden">
                           <input 
                              type="number" 
                              defaultValue="15"
                              className="w-full bg-transparent border-none text-center focus:ring-0 font-bold"
                           />
                           <div className="bg-surface-container-high px-4 py-2 text-sm font-bold text-on-surface-variant flex items-center justify-center border-l border-outline-variant/20">%</div>
                        </div>
                     </div>
                  </div>

                  {/* Toggle Card */}
                  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-[0px_20px_40px_rgba(25,28,29,0.02)] flex items-center justify-between">
                     <div>
                        <h4 className="font-bold text-on-surface">Public Registration Portal</h4>
                        <p className="text-sm font-medium text-on-surface-variant mt-1">Allow new donors to register online via the public-facing application.</p>
                     </div>
                     <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle2" id="toggle2" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-primary appearance-none cursor-pointer" style={{ right: 0 }}/>
                        <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-primary/30 cursor-pointer"></label>
                     </div>
                  </div>

               </div>
            </div>

         </section>
      </div>
    </div>
  );
}
