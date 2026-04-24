'use client';
import { useState } from 'react';

export default function DupeyHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-16 pb-10 text-center border-b border-gray-100">
        <img 
          src="/dupey-logo.png" 
          alt="Dupey.ai" 
          className="mx-auto h-20 mb-6" 
        />
        <p className="text-2xl font-light text-gray-700 tracking-wide">
          Your personal AI beauty and wellness shopping assistant
        </p>
      </div>

      {/* Clean centered search bar */}
      <div className="max-w-xl mx-auto px-6 pt-12 pb-16">
        <div className="relative bg-white rounded-full shadow border border-gray-200 flex items-center px-6 py-5 hover:shadow-lg transition-all">
          <button className="mr-6 text-4xl text-pink-500 hover:text-pink-600 transition">📷</button>
          <input
            type="text"
            placeholder="Thymes Olive Leaf Body Lotion, Olaplex No.3, CeraVe Moisturizing Cream..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            className="flex-1 bg-transparent outline-none text-lg placeholder-gray-400"
          />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">or tap the camera to search by photo</p>
      </div>

      {loading && <p className="text-center py-12 text-xl text-pink-600">Dupey is searching every retailer for you...</p>}

      {/* Results placeholder */}
      <div className="max-w-4xl mx-auto px-6 text-center text-gray-400 py-20">
        {results.length === 0 && "Search for a product above to see prices and dupes"}
      </div>
    </div>
  );
}
