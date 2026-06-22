export default function Hero({ onOpenModal }) {
  return (
    <section className="relative flex flex-col items-center text-center pt-32 pb-32 w-full overflow-hidden mt-[-80px]">

      {/* Background Image & Gradient Fade Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Your custom local 3D background image */}
        <img
          src="/hero-bg.png"
          alt="3D Floating Shapes Background"
          className="w-full h-full object-cover object-top opacity-70 brightness-75 contrast-125"
        />
        {/* Subtle dark overlay to deepen the background */}
        <div className="absolute inset-0 bg-slate-900/10"></div>
        {/* This creates the smooth fade-to-white effect at the bottom of the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50"></div>
      </div>

      {/* Main Content (Text and Button) with Staggered Fade-Ins */}
      <div className="relative z-10 flex flex-col items-center mt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
          YouTube To Blog
        </h1>

        <p className="mt-6 text-lg text-slate-500 max-w-lg mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          Turn any YouTube video into a well-written, SEO-friendly blog post in seconds.
        </p>

        {/* AI Magic Glowing Button Container */}
        <div className="relative group mt-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">

          {/* The Glowing Animated Gradient Behind the Button */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse"></div>

          {/* The Actual Button */}
          <button
            onClick={onOpenModal}
            className="relative bg-slate-900 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-slate-800 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all duration-300 shadow-2xl flex items-center gap-3 group/btn"
          >
            {/* Pink AI Sparkle Icon with Spin on Hover */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 group-hover/btn:rotate-[15deg] group-hover/btn:scale-110 transition-all duration-300">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
            Create New Blog
          </button>
        </div>
      </div>
    </section>
  );
}