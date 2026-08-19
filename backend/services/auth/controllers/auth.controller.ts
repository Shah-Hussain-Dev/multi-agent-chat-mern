import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.schema.js";
import { Request, Response } from "express";
import redis from "../../../shared/redis/redis.js";
import bcrypt from "bcryptjs";

// Helper to create user session in Redis and set HTTP-only cookie
const createSession = async (user: any, res: Response) => {
    const sessionID = crypto.randomUUID();
    res.cookie("session_id", sessionID, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    await redis.set(
        `session-${sessionID}`,
        JSON.stringify({
            userId: user._id.toString(),
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }),
        "EX",
        60 * 60 * 24 * 7
    );

    return sessionID;
};

// Register user with Email & Password
export const registerEmail = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Name, email, and password are required",
            });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
            return;
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`;

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            avatar,
        });

        await createSession(user, res);

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
        };

        res.status(201).json({
            success: true,
            user: userResponse,
            message: "Account created successfully",
        });
    } catch (error) {
        console.error("Error in registerEmail:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during registration",
        });
    }
};

// Login user with Email & Password
export const loginEmail = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
            return;
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail }).select("+password");

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
            return;
        }

        if (!user.password) {
            res.status(400).json({
                success: false,
                message: "Account exists via Google Sign-In. Please sign in with Google.",
            });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
            return;
        }

        await createSession(user, res);

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
        };

        res.status(200).json({
            success: true,
            user: userResponse,
            message: "Login successful",
        });
    } catch (error) {
        console.error("Error in loginEmail:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during login",
        });
    }
};

// Google OAuth login
export const login = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        if (!token) {
            res.status(400).json({
                success: false,
                message: "Google ID token is required",
            });
            return;
        }

        const decodeToken = await getAuth(app).verifyIdToken(token);

        let user = await User.findOne({
            firebaseUID: decodeToken.uid,
        });

        if (!user) {
            // Check if email already registered
            user = await User.findOne({ email: decodeToken.email });
            if (user) {
                user.firebaseUID = decodeToken.uid;
                if (decodeToken.picture && !user.avatar) {
                    user.avatar = decodeToken.picture;
                }
                await user.save();
            } else {
                user = await User.create({
                    firebaseUID: decodeToken.uid,
                    name: decodeToken.name || decodeToken.email?.split("@")[0] || "User",
                    email: decodeToken.email,
                    avatar: decodeToken.picture,
                });
            }
        }

        await createSession(user, res);

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
        };

        res.status(200).json({
            success: true,
            user: userResponse,
            message: "Login success",
        });
    } catch (error) {
        console.error("Error in Google login:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Logout api
export const logout = async (req: Request, res: Response) => {
    try {
        const sessionID = req.cookies?.session_id || req.cookies?.session;
        if (sessionID) {
            await redis.del(`session-${sessionID}`);
        }
        res.clearCookie("session_id", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        res.clearCookie("session", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        res.status(200).json({
            success: true,
            message: "Logout success",
        });
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};