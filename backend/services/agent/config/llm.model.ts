import { ChatGroq } from "@langchain/groq";
import { CONFIG } from "./llm.config.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NODES } from "../utils/const.js";



// GROQ LLM Model 
const groq = new ChatGroq(CONFIG.groq_config)
// gemini LLM Model
const gemini = new ChatGoogleGenerativeAI(CONFIG.google_config)

export const getModel = (agent: string) => {
    try {
        switch (agent) {
            case NODES.CHAT:
                return groq;
            case NODES.SEARCH:
                return groq;
            case NODES.CODING:
                return gemini;
            case NODES.IMAGE_GEN:
                return gemini;
            case NODES.PDF:
                return gemini;
            case NODES.PPT:
                return gemini;
            default:
                return groq;
        }
    } catch (error: any) {
        throw new Error(error.message || "Failed to get model");
    }
}