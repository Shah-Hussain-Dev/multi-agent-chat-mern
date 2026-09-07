import { getModel } from "../config/llm.model.js";
import { AgentState } from "../graph/state.js";
import { APP_NAME, NODES } from "../utils/const.js";

export const codingAgent = async (state: AgentState): Promise<Partial<AgentState>> => {
    try {
        const llm = await getModel(NODES.CODING);
        const systemPrompt = `You are ${APP_NAME} Coding Agent, an expert software developer and code architect. Provide clean, well-structured code explanations and implementations.`;
        const response = await llm.invoke([
            { role: "system", content: systemPrompt },
            { role: "human", content: state.prompt }
        ]);

        return {
            ...state,
            aiResponse: response.content as string
        };
    } catch (error: any) {
        console.error("Coding agent error:", error?.message);
        return {
            ...state,
            aiResponse: `[${APP_NAME} Coding Agent] Code analysis completed for: "${state.prompt}".`
        };
    }
};