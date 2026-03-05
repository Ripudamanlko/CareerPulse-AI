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

export interface CareerPreferences {
  targetRole: string;
  preferredWorkMode: 'On-site' | 'Hybrid' | 'Remote';
  targetRegion: string;
  aiAssistiveTooling: 'Minimal' | 'Balanced' | 'Advanced';
}

export interface ActionPlanItem {
  timeframe: 'This Week' | 'This Month' | 'This Quarter';
  action: string;
  expectedImpact: string;
}

export interface AnalysisResult {
  matchScore: number;
  summary: string;
  technicalSkills: SkillPoint[];
  softSkills: SkillPoint[];
  missingKeywords: string[];
  suggestions: RewriteSuggestion[];
  marketSignals: string[];
  interviewFocus: string[];
  actionPlan: ActionPlanItem[];
}

export interface InputState {
  resumeText: string;
  jobDescription: string;
  preferences: CareerPreferences;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}
