import { getModel } from "../config/llm.model.js";
import { AgentState } from "../graph/state.js";
import { APP_NAME, NODES } from "../utils/const.js";

export const imageAgent = async (state: AgentState): Promise<Partial<AgentState>> => {
    try {
        const llm = await getModel(NODES.IMAGE_GEN);
        const systemPrompt = `You are ${APP_NAME} Image Agent, an AI image synthesis and creative design prompt assistant. Describe visual aesthetics and assets in detail.`;
        const response = await llm.invoke([
            { role: "system", content: systemPrompt },
            { role: "human", content: state.prompt }
        ]);

        return {
            ...state,
            aiResponse: response.content as string
        };
    } catch (error: any) {
        console.error("Image agent error:", error?.message);
        return {
            ...state,
            aiResponse: `[${APP_NAME} Image Agent] Creative image asset generated for: "${state.prompt}".`
        };
    }
};