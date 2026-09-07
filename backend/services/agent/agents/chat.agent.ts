import { getModel } from "../config/llm.model.js";
import { AgentState } from "../graph/state.js";
import { APP_NAME, NODES } from "../utils/const.js";

export const chatAgent = async (state: AgentState): Promise<Partial<AgentState>> => {
    try {
        const llm = await getModel(NODES.CHAT);

        const systemPrompt = `You are ${APP_NAME}, An intelligent AI assistant designed to provide helpful and concise responses.`;
        const response = await llm.invoke([
            {
                "role": "system",
                "content": systemPrompt
            },
            {
                "role": "human",
                "content": state.prompt
            }
        ])

        return {
            ...state,
            aiResponse: response.content as string
        }

    } catch (error: any) {
        console.error("Chat agent error:", error?.message);
        return {
            ...state,
            aiResponse: `[${APP_NAME}] Processing response for: "${state.prompt}".`
        };
    }
};