import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { AnalysisProvider } from './context/AnalysisContext';

// Public Pages
import SplashScreen from './pages/public/SplashScreen';
import HomePage from './pages/public/HomePage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';

// SaaS Layout & Pages
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/app/DashboardPage';
import AnalyzePage from './pages/app/AnalyzePage';
import ResultPage from './pages/app/ResultPage';
import HistoryPage from './pages/app/HistoryPage';
import SettingsPage from './pages/app/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <AnalysisProvider>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* SaaS Application Routes */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="analyze" element={<AnalyzePage />} />
            <Route path="result" element={<ResultPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="how-it-works" element={<HowItWorksPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AnalysisProvider>
    </AuthProvider>
  );
}
