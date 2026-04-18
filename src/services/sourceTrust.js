/**
 * TruthLens AI - Source Trust Service
 * Tracks reputation of known media outlets.
 */

const SOURCE_REPUTATION = {
  'reuters.com': { name: 'Reuters', rating: 95, category: 'Highly Reliable', type: 'News Agency' },
  'apnews.com': { name: 'Associated Press', rating: 95, category: 'Highly Reliable', type: 'News Agency' },
  'nytimes.com': { name: 'New York Times', rating: 85, category: 'Reliable', type: 'Newspaper' },
  'wsj.com': { name: 'Wall Street Journal', rating: 85, category: 'Reliable', type: 'Newspaper' },
  'bbc.com': { name: 'BBC', rating: 90, category: 'Highly Reliable', type: 'Public Broadcaster' },
  'theguardian.com': { name: 'The Guardian', rating: 82, category: 'Reliable', type: 'Newspaper' },
  'npr.org': { name: 'NPR', rating: 88, category: 'Highly Reliable', type: 'Public Radio' },
  'foxnews.com': { name: 'Fox News', rating: 60, category: 'Mixed', type: 'Cable News' },
  'cnn.com': { name: 'CNN', rating: 65, category: 'Mixed', type: 'Cable News' },
  'aljazeera.com': { name: 'Al Jazeera', rating: 78, category: 'Reliable', type: 'News Network' },
  'reuters.co.uk': { name: 'Reuters UK', rating: 95, category: 'Highly Reliable', type: 'News Agency' },
  'bloomberg.com': { name: 'Bloomberg', rating: 90, category: 'Highly Reliable', type: 'Financial News' },
  'economist.com': { name: 'The Economist', rating: 88, category: 'Highly Reliable', type: 'Magazine' },
  'theatlantic.com': { name: 'The Atlantic', rating: 82, category: 'Reliable', type: 'Magazine' },
  'propublica.org': { name: 'ProPublica', rating: 92, category: 'Highly Reliable', type: 'Investigative' },
  'snopes.com': { name: 'Snopes', rating: 95, category: 'Fact Checker', type: 'Fact Checker' },
  'politifact.com': { name: 'PolitiFact', rating: 92, category: 'Fact Checker', type: 'Fact Checker' },
  'factcheck.org': { name: 'FactCheck.org', rating: 92, category: 'Fact Checker', type: 'Fact Checker' },
  'breitbart.com': { name: 'Breitbart', rating: 30, category: 'Low Credibility', type: 'Partisan' },
  'infowars.com': { name: 'InfoWars', rating: 10, category: 'Discredited', type: 'Conspiracy' },
  'theonion.com': { name: 'The Onion', rating: 100, category: 'Satire', type: 'Satire' },
  'dailymail.co.uk': { name: 'Daily Mail', rating: 40, category: 'Low Credibility', type: 'Tabloid' },
  'nypost.com': { name: 'NY Post', rating: 45, category: 'Mixed', type: 'Tabloid' },
  'indiatimes.com': { name: 'Times of India', rating: 70, category: 'Reliable', type: 'Newspaper' },
  'thehindu.com': { name: 'The Hindu', rating: 85, category: 'Reliable', type: 'Newspaper' },
};

export const getSourceTrust = (urlOrDomain) => {
  if (!urlOrDomain) return null;

  try {
    let domain = urlOrDomain;
    if (urlOrDomain.includes('://')) {
      domain = new URL(urlOrDomain).hostname.replace('www.', '');
    } else {
      domain = urlOrDomain.replace('www.', '').split('/')[0];
    }

    const data = SOURCE_REPUTATION[domain.toLowerCase()];
    if (data) return { ...data, domain };

    // Fallback for unknown domains
    return {
      name: domain,
      domain,
      rating: 50,
      category: 'Unknown / New',
      type: 'Unverified Source'
    };
  } catch {
    return null;
  }
};
