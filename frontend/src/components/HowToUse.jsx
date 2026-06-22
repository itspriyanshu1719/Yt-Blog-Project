export default function HowToUse() {
  const steps = [
    {
      num: "1",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
      title: "Paste YouTube URL\nand choose tone.",
      desc: "Add the video link and select the tone that fits your audience."
    },
    {
      num: "2",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>,
      title: "Click Generate\nto create blog.",
      desc: "Our AI analyzes the video and generates a high-quality blog."
    },
    {
      num: "3",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
      title: "View formatted post\nand SEO details.",
      desc: "Review the blog, check SEO score, and copy or publish."
    }
  ];

  return (
    <section className="mt-8 w-full max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
      <h2 className="text-center text-2xl font-extrabold text-slate-900 mb-16 tracking-tight">How to Use This Effectively</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
        {/* Subtle vertical dividers */}
        <div className="hidden md:block absolute top-4 bottom-4 left-1/3 w-px bg-slate-200"></div>
        <div className="hidden md:block absolute top-4 bottom-4 left-2/3 w-px bg-slate-200"></div>

        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center px-6 relative mb-12 md:mb-0 group cursor-default">

            {/* Number Circle & Icon Card stacked */}
            <div className="relative mb-6 flex flex-col items-center group-hover:-translate-y-3 transition-transform duration-500">
              {/* Glowing Number on Hover */}
              <div className="w-12 h-12 rounded-full bg-stone-100 border-4 border-white shadow-sm flex items-center justify-center text-xl font-bold text-slate-400 absolute -top-5 z-10 group-hover:bg-blue-50 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors duration-500">
                {step.num}
              </div>
              {/* Floating Icon on Hover */}
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm mt-3 group-hover:shadow-xl group-hover:border-blue-50 transition-all duration-500">
                {step.icon}
              </div>
            </div>

            <h3 className="font-bold text-slate-900 text-sm mb-3 leading-snug whitespace-pre-line">{step.title}</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}