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
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: 'system-ui' }}>
      <div style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '40px' }}>
        <img src="/dupey-logo.png" alt="Dupey.ai" style={{ height: '80px', margin: '0 auto 20px' }} />
        <p style={{ fontSize: '24px', color: '#4b5563', fontWeight: '300' }}>
          Your personal AI beauty and wellness shopping assistant
        </p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: '9999px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', border: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '28px', marginRight: '16px' }}>📷</span>
          <input
            type="text"
            placeholder="Thymes Olive Leaf Body Lotion, Olaplex No.3, CeraVe Moisturizing Cream..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '17px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
          />
        </div>
      </div>

      <p style={{ textAlign: 'center', marginTop: '12px', color: '#9ca3af' }}>or tap camera to search by photo</p>
    </div>
  );
}