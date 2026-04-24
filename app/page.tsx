'use client';

export default function DupeyHome() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fee2e2', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', color: '#b91c1c', margin: 0 }}>
          THIS IS A TEST — BIG RED SCREEN
        </h1>
        <p style={{ fontSize: '1.8rem', color: '#991b1b', marginTop: '1rem' }}>
          If you see this, updates are finally working
        </p>
        <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          (Test version — {new Date().toLocaleTimeString()})
        </p>
      </div>
    </div>
  );
}
