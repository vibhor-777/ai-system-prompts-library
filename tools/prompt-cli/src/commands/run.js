'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

/**
 * Run a behavioral test against a model's documented behaviors.
 * This does not make live API calls — it analyzes the prompt against 
 * documented behavior patterns to predict likely model responses.
 */
async function runTest(promptsDir, modelName, options) {
  const modelDir = path.join(promptsDir, modelName.toLowerCase());

  if (!fs.existsSync(modelDir)) {
    logger.error(`Model not found: ${modelName}`);
    logger.info(`Run 'prompt-lib list' to see available models.`);
    process.exit(1);
  }

  const inputText = options.input;
  logger.header(`Behavioral Test: ${modelName.toUpperCase()}`);
  logger.info(`Input: "${inputText}"`);
  logger.divider();

  // Load behavior analysis
  const behaviorFile = path.join(modelDir, 'behavior.md');
  const behaviorContent = fs.existsSync(behaviorFile)
    ? fs.readFileSync(behaviorFile, 'utf-8')
    : null;

  // Load metadata
  const metadataFile = path.join(modelDir, 'metadata.json');
  const metadata = fs.existsSync(metadataFile)
    ? JSON.parse(fs.readFileSync(metadataFile, 'utf-8'))
    : {};

  // Analyze the input against known patterns
  const analysis = analyzeInput(inputText, metadata, behaviorContent);

  console.log('\n📊 Behavioral Prediction Analysis\n');
  console.log(`Model: ${metadata.model || modelName}`);
  console.log(`Provider: ${metadata.provider || 'Unknown'}`);
  console.log(`Safety Level: ${metadata.safety_level || 'Unknown'}`);
  console.log(`Alignment Method: ${metadata.alignment_method || 'Unknown'}`);
  console.log('');

  // Display analysis results
  console.log('🔍 Input Analysis:');
  console.log(`  Category: ${analysis.category}`);
  console.log(`  Sensitivity: ${analysis.sensitivity}`);
  console.log(`  Predicted Response Type: ${analysis.predictedResponseType}`);
  console.log('');

  console.log('📋 Expected Behaviors:');
  analysis.expectedBehaviors.forEach((behavior) => {
    console.log(`  • ${behavior}`);
  });
  console.log('');

  console.log('⚠️  Risk Flags:');
  if (analysis.riskFlags.length === 0) {
    console.log('  ✓ No significant risk flags for this input');
  } else {
    analysis.riskFlags.forEach((flag) => {
      console.log(`  ! ${flag}`);
    });
  }
  console.log('');

  if (options.verbose && behaviorContent) {
    console.log('📖 Relevant Behavior Documentation:');
    logger.divider();
    // Extract relevant section from behavior.md
    const refusalSection = extractSection(behaviorContent, 'Refusal');
    if (refusalSection) {
      console.log(refusalSection.slice(0, 500) + (refusalSection.length > 500 ? '...' : ''));
    }
  }

  logger.info('\nNote: This is a static analysis based on documented behaviors — not a live API test.');
  logger.info('See examples.md for documented real interaction examples.');
}

/**
 * Analyze input text against known behavioral patterns.
 */
function analyzeInput(input, metadata, behaviorContent) {
  const lowerInput = input.toLowerCase();

  // Determine category
  let category = 'General inquiry';
  let sensitivity = 'Low';
  let predictedResponseType = 'Helpful response';
  const expectedBehaviors = [];
  const riskFlags = [];

  // Identity questions
  if (/\b(who|what) are you\b|your name|who made you/i.test(input)) {
    category = 'Identity inquiry';
    sensitivity = 'Low';
    predictedResponseType = 'Identity disclosure';
    expectedBehaviors.push(`Will identify as ${metadata.model || 'the model'}`);
    expectedBehaviors.push('Will acknowledge being an AI');
    expectedBehaviors.push('Will mention the provider');
  }

  // Coding
  else if (/\b(code|program|function|debug|script|algorithm)\b/i.test(input)) {
    category = 'Technical / Coding';
    sensitivity = 'Low';
    predictedResponseType = 'Code generation or analysis';
    expectedBehaviors.push('Will provide working code with explanation');
    expectedBehaviors.push('Will use appropriate language syntax');
    if (metadata.alignment_method === 'DPO') {
      expectedBehaviors.push('May follow format instructions very precisely (DPO model)');
    }
  }

  // Safety-sensitive patterns
  else if (/\b(weapon|explosive|poison|hack|malware|exploit)\b/i.test(input)) {
    category = 'Potentially sensitive — dual use';
    sensitivity = 'High';
    predictedResponseType = 'Context-dependent — may refuse or provide educational response';
    expectedBehaviors.push('Will assess context and likely intent');
    expectedBehaviors.push('May request clarification on purpose');
    riskFlags.push('Input contains potentially sensitive keywords');

    if (metadata.safety_level === 'very-high') {
      predictedResponseType = 'Likely refusal with explanation';
      expectedBehaviors.push('High-safety model likely to decline or heavily caveat');
    } else if (metadata.safety_level === 'medium') {
      predictedResponseType = 'Context-dependent; may engage for educational purpose';
    }
  }

  // Personal/emotional
  else if (/\b(feeling|depressed|anxious|lonely|sad|hurt)\b/i.test(input)) {
    category = 'Emotional / Personal';
    sensitivity = 'Medium';
    predictedResponseType = 'Empathetic response with professional referral';
    expectedBehaviors.push('Will acknowledge feelings with empathy');
    expectedBehaviors.push('Will ask clarifying questions about wellbeing');
    expectedBehaviors.push('Will recommend professional support');
    expectedBehaviors.push('Will provide crisis resources if appropriate');
  }

  // Creative writing
  else if (/\b(write|story|poem|fiction|novel|creative)\b/i.test(input)) {
    category = 'Creative writing';
    sensitivity = 'Low-Medium';
    predictedResponseType = 'Creative content generation';
    expectedBehaviors.push('Will engage with creative task');
    expectedBehaviors.push('Will apply content judgment to actual content, not just framing');
  }

  // General knowledge
  else {
    expectedBehaviors.push('Will provide informative response');
    expectedBehaviors.push('Will acknowledge uncertainty if present');
    expectedBehaviors.push(`Will respond in user's language`);
  }

  return { category, sensitivity, predictedResponseType, expectedBehaviors, riskFlags };
}

/**
 * Extract a section from markdown content by heading.
 */
function extractSection(content, headingKeyword) {
  const lines = content.split('\n');
  let inSection = false;
  const sectionLines = [];

  for (const line of lines) {
    if (line.startsWith('#') && line.toLowerCase().includes(headingKeyword.toLowerCase())) {
      inSection = true;
      sectionLines.push(line);
      continue;
    }
    if (inSection && line.startsWith('#') && !line.startsWith('###')) {
      break;
    }
    if (inSection) {
      sectionLines.push(line);
    }
  }

  return sectionLines.join('\n').trim();
}

module.exports = { runTest };
