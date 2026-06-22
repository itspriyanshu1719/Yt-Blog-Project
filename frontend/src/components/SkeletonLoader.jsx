"use client";
import { useState, useEffect } from 'react';

export default function SkeletonLoader() {
    const [stage, setStage] = useState(0);
    const stages = [
        "Extracting YouTube transcript...",
        "Analyzing video context...",
        "Generating SEO-optimized title...",
        "Writing blog structure...",
        "Finalizing formatting..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
        }, 2000); // Slightly slower for a more "thoughtful" feel
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center pt-10 pb-16 w-full animate-in fade-in zoom-in-95 duration-700">
            {/* Container with a subtle breathing pulse */}
            <div className="w-full max-w-xl bg-white/50 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/60 relative overflow-hidden animate-pulse">

                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>

                <div className="flex flex-col items-center gap-8 relative z-10">

                    {/* Intelligent "Thought" Indicator instead of a spinner */}
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-3 h-3 rounded-full bg-slate-900 animate-bounce"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            ></div>
                        ))}
                    </div>

                    {/* Progress Text */}
                    <div className="text-center">
                        <p className="text-lg font-bold text-slate-900 tracking-tight transition-all duration-500">
                            {stages[stage]}
                        </p>
                        {/* Elegant, thin progress bar */}
                        <div className="mt-6 w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-slate-900 transition-all duration-1000 ease-in-out"
                                style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add this CSS for the shimmer effect */}
            <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}