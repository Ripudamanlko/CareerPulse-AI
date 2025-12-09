import React from 'react';
import { AnalysisResult } from '../types';
import { MatchRadar, SkillBarChart, ScoreGauge } from './Charts';
import { CheckCircle2, AlertCircle, TrendingUp, Search } from 'lucide-react';

interface ResultsDashboardProps {
  result: AnalysisResult;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result }) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Score */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Overall Fit</h3>
          <ScoreGauge score={result.matchScore} />
          <p className="text-center text-sm text-slate-500 mt-4 px-4">{result.summary}</p>
        </div>

        {/* Skill Balance Radar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 md:col-span-2">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-slate-800">Skill Topology</h3>
                <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">Tech vs Soft Skills</span>
            </div>
            <MatchRadar skills={[...result.technicalSkills, ...result.softSkills]} />
        </div>
      </div>

      {/* Detailed Skill Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Technical Proficiency</h3>
            <SkillBarChart skills={result.technicalSkills} type="Tech" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Soft Skill Alignment</h3>
            <SkillBarChart skills={result.softSkills} type="Soft" />
        </div>
      </div>

      {/* SEO & Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold text-slate-800">Missing Keywords</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">Add these exact terms to improve ATS ranking:</p>
            <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-full border border-red-100">
                        {kw}
                    </span>
                ))}
                {result.missingKeywords.length === 0 && (
                    <span className="text-green-600 text-sm flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Great job! No critical keywords missing.
                    </span>
                )}
            </div>
        </div>

        {/* Suggestions List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-slate-800">Optimization Suggestions</h3>
            </div>
            
            <div className="space-y-4">
                {result.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="group border border-slate-100 rounded-lg p-4 hover:border-indigo-100 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{suggestion.section}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-red-500 font-semibold">Original</p>
                                <p className="text-sm text-slate-600 italic border-l-2 border-red-200 pl-2">"{suggestion.originalText}"</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-green-600 font-semibold">Optimized</p>
                                <p className="text-sm text-slate-800 font-medium border-l-2 border-green-400 pl-2">"{suggestion.improvedText}"</p>
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded">
                            💡 {suggestion.reasoning}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

    </div>
  );
};