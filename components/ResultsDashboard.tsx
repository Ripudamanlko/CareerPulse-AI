import React from 'react';
import { AnalysisResult } from '../types';
import { MatchRadar, SkillBarChart, ScoreGauge } from './Charts';
import { CheckCircle2, AlertCircle, TrendingUp, Search } from 'lucide-react';

interface ResultsDashboardProps {
  result: AnalysisResult;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result }) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Overall Score */}
        <div className="mac-card p-8 flex flex-col justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A192F]/40 mb-6">Match Precision</h3>
          <ScoreGauge score={result.matchScore} />
          <p className="text-center text-sm text-[#0A192F]/60 mt-6 px-4 font-medium leading-relaxed">{result.summary}</p>
        </div>

        {/* Skill Balance Radar */}
        <div className="mac-card p-8 md:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A192F]/40">Skill Topology</h3>
                <span className="text-[10px] font-bold px-2 py-1 bg-blue-900/5 text-blue-900/60 rounded uppercase tracking-wider border border-blue-900/5">Multidimensional View</span>
            </div>
            <MatchRadar skills={[...result.technicalSkills, ...result.softSkills]} />
        </div>
      </div>

      {/* Detailed Skill Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="mac-card p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A192F]/40 border-b border-blue-900/5 pb-4 mb-6">Technical Proficiency</h3>
            <SkillBarChart skills={result.technicalSkills} type="Tech" />
        </div>
        <div className="mac-card p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A192F]/40 border-b border-blue-900/5 pb-4 mb-6">Soft Skill Alignment</h3>
            <SkillBarChart skills={result.softSkills} type="Soft" />
        </div>
      </div>

      {/* SEO & Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 mac-card p-8">
            <div className="flex items-center space-x-2 mb-6">
                <Search className="w-4 h-4 text-[#0A192F]/40" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A192F]/40">Keyword Delta</h3>
            </div>
            <p className="text-xs text-[#0A192F]/40 font-bold uppercase tracking-wider mb-6">Optimization Targets:</p>
            <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-blue-900/5 text-blue-900/80 text-[11px] font-bold rounded-lg border border-blue-900/5 uppercase tracking-wider">
                        {kw}
                    </span>
                ))}
                {result.missingKeywords.length === 0 && (
                    <span className="text-blue-900/60 text-sm flex items-center font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-[#0A192F]" /> Optimization complete.
                    </span>
                )}
            </div>
        </div>

        {/* Suggestions List */}
        <div className="lg:col-span-2 mac-card p-8">
            <div className="flex items-center space-x-2 mb-8">
                <TrendingUp className="w-4 h-4 text-[#0A192F]/40" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A192F]/40">Refinement Logic</h3>
            </div>
            
            <div className="space-y-6">
                {result.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="group border border-blue-900/5 rounded-2xl p-6 hover:bg-blue-900/[0.02] transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black text-[#0A192F]/20 uppercase tracking-[0.2em]">{suggestion.section}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <p className="text-[10px] text-[#0A192F]/30 font-bold uppercase tracking-widest">Current State</p>
                                <p className="text-sm text-[#0A192F]/50 italic font-medium leading-relaxed">"{suggestion.originalText}"</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] text-[#0A192F] font-bold uppercase tracking-widest">Recommended State</p>
                                <p className="text-sm text-[#0A192F] font-semibold leading-relaxed">"{suggestion.improvedText}"</p>
                            </div>
                        </div>
                        <div className="mt-6 text-[11px] font-bold text-[#0A192F]/60 bg-blue-900/5 inline-block px-3 py-1.5 rounded-lg border border-blue-900/5">
                            RATIONALE: {suggestion.reasoning}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

    </div>
  );
};