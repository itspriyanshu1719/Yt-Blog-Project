"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowToUse from '../components/HowToUse';
import HistoryList from '../components/HistoryList';
import GenerateModal from '../components/GenerateModal';
import BlogResult from '../components/BlogResult';
import SkeletonLoader from '../components/SkeletonLoader'; // NEW: Import the loader

export default function Home() {
  // State to control the popup modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the final generated blog data
  const [result, setResult] = useState(null);
  // NEW: State to hold the history posts
  const [posts, setPosts] = useState([]);
  // NEW: State to track if we are actively generating a post
  const [isGenerating, setIsGenerating] = useState(false);

  // NEW: Fetch the history data when the dashboard loads
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      {/* We increased pt-8 to pt-28 to push the content below the new sticky navbar! */}
      <div className="max-w-5xl mx-auto px-6 pb-20 pt-28">

        {/* Universal Back Button - Upgraded to Glassmorphism */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm font-bold bg-white/10 backdrop-blur-md text-slate-900 px-5 py-2.5 rounded-full hover:bg-white/20 mb-8 transition-all shadow-sm border border-white/20 z-50 relative"
        >
          <span className="text-xl leading-none mb-0.5">←</span> Go Back
        </button>

        {/* THE NEW LOGIC: Show Skeleton if generating, Blog if result, Hero otherwise */}
        {isGenerating ? (
          <SkeletonLoader />
        ) : result ? (
          <BlogResult result={result} />
        ) : (
          <Hero onOpenModal={() => setIsModalOpen(true)} />
        )}

        <HowToUse />

        <div className="h-px bg-slate-200 w-full my-16"></div>

        { }
        <HistoryList posts={posts} onOpenModal={() => setIsModalOpen(true)} />
      </div>

      {/* The invisible modal that pops up when triggered */}
      <GenerateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerateStart={() => {
          setIsModalOpen(false); // Close the modal
          setIsGenerating(true); // Trigger the skeleton loader
        }}
        onError={() => {
          setIsGenerating(false); // Hide the skeleton if there is an error
        }}
        onSuccess={(data) => {
          // Redirect instantly to their brand new dynamic blog page!
          window.location.href = `/history/${data.id}`;
        }}
      />
    </main>
  );
}