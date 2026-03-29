export default function Topbar() {
  return (
    <header className="w-full sticky top-0 z-40 bg-surface/80 backdrop-blur-md font-headline antialiased flex justify-between items-center px-6 py-3 border-b border-surface-container">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] transition-colors group-focus-within:text-primary">search</span>
          <input 
            type="text" 
            placeholder="Search donors, requests, or blood types..." 
            className="w-full pl-12 pr-4 py-2.5 bg-surface-container-highest border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/70 focus:bg-surface-container-lowest outline-none shadow-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors relative flex items-center justify-center">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
        </button>
        
        <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined">settings</span>
        </button>
        
        <div className="h-8 w-[1px] bg-outline-variant/30 mx-2"></div>
        
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block group-hover:opacity-80 transition-opacity">
            <p className="text-sm font-bold text-on-surface leading-none">Admin User</p>
            <p className="text-[11px] text-on-surface-variant font-medium mt-1">Super Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden bg-primary-container/10 flex items-center justify-center text-primary group-hover:border-primary/40 transition-colors">
             <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </div>
        </div>
      </div>
    </header>
  );
}
