/**
 * TruthLens AI - Claim Extraction
 * Extracts potential claims from text and simulates verification status.
 */

export const extractClaims = (text) => {
  if (!text) return [];

  // Simple heuristic: look for sentences with factual-sounding verbs or claims
  // In a real app, this would use NLP/NER.
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  const claimTriggers = [
    'is', 'are', 'was', 'were', 'will', 'claimed', 'reported', 
    'discovered', 'found', 'showed', 'revealed', 'confirmed',
    'according to', 'study shows'
  ];

  const extracted = sentences
    .map(s => s.trim())
    .filter(s => {
      const lower = s.toLowerCase();
      return claimTriggers.some(trigger => lower.includes(trigger)) && s.split(' ').length > 5;
    })
    .slice(0, 5); // Limit to top 5 claims for UI clarity

  return extracted.map((claim, index) => {
    const lowerClaim = claim.toLowerCase();
    
    // Deterministic status based on keywords and simple rules
    let status = 'unverified';
    let confidence = 50;

    // Reliability rules
    const positiveKeywords = ['confirmed', 'official', 'verified', 'standard', 'proven'];
    const negativeKeywords = ['conspiracy', 'fake', 'allegedly', 'rumor', 'myth'];

    const hasPositive = positiveKeywords.some(k => lowerClaim.includes(k));
    const hasNegative = negativeKeywords.some(k => lowerClaim.includes(k));

    if (hasPositive && !hasNegative) {
      status = 'verified';
      confidence = 85;
    } else if (hasNegative) {
      status = 'disputed';
      confidence = 75;
    } else if (lowerClaim.includes('study') || lowerClaim.includes('research')) {
      status = 'partially verified';
      confidence = 65;
    } else {
      // Small variation for UI variety, but still deterministic based on claim text
      const hash = claim.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      confidence = 40 + (hash % 20);
    }

    return {
      id: `claim-${index}`,
      text: claim,
      status,
      confidence,
      reason: getReasonForStatus(status, claim)
    };
  });
};

const getReasonForStatus = (status, claimText = '') => {
  const snippets = {
    verified: [
      'Corroborated by primary source documentation and official reports.',
      'Verified through cross-referencing with reputable news agencies.',
      'Data points in this claim match established public records.'
    ],
    partially_verified: [
      'The core premise is factual, but some surrounding details remain unconfirmed.',
      'Facts are mostly accurate, though the framing may be selective.',
      'Contains a mix of verifiable facts and subjective interpretation.'
    ],
    disputed: [
      'Contradicted by multiple credible sources or officially debunked.',
      'Lacks empirical evidence and is widely contested by subject matter experts.',
      'Identified as potential misinformation by independent fact-checkers.'
    ],
    unverified: [
      'Insufficient public data currently exists to verify this specific assertion.',
      'The claim is too vague or recent for definitive verification.',
      'Requires further investigation from independent investigative bodies.'
    ]
  };

  const key = status.replace(' ', '_');
  const options = snippets[key] || snippets.unverified;
  
  // Use the claim text to pick a semi-stable but varied reason
  const index = Math.abs(claimText.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % options.length;
  return options[index];
};
