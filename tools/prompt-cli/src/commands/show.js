'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

async function showPrompt(promptsDir, modelName, options) {
  const modelDir = path.join(promptsDir, modelName.toLowerCase());

  if (!fs.existsSync(modelDir)) {
    logger.error(`Model not found: ${modelName}`);
    logger.info(`Run 'prompt-lib list' to see available models.`);
    process.exit(1);
  }

  const fileType = options.type || 'system_prompt';
  const ext = fileType === 'metadata' ? '.json' : '.md';
  const filePath = path.join(modelDir, fileType + ext);

  if (!fs.existsSync(filePath)) {
    logger.error(`File not found: ${fileType}${ext} for model ${modelName}`);
    process.exit(1);
  }

  logger.header(`${modelName.toUpperCase()} — ${fileType.replace(/_/g, ' ').toUpperCase()}`);

  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(content);
}

module.exports = { showPrompt };
