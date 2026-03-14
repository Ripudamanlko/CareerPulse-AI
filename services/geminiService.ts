import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

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
  },
  required: ["matchScore", "summary", "technicalSkills", "softSkills", "missingKeywords", "suggestions"],
};

export const analyzeResume = async (resumeText: string, jobDescription: string, additionalLinks?: string, referenceProfile?: string): Promise<AnalysisResult> => {
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

    ${additionalLinks ? `ADDITIONAL LINKS & RESOURCES (LinkedIn, GitHub, Portfolio, Research, Publications):
    ${additionalLinks}` : ''}

    ${referenceProfile ? `REFERENCE PROFILE / BENCHMARK (The person being replaced, a top candidate, or Hiring Manager profile):
    ${referenceProfile}` : ''}

    Task:
    1. Evaluate the match percentage.
    2. Extract key technical and soft skills, rating the candidate's evident proficiency vs. the job's requirement importance.
    3. Identify missing keywords that would hurt the candidate's ranking in an ATS.
    4. Provide concrete rewriting suggestions to improve the resume's impact, focusing on "Show, Don't Tell", using numbers, and embedding keywords naturally.
    5. If additional links (GitHub, Hugging Face, Research papers, etc.) are provided, incorporate their value into the match score and summary. For AI/ML/Researcher roles, heavily weigh publications and open-source contributions.
    6. If a REFERENCE PROFILE is provided, benchmark the candidate against it. Provide reasoning on where this person stands compared to the benchmark. Mention specific arguments for why they are a good replacement or how they align with the Hiring Manager's expectations.
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