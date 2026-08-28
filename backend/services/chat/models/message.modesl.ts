import mongoose from "mongoose";



const messagesSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },
    role: {
        type: String,
        enum: ["user", "assistant", "system"]
    },
    content: {
        type: String
    }
}, {
    timestamps: true
})

const Message = mongoose.model("Message", messagesSchema);
export default Message;