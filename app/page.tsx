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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #fdf2f8, #fff1f2, #fce7f3)', fontFamily: 'system-ui' }}>
      <div style={{ background: 'white', padding: '2rem 1.5rem', borderBottom: '1px solid #fbcfe8', position: 'sticky', top: 0 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#db2777', margin: 0 }}>Dupey.ai</h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Your beauty & wellness shopping assistant</p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1.5rem' }}>
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}>
          <input
            type="text"
            placeholder="What are you shopping for today?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem', border: '2px solid #fce7f3', borderRadius: '9999px' }}
          />
          <button
            onClick={() => handleSearch(searchQuery)}
            style={{ width: '100%', marginTop: '1rem', background: 'linear-gradient(to right, #db2777, #e11d48)', color: 'white', padding: '1.25rem', borderRadius: '9999px', fontSize: '1.25rem', fontWeight: '600' }}
          >
            ✨ Find My Best Price or Dupe
          </button>
        </div>

        {results.length > 0 && (
          <div style={{ marginTop: '3rem', background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '600' }}>Thymes Olive Leaf Body Lotion (9.25 oz)</h2>

            {/* Big Banner */}
            <div style={{ background: 'linear-gradient(135deg, #db2777, #e11d48, #db2777)', color: 'white', padding: '3rem', borderRadius: '24px', textAlign: 'center', margin: '2rem 0' }}>
              <p style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>🔥 Dupey!</p>
              <p style={{ fontSize: '1.75rem' }}>Save up to 42% per unit with these dupes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}