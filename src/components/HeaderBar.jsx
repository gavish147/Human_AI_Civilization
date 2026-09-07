import React, { useState, useEffect } from 'react';
import { Shield, Globe, Brain, Activity, Bell, Settings, ChevronDown, Cpu, Zap } from 'lucide-react';

const roles = ['Archivist', 'AI-Overseer', 'Field-Agent', 'Administrator'];

export default function HeaderBar({ currentRole, setRole, activeTab, setActiveTab }) {
  const [time, setTime] = useState(new Date());
  const [roleOpen, setRoleOpen] = useState(false);
  const [alertCount] = useState(3);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'knowledge', label: 'Knowledge Vault', icon: Brain },
    { id: 'ingest', label: 'Ingest Pipeline', icon: Zap },
    { id: 'evaluation', label: 'Evaluation', icon: Shield },
    { id: 'audit', label: 'Audit Trail', icon: Globe },
  ];

  const roleColors = {
    'Administrator': 'var(--accent-red)',
    'AI-Overseer': 'var(--accent-cyan)',
    'Archivist': 'var(--accent-gold)',
    'Field-Agent': 'var(--accent-green)',
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(7, 11, 20, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 229, 255, 0.1)',
    }}>
      {/* Top system bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.5rem 1.5rem',
        borderBottom: '1px solid rgba(0, 229, 255, 0.05)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,229,255,0.3), rgba(139,92,246,0.2))',
            border: '1px solid rgba(0,229,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0,229,255,0.3)',
          }}>
            <Cpu size={18} color="var(--accent-cyan)" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-cyan)' }}>
              HAKCPP
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
              HUMAN–AI CIVILIZATION KNOWLEDGE PRESERVATION
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Role Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(0,229,255,0.06)',
                border: `1px solid rgba(0,229,255,0.2)`,
                borderRadius: '8px',
                padding: '0.35rem 0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: roleColors[currentRole] || 'var(--accent-cyan)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Shield size={12} />
              {currentRole}
              <ChevronDown size={10} style={{ opacity: 0.6 }} />
            </button>
            {roleOpen && (
              <div style={{
                position: 'absolute', top: '110%', right: 0, minWidth: 160,
                background: 'rgba(11, 17, 32, 0.98)',
                border: '1px solid rgba(0,229,255,0.2)',
                borderRadius: '10px', overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                zIndex: 200,
              }}>
                {roles.map(r => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setRoleOpen(false); }}
                    style={{
                      width: '100%', display: 'block', textAlign: 'left',
                      padding: '0.55rem 1rem',
                      fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                      color: currentRole === r ? roleColors[r] : 'var(--text-secondary)',
                      background: currentRole === r ? 'rgba(0,229,255,0.06)' : 'transparent',
                      border: 'none', cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(0,229,255,0.05)'}
                    onMouseLeave={e => e.target.style.background = currentRole === r ? 'rgba(0,229,255,0.06)' : 'transparent'}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Alerts */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <Bell size={16} color="var(--text-secondary)" />
            {alertCount > 0 && (
              <div style={{
                position: 'absolute', top: -5, right: -5,
                background: 'var(--accent-red)', color: '#fff',
                borderRadius: '50%', width: 14, height: 14,
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700,
              }}>
                {alertCount}
              </div>
            )}
          </div>

          {/* Clock */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--text-dim)', letterSpacing: '0.05em',
          }}>
            {time.toLocaleTimeString('en-GB')}
          </div>

          {/* Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div className="status-dot status-online" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-green)' }}>ONLINE</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <nav style={{
        display: 'flex', alignItems: 'center', gap: '0.25rem',
        padding: '0.4rem 1.5rem', overflowX: 'auto',
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '0.5rem 1rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                fontWeight: 600, letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: isActive ? 'rgba(0,229,255,0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(0,229,255,0.3)' : '1px solid transparent',
                borderRadius: '8px',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 0 10px rgba(0,229,255,0.15)' : 'none',
              }}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
