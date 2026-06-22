export default function Navbar({ onOpenModal }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/70 backdrop-blur-lg border-b border-slate-200/50 px-6 py-4 transition-all">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">

          <div className="w-10 h-10 border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-sm bg-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>

          <div className="flex gap-6 text-sm font-bold text-slate-500">
            <a href="#" className="text-slate-950 border-b-2 border-slate-950 pb-1">About</a>
            <a href="/history" className="hover:text-slate-900 transition-colors">History</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenModal}
            className="bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Form
          </button>
        </div>
      </div>
    </nav>
  );
}