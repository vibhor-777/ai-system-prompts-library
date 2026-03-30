'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const REQUIRED_FIELDS = ['model', 'version', 'provider', 'safety_level', 'context_window', 'last_updated', 'tags', 'reconstruction_confidence', 'sources'];
const VALID_SAFETY_LEVELS = ['very-high', 'high', 'medium', 'low', 'configurable'];
const VALID_CONFIDENCE = ['high', 'medium', 'low'];

function validateSingle(metaPath, modelName) {
  if (!fs.existsSync(metaPath)) {
    logger.error(`[${modelName}] metadata.json not found`);
    return false;
  }
  let meta;
  try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')); }
  catch (e) { logger.error(`[${modelName}] Invalid JSON: ${e.message}`); return false; }

  const errors = [];
  for (const f of REQUIRED_FIELDS) {
    if (!(f in meta)) errors.push(`Missing field: ${f}`);
  }
  if (meta.safety_level && !VALID_SAFETY_LEVELS.includes(meta.safety_level))
    errors.push(`Invalid safety_level: ${meta.safety_level}`);
  if (meta.reconstruction_confidence && !VALID_CONFIDENCE.includes(meta.reconstruction_confidence))
    errors.push(`Invalid reconstruction_confidence: ${meta.reconstruction_confidence}`);
  if (meta.sources && !Array.isArray(meta.sources))
    errors.push('sources must be an array');
  if (Array.isArray(meta.sources) && meta.sources.length === 0)
    errors.push('sources must contain at least one entry');

  if (errors.length) {
    logger.error(`[${modelName}] Validation failed:`);
    errors.forEach((e) => console.log(`    - ${e}`));
    return false;
  }
  logger.success(`[${modelName}] Valid`);
  return true;
}

async function validateMetadata(promptsDir, modelName) {
  if (modelName) {
    const metaPath = path.join(promptsDir, modelName.toLowerCase(), 'metadata.json');
    validateSingle(metaPath, modelName);
  } else {
    const entries = fs.readdirSync(promptsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
    let allValid = true;
    for (const entry of entries) {
      const metaPath = path.join(promptsDir, entry.name, 'metadata.json');
      if (!validateSingle(metaPath, entry.name)) allValid = false;
    }
    if (allValid) logger.success('\nAll metadata files are valid!');
    else logger.warn('\nSome metadata files have validation errors. See above.');
  }
}

module.exports = { validateMetadata };
