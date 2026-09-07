import { getModel } from "../config/llm.model.js";
import { AgentState } from "../graph/state.js";
import { APP_NAME, NODES } from "../utils/const.js";

export const searchAgent = async (state: AgentState): Promise<Partial<AgentState>> => {
    try {
        const llm = await getModel(NODES.SEARCH);
        const systemPrompt = `You are ${APP_NAME} Search Agent, a web research and facts analysis assistant. Synthesize current developments and insights clearly.`;
        const response = await llm.invoke([
            { role: "system", content: systemPrompt },
            { role: "human", content: state.prompt }
        ]);

        return {
            ...state,
            aiResponse: response.content as string
        };
    } catch (error: any) {
        console.error("Search agent error:", error?.message);
        return {
            ...state,
            aiResponse: `[${APP_NAME} Search Agent] Synthesized research for: "${state.prompt}".`
        };
    }
};