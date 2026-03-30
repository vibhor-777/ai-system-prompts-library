'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

/**
 * Compare two model prompt reconstructions.
 */
async function compareModels(promptsDir, model1Name, model2Name, options) {
  const model1Dir = path.join(promptsDir, model1Name.toLowerCase());
  const model2Dir = path.join(promptsDir, model2Name.toLowerCase());

  // Validate both models exist
  for (const [name, dir] of [[model1Name, model1Dir], [model2Name, model2Dir]]) {
    if (!fs.existsSync(dir)) {
      logger.error(`Model not found: ${name}`);
      logger.info(`Run 'prompt-lib list' to see available models.`);
      process.exit(1);
    }
  }

  const fileType = options.type || 'metadata';

  logger.header(`Comparison: ${model1Name.toUpperCase()} vs ${model2Name.toUpperCase()}`);

  if (fileType === 'metadata') {
    await compareMetadata(model1Dir, model2Dir, model1Name, model2Name, options);
  } else {
    await compareMarkdown(model1Dir, model2Dir, model1Name, model2Name, fileType);
  }
}

/**
 * Compare metadata JSON files side by side.
 */
async function compareMetadata(dir1, dir2, name1, name2, options) {
  const meta1 = loadMetadata(dir1, name1);
  const meta2 = loadMetadata(dir2, name2);

  if (!meta1 || !meta2) return;

  if (options.json) {
    console.log(JSON.stringify({ [name1]: meta1, [name2]: meta2 }, null, 2));
    return;
  }

  const fields = [
    ['Model', 'model'],
    ['Provider', 'provider'],
    ['Safety Level', 'safety_level'],
    ['Context Window', 'context_window'],
    ['Open Source', 'open_source'],
    ['Alignment Method', 'alignment_method'],
    ['Reconstruction Confidence', 'reconstruction_confidence'],
    ['Last Updated', 'last_updated'],
  ];

  console.log('');
  console.log(padRight('Dimension', 30) + padRight(name1.toUpperCase(), 30) + name2.toUpperCase());
  console.log('─'.repeat(90));

  for (const [label, key] of fields) {
    const val1 = String(meta1[key] ?? 'N/A');
    const val2 = String(meta2[key] ?? 'N/A');
    const marker = val1 === val2 ? ' ' : '≠';
    console.log(`${marker} ${padRight(label, 28)} ${padRight(val1, 30)} ${val2}`);
  }

  // Compare tags
  console.log('─'.repeat(90));
  const tags1 = new Set(meta1.tags || []);
  const tags2 = new Set(meta2.tags || []);
  const sharedTags = [...tags1].filter((t) => tags2.has(t));
  const uniqueTo1 = [...tags1].filter((t) => !tags2.has(t));
  const uniqueTo2 = [...tags2].filter((t) => !tags1.has(t));

  console.log(`\n📌 Shared tags: ${sharedTags.join(', ') || 'none'}`);
  console.log(`   Only in ${name1}: ${uniqueTo1.join(', ') || 'none'}`);
  console.log(`   Only in ${name2}: ${uniqueTo2.join(', ') || 'none'}`);

  // Modalities comparison
  console.log('');
  console.log(`🎯 Modalities:`);
  console.log(`   ${name1}: ${(meta1.modalities || []).join(', ')}`);
  console.log(`   ${name2}: ${(meta2.modalities || []).join(', ')}`);

  // Sources comparison
  console.log('');
  console.log(`📚 Source count: ${name1} has ${(meta1.sources || []).length} sources, ${name2} has ${(meta2.sources || []).length} sources`);
}

/**
 * Compare markdown file contents side by side.
 */
async function compareMarkdown(dir1, dir2, name1, name2, fileType) {
  const file1 = path.join(dir1, `${fileType}.md`);
  const file2 = path.join(dir2, `${fileType}.md`);

  const content1 = fs.existsSync(file1) ? fs.readFileSync(file1, 'utf-8') : null;
  const content2 = fs.existsSync(file2) ? fs.readFileSync(file2, 'utf-8') : null;

  if (!content1) {
    logger.error(`${fileType}.md not found for ${name1}`);
    return;
  }
  if (!content2) {
    logger.error(`${fileType}.md not found for ${name2}`);
    return;
  }

  // Count lines and words for basic comparison
  const lines1 = content1.split('\n').length;
  const lines2 = content2.split('\n').length;
  const words1 = content1.split(/\s+/).length;
  const words2 = content2.split(/\s+/).length;

  console.log(`\n📄 ${fileType}.md comparison:\n`);
  console.log(padRight('Metric', 30) + padRight(name1, 25) + name2);
  console.log('─'.repeat(80));
  console.log(padRight('Lines', 30) + padRight(String(lines1), 25) + lines2);
  console.log(padRight('Words', 30) + padRight(String(words1), 25) + words2);

  // Extract and compare headers
  const headers1 = extractHeaders(content1);
  const headers2 = extractHeaders(content2);
  const headerSet1 = new Set(headers1.map((h) => h.toLowerCase().trim()));
  const headerSet2 = new Set(headers2.map((h) => h.toLowerCase().trim()));

  const sharedHeaders = [...headerSet1].filter((h) => headerSet2.has(h));
  const uniqueTo1 = [...headerSet1].filter((h) => !headerSet2.has(h));
  const uniqueTo2 = [...headerSet2].filter((h) => !headerSet1.has(h));

  console.log(`\n📑 Section Headers:\n`);
  console.log(`   Shared (${sharedHeaders.length}): ${sharedHeaders.slice(0, 5).join(', ')}${sharedHeaders.length > 5 ? '...' : ''}`);
  console.log(`   Only in ${name1} (${uniqueTo1.length}): ${uniqueTo1.slice(0, 3).join(', ')}${uniqueTo1.length > 3 ? '...' : ''}`);
  console.log(`   Only in ${name2} (${uniqueTo2.length}): ${uniqueTo2.slice(0, 3).join(', ')}${uniqueTo2.length > 3 ? '...' : ''}`);

  console.log(`\nTip: Use 'prompt-lib show ${name1} --type ${fileType}' and 'prompt-lib show ${name2} --type ${fileType}' to read each in full.`);
}

function loadMetadata(dir, modelName) {
  const metaPath = path.join(dir, 'metadata.json');
  if (!fs.existsSync(metaPath)) {
    logger.error(`metadata.json not found for ${modelName}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  } catch (err) {
    logger.error(`Failed to parse metadata.json for ${modelName}: ${err.message}`);
    return null;
  }
}

function extractHeaders(content) {
  return content
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) => line.replace(/^#+\s*/, ''));
}

function padRight(str, length) {
  return String(str).padEnd(length);
}

module.exports = { compareModels };
