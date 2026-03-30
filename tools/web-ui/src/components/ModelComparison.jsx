import { useState } from 'react';

const styles = {
  container: { padding: '2rem', overflowY: 'auto' },
  heading: { fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' },
  subtitle: { color: '#8b949e', marginBottom: '1.5rem' },
  selectors: { display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
  select: {
    background: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '6px',
    color: '#e6edf3',
    padding: '0.5rem 0.75rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem' },
  th: {
    padding: '0.75rem',
    background: '#161b22',
    border: '1px solid #30363d',
    color: '#8b949e',
    fontWeight: 600,
    textAlign: 'left',
  },
  thHighlight: {
    background: '#1f6feb22',
    color: '#58a6ff',
  },
  td: { padding: '0.65rem 0.75rem', border: '1px solid #21262d', color: '#e6edf3' },
  tdMuted: { color: '#8b949e' },
  diffRow: { background: '#f8530822' },
  winCell: { background: '#3fb95022', color: '#3fb950' },
};

const DIMENSIONS = [
  { label: 'Provider', key: 'provider' },
  { label: 'Safety Level', key: 'safety_level' },
  { label: 'Alignment Method', key: 'alignment_method' },
  { label: 'Context Window', key: 'context_window', format: (v) => `${v >= 1000000 ? v / 1000000 + 'M' : v / 1000 + 'K'} tokens` },
  { label: 'Open Source', key: 'open_source', format: (v) => (v ? '✅ Yes' : '❌ No') },
  { label: 'Modalities', key: 'modalities', format: (v) => v.join(', ') },
  { label: 'Reconstruction Confidence', key: 'reconstruction_confidence' },
  { label: 'Last Updated', key: 'last_updated' },
];

const SAFETY_ORDER = { 'very-high': 5, high: 4, medium: 3, low: 2, configurable: 1 };
const CONTEXT_WINNER = (vals) => {
  const max = Math.max(...vals.map(Number));
  return vals.map((v) => Number(v) === max);
};

export default function ModelComparison({ models, safetyColors }) {
  const [selected, setSelected] = useState(['openai', 'anthropic', 'google']);

  const selectedModels = models.filter((m) => selected.includes(m.id));

  const toggleModel = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter((x) => x !== id) : prev
        : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const isHighlighted = (dim, values, colIdx) => {
    if (dim.key === 'context_window') {
      const winners = CONTEXT_WINNER(values);
      return winners[colIdx];
    }
    if (dim.key === 'safety_level') {
      const orders = values.map((v) => SAFETY_ORDER[v] || 0);
      const max = Math.max(...orders);
      return orders[colIdx] === max;
    }
    if (dim.key === 'open_source') {
      return values[colIdx] === true;
    }
    return false;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Model Comparison</h1>
      <p style={styles.subtitle}>Select up to 4 models to compare side by side.</p>

      <div style={styles.selectors}>
        {models.map((m) => (
          <button
            key={m.id}
            onClick={() => toggleModel(m.id)}
            style={{
              ...styles.select,
              background: selected.includes(m.id) ? '#1f6feb22' : '#161b22',
              borderColor: selected.includes(m.id) ? '#58a6ff' : '#30363d',
              color: selected.includes(m.id) ? '#58a6ff' : '#8b949e',
            }}
          >
            {m.model}
          </button>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Dimension</th>
              {selectedModels.map((m) => (
                <th
                  key={m.id}
                  style={{ ...styles.th, ...styles.thHighlight }}
                >
                  {m.model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIMENSIONS.map((dim) => {
              const rawValues = selectedModels.map((m) => m[dim.key]);
              const formattedValues = rawValues.map((v) =>
                dim.format ? dim.format(v) : String(v ?? 'N/A')
              );
              const allSame = new Set(rawValues.map(String)).size === 1;

              return (
                <tr key={dim.key} style={allSame ? {} : styles.diffRow}>
                  <td style={{ ...styles.td, ...styles.tdMuted, fontWeight: 600 }}>
                    {dim.label}
                    {!allSame && <span style={{ color: '#f85149', marginLeft: '0.5rem', fontSize: '0.7rem' }}>differs</span>}
                  </td>
                  {selectedModels.map((m, colIdx) => {
                    const highlighted = isHighlighted(dim, rawValues, colIdx);
                    return (
                      <td
                        key={m.id}
                        style={{
                          ...styles.td,
                          ...(highlighted ? styles.winCell : {}),
                        }}
                      >
                        {formattedValues[colIdx]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Tags row */}
            <tr>
              <td style={{ ...styles.td, ...styles.tdMuted, fontWeight: 600 }}>Unique Tags</td>
              {selectedModels.map((m) => {
                const otherTags = new Set(
                  selectedModels.filter((x) => x.id !== m.id).flatMap((x) => x.tags)
                );
                const unique = m.tags.filter((t) => !otherTags.has(t));
                return (
                  <td key={m.id} style={styles.td}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {unique.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.7rem',
                            background: '#21262d',
                            color: '#58a6ff',
                            padding: '0.15rem 0.4rem',
                            borderRadius: '10px',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {unique.length === 0 && <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>none</span>}
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#8b949e' }}>
        <span style={{ color: '#3fb950' }}>■</span> Highlighted cells indicate the best value for each dimension.{' '}
        <span style={{ color: '#f85149' }}>■</span> Orange rows indicate differences between selected models.
      </div>
    </div>
  );
}
