import React, { useState } from 'react';
import { Search, Filter, BookOpen, Download, Eye, Tag, Clock, Globe2, Lock, Unlock, Star, ExternalLink } from 'lucide-react';

const KNOWLEDGE_ENTRIES = [
  {
    id: 'KE-001', title: 'Mesopotamian Irrigation Systems', domain: 'Agriculture',
    era: '3000 BCE – 500 BCE', region: 'Middle East', confidence: 96,
    tags: ['Irrigation', 'Ancient', 'Engineering', 'Verified'],
    status: 'Preserved', classification: 'Public', priority: 'Critical',
    summary: 'Comprehensive records of ancient Mesopotamian canal networks, water distribution algorithms, and flood management systems used by Sumerian civilization.',
    lastUpdated: '2026-09-06', entries: 4820, sources: 12,
  },
  {
    id: 'KE-002', title: 'Byzantine Medical Codex', domain: 'Medicine',
    era: '500 CE – 1453 CE', region: 'Eastern Mediterranean', confidence: 88,
    tags: ['Medicine', 'Byzantine', 'Pharmacology', 'Partial'],
    status: 'Processing', classification: 'Restricted', priority: 'High',
    summary: 'Collection of Byzantine medical texts including herbal remedies, surgical procedures, epidemic response protocols, and anatomical knowledge from court physicians.',
    lastUpdated: '2026-09-07', entries: 2340, sources: 8,
  },
  {
    id: 'KE-003', title: 'Mayan Astronomical Calendar', domain: 'Astronomy',
    era: '250 CE – 900 CE', region: 'Mesoamerica', confidence: 94,
    tags: ['Astronomy', 'Mathematics', 'Mayan', 'Verified'],
    status: 'Preserved', classification: 'Public', priority: 'Critical',
    summary: 'Complete digitization of the Mayan Long Count Calendar system, including Venus cycle tracking, eclipse prediction models, and agricultural timing correlations.',
    lastUpdated: '2026-09-05', entries: 6100, sources: 19,
  },
  {
    id: 'KE-004', title: 'Renaissance Engineering Manuscripts', domain: 'Science & Technology',
    era: '1400 CE – 1600 CE', region: 'Europe', confidence: 91,
    tags: ['Engineering', 'Renaissance', 'Mechanics', 'Leonardo'],
    status: 'Preserved', classification: 'Public', priority: 'High',
    summary: 'Digitized Leonardo da Vinci and contemporaries\' engineering schematics, mechanical inventions, hydraulics studies, and anatomical cross-references.',
    lastUpdated: '2026-09-04', entries: 3880, sources: 14,
  },
  {
    id: 'KE-005', title: 'Vedic Mathematical Sutras', domain: 'Philosophy & Religion',
    era: '1500 BCE – 500 BCE', region: 'South Asia', confidence: 82,
    tags: ['Mathematics', 'Vedic', 'Philosophy', 'Sanskrit'],
    status: 'Review', classification: 'Public', priority: 'Medium',
    summary: 'Ancient Vedic mathematical algorithms, geometric constructions, astronomical calculations, and philosophical frameworks encoded in Sanskrit sutras.',
    lastUpdated: '2026-09-03', entries: 1950, sources: 6,
  },
  {
    id: 'KE-006', title: 'Pre-Columbian Textile Patterns', domain: 'Culture & Arts',
    era: '900 CE – 1500 CE', region: 'Americas', confidence: 79,
    tags: ['Arts', 'Textile', 'Cultural', 'Encoding'],
    status: 'Processing', classification: 'Public', priority: 'Medium',
    summary: 'Analysis of Andean and Mesoamerican textile patterns as cultural information encoding systems, including color symbolism, weaving algorithms, and social hierarchy markers.',
    lastUpdated: '2026-09-07', entries: 1420, sources: 5,
  },
];

const DOMAINS = ['All Domains', 'Agriculture', 'Medicine', 'Astronomy', 'Science & Technology', 'Philosophy & Religion', 'Culture & Arts'];
const STATUSES = ['All Status', 'Preserved', 'Processing', 'Review'];

export default function KnowledgeVault() {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All Domains');
  const [status, setStatus] = useState('All Status');
  const [selected, setSelected] = useState(null);

  const filtered = KNOWLEDGE_ENTRIES.filter(e => {
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.summary.toLowerCase().includes(search.toLowerCase()) ||
      e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchDomain = domain === 'All Domains' || e.domain === domain;
    const matchStatus = status === 'All Status' || e.status === status;
    return matchSearch && matchDomain && matchStatus;
  });

  const statusColor = (s) => {
    if (s === 'Preserved') return 'var(--accent-green)';
    if (s === 'Processing') return 'var(--accent-amber)';
    return 'var(--accent-red)';
  };

  const priorityBadge = (p) => {
    if (p === 'Critical') return 'badge-red';
    if (p === 'High') return 'badge-amber';
    return 'badge-cyan';
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', animation: 'fade-in-up 0.5s ease' }}>
      {/* Left: List */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Search & Filters */}
        <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                className="input-cyber"
                placeholder="Search knowledge entries, domains, tags..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: '2rem' }}
              />
            </div>
            <select
              className="input-cyber"
              style={{ width: 160 }}
              value={domain}
              onChange={e => setDomain(e.target.value)}
            >
              {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select
              className="input-cyber"
              style={{ width: 130 }}
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Filter size={12} /> Filter
            </button>
          </div>
          <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
            Showing {filtered.length} of {KNOWLEDGE_ENTRIES.length} entries
          </div>
        </div>

        {/* Entries Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(entry => (
            <div
              key={entry.id}
              className="glass-card"
              style={{
                padding: '1.1rem 1.25rem',
                cursor: 'pointer',
                border: selected?.id === entry.id ? '1px solid rgba(0,229,255,0.4)' : '1px solid rgba(0,229,255,0.08)',
                boxShadow: selected?.id === entry.id ? 'var(--glow-cyan)' : 'none',
              }}
              onClick={() => setSelected(selected?.id === entry.id ? null : entry)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)' }}>{entry.id}</span>
                    <span className={`badge ${priorityBadge(entry.priority)}`}>{entry.priority}</span>
                    {entry.classification === 'Restricted' && <Lock size={11} color="var(--accent-amber)" />}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {entry.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    {entry.era} · {entry.region} · {entry.domain}
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {entry.tags.map(t => (
                      <span key={t} className="badge badge-cyan" style={{ fontSize: '0.58rem' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: `conic-gradient(${statusColor(entry.status)} ${entry.confidence}%, rgba(255,255,255,0.05) 0)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--bg-card)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
                      color: statusColor(entry.status),
                    }}>
                      {entry.confidence}%
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    color: statusColor(entry.status), fontWeight: 600,
                  }}>
                    {entry.status}
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.6rem', display: 'flex', gap: 4, alignItems: 'center' }}>
                      <Eye size={10} /> View
                    </button>
                    <button className="btn-gold" style={{ padding: '0.3rem 0.6rem', fontSize: '0.6rem', display: 'flex', gap: 4, alignItems: 'center' }}>
                      <Download size={10} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Detail */}
              {selected?.id === entry.id && (
                <div style={{
                  marginTop: '1rem', paddingTop: '1rem',
                  borderTop: '1px solid rgba(0,229,255,0.1)',
                  animation: 'fade-in-up 0.3s ease',
                }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                    {entry.summary}
                  </p>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Entries', value: entry.entries.toLocaleString() },
                      { label: 'Sources', value: entry.sources },
                      { label: 'Last Updated', value: entry.lastUpdated },
                      { label: 'Classification', value: entry.classification },
                    ].map((item, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Stats Sidebar */}
      <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Vault Summary</div>
          {[
            { label: 'Total Entries', value: '142,857', color: 'var(--accent-cyan)' },
            { label: 'Fully Preserved', value: '89,204', color: 'var(--accent-green)' },
            { label: 'In Processing', value: '38,450', color: 'var(--accent-amber)' },
            { label: 'Under Review', value: '15,203', color: 'var(--accent-red)' },
            { label: 'Domains Covered', value: '47', color: 'var(--accent-violet)' },
            { label: 'Active Sources', value: '2,341', color: 'var(--accent-gold)' },
          ].map((s, i) => (
            <div key={i} className="telemetry-row">
              <span>{s.label}</span>
              <span className="telemetry-value" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid rgba(139,92,246,0.25)' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>
            <Star size={12} color="var(--accent-violet)" /> AI Confidence
          </div>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-violet)' }}>88.3%</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>AVERAGE CONFIDENCE SCORE</div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.5rem' }}>
            AI translation engine processes and validates all ingested knowledge entries using multi-layer verification and cross-reference analysis.
          </div>
        </div>
      </div>
    </div>
  );
}
