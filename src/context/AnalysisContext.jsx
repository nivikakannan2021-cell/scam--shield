import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ANALYSIS_HISTORY, INITIAL_METRICS } from '../services/mockData';
import { analyzeMessage, analyzeImage } from '../services/scamAnalyzer';

const AnalysisContext = createContext();

const HISTORY_STORAGE_KEY = 'scamshield_analysis_history';
const CURRENT_STORAGE_KEY = 'scamshield_current_analysis';

export function AnalysisProvider({ children }) {
  // History state
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
    return INITIAL_ANALYSIS_HISTORY;
  });

  // Current analysis result
  const [currentResult, setCurrentResult] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load current analysis from localStorage", e);
    }
    return INITIAL_ANALYSIS_HISTORY[0]; // default to sample bank KYC result
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('text'); // 'text' | 'image'
  const [analysisStep, setAnalysisStep] = useState(1);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [history]);

  // Sync current result to localStorage
  useEffect(() => {
    if (currentResult) {
      try {
        localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(currentResult));
      } catch (e) {
        console.error("Failed to save currentResult", e);
      }
    }
  }, [currentResult]);

  /**
   * Run text scam analysis with multi-step progress feedback
   */
  const executeAnalysis = async (messageText) => {
    setIsAnalyzing(true);
    setAnalysisMode('text');
    setAnalysisStep(1);

    const step2Timer = setTimeout(() => {
      setAnalysisStep(2);
    }, 500);

    const step3Timer = setTimeout(() => {
      setAnalysisStep(3);
    }, 1100);

    try {
      const result = await analyzeMessage(messageText, { simulateDelay: 1600 });
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);

      setCurrentResult(result);
      setHistory(prev => [result, ...prev]);
      setIsAnalyzing(false);
      return result;
    } catch (error) {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      setIsAnalyzing(false);
      throw error;
    }
  };

  /**
   * Run screenshot / image scam analysis with multi-step OCR progress feedback
   */
  const executeImageAnalysis = async (imagePayload) => {
    setIsAnalyzing(true);
    setAnalysisMode('image');
    setAnalysisStep(1);

    const step2Timer = setTimeout(() => {
      setAnalysisStep(2);
    }, 600);

    const step3Timer = setTimeout(() => {
      setAnalysisStep(3);
    }, 1250);

    try {
      const result = await analyzeImage(imagePayload, { simulateDelay: 1900 });
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);

      setCurrentResult(result);
      setHistory(prev => [result, ...prev]);
      setIsAnalyzing(false);
      return result;
    } catch (error) {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      setIsAnalyzing(false);
      throw error;
    }
  };

  /**
   * Calculate dashboard metrics dynamically from history and baseline
   */
  const getStats = () => {
    const highCount = history.filter(h => h.riskLevel === "HIGH").length;
    const medCount = history.filter(h => h.riskLevel === "MEDIUM").length;
    const lowCount = history.filter(h => h.riskLevel === "LOW").length;
    const total = history.length;

    const totalDisplay = Math.max(INITIAL_METRICS.totalAnalyses, total + 123);
    const highDisplay = Math.max(INITIAL_METRICS.highRisk, highCount + 20);
    const medDisplay = Math.max(INITIAL_METRICS.mediumRisk, medCount + 33);
    const lowDisplay = totalDisplay - highDisplay - medDisplay;

    return {
      total: totalDisplay,
      high: highDisplay,
      medium: medDisplay,
      low: lowDisplay,
      distribution: [
        { label: "Low Risk", key: "low", count: lowDisplay, percentage: Math.round((lowDisplay / totalDisplay) * 100), color: "#10b981" },
        { label: "Medium Risk", key: "medium", count: medDisplay, percentage: Math.round((medDisplay / totalDisplay) * 100), color: "#f59e0b" },
        { label: "High Risk", key: "high", count: highDisplay, percentage: Math.round((highDisplay / totalDisplay) * 100), color: "#f43f5e" }
      ]
    };
  };

  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const selectHistoryItem = (item) => {
    setCurrentResult(item);
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentResult,
        setCurrentResult,
        history,
        isAnalyzing,
        analysisMode,
        analysisStep,
        executeAnalysis,
        executeImageAnalysis,
        getStats,
        deleteHistoryItem,
        clearHistory,
        selectHistoryItem
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
