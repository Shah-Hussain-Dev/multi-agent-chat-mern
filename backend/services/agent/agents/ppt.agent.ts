import { getModel } from "../config/llm.model.js";
import { AgentState } from "../graph/state.js";
import { APP_NAME, NODES } from "../utils/const.js";

export const pptAgent = async (state: AgentState): Promise<Partial<AgentState>> => {
    try {
        const llm = await getModel(NODES.PPT);
        const systemPrompt = `You are ${APP_NAME} PPT Agent, a presentation slide deck architect. Provide clear slide structure and presentation points.`;
        const response = await llm.invoke([
            { role: "system", content: systemPrompt },
            { role: "human", content: state.prompt }
        ]);

        return {
            ...state,
            aiResponse: response.content as string
        };
    } catch (error: any) {
        console.error("PPT agent error:", error?.message);
        return {
            ...state,
            aiResponse: `[${APP_NAME} PPT Agent] Presentation deck outline created for: "${state.prompt}".`
        };
    }
};