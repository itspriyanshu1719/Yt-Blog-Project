"use client";
import { useState, useRef } from 'react';

export default function HistoryCard({ item, onDelete, isDeleting }) {
  // State for the Spotlight Hover Effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // 1. YouTube Thumbnail Extraction
  const extractVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
    return match ? match[1] : null;
  };
  const videoId = extractVideoId(item.url);

  // 2. Dynamic SEO Score Colors
  const getSeoStyles = (score) => {
    const s = score || 0;
    if (s >= 80) return "bg-green-50 text-green-600 border-green-200/50";
    if (s >= 50) return "bg-amber-50 text-amber-600 border-amber-200/50";
    return "bg-red-50 text-red-600 border-red-200/50";
  };

  // 3. Tone Badge Icon generator
  const getToneIcon = (tone) => {
    const t = (tone || '').toLowerCase();
    if (t.includes('humor') || t.includes('funny')) return '🎭';
    if (t.includes('prof') || t.includes('formal')) return '💼';
    if (t.includes('casual')) return '☕';
    if (t.includes('educat') || t.includes('inform')) return '📚';
    return '✨';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${isDeleting ? 'opacity-50 scale-[0.98]' : 'opacity-100'}`}
    >

      {/* 4. The Spotlight Hover Glow Element */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.9), transparent 40%)`
        }}
      />

      {/* Main Content (Wrapped in z-10 so it sits above the spotlight) */}
      <div className="relative z-10 flex items-center gap-4">

        {/* Left Block: Dynamic YouTube Thumbnail OR Fallback Icon */}
        {videoId ? (
          <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-slate-200/50 relative bg-slate-100">
            <img
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt="YouTube Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-100/50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
        )}

        {/* Title & Details */}
        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h4>

          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            {/* Tone Badge */}
            <div className="flex items-center gap-1 bg-white/70 border border-slate-200/60 px-2 py-0.5 rounded-md shadow-sm">
              <span>{getToneIcon(item.tone)}</span>
              <span className="capitalize">{item.tone || 'Standard'}</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></span>

            {/* Date Time */}
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {item.date}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Score Pill, Trash Icon & Arrow */}
      <div className="relative z-10 flex items-center gap-3 pr-2">
        <div className={`border text-xs font-bold px-3 py-1.5 rounded-full hidden sm:block shadow-sm ${getSeoStyles(item.seoScore)}`}>
          SEO Score {item.seoScore || 0}
        </div>

        {/* The Delete Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(item.id);
          }}
          disabled={isDeleting}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors z-10"
          title="Delete Post"
        >
          {isDeleting ? (
            <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          )}
        </button>

        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-700 transition-colors ml-1">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>

    </div>
  );
}