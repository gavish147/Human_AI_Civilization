import React, { useState } from 'react';
import { Shield, Clock, User, FileText, AlertTriangle, CheckCircle, Filter, Download, Eye, Search, Lock } from 'lucide-react';

const AUDIT_LOGS = [
  { id: 'AUD-8821', ts: '2026-09-07 14:23:07', user: 'AI-Engine-v3', role: 'AI-Overseer', action: 'INGEST', resource: 'Mesopotamian Agricultural Records', outcome: 'SUCCESS', risk: 'LOW', ip: '10.0.1.12' },
  { id: 'AUD-8820', ts: '2026-09-07 14:21:44', user: 'Archivist-Gamma', role: 'Archivist', action: 'OVERRIDE', resource: 'Sanskrit_Vedic_108 — Duplicate Flag', outcome: 'HUMAN_APPROVED', risk: 'MEDIUM', ip: '192.168.5.23' },
  { id: 'AUD-8819', ts: '2026-09-07 14:19:11', user: 'AI-Engine-v3', role: 'AI-Overseer', action: 'VERIFY', resource: 'Byzantine Medical Codex Batch #7', outcome: 'SUCCESS', risk: 'LOW', ip: '10.0.1.12' },
  { id: 'AUD-8818', ts: '2026-09-07 14:15:38', user: 'AI-Engine-v3', role: 'AI-Overseer', action: 'CONFLICT_FLAG', resource: 'Mayan Calendar System — Discrepancy', outcome: 'FLAGGED', risk: 'HIGH', ip: '10.0.1.12' },
  { id: 'AUD-8817', ts: '2026-09-07 14:12:05', user: 'Agent-Delta-4', role: 'Field-Agent', action: 'READ', resource: 'Pre-Columbian Textile Patterns', outcome: 'SUCCESS', risk: 'LOW', ip: '203.45.12.8' },
  { id: 'AUD-8816', ts: '2026-09-07 14:09:52', user: 'Agent-Delta-4', role: 'Field-Agent', action: 'READ', resource: 'Roman Engineering — Aqueduct Systems', outcome: 'SUCCESS', risk: 'LOW', ip: '203.45.12.8' },
  { id: 'AUD-8815', ts: '2026-09-07 14:05:13', user: 'Admin-Root', role: 'Administrator', action: 'DELETE', resource: 'Corrupted Record KE-1099', outcome: 'ADMIN_APPROVED', risk: 'CRITICAL', ip: '10.0.0.1' },
  { id: 'AUD-8814', ts: '2026-09-07 13:58:44', user: 'AI-Engine-v3', role: 'AI-Overseer', action: 'INGEST', resource: 'Renaissance Engineering Manuscripts', outcome: 'SUCCESS', risk: 'LOW', ip: '10.0.1.12' },
  { id: 'AUD-8813', ts: '2026-09-07 13:51:27', user: 'Archivist-Beta', role: 'Archivist', action: 'MODIFY', resource: 'Vedic Sutra Entry — ERA Correction', outcome: 'SUCCESS', risk: 'MEDIUM', ip: '192.168.5.41' },
  { id: 'AUD-8812', ts: '2026-09-07 13:45:09', user: 'Unknown', role: 'N/A', action: 'UNAUTHORIZED_ACCESS', resource: '/api/admin/delete-all', outcome: 'BLOCKED', risk: 'CRITICAL', ip: '45.23.100.7' },
];

const RISK_COLORS = {
  LOW: 'var(--accent-green)',
  MEDIUM: 'var(--accent-amber)',
  HIGH: 'var(--accent-red)',
  CRITICAL: '#ff2255',
};

const OUTCOME_COLORS = {
  SUCCESS: 'var(--accent-green)',
  FLAGGED: 'var(--accent-amber)',
  HUMAN_APPROVED: 'var(--accent-cyan)',
  ADMIN_APPROVED: 'var(--accent-violet)',
  BLOCKED: 'var(--accent-red)',
};

const ACCESS_MATRIX = [
  { role: 'Administrator', ingest: '✓', read: '✓', modify: '✓', delete: '✓', override: '✓', audit: '✓' },
  { role: 'AI-Overseer', ingest: '✓', read: '✓', modify: '✓', delete: '✗', override: '✗', audit: '✓' },
  { role: 'Archivist', ingest: '✓', read: '✓', modify: '✓', delete: '✗', override: 'Req.', audit: '✓' },
  { role: 'Field-Agent', ingest: '✗', read: '✓', modify: '✗', delete: '✗', override: '✗', audit: '✗' },
];

export default function AuditTrail() {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('All');
  const [showMatrix, setShowMatrix] = useState(false);

  const filtered = AUDIT_LOGS.filter(l => {
    const matchSearch = !search || l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.resource.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === 'All' || l.risk === riskFilter;
    const matchAction = actionFilter === 'All' || l.action === actionFilter;
    return matchSearch && matchRisk && matchAction;
  });

  const uniqueActions = ['All', ...new Set(AUDIT_LOGS.map(l => l.action))];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fade-in-up 0.5s ease' }}>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
        {[
          { label: 'Total Log Entries', value: '8,821', color: 'var(--accent-cyan)', icon: FileText },
          { label: 'Human Overrides', value: '47', color: 'var(--accent-violet)', icon: User },
          { label: 'Security Blocks', value: '12', color: 'var(--accent-red)', icon: Shield },
          { label: 'AI Auto-Resolved', value: '8,762', color: 'var(--accent-green)', icon: CheckCircle },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '10px',
                background: `${s.color}18`, border: `1px solid ${s.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={16} color={s.color} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="glass-panel" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
            <Search size={13} color="var(--text-dim)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              className="input-cyber"
              placeholder="Search by user, resource, log ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '2rem' }}
            />
          </div>
          <select className="input-cyber" style={{ width: 130 }} value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
            {['All', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map(r => <option key={r}>{r}</option>)}
          </select>
          <select className="input-cyber" style={{ width: 180 }} value={actionFilter} onChange={e => setActionFilter(e.target.value)}>
            {uniqueActions.map(a => <option key={a}>{a}</option>)}
          </select>
          <button
            className={showMatrix ? 'btn-gold' : 'btn-primary'}
            onClick={() => setShowMatrix(s => !s)}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Lock size={12} /> {showMatrix ? 'Hide Matrix' : 'RBAC Matrix'}
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* RBAC Matrix */}
      {showMatrix && (
        <div className="glass-panel" style={{ padding: '1.5rem', animation: 'fade-in-up 0.3s ease' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            <Shield size={12} /> Role-Based Access Control Matrix
          </div>
          <table className="cyber-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Ingest</th>
                <th>Read</th>
                <th>Modify</th>
                <th>Delete</th>
                <th>Override</th>
                <th>Audit Access</th>
              </tr>
            </thead>
            <tbody>
              {ACCESS_MATRIX.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.role}</td>
                  {[row.ingest, row.read, row.modify, row.delete, row.override, row.audit].map((v, j) => (
                    <td key={j} style={{
                      color: v === '✓' ? 'var(--accent-green)' : v === '✗' ? 'var(--accent-red)' : 'var(--accent-amber)',
                      fontWeight: 600, fontSize: '0.9rem',
                    }}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Audit Log Table */}
      <div className="glass-panel hud-scanline" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div className="section-label">
            <Shield size={12} /> Audit Log — {filtered.length} entries
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div className="status-dot status-online" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-green)' }}>LIVE LOGGING ACTIVE</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="cyber-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp</th>
                <th>User / Agent</th>
                <th>Role</th>
                <th>Action</th>
                <th>Resource</th>
                <th>IP Address</th>
                <th>Risk</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(log => (
                <tr key={log.id}>
                  <td><span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{log.id}</span></td>
                  <td style={{ whiteSpace: 'nowrap' }}>{log.ts}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{log.user}</td>
                  <td>
                    <span className={`badge badge-${log.role === 'Administrator' ? 'red' : log.role === 'AI-Overseer' ? 'cyan' : log.role === 'Archivist' ? 'gold' : 'green'}`}>
                      {log.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{log.action}</span>
                  </td>
                  <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {log.resource}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>{log.ip}</td>
                  <td>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700,
                      color: RISK_COLORS[log.risk] || 'var(--text-dim)',
                    }}>
                      {log.risk}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700,
                      color: OUTCOME_COLORS[log.outcome] || 'var(--text-dim)',
                    }}>
                      {log.outcome}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
