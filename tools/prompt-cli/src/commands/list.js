'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

async function listModels(promptsDir, options) {
  const entries = fs.readdirSync(promptsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (entries.length === 0) {
    logger.warn('No model directories found.');
    return;
  }

  const models = entries.map((name) => {
    const metaPath = path.join(promptsDir, name, 'metadata.json');
    if (!fs.existsSync(metaPath)) return { name, model: name, provider: 'Unknown' };
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      return { name, ...meta };
    } catch {
      return { name, model: name, provider: 'Unknown' };
    }
  });

  const filtered = options.filter
    ? models.filter((m) => (m.tags || []).includes(options.filter))
    : models;

  if (options.json) {
    console.log(JSON.stringify(filtered, null, 2));
    return;
  }

  logger.header('AI System Prompts Library — Available Models');

  const col = (s, w) => String(s ?? '').padEnd(w).slice(0, w);
  const header = `${col('Model', 14)} ${col('Provider', 20)} ${col('Safety', 14)} ${col('Context', 10)} ${col('Confidence', 12)} ${col('Open Source', 11)}`;
  console.log(logger.badge(header, 'blue'));
  console.log('─'.repeat(header.length));

  for (const m of filtered) {
    const row = `${col(m.name, 14)} ${col(m.provider, 20)} ${col(m.safety_level, 14)} ${col(m.context_window ? m.context_window / 1000 + 'K' : 'N/A', 10)} ${col(m.reconstruction_confidence, 12)} ${col(m.open_source ? 'Yes' : 'No', 11)}`;
    console.log(row);
  }

  console.log(`\nTotal: ${filtered.length} model(s)`);
  console.log(`\nRun 'prompt-lib show <model>' to view a reconstruction.`);
}

module.exports = { listModels };
