import { useState, useMemo } from 'react';
import PromptCard from './PromptCard';

const styles = {
  container: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: {
    width: '280px',
    flexShrink: 0,
    background: '#161b22',
    borderRight: '1px solid #30363d',
    padding: '1rem',
    overflowY: 'auto',
  },
  main: { flex: 1, padding: '1.5rem', overflowY: 'auto' },
  searchInput: {
    width: '100%',
    background: '#0d1117',
    border: '1px solid #30363d',
    borderRadius: '6px',
    color: '#e6edf3',
    padding: '0.6rem 0.75rem',
    fontSize: '0.9rem',
    outline: 'none',
    marginBottom: '1.25rem',
  },
  filterSection: { marginBottom: '1.25rem' },
  filterLabel: { fontSize: '0.78rem', fontWeight: 600, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block' },
  filterBtn: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    background: 'transparent',
    border: 'none',
    color: '#8b949e',
    padding: '0.35rem 0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.87rem',
    marginBottom: '0.15rem',
  },
  filterBtnActive: {
    background: '#1f6feb22',
    color: '#58a6ff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '1rem',
  },
  heading: { fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#e6edf3' },
  count: { fontSize: '0.85rem', color: '#8b949e', marginBottom: '1rem' },
  modal: {
    position: 'fixed', inset: 0, background: '#000000cc',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '1rem',
  },
  modalContent: {
    background: '#161b22', border: '1px solid #30363d', borderRadius: '12px',
    padding: '2rem', maxWidth: '700px', width: '100%', maxHeight: '80vh',
    overflowY: 'auto', position: 'relative',
  },
  closeBtn: {
    position: 'absolute', top: '1rem', right: '1rem',
    background: '#21262d', border: '1px solid #30363d', borderRadius: '4px',
    color: '#8b949e', cursor: 'pointer', padding: '0.3rem 0.6rem', fontSize: '1rem',
  },
};

const SAFETY_OPTIONS = ['all', 'very-high', 'high', 'medium', 'configurable'];
const ALIGNMENT_OPTIONS = ['all', 'RLHF', 'Constitutional AI', 'DPO'];
const OPEN_SOURCE_OPTIONS = ['all', 'open-source', 'closed-source'];

export default function PromptExplorer({ models, safetyColors }) {
  const [search, setSearch] = useState('');
  const [safetyFilter, setSafetyFilter] = useState('all');
  const [alignmentFilter, setAlignmentFilter] = useState('all');
  const [openFilter, setOpenFilter] = useState('all');
  const [selectedModel, setSelectedModel] = useState(null);

  const filtered = useMemo(() => {
    return models.filter((m) => {
      const searchMatch =
        !search ||
        m.model.toLowerCase().includes(search.toLowerCase()) ||
        m.provider.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase()) ||
        m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const safetyMatch = safetyFilter === 'all' || m.safety_level === safetyFilter;
      const alignmentMatch = alignmentFilter === 'all' || m.alignment_method.includes(alignmentFilter);
      const openMatch =
        openFilter === 'all' ||
        (openFilter === 'open-source' && m.open_source) ||
        (openFilter === 'closed-source' && !m.open_source);

      return searchMatch && safetyMatch && alignmentMatch && openMatch;
    });
  }, [models, search, safetyFilter, alignmentFilter, openFilter]);

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="🔍 Search models, tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={styles.filterSection}>
          <span style={styles.filterLabel}>Safety Level</span>
          {SAFETY_OPTIONS.map((opt) => (
            <button
              key={opt}
              style={{ ...styles.filterBtn, ...(safetyFilter === opt ? styles.filterBtnActive : {}) }}
              onClick={() => setSafetyFilter(opt)}
            >
              {opt === 'all' ? 'All levels' : opt}
            </button>
          ))}
        </div>

        <div style={styles.filterSection}>
          <span style={styles.filterLabel}>Alignment</span>
          {ALIGNMENT_OPTIONS.map((opt) => (
            <button
              key={opt}
              style={{ ...styles.filterBtn, ...(alignmentFilter === opt ? styles.filterBtnActive : {}) }}
              onClick={() => setAlignmentFilter(opt)}
            >
              {opt === 'all' ? 'All methods' : opt}
            </button>
          ))}
        </div>

        <div style={styles.filterSection}>
          <span style={styles.filterLabel}>Source</span>
          {OPEN_SOURCE_OPTIONS.map((opt) => (
            <button
              key={opt}
              style={{ ...styles.filterBtn, ...(openFilter === opt ? styles.filterBtnActive : {}) }}
              onClick={() => setOpenFilter(opt)}
            >
              {opt === 'all' ? 'All' : opt}
            </button>
          ))}
        </div>
      </aside>

      <main style={styles.main}>
        <h1 style={styles.heading}>AI System Prompts Library</h1>
        <p style={styles.count}>
          Showing {filtered.length} of {models.length} models
          {search && ` matching "${search}"`}
        </p>

        <div style={styles.grid}>
          {filtered.map((model) => (
            <PromptCard
              key={model.id}
              model={model}
              safetyColors={safetyColors}
              onClick={() => setSelectedModel(model)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#8b949e', marginTop: '3rem' }}>
            <p style={{ fontSize: '2rem' }}>🔍</p>
            <p>No models match your filters. Try adjusting the search or filters.</p>
          </div>
        )}
      </main>

      {selectedModel && (
        <div style={styles.modal} onClick={() => setSelectedModel(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedModel(null)}>✕</button>
            <h2 style={{ color: '#e6edf3', marginBottom: '0.5rem' }}>{selectedModel.model}</h2>
            <p style={{ color: '#8b949e', marginBottom: '1rem' }}>{selectedModel.provider}</p>
            <p style={{ marginBottom: '1rem' }}>{selectedModel.description}</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem' }}>
              <tbody>
                {[
                  ['Safety Level', selectedModel.safety_level],
                  ['Alignment', selectedModel.alignment_method],
                  ['Context Window', `${(selectedModel.context_window / 1000).toFixed(0)}K tokens`],
                  ['Confidence', selectedModel.reconstruction_confidence],
                  ['Open Source', selectedModel.open_source ? 'Yes' : 'No'],
                  ['Last Updated', selectedModel.last_updated],
                  ['Modalities', selectedModel.modalities.join(', ')],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid #21262d' }}>
                    <td style={{ padding: '0.5rem', color: '#8b949e', width: '40%' }}>{k}</td>
                    <td style={{ padding: '0.5rem', color: '#e6edf3' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {selectedModel.tags.map((tag) => (
                <span key={tag} style={{ fontSize: '0.75rem', background: '#21262d', color: '#58a6ff', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
