import { useState } from 'react';
import { performAnalysis } from '../services/analyzer';
import { useAppContext } from '../context/AppContext';

export const useAnalyze = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { addToHistory } = useAppContext();

  const analyze = async (input) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await performAnalysis(input);
      setResult(data);
      addToHistory(data);
      return data;
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => setResult(null);

  return { analyze, loading, result, error, clearResult };
};
