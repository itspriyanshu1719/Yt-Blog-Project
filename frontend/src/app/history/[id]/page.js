"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import BlogResult from '../../../components/BlogResult';
import GenerateModal from '../../../components/GenerateModal';

export default function SinglePostPage() {
  // Hook to safely grab the dynamic [id] from the URL path
  const params = useParams();
  const id = params?.id; 

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Prevent execution if the router hasn't populated the ID parameter yet
    if (!id) return;

    const fetchSinglePost = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error("This blog post could not be found or doesn't exist.");
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSinglePost();
  }, [id]);

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navbar remains active so you can navigate or open a new form anytime */}
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <div className="max-w-5xl mx-auto px-6 pb-20 mt-8">
        {/* Navigation link to head back to the main history archive */}
        <a 
          href="/history" 
          className="text-sm font-bold text-slate-600 hover:text-slate-950 flex items-center gap-2 mb-6 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to History List
        </a>

        {loading && (
          <p className="text-slate-500 font-medium animate-pulse text-center py-12">
            Retrieving your blog post details...
          </p>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 font-medium text-center my-6">
            Error: {error}
          </div>
        )}
        
        {/* Pass the data payload into 'result' since BlogResult expects result.blog_post */}
        {!loading && !error && post && (
          <BlogResult result={post} />
        )}
      </div>

      {/* FIXED: The accidental backslash has been completely removed from here */}
      <GenerateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={(data) => {
          window.location.href = `/history/${data.id}`;
        }} 
      />
    </main>
  );
}