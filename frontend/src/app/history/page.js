import HistoryList from '../../components/HistoryList';

export default async function HistoryPage() {
  // Fetch the real data from your FastAPI backend
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    cache: 'no-store'
  });

  const posts = await response.json();

  return (
    <main className="min-h-screen p-8 md:p-12 bg-slate-950 text-white">

      <div className="max-w-6xl mx-auto">
        {/* BRAND NEW BACK BUTTON */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <span className="text-xl leading-none mb-0.5">←</span> Back to Home
        </a>

        {/* Upgraded Stylish Heading */}
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-500 tracking-tighter drop-shadow-lg">
          Generated Blog Posts
        </h1>

        {/* We pass the fetched posts into your component */}
        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800">
          {/* The HistoryList component now handles its own inner padding and 3D background */}
          <HistoryList posts={posts} />
        </div>
      </div>

    </main>
  );
}