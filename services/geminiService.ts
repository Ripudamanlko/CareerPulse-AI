import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, CareerPreferences } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.INTEGER,
      description: "A score from 0 to 100 indicating how well the resume matches the job description.",
    },
    summary: {
      type: Type.STRING,
      description: "A professional executive summary of the candidate's fit for the role.",
    },
    technicalSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          score: { type: Type.INTEGER, description: "Proficiency level inferred from resume (0-100)" },
          importance: { type: Type.INTEGER, description: "Importance of this skill to the specific job (0-100)" },
        },
      },
    },
    softSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          score: { type: Type.INTEGER, description: "Proficiency level inferred from resume (0-100)" },
          importance: { type: Type.INTEGER, description: "Importance of this skill to the specific job (0-100)" },
        },
      },
    },
    missingKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Critical keywords or skills found in the job description but missing from the resume. Important for ATS.",
    },
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          section: { type: Type.STRING, description: "e.g., Experience, Summary, Skills" },
          originalText: { type: Type.STRING, description: "A snippet from the original resume (or 'N/A' if new)" },
          improvedText: { type: Type.STRING, description: "An SEO-optimized rewrite of that snippet using action verbs and keywords." },
          reasoning: { type: Type.STRING, description: "Why this change helps (e.g., 'Adds quantitative impact')." },
        },
      },
    },
    marketSignals: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 concise trends relevant to hiring expectations in 2026 for this role.",
    },
    interviewFocus: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 interview talking points the candidate should prepare.",
    },
    actionPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          timeframe: { type: Type.STRING, description: "One of: This Week, This Month, This Quarter" },
          action: { type: Type.STRING },
          expectedImpact: { type: Type.STRING },
        },
      },
      description: "Prioritized resume/job-search improvements split by timeframe.",
    },
  },
  required: ["matchScore", "summary", "technicalSkills", "softSkills", "missingKeywords", "suggestions", "marketSignals", "interviewFocus", "actionPlan"],
};

export const analyzeResume = async (resumeText: string, jobDescription: string, preferences: CareerPreferences): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const prompt = `
    You are an expert Career Coach and ATS (Applicant Tracking System) Specialist.

    Please analyze the following Resume text against the provided Job Description.

    RESUME TEXT:
    ${resumeText}

    JOB DESCRIPTION:
    ${jobDescription}

    CANDIDATE PREFERENCES:
    - Target Role: ${preferences.targetRole}
    - Preferred Work Mode: ${preferences.preferredWorkMode}
    - Target Region: ${preferences.targetRegion}
    - AI Tooling Comfort: ${preferences.aiAssistiveTooling}

    Task:
    1. Evaluate the match percentage.
    2. Extract key technical and soft skills, rating the candidate's evident proficiency vs. the job's requirement importance.
    3. Identify missing keywords that would hurt the candidate's ranking in an ATS.
    4. Provide concrete rewriting suggestions to improve the resume's impact, focusing on "Show, Don't Tell", using numbers, and embedding keywords naturally.
    5. Add 2026-specific market signals, interview focus points, and a practical action plan.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "Always be constructive, professional, and focus on helping the user get hired.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
