'use strict';

/**
 * Logger utility for the prompt-lib CLI.
 * Provides colored output, consistent formatting, and level-based logging.
 */

// ANSI color codes — minimal approach without requiring chalk at module load
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgBlue: '\x1b[44m',
};

const noColor = process.env.NO_COLOR || process.env.TERM === 'dumb' || !process.stdout.isTTY;

function colorize(text, ...colorCodes) {
  if (noColor) return text;
  return colorCodes.map((c) => colors[c] || '').join('') + text + colors.reset;
}

const logger = {
  /**
   * Print a prominent header for a new section.
   */
  header(text) {
    console.log('');
    console.log(colorize(`╔${'═'.repeat(text.length + 4)}╗`, 'cyan', 'bold'));
    console.log(colorize(`║  ${text}  ║`, 'cyan', 'bold'));
    console.log(colorize(`╚${'═'.repeat(text.length + 4)}╝`, 'cyan', 'bold'));
    console.log('');
  },

  /**
   * Print an informational message.
   */
  info(text) {
    console.log(colorize(`ℹ  ${text}`, 'blue'));
  },

  /**
   * Print a success message.
   */
  success(text) {
    console.log(colorize(`✓  ${text}`, 'green'));
  },

  /**
   * Print a warning message.
   */
  warn(text) {
    console.warn(colorize(`⚠  ${text}`, 'yellow'));
  },

  /**
   * Print an error message.
   */
  error(text) {
    console.error(colorize(`✗  ${text}`, 'red', 'bold'));
  },

  /**
   * Print a key-value pair.
   */
  field(key, value, options = {}) {
    const { keyWidth = 25 } = options;
    const paddedKey = (key + ':').padEnd(keyWidth);
    const formattedKey = colorize(paddedKey, 'dim');
    const formattedValue = colorize(String(value), 'white');
    console.log(`  ${formattedKey}${formattedValue}`);
  },

  /**
   * Print a section divider.
   */
  divider() {
    console.log(colorize('─'.repeat(60), 'dim'));
  },

  /**
   * Print a badge (colored label).
   */
  badge(text, color = 'blue') {
    return colorize(` ${text} `, color, 'bold');
  },

  /**
   * Format a safety level with color.
   */
  safetyBadge(level) {
    const levelColors = {
      'very-high': 'red',
      'high': 'red',
      'medium': 'yellow',
      'low': 'green',
      'configurable': 'cyan',
    };
    const color = levelColors[level] || 'white';
    return colorize(level, color, 'bold');
  },

  /**
   * Format a confidence level with color.
   */
  confidenceBadge(level) {
    const levelColors = {
      high: 'green',
      medium: 'yellow',
      low: 'red',
    };
    const color = levelColors[level] || 'white';
    return colorize(level, color);
  },

  /**
   * Print raw text without formatting.
   */
  raw(text) {
    console.log(text);
  },

  /**
   * Start a spinner (simple implementation without ora dependency for fallback).
   */
  startSpinner(text) {
    if (noColor || !process.stdout.isTTY) {
      process.stdout.write(`${text}...\n`);
      return { stop: () => {}, succeed: (msg) => logger.success(msg), fail: (msg) => logger.error(msg) };
    }

    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    const interval = setInterval(() => {
      process.stdout.write(`\r${colorize(frames[i % frames.length], 'cyan')} ${text}`);
      i++;
    }, 80);

    return {
      stop() {
        clearInterval(interval);
        process.stdout.write('\r' + ' '.repeat(text.length + 4) + '\r');
      },
      succeed(msg) {
        clearInterval(interval);
        process.stdout.write('\r' + ' '.repeat(text.length + 4) + '\r');
        logger.success(msg);
      },
      fail(msg) {
        clearInterval(interval);
        process.stdout.write('\r' + ' '.repeat(text.length + 4) + '\r');
        logger.error(msg);
      },
    };
  },
};

module.exports = logger;
