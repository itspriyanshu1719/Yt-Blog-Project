"use client";
import { useState, useEffect } from 'react';

import HistoryCard from './HistoryCard';

export default function HistoryList({ posts = [], onOpenModal }) {
  // Manage local state for immediate deletion
  const [postList, setPostList] = useState(posts);
  const [deletingId, setDeletingId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // 🚨 THE FIX: Listen for when the Home Page finishes fetching and updates the props
  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove it from the UI instantly
        setPostList(postList.filter(post => post.id !== id));
        // Show success toast
        setToastMsg("Post deleted successfully");
        setTimeout(() => setToastMsg(''), 3000);
      } else {
        console.error("Failed to delete from server");
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
    setDeletingId(null);
  };

  return (
    <section className="w-full mt-10 relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/40 border border-slate-800/80">

      {/* Glamorous 3D Background Image & Spotlight Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/hero-bg.png"
          alt="3D Background"
          className="w-full h-full object-cover object-center opacity-50 contrast-125 saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/60 to-slate-950/90"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8">

        {/* Go Back Button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 mb-6 transition-all shadow-sm w-fit border border-white/10"
        >
          <span className="text-xl leading-none mb-0.5">←</span> Go Back
        </a>

        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tighter drop-shadow-sm">
              History
            </h2>
            <p className="text-sm text-slate-400 font-medium tracking-wide mt-1.5">
              Your previously generated blog posts.
            </p>
          </div>
          <a href="/history" className="text-xs font-bold text-white hover:bg-white/20 border border-white/20 bg-white/10 px-4 py-2 rounded-full shadow-sm transition-all flex items-center gap-2">
            View All <span className="text-slate-300">&gt;</span>
          </a>
        </div>

        {/* Glassmorphism Empty State */}
        {postList.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm mt-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">No posts yet</h3>
            <p className="text-slate-400 text-sm max-w-sm mb-6">Your history is currently empty. Start by converting your first YouTube video into a blog post!</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onOpenModal) onOpenModal();
              }}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-2.5 px-6 rounded-full transition-all text-sm flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
              Generate First Post
            </button>
          </div>
        )}

        {/* History Cards Mapping */}
        <div className="flex flex-col gap-3">
          {postList.map((item) => (
            <a key={item.id} href={`/history/${item.id}`} className="block">
              <HistoryCard
                item={{
                  id: item.id,
                  title: item.title,
                  date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                  time: new Date(item.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                  seoScore: item.seo_score || 0,
                  url: item.url,    // CRUCIAL ADDITION: For Thumbnails
                  tone: item.tone   // CRUCIAL ADDITION: For Tone Badges
                }}
                onDelete={handleDelete}
                isDeleting={deletingId === item.id}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50 border border-slate-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span className="font-bold text-sm">{toastMsg}</span>
        </div>
      )}
    </section>
  );
}