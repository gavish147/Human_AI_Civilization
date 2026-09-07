import React, { useState } from 'react';
import StarCanvas from './components/StarCanvas';
import HeaderBar from './components/HeaderBar';
import Dashboard from './components/Dashboard';
import KnowledgeVault from './components/KnowledgeVault';
import IngestPipeline from './components/IngestPipeline';
import EvaluationView from './components/EvaluationView';
import AuditTrail from './components/AuditTrail';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentRole, setRole] = useState('AI-Overseer');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':   return <Dashboard />;
      case 'knowledge':   return <KnowledgeVault />;
      case 'ingest':      return <IngestPipeline />;
      case 'evaluation':  return <EvaluationView />;
      case 'audit':       return <AuditTrail />;
      default:            return <Dashboard />;
    }
  };

  return (
    <div className="grid-bg" style={{
      minHeight: '100vh',
      background: 'var(--bg-void)',
      position: 'relative',
    }}>
      {/* Cosmic Background */}
      <StarCanvas />

      {/* Content Layer */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Header */}
        <HeaderBar
          currentRole={currentRole}
          setRole={setRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content */}
        <main style={{ flex: 1, maxWidth: 1440, width: '100%', margin: '0 auto', padding: '1.5rem 1.5rem 3rem' }}>
          {renderTab()}
        </main>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(0, 229, 255, 0.08)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(7, 11, 20, 0.9)',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
            HAKCPP © 2026 — Autonomous Human–AI Civilization Knowledge Preservation Platform
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)' }}>
              Active Role: <span style={{ color: 'var(--accent-cyan)' }}>{currentRole}</span>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div className="status-dot status-online" style={{ width: 6, height: 6 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-green)' }}>
                All Systems Nominal
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
