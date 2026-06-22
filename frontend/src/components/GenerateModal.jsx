import { useState } from 'react';

export default function GenerateModal({ isOpen, onClose, onGenerateStart, onError, onSuccess }) {
  const [url, setUrl] = useState('');
  const [tone, setTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      if (onGenerateStart) onGenerateStart();
    }, 1200);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, tone }),
      });

      // Get the backend's specific error message if it exists
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Generation failed');
      }

      onSuccess(data);
    } catch (error) {
      console.error("Submission Error:", error);
      // This will now show the REAL error from the backend
      setErrorMsg(error.message || 'Oops! Something went wrong.');
      if (onError) onError();
    } finally {
      setIsLoading(false);
      setUrl('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">New Blog Post</h3>
          <button onClick={!isLoading ? onClose : undefined} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 bg-red-50/80 border border-red-100 rounded-xl p-4 flex items-start gap-3 text-red-600 shadow-sm animate-in fade-in slide-in-from-top-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <p className="text-sm font-semibold">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">YouTube Video URL</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Writing Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="professional">Professional & Clean</option>
              <option value="casual">Casual & Friendly</option>
              <option value="humorous">Humorous & Witty</option>
              <option value="educational">Educational & Detailed</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-slate-900 text-white font-bold text-base py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Video...
              </>
            ) : (
              "Generate Blog Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}