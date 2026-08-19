import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firebaseUID: {
            type: String,
            unique: true,
            sparse: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: false, // exclude password by default in queries
        },
        avatar: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;