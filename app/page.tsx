'use client';

export default function DupeyHome() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fce7f3', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '4.5rem', color: '#db2777', marginBottom: '1rem' }}>
          DUPEY.AI
        </h1>
        <p style={{ fontSize: '1.8rem', color: '#831843', marginBottom: '2rem' }}>
          Your personal AI beauty and wellness shopping assistant
        </p>
        <div style={{ background: 'white', padding: '20px 40px', borderRadius: '9999px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '1.3rem' }}>
          📷 Clean centered search bar coming in next update
        </div>
      </div>
    </div>
  );
}
