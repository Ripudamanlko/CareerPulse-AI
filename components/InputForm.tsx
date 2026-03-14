import React, { useState } from 'react';
import { Upload, FileText, Briefcase, PlayCircle, Globe, UserCheck } from 'lucide-react';
import { InputState } from '../types';

interface InputFormProps {
  onAnalyze: (data: InputState) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [additionalLinks, setAdditionalLinks] = useState('');
  const [referenceProfile, setReferenceProfile] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeText.trim() && jobDescription.trim()) {
      onAnalyze({ resumeText, jobDescription, additionalLinks, referenceProfile });
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
    setAdditionalLinks(`GitHub: github.com/johndoe
Portfolio: johndoe.dev
LinkedIn: linkedin.com/in/johndoe
Hugging Face: huggingface.co/johndoe (AI/ML Models)
Publication: "Advanced UI Patterns" - IEEE 2023`);
    setReferenceProfile(`Reference: Jane Smith (Current Senior Engineer being replaced)
Skills: React, Redux, Node.js, AWS.
Focus: Highly technical, strong system design, mentors 5+ juniors.
LinkedIn: linkedin.com/in/janesmith`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mac-card overflow-hidden">
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
            <div>
                <h2 className="text-2xl font-bold text-[#0A192F] tracking-tight">Initialize Analysis</h2>
                <p className="text-[#0A192F]/40 text-sm font-medium mt-1">Provide your credentials and the target specification.</p>
            </div>
            <button 
                onClick={fillExampleData}
                type="button"
                className="text-[#0A192F]/60 text-[11px] font-bold uppercase tracking-widest hover:text-[#0A192F] transition-colors"
            >
                Load Sample Data
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Resume Input */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#0A192F]/40">
                <FileText className="w-3.5 h-3.5" />
                <span>Resume / CV</span>
              </label>
              <textarea
                className="mac-input h-80 text-sm leading-relaxed"
                placeholder="Paste your full resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                required
              />
            </div>

            {/* Job Description Input */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#0A192F]/40">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Job Description</span>
              </label>
              <textarea
                className="mac-input h-80 text-sm leading-relaxed"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Additional Links Input */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#0A192F]/40">
                <Globe className="w-3.5 h-3.5" />
                <span>Additional Links</span>
              </label>
              <textarea
                className="mac-input h-40 text-sm leading-relaxed"
                placeholder="LinkedIn, GitHub, Portfolio, Research Papers..."
                value={additionalLinks}
                onChange={(e) => setAdditionalLinks(e.target.value)}
              />
            </div>

            {/* Reference Profile Input */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#0A192F]/40">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Reference Profile (Optional)</span>
              </label>
              <textarea
                className="mac-input h-40 text-sm leading-relaxed"
                placeholder="Paste details of a benchmark candidate, the person being replaced, or the Hiring Manager's profile..."
                value={referenceProfile}
                onChange={(e) => setReferenceProfile(e.target.value)}
              />
              <p className="text-[10px] text-[#0A192F]/30 font-medium italic">Used to benchmark your profile against top performers or manager expectations.</p>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isLoading || !resumeText || !jobDescription}
              className={`
                mac-button-primary w-full md:w-auto min-w-[240px] flex items-center justify-center space-x-3
                ${isLoading || !resumeText || !jobDescription 
                  ? 'opacity-30 cursor-not-allowed grayscale' 
                  : 'hover:scale-[1.02] active:scale-[0.98]'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="uppercase tracking-widest text-xs font-bold">Processing</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5" />
                  <span className="uppercase tracking-widest text-xs font-bold">Execute Analysis</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};