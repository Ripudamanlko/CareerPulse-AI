export interface SkillPoint {
  name: string;
  score: number; // 0-100
  importance: number; // 0-100 (relevance to the job)
}

export interface RewriteSuggestion {
  section: string;
  originalText: string;
  improvedText: string;
  reasoning: string;
}

export interface AnalysisResult {
  matchScore: number;
  summary: string;
  technicalSkills: SkillPoint[];
  softSkills: SkillPoint[];
  missingKeywords: string[];
  suggestions: RewriteSuggestion[];
}

export interface InputState {
  resumeText: string;
  jobDescription: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}