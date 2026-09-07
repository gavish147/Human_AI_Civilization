import React, { useState, useEffect } from 'react';
import {
  Brain, Database, Globe2, FileText, Cpu, Users, Archive,
  TrendingUp, AlertTriangle, CheckCircle, Clock, Zap, Shield,
  BookOpen, MapPin, Radio
} from 'lucide-react';

const metrics = [
  { label: 'Knowledge Entries', value: 142857, suffix: '', icon: Database, color: 'var(--accent-cyan)', trend: '+1.2%' },
  { label: 'AI Decision Ops', value: 98.4, suffix: '%', icon: Brain, color: 'var(--accent-violet)', trend: '+2.1%' },
  { label: 'Civilizations Covered', value: 247, suffix: '', icon: Globe2, color: 'var(--accent-gold)', trend: '+3' },
  { label: 'Preservation Rate', value: 94.7, suffix: '%', icon: Archive, color: 'var(--accent-green)', trend: '+0.8%' },
];

const recentActivity = [
  { time: '14:23:07', action: 'Knowledge Ingested', entity: 'Mesopotamian Agricultural Records v2.4', status: 'success', domain: 'Agriculture' },
  { time: '14:21:44', action: 'AI Decision Override', entity: 'Duplicate record flagged: Sanskrit_Vedic_108', status: 'warning', domain: 'Religion' },
  { time: '14:19:11', action: 'Preservation Verified', entity: 'Byzantine Medical Codex — Batch #7', status: 'success', domain: 'Medicine' },
  { time: '14:15:38', action: 'Conflict Detected', entity: 'Mayan Calendar System — Discrepancy Alert', status: 'error', domain: 'Astronomy' },
  { time: '14:12:05', action: 'New Domain Indexed', entity: 'Pre-Columbian Textile Patterns (1200 CE)', status: 'success', domain: 'Arts' },
  { time: '14:09:52', action: 'Access Log', entity: 'Field-Agent [Gamma-7] queried Roman Engineering', status: 'info', domain: 'Engineering' },
];

const domains = [
  { name: 'Science & Technology', count: 28450, pct: 92, color: 'var(--accent-cyan)' },
  { name: 'Culture & Arts', count: 21300, pct: 78, color: 'var(--accent-violet)' },
  { name: 'Medicine & Biology', count: 18720, pct: 71, color: 'var(--accent-green)' },
  { name: 'Governance & Law', count: 15600, pct: 65, color: 'var(--accent-gold)' },
  { name: 'Philosophy & Religion', count: 12870, pct: 55, color: 'var(--accent-amber)' },
  { name: 'Agriculture & Food', count: 9840, pct: 42, color: '#ff6b9d' },
];

const statusIndicators = [
  { label: 'Data Ingestion Pipeline', status: 'ACTIVE', color: 'var(--accent-green)' },
  { label: 'AI Translation Engine', status: 'ACTIVE', color: 'var(--accent-green)' },
  { label: 'Knowledge Graph', status: 'SYNCING', color: 'var(--accent-amber)' },
  { label: 'Audit Logger', status: 'ACTIVE', color: 'var(--accent-green)' },
  { label: 'Threat Monitor', status: 'STANDBY', color: 'var(--accent-cyan)' },
  { label: 'Backup Nodes (×3)', status: 'ONLINE', color: 'var(--accent-green)' },
];

function AnimatedCounter({ target, suffix = '', decimals = 0 }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCurrent(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return <>{decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toLocaleString()}{suffix}</>;
}

export default function Dashboard() {
  const [widths, setWidths] = useState(domains.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidths(domains.map(d => d.pct));
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const statusColor = (s) => {
    if (s === 'success') return 'var(--accent-green)';
    if (s === 'warning') return 'var(--accent-amber)';
    if (s === 'error') return 'var(--accent-red)';
    return 'var(--accent-cyan)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fade-in-up 0.5s ease' }}>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '10px',
                  background: `${m.color}18`,
                  border: `1px solid ${m.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={m.color} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--accent-green)', background: 'rgba(0,255,136,0.1)',
                  border: '1px solid rgba(0,255,136,0.25)', borderRadius: '4px',
                  padding: '2px 6px',
                }}>
                  {m.trend}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: m.color, marginBottom: '4px' }}>
                <AnimatedCounter target={m.value} suffix={m.suffix} decimals={m.suffix === '%' ? 1 : 0} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {m.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main 3-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: '1rem' }}>

        {/* Activity Feed */}
        <div className="glass-panel hud-scanline" style={{ padding: '1.25rem', gridColumn: '1 / 2' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            <Radio size={12} /> Live Activity Stream
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '0.65rem 0.75rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                borderLeft: `2px solid ${statusColor(a.status)}`,
                transition: 'all 0.2s',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  color: 'var(--text-dim)', minWidth: 60, paddingTop: '2px'
                }}>{a.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '2px' }}>
                    {a.action}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    {a.entity}
                  </div>
                </div>
                <span className={`badge badge-${a.domain === 'Astronomy' ? 'violet' : a.status === 'success' ? 'green' : a.status === 'warning' ? 'amber' : a.status === 'error' ? 'red' : 'cyan'}`}>
                  {a.domain}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Coverage */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            <BookOpen size={12} /> Domain Coverage
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {domains.map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{d.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                      {d.count.toLocaleString()}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: d.color, fontWeight: 600 }}>
                      {d.pct}%
                    </span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${widths[i]}%`,
                      background: `linear-gradient(90deg, ${d.color}, ${d.color}88)`,
                      boxShadow: `0 0 8px ${d.color}60`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Global Map Stats */}
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
              <Globe2 size={12} color="var(--accent-gold)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Geographic Reach
              </span>
            </div>
            {[
              { region: 'Asia Pacific', pct: 34, color: 'var(--accent-cyan)' },
              { region: 'Europe', pct: 28, color: 'var(--accent-violet)' },
              { region: 'Americas', pct: 22, color: 'var(--accent-gold)' },
              { region: 'Africa & ME', pct: 16, color: 'var(--accent-amber)' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)', flex: 1 }}>{r.region}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: r.color }}>{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div className="section-label" style={{ marginBottom: '1rem' }}>
              <Cpu size={12} /> System Status
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {statusIndicators.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.45rem 0.6rem',
                  background: 'rgba(0,0,0,0.15)',
                  borderRadius: '6px',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                    {s.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
                    color: s.color, letterSpacing: '0.06em',
                  }}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              <TrendingUp size={12} /> Performance
            </div>
            {[
              { label: 'Task Completion', value: '94.2%', color: 'var(--accent-green)' },
              { label: 'Error Rate', value: '0.3%', color: 'var(--accent-cyan)' },
              { label: 'Avg Latency', value: '42 ms', color: 'var(--accent-violet)' },
              { label: 'Accuracy', value: '96.1%', color: 'var(--accent-gold)' },
              { label: 'Throughput', value: '2.4K/hr', color: 'var(--accent-amber)' },
            ].map((item, i) => (
              <div key={i} className="telemetry-row">
                <span>{item.label}</span>
                <span className="telemetry-value" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Alert Box */}
          <div className="glass-panel" style={{
            padding: '1rem',
            border: '1px solid rgba(255,71,87,0.25)',
            background: 'rgba(255,71,87,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
              <AlertTriangle size={13} color="var(--accent-red)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-red)', letterSpacing: '0.06em' }}>
                ACTIVE ALERTS
              </span>
            </div>
            {[
              { msg: 'Duplicate record: Aztec Codex entry 2241', sev: 'HIGH' },
              { msg: 'Bias drift detected in translation model', sev: 'MED' },
              { msg: 'Backup node #2 latency elevated', sev: 'LOW' },
            ].map((a, i) => (
              <div key={i} style={{
                padding: '0.4rem 0.5rem', marginBottom: '4px',
                background: 'rgba(0,0,0,0.2)', borderRadius: '6px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
                  {a.msg}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700,
                  color: a.sev === 'HIGH' ? 'var(--accent-red)' : a.sev === 'MED' ? 'var(--accent-amber)' : 'var(--text-dim)',
                }}>
                  {a.sev}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
