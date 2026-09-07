import { ChatGroq } from "@langchain/groq";
import { CONFIG } from "./llm.config.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NODES } from "../utils/const.js";



// GROQ LLM Model 
export const groq = new ChatGroq(CONFIG.groq_config);
// gemini LLM Model (gemini-3.6-flash)
export const gemini = new ChatGoogleGenerativeAI(CONFIG.google_config);

export const getModel = (_agent: string) => {
    try {
        return gemini;
    } catch (error: any) {
        throw new Error(error.message || "Failed to get model");
    }
}