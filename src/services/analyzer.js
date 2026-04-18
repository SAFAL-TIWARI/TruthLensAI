import { calculateCredibilityScore } from '../utils/scoreRules';
import { extractClaims } from '../utils/extractClaims';
import { getSourceTrust } from './sourceTrust';
import { analyzeWithGemini } from './gemini';

export const performAnalysis = async (input) => {
  try {
    const isUrl = input.trim().startsWith('http');
    const sourceData = isUrl ? getSourceTrust(input) : null;
    
    // Get real analysis from Gemini
    const aiResults = await analyzeWithGemini(input, { sourceData });

    return {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      input: input.length > 100 ? input.substring(0, 100) + '...' : input,
      source: sourceData || { name: 'Unknown', rating: aiResults.sourceTrust || 50 },
      ...aiResults
    };
  } catch (error) {
    console.error("Analysis Pipeline Exception:", error);
    
    // Immediate Fallback
    const results = calculateCredibilityScore(input, { sourceRating: 50 });
    const fallbackData = {
      id: `fallback-${Date.now()}`,
      timestamp: new Date().toISOString(),
      input: input.length > 100 ? input.substring(0, 100) + '...' : input,
      verdict: results.credibility > 70 ? 'Likely Reliable' : results.credibility > 40 ? 'Mixed Signals' : 'Questionable',
      riskLevel: results.credibility > 70 ? 'Low' : results.credibility > 40 ? 'Medium' : 'High',
      ...results,
      claims: extractClaims(input),
      isFallback: true,
      analysis: `[Heuristic Scan] AI analysis is temporarily unavailable. This report uses linguistic analysis and known source reputation. ${results.credibility > 50 ? 'The writing style is standard.' : 'We detected several sensationalist markers.'}`
    };
    
    console.log("Broadcasting Fallback Results:", fallbackData);
    return fallbackData;
  }
};
