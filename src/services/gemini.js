import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);


/**
 * Analyzes text for credibility using Gemini Pro.
 * Returns a structured JSON object.
 */
export const analyzeWithGemini = async (text, context = {}) => {
  const isUrl = text.startsWith('http');
  const prompt = `
    You are a world-class investigative journalist and professional fact-checker specializing in digital media literacy.
    Your goal is to provide a rigorous, objective, and accurate credibility analysis of the provided ${isUrl ? 'URL' : 'content'}.

    ${isUrl ? `The user provided a URL: "${text}". Please analyze the credibility of the article or story associated with this link based on your training data and internal knowledge of the specific event, source, and reporting. If you don't have real-time access to the URL, analyze based on common patterns of the domain and the topic implied by the URL.` : `Content to analyze: "${text}"`}
    
    ${context.sourceData ? `Additional Context: The source domain is "${context.sourceData.domain}" which has a known reputation score of ${context.sourceData.rating}/100 and is classified as "${context.sourceData.category}".` : ''}

    Perform a deep analysis focusing on:
    1. **Internal Logic**: Identify contradictions, logical fallacies, or circular reasoning.
    2. **Emotional Bias**: Detect "loaded" language, fear-mongering, or attempts to provoke strong, irrational emotions.
    3. **Source Reliability**: Evaluate the history and reputation of the source provided or implied.
    4. **Claim Verification**: Extract the primary specific claims and cross-reference them with established facts.

    Return EXACTLY a JSON object with the following structure (no other text or markdown):
    {
      "credibility": (number 0-100),
      "sensationalism": (number 0-100),
      "sourceTrust": (number 0-100),
      "verdict": "Reliable" | "Partially Reliable" | "Misleading" | "False",
      "riskLevel": "Low" | "Medium" | "High",
      "analysis": "A concise, technical breakdown referencing specific aspects of the input. Avoid generic sentences.",
      "breakdown": {
        "factualAccuracy": (number 0-100),
        "sourceCredibility": (number 0-100),
        "biasNeutrality": (number 0-100),
        "logicalConsistency": (number 0-100)
      },
      "redFlags": [
        "Specifically identified indicator 1",
        "Specifically identified indicator 2"
      ],
      "claims": [
        {
          "text": "The specific claim from the text",
          "status": "verified" | "disputed" | "partially verified" | "unverified",
          "confidence": (number 0-100),
          "reason": "Expert evidence-based explanation relating specifically to this claim."
        }
      ]
    }

    IMPORTANT: Be extremely objective and specific to the input provided. If you identify a satirical source, specify it as such.
    Ensure the JSON is valid.
  `;

  try {
    let result;
    try {
      // Standard initialization for gemini-1.5-flash
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      result = await model.generateContent(prompt);
    } catch (firstError) {
      console.warn("Attempt with 1.5-flash failed, trying gemini-pro...", firstError.message);
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        result = await model.generateContent(prompt);
      } catch (secondError) {
        console.error("Both models failed:", secondError.message);
        throw new Error("AI service unavailable. Falling back to heuristics.");
      }
    }

    const response = await result.response;
    const responseText = response.text();
    
    // Robust JSON extraction: Find the first '{' and the last '}'
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in AI response.");
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("AI analysis failed. Please try again later.");
  }
};
