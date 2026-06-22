import React from 'react';
import ReactMarkdown from 'react-markdown';

// The YouTube Icon Component
const YouTubeIcon = () => (
  <svg className="w-16 h-16 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.125-2.127C19.551 3.5 12 3.5 12 3.5s-7.551 0-9.373.559a3.016 3.016 0 0 0-2.125 2.127C0 7.937 0 12 0 12s0 4.063.502 5.814a3.016 3.016 0 0 0 2.125 2.127C4.449 20.5 12 20.5 12 20.5s7.551 0 9.373-.559a3.016 3.016 0 0 0 2.125-2.127C24 16.063 24 12 24 12s0-4.063-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const BlogResult = ({ result }) => {
  // Guard clause
  if (!result) return null;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8">
      {/* Container with the hero background image applied */}
      <div className="relative rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden bg-white border border-slate-200">
        
        {/* Layer 1: Base Hero Background */}
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{ 
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Layer 2: Repeating YouTube Logo Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none grid grid-cols-3 gap-8 p-8 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <YouTubeIcon />
            </div>
          ))}
        </div>

        {/* Brand Accent Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-rose-500 to-transparent z-10"></div>

        {/* Title - Dark and bold */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-10 tracking-tight leading-[1.1] relative z-10">
          {result.title}
        </h1>

        {/* Article Body - High contrast text */}
        <div className="text-slate-900 leading-[1.8] text-lg space-y-8 relative z-10 prose prose-slate max-w-none">
          <ReactMarkdown>
            {result.blog_post}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogResult;