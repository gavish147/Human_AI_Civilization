import React, { useState } from 'react';
import { Upload, Link, FileText, Globe2, AlertTriangle, CheckCircle, Clock, Zap, X, Play, RefreshCw } from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 1, name: 'Data Ingestion', desc: 'Accepts raw data from APIs, files, and web sources', status: 'active', processed: 4820, errors: 12 },
  { id: 2, name: 'Deduplication', desc: 'Removes duplicate records using fuzzy-match hashing', status: 'active', processed: 4714, errors: 3 },
  { id: 3, name: 'AI Translation', desc: 'NLP normalization and cross-language alignment', status: 'processing', processed: 3940, errors: 28 },
  { id: 4, name: 'Bias Validation', desc: 'Checks model outputs for cultural and temporal bias drift', status: 'processing', processed: 3120, errors: 7 },
  { id: 5, name: 'Knowledge Graph', desc: 'Links entities and builds semantic relationships', status: 'queued', processed: 2800, errors: 0 },
  { id: 6, name: 'Archival & Index', desc: 'Final storage, versioning and search index creation', status: 'queued', processed: 2800, errors: 0 },
];

const RECENT_BATCHES = [
  { id: 'BATCH-2041', source: 'UNESCO Digital Archive', type: 'API', records: 12450, status: 'completed', time: '14:18', domain: 'Multi-domain' },
  { id: 'BATCH-2040', source: 'British Library Digitisation', type: 'File', records: 4820, status: 'completed', time: '13:45', domain: 'Literature' },
  { id: 'BATCH-2039', source: 'Smithsonian Web Crawl', type: 'Web', records: 8930, status: 'processing', time: '13:02', domain: 'Arts & Culture' },
  { id: 'BATCH-2038', source: 'CERN Open Data Portal', type: 'API', records: 2340, status: 'failed', time: '12:30', domain: 'Science' },
  { id: 'BATCH-2037', source: 'Library of Congress', type: 'File', records: 6700, status: 'completed', time: '11:55', domain: 'Governance' },
];

export default function IngestPipeline() {
  const [url, setUrl] = useState('');
  const [sourceType, setSourceType] = useState('API');
  const [domain, setDomain] = useState('Agriculture');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = () => {
    if (!url.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted({ id: `BATCH-2042`, source: url, type: sourceType, domain, status: 'queued', records: Math.floor(Math.random() * 5000) + 500 });
      setSubmitting(false);
      setUrl('');
    }, 1800);
  };

  const stageColor = (s) => {
    if (s === 'active') return 'var(--accent-green)';
    if (s === 'processing') return 'var(--accent-cyan)';
    if (s === 'queued') return 'var(--text-dim)';
    return 'var(--accent-red)';
  };

  const batchStatusColor = (s) => {
    if (s === 'completed') return 'var(--accent-green)';
    if (s === 'processing') return 'var(--accent-cyan)';
    if (s === 'failed') return 'var(--accent-red)';
    return 'var(--accent-amber)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fade-in-up 0.5s ease' }}>

      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <div className="section-label"><Zap size={12} /> Data Ingestion Control</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Knowledge Ingestion Pipeline
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <RefreshCw size={12} /> Refresh
            </button>
            <button className="btn-success" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Play size={12} /> Run All
            </button>
          </div>
        </div>

        {/* Ingest Form */}
        <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', letterSpacing: '0.06em' }}>
            ▸ ADD NEW DATA SOURCE
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 2, minWidth: 200 }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                Source URL / Path
              </label>
              <input
                className="input-cyber"
                placeholder="https://archive.org/dataset/... or /data/batch.json"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </div>
            <div style={{ width: 130 }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                Source Type
              </label>
              <select className="input-cyber" value={sourceType} onChange={e => setSourceType(e.target.value)}>
                {['API', 'File', 'Web', 'Database', 'Manual'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ width: 180 }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                Domain
              </label>
              <select className="input-cyber" value={domain} onChange={e => setDomain(e.target.value)}>
                {['Agriculture', 'Medicine', 'Astronomy', 'Science & Technology', 'Philosophy & Religion', 'Culture & Arts', 'Governance & Law'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={submitting || !url.trim()}
              style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: (!url.trim() || submitting) ? 0.5 : 1, height: 40 }}
            >
              {submitting ? <RefreshCw size={12} style={{ animation: 'spin-slow 1s linear infinite' }} /> : <Upload size={12} />}
              {submitting ? 'Queuing...' : 'Ingest'}
            </button>
          </div>

          {submitted && (
            <div style={{
              marginTop: '0.75rem', padding: '0.65rem 0.9rem',
              background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.25)',
              borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px',
              animation: 'fade-in-up 0.3s ease',
            }}>
              <CheckCircle size={14} color="var(--accent-green)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-green)' }}>
                {submitted.id} queued — {submitted.domain} · ~{submitted.records.toLocaleString()} expected records
              </span>
              <button onClick={() => setSubmitted(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pipeline Stages Visualization */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div className="section-label" style={{ marginBottom: '1rem' }}>Pipeline Stages</div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {PIPELINE_STAGES.map((stage, i) => (
            <React.Fragment key={stage.id}>
              <div style={{
                minWidth: 160,
                background: 'rgba(0,0,0,0.25)',
                border: `1px solid ${stageColor(stage.status)}30`,
                borderRadius: '12px',
                padding: '1rem',
                flex: 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: stageColor(stage.status),
                    boxShadow: `0 0 6px ${stageColor(stage.status)}`,
                    animation: stage.status !== 'queued' ? 'pulse-dot 1.5s ease infinite' : 'none',
                  }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: stageColor(stage.status), fontWeight: 600, textTransform: 'uppercase' }}>
                    {stage.status}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {stage.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: '8px' }}>
                  {stage.desc}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
                    {stage.processed.toLocaleString()} records
                  </span>
                  {stage.errors > 0 && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-red)' }}>
                      {stage.errors} errors
                    </span>
                  )}
                </div>
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-dim)', fontSize: '1.2rem', flexShrink: 0 }}>
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Recent Batches Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div className="section-label" style={{ marginBottom: '1rem' }}>Recent Batch Jobs</div>
        <table className="cyber-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Source</th>
              <th>Type</th>
              <th>Domain</th>
              <th>Records</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_BATCHES.map(b => (
              <tr key={b.id}>
                <td><span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{b.id}</span></td>
                <td>{b.source}</td>
                <td><span className={`badge badge-${b.type === 'API' ? 'cyan' : b.type === 'File' ? 'gold' : 'violet'}`}>{b.type}</span></td>
                <td>{b.domain}</td>
                <td style={{ color: 'var(--text-primary)' }}>{b.records.toLocaleString()}</td>
                <td>{b.time}</td>
                <td>
                  <span style={{ color: batchStatusColor(b.status), fontWeight: 600, textTransform: 'uppercase', fontSize: '0.65rem' }}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
