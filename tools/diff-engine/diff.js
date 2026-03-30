#!/usr/bin/env node

'use strict';

/**
 * AI System Prompts Library — Diff Engine
 *
 * Computes textual and structural differences between prompt reconstructions.
 * Usage: node diff.js <model1> <model2> [--type <type>] [--json]
 */

const fs = require('fs');
const path = require('path');

const PROMPTS_DIR = path.resolve(__dirname, '../../prompts');

// ANSI colors
const C = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

function color(str, ...codes) {
  if (process.env.NO_COLOR || !process.stdout.isTTY) return str;
  return codes.map((c) => C[c] || '').join('') + str + C.reset;
}

/**
 * Compute a simple line-level diff between two texts.
 * Returns an array of { type: 'same'|'added'|'removed', line } objects.
 */
function lineDiff(text1, text2) {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');

  // Build LCS table
  const m = lines1.length;
  const n = lines2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (lines1[i - 1] === lines2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to get diff
  const diff = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
      diff.unshift({ type: 'same', line: lines1[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({ type: 'added', line: lines2[j - 1] });
      j--;
    } else {
      diff.unshift({ type: 'removed', line: lines1[i - 1] });
      i--;
    }
  }

  return diff;
}

/**
 * Extract section headers from markdown content.
 */
function extractSections(content) {
  const sections = {};
  let currentHeader = null;
  let currentLines = [];

  for (const line of content.split('\n')) {
    if (line.startsWith('#')) {
      if (currentHeader !== null) {
        sections[currentHeader] = currentLines.join('\n').trim();
      }
      currentHeader = line.replace(/^#+\s*/, '').trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentHeader !== null) {
    sections[currentHeader] = currentLines.join('\n').trim();
  }

  return sections;
}

/**
 * Compute a simple Jaccard similarity between two text strings (word-level).
 */
function jaccardSimilarity(text1, text2) {
  const words1 = new Set(text1.toLowerCase().match(/\b\w+\b/g) || []);
  const words2 = new Set(text2.toLowerCase().match(/\b\w+\b/g) || []);

  const intersection = new Set([...words1].filter((w) => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return union.size === 0 ? 1 : intersection.size / union.size;
}

/**
 * Format a diff entry for terminal output.
 */
function formatDiffLine(entry, context = false) {
  if (entry.type === 'added') {
    return color(`+ ${entry.line}`, 'green');
  }
  if (entry.type === 'removed') {
    return color(`- ${entry.line}`, 'red');
  }
  if (context) {
    return color(`  ${entry.line}`, 'dim');
  }
  return null;
}

/**
 * Render diff output with context lines.
 */
function renderDiff(diff, contextLines = 3) {
  const lines = [];
  const changeIndices = diff
    .map((d, i) => (d.type !== 'same' ? i : -1))
    .filter((i) => i >= 0);

  const showIndices = new Set();
  for (const idx of changeIndices) {
    for (let c = Math.max(0, idx - contextLines); c <= Math.min(diff.length - 1, idx + contextLines); c++) {
      showIndices.add(c);
    }
  }

  let lastShown = -1;
  for (const idx of [...showIndices].sort((a, b) => a - b)) {
    if (lastShown !== -1 && idx > lastShown + 1) {
      lines.push(color('...', 'dim'));
    }
    const formatted = formatDiffLine(diff[idx], diff[idx].type === 'same');
    if (formatted !== null) {
      lines.push(formatted);
    }
    lastShown = idx;
  }

  return lines.join('\n');
}

/**
 * Main diff function.
 */
function diffModels(model1Name, model2Name, fileType = 'system_prompt', options = {}) {
  const file1 = path.join(PROMPTS_DIR, model1Name, `${fileType}.md`);
  const file2 = path.join(PROMPTS_DIR, model2Name, `${fileType}.md`);

  // Handle metadata separately
  if (fileType === 'metadata') {
    const meta1 = JSON.parse(fs.readFileSync(path.join(PROMPTS_DIR, model1Name, 'metadata.json'), 'utf-8'));
    const meta2 = JSON.parse(fs.readFileSync(path.join(PROMPTS_DIR, model2Name, 'metadata.json'), 'utf-8'));
    diffMetadata(meta1, meta2, model1Name, model2Name, options);
    return;
  }

  if (!fs.existsSync(file1)) {
    console.error(`File not found: ${file1}`);
    process.exit(1);
  }
  if (!fs.existsSync(file2)) {
    console.error(`File not found: ${file2}`);
    process.exit(1);
  }

  const content1 = fs.readFileSync(file1, 'utf-8');
  const content2 = fs.readFileSync(file2, 'utf-8');

  const similarity = jaccardSimilarity(content1, content2);
  const diff = lineDiff(content1, content2);

  const added = diff.filter((d) => d.type === 'added').length;
  const removed = diff.filter((d) => d.type === 'removed').length;
  const same = diff.filter((d) => d.type === 'same').length;

  if (options.json) {
    const result = {
      model1: model1Name,
      model2: model2Name,
      fileType,
      similarity: Math.round(similarity * 100) / 100,
      stats: { added, removed, same, total: diff.length },
      diff: diff.map((d) => ({ type: d.type, line: d.line })),
    };
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  // Header
  console.log('');
  console.log(color(`Diff: ${model1Name} vs ${model2Name} [${fileType}]`, 'cyan', 'bold'));
  console.log('─'.repeat(60));
  console.log(`Similarity: ${color(Math.round(similarity * 100) + '%', similarity > 0.7 ? 'green' : similarity > 0.4 ? 'yellow' : 'red')}`);
  console.log(`Changes: ${color(`+${added}`, 'green')} ${color(`-${removed}`, 'red')} ${color(`~${same} unchanged`, 'dim')}`);
  console.log('');

  // Section comparison
  const sections1 = extractSections(content1);
  const sections2 = extractSections(content2);
  const allSections = new Set([...Object.keys(sections1), ...Object.keys(sections2)]);

  console.log(color('Section Analysis:', 'bold'));
  for (const section of allSections) {
    const in1 = section in sections1;
    const in2 = section in sections2;
    if (in1 && in2) {
      const sim = jaccardSimilarity(sections1[section], sections2[section]);
      const simStr = Math.round(sim * 100) + '%';
      const simColor = sim > 0.7 ? 'green' : sim > 0.4 ? 'yellow' : 'red';
      console.log(`  ${color('≈', 'dim')} ${section.padEnd(40)} ${color(simStr, simColor)} similar`);
    } else if (in1) {
      console.log(`  ${color('-', 'red')} ${section.padEnd(40)} only in ${model1Name}`);
    } else {
      console.log(`  ${color('+', 'green')} ${section.padEnd(40)} only in ${model2Name}`);
    }
  }

  console.log('');
  console.log(color('Line Diff:', 'bold'));
  console.log('─'.repeat(60));
  const rendered = renderDiff(diff);
  if (rendered) {
    console.log(rendered);
  } else {
    console.log(color('Files are identical.', 'green'));
  }
}

/**
 * Compare two metadata JSON objects.
 */
function diffMetadata(meta1, meta2, name1, name2, options) {
  const keys = new Set([...Object.keys(meta1), ...Object.keys(meta2)]);

  if (options.json) {
    const differences = {};
    for (const key of keys) {
      if (JSON.stringify(meta1[key]) !== JSON.stringify(meta2[key])) {
        differences[key] = { [name1]: meta1[key], [name2]: meta2[key] };
      }
    }
    console.log(JSON.stringify({ name1, name2, differences }, null, 2));
    return;
  }

  console.log('');
  console.log(color(`Metadata Diff: ${name1} vs ${name2}`, 'cyan', 'bold'));
  console.log('─'.repeat(60));

  let hasDiff = false;
  for (const key of [...keys].sort()) {
    const val1 = JSON.stringify(meta1[key]);
    const val2 = JSON.stringify(meta2[key]);
    if (val1 !== val2) {
      hasDiff = true;
      console.log(`\n${color(key, 'yellow', 'bold')}:`);
      console.log(`  ${color('-', 'red')} ${name1}: ${val1}`);
      console.log(`  ${color('+', 'green')} ${name2}: ${val2}`);
    }
  }

  if (!hasDiff) {
    console.log(color('Metadata files are identical.', 'green'));
  }
}

// --- CLI Entry Point ---

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node diff.js <model1> <model2> [--type <type>] [--json]');
  console.error('Types: system_prompt, behavior, examples, risks, metadata');
  process.exit(1);
}

const model1 = args[0];
const model2 = args[1];
const typeIndex = args.indexOf('--type');
const fileType = typeIndex !== -1 ? args[typeIndex + 1] : 'system_prompt';
const outputJson = args.includes('--json');

diffModels(model1, model2, fileType, { json: outputJson });
