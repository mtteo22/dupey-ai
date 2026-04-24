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
    <div className="min-h-screen bg-white font-sans">
      {/* Header - Logo + Tagline */}
      <div className="pt-16 pb-12 text-center border-b">
        <img 
          src="/dupey-logo.png" 
          alt="Dupey.ai" 
          className="mx-auto h-20 mb-6" 
        />
        <p className="text-2xl font-light text-gray-700 tracking-wide">
          Your personal AI beauty and wellness shopping assistant
        </p>
      </div>

      {/* Clean Centered Search Bar */}
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

      {loading && (
        <p className="text-center text-xl text-pink-600 py-12">Dupey is searching every retailer for the best prices...</p>
      )}

      {/* Search Results */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {results.map((item, i) => (
          <div key={i} className="mb-16 bg-white border border-gray-100 rounded-3xl shadow p-10">
            <h2 className="text-3xl font-semibold mb-10">{item.title}</h2>

            {/* Big 🔥 Dupey Banner */}
            <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-3xl p-14 text-center mb-12">
              <p className="text-5xl font-bold mb-4">🔥 Dupey!</p>
              <p className="text-2xl">Save up to {item.savingsPercent}% per unit with these dupes</p>
            </div>

            {/* Prices */}
            <div className="space-y-4 mb-12">
              {item.mainPrices?.map((p: any) => (
                <a
                  key={p.retailer}
                  href={p.link || '#'}
                  target="_blank"
                  className="block p-6 rounded-2xl border border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition flex justify-between items-center text-lg"
                >
                  [{p.retailer} – {p.price}]
                </a>
              ))}
            </div>

            {/* Analysis */}
            <div className="bg-gray-50 p-8 rounded-3xl mb-12 text-gray-700 leading-relaxed">
              {item.analysis}
            </div>

            {/* Dupes */}
            <div>
              <h4 className="font-semibold text-xl mb-8">Dupes ranked by similarity (closest match first)</h4>
              {item.dupes?.map((dupe: any) => (
                <div key={dupe.dupeNumber} className="mb-10">
                  <h5 className="font-medium text-lg mb-4">Dupe {dupe.dupeNumber}: {dupe.name}</h5>
                  <div className="space-y-3">
                    {dupe.prices?.map((p: any) => (
                      <a
                        key={p.retailer}
                        href={p.link || '#'}
                        target="_blank"
                        className="block p-6 rounded-2xl border border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition"
                      >
                        [{p.retailer} – {p.price}]
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
