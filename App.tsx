import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { analyzeResume } from './services/geminiService';
import { AnalysisResult, AppStatus, InputState } from './types';
import { LineChart, Github, Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async ({ resumeText, jobDescription, additionalLinks, referenceProfile }: InputState) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);
    try {
      const data = await analyzeResume(resumeText, jobDescription, additionalLinks, referenceProfile);
      setResult(data);
      setStatus(AppStatus.COMPLETE);
    } catch (err: any) {
      setError(err.message || "Failed to analyze resume. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  };

  const reset = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-blue-900/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={reset}>
            <div className="bg-[#0A192F] p-1.5 rounded-lg transition-transform group-hover:scale-105">
                <LineChart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight metallic-text">
              CareerPulse AI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#0A192F]/40 hidden md:inline-block">Precision Analysis</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-6">
        {status === AppStatus.IDLE && (
           <div className="flex flex-col items-center justify-center space-y-12 animate-fade-in-up">
              <div className="text-center max-w-2xl">
                  <div className="inline-flex items-center space-x-2 bg-blue-900/5 text-blue-900/60 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-900/5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next-Gen Optimization</span>
                  </div>
                  <h2 className="text-5xl font-bold text-[#0A192F] tracking-tight sm:text-6xl mb-6 leading-[1.1]">
                    Refine Your <br/><span className="text-[#0A192F]/40">Professional Edge.</span>
                  </h2>
                  <p className="text-lg text-[#0A192F]/60 font-medium leading-relaxed">
                    Leverage advanced AI to bridge the gap between your experience and your next career milestone.
                  </p>
              </div>
              <InputForm onAnalyze={handleAnalysis} isLoading={false} />
           </div>
        )}

        {status === AppStatus.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-32 animate-pulse">
             <div className="relative w-20 h-20 mb-8">
                <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-900/5 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-2 border-[#0A192F] rounded-full border-t-transparent animate-spin"></div>
             </div>
             <h3 className="text-lg font-bold text-[#0A192F] tracking-tight">Processing Intelligence</h3>
             <p className="text-[#0A192F]/40 text-sm mt-2 font-medium">Synthesizing profile data...</p>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-xl mx-auto mac-card p-8 text-center border-red-200/50">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-[#0A192F] font-bold text-xl mb-2">Analysis Interrupted</h3>
            <p className="text-[#0A192F]/50 mb-8 font-medium">{error}</p>
            <button 
                onClick={() => setStatus(AppStatus.IDLE)}
                className="mac-button w-full sm:w-auto"
            >
                Return to Start
            </button>
          </div>
        )}

        {status === AppStatus.COMPLETE && result && (
          <div className="space-y-8 max-w-7xl mx-auto">
              <div className="flex justify-between items-end">
                 <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0A192F]/40 mb-1 block">Intelligence Output</span>
                    <h2 className="text-3xl font-bold text-[#0A192F] tracking-tight">Analysis Report</h2>
                 </div>
                 <button 
                    onClick={reset}
                    className="mac-button text-xs font-bold uppercase tracking-wider"
                 >
                    New Session
                 </button>
              </div>
              <ResultsDashboard result={result} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-blue-900/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#0A192F]/30">&copy; {new Date().getFullYear()} CareerPulse AI</p>
          <div className="flex space-x-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0A192F]/30">Privacy</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0A192F]/30">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;