import { StateGraph, START, END } from "@langchain/langgraph";
import { agentState, AgentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { imageAgent } from "../agents/image.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { NODES } from "../utils/const.js";

// Create a new StateGraph and add nodes with method chaining
const workFlow = new StateGraph(agentState)
    .addNode("router", router)
    .addNode("chat", chatAgent)
    .addNode("search", searchAgent)
    .addNode("coding", codingAgent)
    .addNode("image_gen", imageAgent)
    .addNode("pdf", pdfAgent)
    .addNode("ppt", pptAgent);

// Connect nodes
workFlow.addEdge(START, "router");

workFlow.addConditionalEdges("router", (state: AgentState): string => {
    switch (state.agent) {
        case NODES.CHAT:
            return NODES.CHAT;
        case NODES.SEARCH:
            return NODES.SEARCH;
        case NODES.CODING:
            return NODES.CODING;
        case NODES.IMAGE_GEN:
            return NODES.IMAGE_GEN;
        case NODES.PDF:
            return NODES.PDF;
        case NODES.PPT:
            return NODES.PPT;
        default:
            return NODES.CHAT;
    }
}, {
    [NODES.CHAT]: NODES.CHAT,
    [NODES.SEARCH]: NODES.SEARCH,
    [NODES.CODING]: NODES.CODING,
    [NODES.IMAGE_GEN]: NODES.IMAGE_GEN,
    [NODES.PDF]: NODES.PDF,
    [NODES.PPT]: NODES.PPT,
    default: NODES.CHAT,
});


workFlow.addEdge(NODES.SEARCH, NODES.CHAT);
workFlow.addEdge(NODES.CHAT, END);
workFlow.addEdge(NODES.CODING, END);
workFlow.addEdge(NODES.IMAGE_GEN, END);
workFlow.addEdge(NODES.PDF, END);
workFlow.addEdge(NODES.PPT, END);

export const graph = workFlow.compile();






