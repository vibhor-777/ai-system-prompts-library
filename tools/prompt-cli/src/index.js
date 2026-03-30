#!/usr/bin/env node

'use strict';

const { program } = require('commander');
const path = require('path');
const fs = require('fs');

const { listModels } = require('./commands/list');
const { showPrompt } = require('./commands/show');
const { compareModels } = require('./commands/compare');
const { runTest } = require('./commands/run');
const { diffModels } = require('./commands/diff');
const logger = require('./utils/logger');

const LIBRARY_ROOT = path.resolve(__dirname, '../../../');
const PROMPTS_DIR = path.join(LIBRARY_ROOT, 'prompts');

// Validate the library structure exists
if (!fs.existsSync(PROMPTS_DIR)) {
  logger.error(`Prompts directory not found at: ${PROMPTS_DIR}`);
  logger.error('Make sure you are running this from within the ai-system-prompts-library repository.');
  process.exit(1);
}

program
  .name('prompt-lib')
  .description('CLI for exploring AI System Prompts Library — research reconstructions of AI model system prompts')
  .version('1.5.0', '-v, --version', 'Display version number');

program
  .command('list')
  .description('List all available AI model prompt reconstructions')
  .option('-f, --filter <tag>', 'Filter by tag (e.g., open-source, rlhf, multimodal)')
  .option('-s, --sort <field>', 'Sort by field: model, provider, safety_level, context_window', 'model')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    await listModels(PROMPTS_DIR, options);
  });

program
  .command('show <model>')
  .description('Display a model\'s prompt reconstruction')
  .option('-t, --type <type>', 'File type to show: system_prompt, behavior, examples, risks, metadata', 'system_prompt')
  .option('--raw', 'Show raw markdown without formatting')
  .option('--no-color', 'Disable color output')
  .action(async (model, options) => {
    await showPrompt(PROMPTS_DIR, model, options);
  });

program
  .command('compare <model1> <model2>')
  .description('Compare two model prompt reconstructions side by side')
  .option('-t, --type <type>', 'File type to compare: system_prompt, behavior, metadata', 'metadata')
  .option('--json', 'Output comparison as JSON')
  .action(async (model1, model2, options) => {
    await compareModels(PROMPTS_DIR, model1, model2, options);
  });

program
  .command('test <model>')
  .description('Run a test prompt against a model\'s documented behaviors')
  .requiredOption('-i, --input <text>', 'Input text to test')
  .option('--verbose', 'Show detailed analysis')
  .action(async (model, options) => {
    await runTest(PROMPTS_DIR, model, options);
  });

program
  .command('diff <model1> <model2>')
  .description('Show behavioral differences between two models')
  .action(async (model1, model2) => {
    await diffModels(PROMPTS_DIR, model1, model2);
  });

program
  .command('validate [model]')
  .description('Validate metadata.json schema for one or all models')
  .action(async (model) => {
    const { validateMetadata } = require('./commands/validate');
    await validateMetadata(PROMPTS_DIR, model);
  });

// Error handling for unknown commands
program.on('command:*', (operands) => {
  logger.error(`Unknown command: ${operands[0]}`);
  logger.info('Run prompt-lib --help to see available commands.');
  process.exit(1);
});

// Show help if no command provided
if (process.argv.length <= 2) {
  program.help();
}

program.parseAsync(process.argv).catch((err) => {
  logger.error(`Error: ${err.message}`);
  if (process.env.DEBUG) {
    console.error(err.stack);
  }
  process.exit(1);
});
