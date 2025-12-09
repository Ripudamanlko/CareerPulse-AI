import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { analyzeResume } from './services/geminiService';
import { AnalysisResult, AppStatus, InputState } from './types';
import { LineChart, Github, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async ({ resumeText, jobDescription }: InputState) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);
    try {
      const data = await analyzeResume(resumeText, jobDescription);
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={reset}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
                <LineChart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              CareerPulse AI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500 hidden md:inline-block">Powered by Google Gemini</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        {status === AppStatus.IDLE && (
           <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
              <div className="text-center max-w-2xl">
                  <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span>AI-Powered Resume Optimization</span>
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
                    Beat the ATS. <br/>Land the Interview.
                  </h2>
                  <p className="text-lg text-slate-600">
                    Paste your resume and job description to get instant feedback, skill gap analysis, and SEO-optimized rewrite suggestions.
                  </p>
              </div>
              <InputForm onAnalyze={handleAnalysis} isLoading={false} />
           </div>
        )}

        {status === AppStatus.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="relative w-24 h-24 mb-6">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
             </div>
             <h3 className="text-xl font-semibold text-slate-800">Analyzing Profile...</h3>
             <p className="text-slate-500 mt-2">Extracting skills, checking keywords, and calculating match score.</p>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-red-800 font-semibold text-lg mb-2">Analysis Failed</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button 
                onClick={() => setStatus(AppStatus.IDLE)}
                className="px-6 py-2 bg-white border border-red-300 text-red-700 rounded-md hover:bg-red-50 font-medium transition-colors"
            >
                Try Again
            </button>
          </div>
        )}

        {status === AppStatus.COMPLETE && result && (
          <div className="space-y-6">
              <div className="flex justify-between items-center max-w-7xl mx-auto">
                 <h2 className="text-2xl font-bold text-slate-800">Analysis Report</h2>
                 <button 
                    onClick={reset}
                    className="text-sm text-slate-500 hover:text-indigo-600 font-medium underline"
                 >
                    Start New Analysis
                 </button>
              </div>
              <ResultsDashboard result={result} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} CareerPulse AI. Resume Optimization Tool.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;