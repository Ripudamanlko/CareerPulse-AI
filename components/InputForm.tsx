import React, { useState } from 'react';
import { FileText, Briefcase, PlayCircle, Sparkles } from 'lucide-react';
import { CareerPreferences, InputState } from '../types';

interface InputFormProps {
  onAnalyze: (data: InputState) => void;
  isLoading: boolean;
}

const defaultPreferences: CareerPreferences = {
  targetRole: 'Senior Frontend Engineer',
  preferredWorkMode: 'Hybrid',
  targetRegion: 'Global / Remote-friendly',
  aiAssistiveTooling: 'Balanced',
};

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [preferences, setPreferences] = useState<CareerPreferences>(defaultPreferences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeText.trim() && jobDescription.trim()) {
      onAnalyze({ resumeText, jobDescription, preferences });
    }
  };

  const fillExampleData = () => {
    setResumeText(`John Doe
Software Engineer
Summary: Experienced developer with a passion for frontend.
Skills: JavaScript, React, CSS.
Experience:
- Built web apps at TechCorp.
- Fixed bugs and improved UI.`);
    setJobDescription(`Senior Frontend Engineer
We are looking for a React expert with TypeScript experience.
Must know: React, TypeScript, Tailwind CSS, Performance Optimization.
Bonus: Next.js, GraphQL.
Responsibilities:
- Lead frontend architecture.
- Mentor junior devs.
- Optimize app speed.`);
    setPreferences(defaultPreferences);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Start Analysis</h2>
            <p className="text-slate-500 text-sm mt-1">Paste your resume and the target job description below.</p>
          </div>
          <button
            onClick={fillExampleData}
            type="button"
            className="text-indigo-600 text-sm font-medium hover:text-indigo-800 underline decoration-dotted"
          >
            Load Example Data
          </button>
        </div>

        <div className="mb-6 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-indigo-900">2026 Career Context</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <label className="text-xs text-slate-700">
              Target Role
              <input
                className="mt-1 w-full rounded-md border border-indigo-200 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                value={preferences.targetRole}
                onChange={(e) => setPreferences((prev) => ({ ...prev, targetRole: e.target.value }))}
              />
            </label>
            <label className="text-xs text-slate-700">
              Work Mode
              <select
                className="mt-1 w-full rounded-md border border-indigo-200 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                value={preferences.preferredWorkMode}
                onChange={(e) => setPreferences((prev) => ({ ...prev, preferredWorkMode: e.target.value as CareerPreferences['preferredWorkMode'] }))}
              >
                <option>On-site</option>
                <option>Hybrid</option>
                <option>Remote</option>
              </select>
            </label>
            <label className="text-xs text-slate-700">
              Target Region
              <input
                className="mt-1 w-full rounded-md border border-indigo-200 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                value={preferences.targetRegion}
                onChange={(e) => setPreferences((prev) => ({ ...prev, targetRegion: e.target.value }))}
              />
            </label>
            <label className="text-xs text-slate-700">
              AI Tooling Comfort
              <select
                className="mt-1 w-full rounded-md border border-indigo-200 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                value={preferences.aiAssistiveTooling}
                onChange={(e) => setPreferences((prev) => ({ ...prev, aiAssistiveTooling: e.target.value as CareerPreferences['aiAssistiveTooling'] }))}
              >
                <option>Minimal</option>
                <option>Balanced</option>
                <option>Advanced</option>
              </select>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>Resume / CV Content</span>
              </label>
              <textarea className="w-full h-64 p-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none outline-none" placeholder="Paste your full resume text here..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Briefcase className="w-4 h-4 text-emerald-500" />
                <span>Job Description</span>
              </label>
              <textarea className="w-full h-64 p-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none outline-none" placeholder="Paste the job description here..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isLoading || !resumeText || !jobDescription}
              className={`
                flex items-center space-x-2 px-8 py-3 rounded-lg text-white font-semibold shadow-md transition-all
                ${isLoading || !resumeText || !jobDescription
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5" />
                  <span>Analyze Match</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
