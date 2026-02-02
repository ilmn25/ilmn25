
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, PERSONAL_INFO, SKILLS, EXPERIENCES } from '../constants';

const SYSTEM_INSTRUCTION = `
You are the AI assistant for illu's personal portfolio. 
You are helpful, professional, and tech-savvy. 
Answer questions based on the following info:
NAME: illu
BIO: ${PERSONAL_INFO.title}
EDUCATION: ${PERSONAL_INFO.education}
SKILLS: ${SKILLS.map(s => `${s.category}: ${s.skills.join(', ')}`).join('\n')}
PROJECTS: ${PROJECTS.map(p => `${p.title}: ${p.description} Highlights: ${p.highlights.join(', ')}`).join('\n')}
EXPERIENCE: ${EXPERIENCES.map(e => `${e.role} at ${e.company} (${e.period})`).join('\n')}

If a user asks something not related to illu's professional profile, politely redirect them. 
Keep answers concise and friendly.
`;

export async function askAssistant(userMessage: string) {
  try {
    // Instantiate right before call to ensure up-to-date API key
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later!";
  }
}
