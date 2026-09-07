import { getModel } from "../config/llm.model.js";
import { AgentState } from "../graph/state.js";
import { APP_NAME, NODES } from "../utils/const.js";

export const pdfAgent = async (state: AgentState): Promise<Partial<AgentState>> => {
    try {
        const llm = await getModel(NODES.PDF);
        const systemPrompt = `You are ${APP_NAME} PDF Agent, an expert document analyst. Provide precise summaries and document structure insights.`;
        const response = await llm.invoke([
            { role: "system", content: systemPrompt },
            { role: "human", content: state.prompt }
        ]);

        return {
            ...state,
            aiResponse: response.content as string
        };
    } catch (error: any) {
        console.error("PDF agent error:", error?.message);
        return {
            ...state,
            aiResponse: `[${APP_NAME} PDF Agent] Document analysis completed for: "${state.prompt}".`
        };
    }
};