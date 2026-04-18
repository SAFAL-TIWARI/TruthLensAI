/**
 * TruthLens AI - Heuristic Scoring Engine
 * These rules analyze text characteristics to estimate credibility.
 */

// Clickbait detection patterns
const CLICKBAIT_PATTERNS = [
  /you won'?t believe/i,
  /this one trick/i,
  /doctors hate (him|her|them)/i,
  /secret (formula|method)/i,
  /震惊/i, // Chinese clickbait
  /shocking truth/i,
  /once in a lifetime/i,
  /stop everything you'?re doing/i,
  /\?\?\?/i,
  /!!!/i
];

// Sensationalist word list
const SENSATIONAL_WORDS = [
  'amazing', 'shocking', 'unbelievable', 'miracle', 'terrifying', 
  'disastrous', 'stunning', 'exposed', 'hero', 'villain', 'outrage', 
  'scandal', 'bizarre', 'insane', 'apocalypse', 'breaking', 'urgent',
  'conspiracy', 'hidden', 'mastermind', 'destructive', 'massive'
];

// Emotional word list (simplified)
const EMOTIONAL_WORDS = [
  'angry', 'furious', 'evil', 'vile', 'disgusting', 'wonderful', 
  'perfect', 'love', 'hate', 'shame', 'fraud', 'dangerous', 'atrocity',
  'brilliant', 'coward', 'disgrace', 'pathetic', 'stolen'
];

export const calculateCredibilityScore = (text, options = {}) => {
  if (!text || text.trim().length < 15) {
    return {
      credibility: 0,
      breakdown: { sourceTrust: 0, languageStyle: 0, claimConsistency: 0, emotionalBias: 0, sensationalism: 0 },
      redFlags: ['Content too short for reliable analysis.'],
      isTooShort: true
    };
  }

  const results = {
    credibility: 100,
    breakdown: {
      sourceTrust: options.sourceRating || 50, // Default to neutral if unknown
      languageStyle: 100,
      claimConsistency: 80, // Default heuristic
      emotionalBias: 100,
      sensationalism: 100,
    },
    redFlags: [],
  };

  const words = text.split(/\s+/);
  const totalWords = words.length;

  // 1. Sensationalism & Punctuation
  let sensationalCount = 0;
  SENSATIONAL_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    sensationalCount += (text.match(regex) || []).length;
  });

  const punctuationIssues = (text.match(/!!|!{2,}|\?{2,}/g) || []).length;
  const capsCount = (text.match(/[A-Z]{4,}/g) || []).length;

  if (sensationalCount > 2) {
    results.breakdown.sensationalism -= sensationalCount * 5;
    results.redFlags.push('Excessive use of sensationalist language detected.');
  }
  if (punctuationIssues > 0) {
    results.breakdown.sensationalism -= 10;
    results.redFlags.push('Irregular punctuation detected (!! or ???).');
  }
  if (capsCount > 3) {
    results.breakdown.sensationalism -= 15;
    results.redFlags.push('Extensive use of ALL CAPS detected.');
  }

  // 2. Emotional Bias
  let emotionalCount = 0;
  EMOTIONAL_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    emotionalCount += (text.match(regex) || []).length;
  });

  if (emotionalCount > totalWords * 0.05) {
    results.breakdown.emotionalBias -= 30;
    results.redFlags.push('High concentration of emotionally charged language.');
  }

  // 3. Language Style (Clickbait & Generic Patterns)
  let clickbaitHits = 0;
  CLICKBAIT_PATTERNS.forEach(pattern => {
    if (pattern.test(text)) clickbaitHits++;
  });

  if (clickbaitHits > 0) {
    results.breakdown.languageStyle -= 40;
    results.redFlags.push('Content matches common clickbait patterns.');
  }

  // Final Score Aggregation
  results.breakdown.languageStyle = Math.max(0, results.breakdown.languageStyle);
  results.breakdown.sensationalism = Math.max(0, results.breakdown.sensationalism);
  results.breakdown.emotionalBias = Math.max(0, results.breakdown.emotionalBias);

  // Add a small deterministic jitter based on input hash to ensure "not same" results for similar inputs
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const jitter = (hash % 7) - 3; // -3 to +3 range
  
  results.credibility = Math.round(
    (results.breakdown.sourceTrust * 0.4) + 
    (results.breakdown.languageStyle * 0.2) + 
    (results.breakdown.emotionalBias * 0.2) + 
    (results.breakdown.sensationalism * 0.1) + 
    (results.breakdown.claimConsistency * 0.1) +
    jitter
  );
  
  results.credibility = Math.max(0, Math.min(100, results.credibility));

  return results;
};
