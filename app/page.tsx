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
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-2 text-pink-600">Dupey.ai</h1>
      <p className="text-center text-gray-600 mb-8">Find the best price or a better dupe — instantly</p>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <input
          type="text"
          placeholder="e.g. Thymes Olive Leaf Body Lotion"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
          className="w-full px-6 py-4 text-lg border rounded-3xl focus:border-pink-500 focus:outline-none"
        />
        <button
          onClick={() => handleSearch(searchQuery)}
          className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-3xl font-semibold transition"
        >
          Search with Dupey
        </button>
      </div>

      {loading && (
        <p className="text-center py-12 text-pink-600 font-medium">
          Dupey is searching every retailer...
        </p>
      )}

      <div className="mt-10 space-y-8">
        {results.map((item, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-xl p-8 dupey-card">
            <h2 className="text-2xl font-bold">{item.title}</h2>

            <div className="mt-6 space-y-3">
              {item.mainPrices.map((p: any) => (
                <a
                  key={p.retailer}
                  href={p.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-3xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all group"
                >
                  <span className="font-medium text-lg">[{p.retailer} – {p.price}]</span>
                </a>
              ))}
            </div>

            <div className="mt-10 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-3xl p-6 text-center">
              <p className="text-3xl font-bold text-pink-600">
                🔥 Dupey! Save up to {item.savingsPercent}% per unit with these dupes!
              </p>
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {item.analysis}
            </p>

            <div className="mt-12">
              <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
                Dupes ranked by similarity (closest match first)
              </h4>
              {item.dupes.map((dupe: any) => (
                <div key={dupe.dupeNumber} className="mb-8 last:mb-0">
                  <h5 className="font-medium text-xl mb-3">
                    Dupe {dupe.dupeNumber}: {dupe.name}
                  </h5>
                  <div className="space-y-3">
                    {dupe.prices.map((p: any) => (
                      <a
                        key={p.retailer}
                        href={p.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-3xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all group"
                      >
                        <span className="font-medium text-lg">[{p.retailer} – {p.price}]</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {item.additionalLinks && item.additionalLinks.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="font-semibold text-gray-700 mb-4">
                  We&apos;ve searched every corner of the web and have a few more possible price saving links below!
                </p>
                <div className="space-y-3">
                  {item.additionalLinks.map((p: any) => (
                    <a
                      key={p.retailer}
                      href={p.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-3xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all group"
                    >
                      <span className="font-medium text-lg">[{p.retailer} – {p.price}]</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
