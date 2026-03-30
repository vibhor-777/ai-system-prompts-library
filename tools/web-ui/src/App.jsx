import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PromptExplorer from './components/PromptExplorer';
import ModelComparison from './components/ModelComparison';

/** Mock data representing the library's metadata.json entries */
const MODELS_DATA = [
  {
    id: 'openai',
    model: 'GPT-4o',
    provider: 'OpenAI',
    safety_level: 'high',
    context_window: 128000,
    open_source: false,
    reconstruction_confidence: 'medium',
    alignment_method: 'RLHF',
    last_updated: '2024-06-01',
    tags: ['rlhf', 'multimodal', 'tool-use', 'high-safety', 'closed-source'],
    modalities: ['text', 'image', 'audio'],
    description: 'Research reconstruction of GPT-4o / ChatGPT system prompt with behavioral analysis.',
  },
  {
    id: 'anthropic',
    model: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    safety_level: 'very-high',
    context_window: 200000,
    open_source: false,
    reconstruction_confidence: 'medium',
    alignment_method: 'RLHF + Constitutional AI',
    last_updated: '2024-06-01',
    tags: ['constitutional-ai', 'rlhf', 'multimodal', 'high-safety', 'closed-source'],
    modalities: ['text', 'image'],
    description: 'Constitutional AI approach — unique principled alignment with operator/user hierarchy.',
  },
  {
    id: 'google',
    model: 'Gemini 1.5 Pro',
    provider: 'Google DeepMind',
    safety_level: 'high',
    context_window: 2000000,
    open_source: false,
    reconstruction_confidence: 'low',
    alignment_method: 'RLHF',
    last_updated: '2024-06-01',
    tags: ['rlhf', 'multimodal', 'context-1m', 'high-safety', 'closed-source'],
    modalities: ['text', 'image', 'video', 'audio'],
    description: '1M+ token context window multimodal model from Google DeepMind.',
  },
  {
    id: 'meta',
    model: 'LLaMA 3.1',
    provider: 'Meta AI',
    safety_level: 'configurable',
    context_window: 128000,
    open_source: true,
    reconstruction_confidence: 'high',
    alignment_method: 'RLHF',
    last_updated: '2024-06-01',
    tags: ['rlhf', 'open-source', 'configurable-safety', 'context-128k'],
    modalities: ['text', 'code'],
    description: 'Open-weight model family — actual system prompt published by Meta.',
  },
  {
    id: 'mistral',
    model: 'Mistral Large 2',
    provider: 'Mistral AI',
    safety_level: 'configurable',
    context_window: 128000,
    open_source: false,
    reconstruction_confidence: 'medium',
    alignment_method: 'DPO',
    last_updated: '2024-06-01',
    tags: ['dpo', 'european-privacy', 'multilingual', 'configurable-safety'],
    modalities: ['text', 'code'],
    description: 'European AI with DPO alignment — exceptional multilingual and instruction-following.',
  },
  {
    id: 'xai',
    model: 'Grok-2',
    provider: 'xAI',
    safety_level: 'medium',
    context_window: 131072,
    open_source: false,
    reconstruction_confidence: 'medium',
    alignment_method: 'RLHF',
    last_updated: '2024-06-01',
    tags: ['rlhf', 'real-time-web', 'humor', 'anti-paternalism', 'closed-source'],
    modalities: ['text', 'image'],
    description: 'xAI\'s less-restricted model with real-time X integration and strong personality.',
  },
  {
    id: 'open-source',
    model: 'Community Models',
    provider: 'Community',
    safety_level: 'configurable',
    context_window: 128000,
    open_source: true,
    reconstruction_confidence: 'high',
    alignment_method: 'Varies (RLHF, DPO, none)',
    last_updated: '2024-06-01',
    tags: ['open-source', 'community', 'fine-tuning', 'configurable-safety'],
    modalities: ['text', 'code'],
    description: 'Ecosystem of community fine-tunes (Dolphin, OpenHermes, Nous Hermes, etc.)',
  },
];

const SAFETY_COLORS = {
  'very-high': '#ff6b6b',
  high: '#ffd93d',
  medium: '#6bcb77',
  low: '#4d96ff',
  configurable: '#c77dff',
};

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#0d1117',
    color: '#e6edf3',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1.5rem',
    background: '#161b22',
    borderBottom: '1px solid #30363d',
  },
  navBrand: {
    fontWeight: 700,
    fontSize: '1.1rem',
    color: '#58a6ff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  navLinks: { display: 'flex', gap: '0.5rem', marginLeft: 'auto' },
  navLink: {
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    color: '#8b949e',
    textDecoration: 'none',
    fontSize: '0.9rem',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
  },
  navLinkActive: {
    background: '#21262d',
    color: '#e6edf3',
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState('explorer');

  return (
    <BrowserRouter>
      <div style={styles.app}>
        <nav style={styles.nav}>
          <span style={styles.navBrand}>🤖 AI Prompts Library</span>
          <div style={styles.navLinks}>
            {['explorer', 'compare'].map((tab) => (
              <button
                key={tab}
                style={{
                  ...styles.navLink,
                  ...(activeTab === tab ? styles.navLinkActive : {}),
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'explorer' ? '🔍 Explorer' : '📊 Compare'}
              </button>
            ))}
            <a
              href="https://github.com/vibhor-777/ai-system-prompts-library"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.navLink}
            >
              ⭐ GitHub
            </a>
          </div>
        </nav>

        {activeTab === 'explorer' && <PromptExplorer models={MODELS_DATA} safetyColors={SAFETY_COLORS} />}
        {activeTab === 'compare' && <ModelComparison models={MODELS_DATA} safetyColors={SAFETY_COLORS} />}
      </div>
    </BrowserRouter>
  );
}

export { MODELS_DATA, SAFETY_COLORS };
