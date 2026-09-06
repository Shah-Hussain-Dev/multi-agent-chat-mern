export const NODES = {
    CHAT: "chat",
    SEARCH: "search",
    CODING: "coding",
    IMAGE_GEN: "image_gen",
    PDF: "pdf",
    PPT: "ppt",
} as const;

export const APP_NAME = (globalThis as any).process !== "undefined"
    ? (globalThis as any).process.env.APP_NAME || "Agentrix"
    : "Agentrix";