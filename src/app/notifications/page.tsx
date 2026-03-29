export default function Notifications() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">Communication Hub</h1>
          <p className="text-on-surface-variant mt-2 text-sm font-medium">Dispatch vital information to your donor network or internal teams with clinical precision.</p>
        </div>
        <div className="bg-surface-container-lowest px-6 py-3 rounded-xl border border-outline-variant/20 shadow-sm flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-tertiary-fixed/30 flex justify-center items-center text-tertiary">
             <span className="material-symbols-outlined text-[20px]">send</span>
           </div>
           <div>
             <h3 className="font-headline font-extrabold text-2xl leading-none">1,284</h3>
             <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mt-1">MESSAGES SENT (MTD)</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Compose Section */}
         <section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(25,28,29,0.03)] border border-surface-container max-w-2xl border-l-4 border-l-primary">
            <h3 className="font-headline text-2xl font-bold mb-8">Compose Broadcast</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-3">Target Audience</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                   <div className="border-2 border-primary bg-secondary-fixed/10 p-4 rounded-xl text-center cursor-pointer">
                      <span className="material-symbols-outlined text-primary mb-2">groups</span>
                      <p className="text-xs font-bold text-primary">All Donors</p>
                   </div>
                   <div className="border hover:border-surface-container-high bg-surface-container-low/50 p-4 rounded-xl text-center cursor-pointer transition-colors">
                      <span className="material-symbols-outlined text-on-surface-variant mb-2">warning</span>
                      <p className="text-xs font-bold text-on-surface-variant">O- Negative</p>
                   </div>
                   <div className="border hover:border-surface-container-high bg-surface-container-low/50 p-4 rounded-xl text-center cursor-pointer transition-colors">
                      <span className="material-symbols-outlined text-on-surface-variant mb-2">badge</span>
                      <p className="text-xs font-bold text-on-surface-variant">Staff Only</p>
                   </div>
                   <div className="border hover:border-surface-container-high bg-surface-container-low/50 p-4 rounded-xl text-center cursor-pointer transition-colors">
                      <span className="material-symbols-outlined text-on-surface-variant mb-2">location_on</span>
                      <p className="text-xs font-bold text-on-surface-variant">Regional</p>
                   </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-3">Notification Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Urgent: Blood Shortage in Downtown Branch" 
                  className="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-xl px-4 py-3 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-3">Message Content</label>
                <textarea 
                  placeholder="Compose your life-saving message here..." 
                  className="w-full h-32 bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-xl px-4 py-3 text-sm transition-all resize-none"
                ></textarea>
              </div>

              <div className="bg-secondary-fixed/30 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
                 <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-error text-white flex justify-center items-center">
                       <span className="material-symbols-outlined text-[16px]">priority_high</span>
                    </div>
                    <div>
                       <p className="text-sm font-bold text-error">Mark as High Priority</p>
                       <p className="text-xs text-on-surface-variant mt-0.5">Triggers push notifications and SMS bypass</p>
                    </div>
                 </div>
                 {/* CSS Toggle switch implementation */}
                 <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" style={{ right: 0, borderColor: '#eceeef' }}/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container-high cursor-pointer"></label>
                 </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-primary/20 mt-4 flex justify-center items-center gap-2 text-lg">
                 <span className="material-symbols-outlined">send</span>
                 Dispatch Notification
              </button>
            </div>
         </section>

         {/* History Section */}
         <section>
            <div className="flex justify-between items-center mb-6 px-2">
               <h3 className="font-headline font-bold text-xl">Recent History</h3>
               <span className="text-sm font-bold text-primary cursor-pointer hover:underline">View All</span>
            </div>
            
            <div className="space-y-4">
               {/* Note Card */}
               <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 relative">
                  <div className="flex justify-between items-start mb-4">
                     <span className="bg-secondary-fixed/50 text-error px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase">Urgent</span>
                     <span className="text-xs font-bold text-on-surface-variant">2h ago</span>
                  </div>
                  <h4 className="font-bold text-on-surface mb-2">Critical O- Supply Shortage</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Immediate donations needed at Metropolitan Center. All eligible O- donors are requested to visit within 24 hours.</p>
                  
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-outline-variant/10">
                     <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                           <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-white"></div>
                           <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-white"></div>
                           <div className="w-6 h-6 rounded-full bg-outline-variant border-2 border-white"></div>
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant">842 Recipient(s)</span>
                     </div>
                     <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  </div>
               </div>

               {/* Note Card */}
               <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 relative">
                  <div className="flex justify-between items-start mb-4">
                     <span className="bg-tertiary-fixed/30 text-tertiary px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase">Update</span>
                     <span className="text-xs font-bold text-on-surface-variant">Yesterday</span>
                  </div>
                  <h4 className="font-bold text-on-surface mb-2">New Donation Tracking Feature</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">The BloodLink app now allows you to track your donation from storage to clinical use.</p>
                  
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-outline-variant/10">
                     <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                           <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-white"></div>
                           <div className="w-6 h-6 rounded-full bg-outline-variant border-2 border-white"></div>
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant">12.4k Recipient(s)</span>
                     </div>
                     <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  </div>
               </div>
            </div>
         </section>
      </div>
    </div>
  );
}
