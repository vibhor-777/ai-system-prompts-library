'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

async function diffModels(promptsDir, model1Name, model2Name) {
  logger.header(`Diff: ${model1Name} vs ${model2Name}`);

  const meta1 = loadMeta(path.join(promptsDir, model1Name.toLowerCase()), model1Name);
  const meta2 = loadMeta(path.join(promptsDir, model2Name.toLowerCase()), model2Name);
  if (!meta1 || !meta2) return;

  const compareFields = ['safety_level', 'alignment_method', 'open_source', 'context_window', 'reconstruction_confidence'];
  console.log('\nKey differences:\n');
  for (const field of compareFields) {
    if (meta1[field] !== meta2[field]) {
      console.log(`  ≠ ${field.padEnd(30)} ${model1Name}: ${meta1[field]}  |  ${model2Name}: ${meta2[field]}`);
    }
  }

  const tags1 = new Set(meta1.tags || []);
  const tags2 = new Set(meta2.tags || []);
  const only1 = [...tags1].filter((t) => !tags2.has(t));
  const only2 = [...tags2].filter((t) => !tags1.has(t));
  if (only1.length) console.log(`\n  Tags only in ${model1Name}: ${only1.join(', ')}`);
  if (only2.length) console.log(`  Tags only in ${model2Name}: ${only2.join(', ')}`);
}

function loadMeta(dir, name) {
  const p = path.join(dir, 'metadata.json');
  if (!fs.existsSync(p)) { logger.error(`metadata.json not found for ${name}`); return null; }
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

module.exports = { diffModels };
