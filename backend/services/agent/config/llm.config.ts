import "dotenv/config";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";
const HUGGINGFACEHUB_API_KEY = process.env.HUGGINGFACEHUB_API_KEY || "";

export const CONFIG = {
    google_api_key: GOOGLE_API_KEY,
    groq_api_key: GROQ_API_KEY,
    groq_config: {
        apiKey: GROQ_API_KEY,
        model: "qwen/qwen3.6-27b",
    },
    google_config: {
        apiKey: GOOGLE_API_KEY,
        model: "gemini-2.5-flash",
    },
    hugging_face_config: {
        apiKey: HUGGINGFACEHUB_API_KEY,
        model: "sentence-transformers/all-MiniLM-L6-v2",
    },
};