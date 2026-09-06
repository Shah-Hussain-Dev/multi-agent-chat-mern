import { getModel } from "../config/llm.model.js";
import { AgentState } from "./state.js";

export const router = async (state: AgentState): Promise<Partial<AgentState>> => {
    try {
        const llm = await getModel("router");
        const prompt = `
        You are an agent router. Your job is to route the user's message to the appropriate agent.

        Available Agents:
        -chat
        -search
        -coding
        -image_gen
        -pdf
        -ppt

        rules: 
        chat: 
        General Conversations,
        explaination,
        learnings
        questions.

        search:
        web_search,
        current events,
        latest information,
        news,
        articles,
        research,
        recent developments,
        internet lookups.

        coding: 
        code generation,
        debugging,
        code optimization,
        code explanation,
        
        image_gen: 
        image generation,
        image editing,
        image analysis,
        
        pdf: 
        Question about generate PDFs or document context related queries.
        
        ppt: 
        Question about generate PPT or presentation context related queries.

        Return ONLY one word agent name: 
        chat
        search
        coding 
        pdf 
        ppt 
        image_gen

        USER query: 
        ${state.prompt}

        `
        const res = await llm.invoke(prompt);
        console.log("Router Response:", res.content);

        return {
            ...state,
            agent: (res.content as string).trim().toLowerCase()
        };

    } catch (error: any) {
        throw new Error(error.message || "Failed to route");
    }
};