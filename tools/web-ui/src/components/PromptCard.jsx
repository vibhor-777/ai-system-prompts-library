import { useState } from 'react';

const styles = {
  card: {
    background: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '8px',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s, transform 0.1s',
    position: 'relative',
  },
  cardHover: {
    borderColor: '#58a6ff',
    transform: 'translateY(-1px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
  },
  modelName: { fontSize: '1.05rem', fontWeight: 700, color: '#e6edf3' },
  provider: { fontSize: '0.82rem', color: '#8b949e', marginTop: '0.15rem' },
  badge: {
    fontSize: '0.72rem',
    fontWeight: 600,
    padding: '0.15rem 0.5rem',
    borderRadius: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  },
  description: { fontSize: '0.87rem', color: '#8b949e', margin: '0.6rem 0', lineHeight: 1.5 },
  meta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.8rem',
    color: '#8b949e',
    marginTop: '0.75rem',
    flexWrap: 'wrap',
  },
  metaItem: { display: 'flex', alignItems: 'center', gap: '0.25rem' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.75rem' },
  tag: {
    fontSize: '0.72rem',
    background: '#21262d',
    color: '#8b949e',
    padding: '0.2rem 0.5rem',
    borderRadius: '12px',
    border: '1px solid #30363d',
  },
  copyBtn: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    background: '#21262d',
    border: '1px solid #30363d',
    borderRadius: '4px',
    color: '#8b949e',
    fontSize: '0.75rem',
    padding: '0.2rem 0.5rem',
    cursor: 'pointer',
    opacity: 0,
    transition: 'opacity 0.2s',
  },
  openBadge: {
    fontSize: '0.72rem',
    padding: '0.15rem 0.5rem',
    borderRadius: '12px',
    background: '#1f6feb22',
    color: '#58a6ff',
    border: '1px solid #1f6feb',
  },
};

const CONFIDENCE_COLORS = { high: '#3fb950', medium: '#d29922', low: '#f85149' };
const CONTEXT_LABEL = (n) => (n >= 1000000 ? `${n / 1000000}M` : `${n / 1000}K`);

export default function PromptCard({ model, safetyColors, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const safetyColor = safetyColors[model.safety_level] || '#8b949e';
  const confidenceColor = CONFIDENCE_COLORS[model.reconstruction_confidence] || '#8b949e';

  const handleCopy = (e) => {
    e.stopPropagation();
    const text = `Model: ${model.model}\nProvider: ${model.provider}\nSafety: ${model.safety_level}\nAlignment: ${model.alignment_method}\nTags: ${model.tags.join(', ')}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <button
        style={{ ...styles.copyBtn, opacity: hovered ? 1 : 0 }}
        onClick={handleCopy}
        title="Copy model info"
      >
        {copied ? '✓ Copied' : '📋 Copy'}
      </button>

      <div style={styles.header}>
        <div>
          <div style={styles.modelName}>{model.model}</div>
          <div style={styles.provider}>{model.provider}</div>
        </div>
        <span
          style={{
            ...styles.badge,
            background: safetyColor + '22',
            color: safetyColor,
            border: `1px solid ${safetyColor}44`,
          }}
        >
          {model.safety_level}
        </span>
      </div>

      <p style={styles.description}>{model.description}</p>

      <div style={styles.meta}>
        <span style={styles.metaItem}>
          🧠 {model.alignment_method}
        </span>
        <span style={styles.metaItem}>
          📏 {CONTEXT_LABEL(model.context_window)} ctx
        </span>
        <span
          style={{
            ...styles.metaItem,
            color: confidenceColor,
          }}
        >
          🎯 {model.reconstruction_confidence} confidence
        </span>
        {model.open_source && (
          <span style={styles.openBadge}>Open Source</span>
        )}
      </div>

      <div style={styles.tags}>
        {model.tags.slice(0, 5).map((tag) => (
          <span key={tag} style={styles.tag}>
            #{tag}
          </span>
        ))}
        {model.tags.length > 5 && (
          <span style={{ ...styles.tag, color: '#58a6ff' }}>
            +{model.tags.length - 5} more
          </span>
        )}
      </div>
    </div>
  );
}
