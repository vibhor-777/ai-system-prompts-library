'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

/** Wrap async route handlers for error propagation */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/** Standardized API response */
function respond(res, data, statusCode = 200) {
  res.status(statusCode).json({
    success: statusCode < 400,
    data: statusCode < 400 ? data : undefined,
    error: statusCode >= 400 ? data : undefined,
    timestamp: new Date().toISOString(),
  });
}

/** Load metadata.json for a model */
function loadMetadata(promptsDir, modelName) {
  const metaPath = path.join(promptsDir, modelName, 'metadata.json');
  if (!fs.existsSync(metaPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  } catch {
    return null;
  }
}

/** Get all available model names */
function getModelNames(promptsDir) {
  if (!fs.existsSync(promptsDir)) return [];
  return fs
    .readdirSync(promptsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/** Load a markdown file for a model */
function loadMarkdownFile(promptsDir, modelName, fileType) {
  const filePath = path.join(promptsDir, modelName, `${fileType}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

// ─────────────────────────────────────────────
// GET /api/prompts
// List all models with their metadata
// ─────────────────────────────────────────────
router.get('/prompts', asyncHandler(async (req, res) => {
  const { promptsDir } = req;
  const names = getModelNames(promptsDir);
  const models = [];

  for (const name of names) {
    const meta = loadMetadata(promptsDir, name);
    models.push({
      id: name,
      ...(meta || { model: name, provider: 'Unknown' }),
    });
  }

  // Optional filtering
  const { safety, tag, open_source } = req.query;
  let filtered = models;

  if (safety) {
    filtered = filtered.filter((m) => m.safety_level === safety);
  }
  if (tag) {
    filtered = filtered.filter((m) => (m.tags || []).includes(tag));
  }
  if (open_source !== undefined) {
    const isOpen = open_source === 'true';
    filtered = filtered.filter((m) => m.open_source === isOpen);
  }

  respond(res, {
    count: filtered.length,
    models: filtered,
  });
}));

// ─────────────────────────────────────────────
// GET /api/prompts/:model
// Get full metadata for a specific model
// ─────────────────────────────────────────────
router.get('/prompts/:model', asyncHandler(async (req, res) => {
  const { promptsDir } = req;
  const { model } = req.params;
  const modelName = model.toLowerCase();

  const modelDir = path.join(promptsDir, modelName);
  if (!fs.existsSync(modelDir)) {
    return respond(res, `Model not found: ${model}. Use GET /api/prompts to list available models.`, 404);
  }

  const meta = loadMetadata(promptsDir, modelName);
  if (!meta) {
    return respond(res, `metadata.json not found for model: ${model}`, 404);
  }

  // Include file availability
  const CONTENT_TYPES = ['system_prompt', 'behavior', 'examples', 'risks'];
  const availableContent = CONTENT_TYPES.filter((type) =>
    fs.existsSync(path.join(modelDir, `${type}.md`))
  );

  respond(res, {
    id: modelName,
    ...meta,
    availableContent,
    contentUrls: availableContent.reduce((acc, type) => {
      acc[type] = `/api/prompts/${modelName}/${type}`;
      return acc;
    }, {}),
  });
}));

// ─────────────────────────────────────────────
// GET /api/prompts/:model/:type
// Get specific content file for a model
// ─────────────────────────────────────────────
router.get('/prompts/:model/:type', asyncHandler(async (req, res) => {
  const { promptsDir } = req;
  const { model, type } = req.params;
  const modelName = model.toLowerCase();

  const VALID_TYPES = ['system_prompt', 'behavior', 'examples', 'risks'];
  if (!VALID_TYPES.includes(type)) {
    return respond(
      res,
      `Invalid content type: ${type}. Valid types: ${VALID_TYPES.join(', ')}`,
      400
    );
  }

  const modelDir = path.join(promptsDir, modelName);
  if (!fs.existsSync(modelDir)) {
    return respond(res, `Model not found: ${model}`, 404);
  }

  const content = loadMarkdownFile(promptsDir, modelName, type);
  if (content === null) {
    return respond(res, `Content type '${type}' not available for model: ${model}`, 404);
  }

  const meta = loadMetadata(promptsDir, modelName);
  const format = req.query.format || 'markdown';

  const responseData = {
    model: modelName,
    type,
    metadata: meta ? { model: meta.model, provider: meta.provider, version: meta.version } : null,
    content: format === 'markdown' ? content : content.replace(/```[\s\S]*?```/g, '[code block]'),
    wordCount: content.split(/\s+/).length,
    lineCount: content.split('\n').length,
  };

  // Optionally return rendered HTML
  if (format === 'html') {
    try {
      const { marked } = require('marked');
      responseData.html = marked(content);
    } catch {
      // marked not available — skip HTML rendering
    }
  }

  respond(res, responseData);
}));

// ─────────────────────────────────────────────
// GET /api/compare
// Compare two models metadata
// Query params: m1, m2
// ─────────────────────────────────────────────
router.get('/compare', asyncHandler(async (req, res) => {
  const { promptsDir } = req;
  const { m1, m2 } = req.query;

  if (!m1 || !m2) {
    return respond(res, 'Query parameters m1 and m2 are required', 400);
  }

  const meta1 = loadMetadata(promptsDir, m1.toLowerCase());
  const meta2 = loadMetadata(promptsDir, m2.toLowerCase());

  if (!meta1) return respond(res, `Model not found: ${m1}`, 404);
  if (!meta2) return respond(res, `Model not found: ${m2}`, 404);

  // Compute differences
  const comparedFields = [
    'safety_level', 'alignment_method', 'context_window',
    'open_source', 'reconstruction_confidence', 'modalities',
  ];

  const differences = {};
  const shared = {};

  for (const field of comparedFields) {
    const val1 = meta1[field];
    const val2 = meta2[field];
    if (JSON.stringify(val1) !== JSON.stringify(val2)) {
      differences[field] = { [m1]: val1, [m2]: val2 };
    } else {
      shared[field] = val1;
    }
  }

  // Tag analysis
  const tags1 = new Set(meta1.tags || []);
  const tags2 = new Set(meta2.tags || []);
  const sharedTags = [...tags1].filter((t) => tags2.has(t));
  const uniqueToM1 = [...tags1].filter((t) => !tags2.has(t));
  const uniqueToM2 = [...tags2].filter((t) => !tags1.has(t));

  respond(res, {
    models: { m1: { id: m1, model: meta1.model, provider: meta1.provider }, m2: { id: m2, model: meta2.model, provider: meta2.provider } },
    differences,
    shared,
    tags: { shared: sharedTags, uniqueToM1, uniqueToM2 },
    differenceCount: Object.keys(differences).length,
  });
}));

// ─────────────────────────────────────────────
// GET /api/search
// Search across model names, tags, and metadata
// Query params: q (required), type (optional)
// ─────────────────────────────────────────────
router.get('/search', asyncHandler(async (req, res) => {
  const { promptsDir } = req;
  const { q, type } = req.query;

  if (!q || q.trim().length < 2) {
    return respond(res, 'Query parameter "q" is required and must be at least 2 characters', 400);
  }

  const searchTerm = q.toLowerCase().trim();
  const names = getModelNames(promptsDir);
  const results = [];

  for (const name of names) {
    const meta = loadMetadata(promptsDir, name);
    if (!meta) continue;

    const matchScore = computeMatchScore(searchTerm, name, meta);
    if (matchScore > 0) {
      const result = { id: name, model: meta.model, provider: meta.provider, matchScore, matchedFields: [] };

      if (name.includes(searchTerm)) result.matchedFields.push('id');
      if ((meta.model || '').toLowerCase().includes(searchTerm)) result.matchedFields.push('model');
      if ((meta.provider || '').toLowerCase().includes(searchTerm)) result.matchedFields.push('provider');
      if ((meta.alignment_method || '').toLowerCase().includes(searchTerm)) result.matchedFields.push('alignment_method');
      if ((meta.tags || []).some((t) => t.toLowerCase().includes(searchTerm))) result.matchedFields.push('tags');

      // Optionally search markdown content
      if (type) {
        const content = loadMarkdownFile(promptsDir, name, type);
        if (content && content.toLowerCase().includes(searchTerm)) {
          result.matchedFields.push(`${type}.md`);
          result.matchScore += 5;
        }
      }

      results.push(result);
    }
  }

  results.sort((a, b) => b.matchScore - a.matchScore);

  respond(res, {
    query: q,
    count: results.length,
    results,
  });
}));

/**
 * Compute a relevance score for a search term against a model's metadata.
 */
function computeMatchScore(term, name, meta) {
  let score = 0;
  if (name.includes(term)) score += 10;
  if ((meta.model || '').toLowerCase().includes(term)) score += 10;
  if ((meta.provider || '').toLowerCase().includes(term)) score += 8;
  if ((meta.alignment_method || '').toLowerCase().includes(term)) score += 5;
  if ((meta.tags || []).some((t) => t.toLowerCase().includes(term))) score += 6;
  if ((meta.notes || '').toLowerCase().includes(term)) score += 2;
  return score;
}

module.exports = router;
