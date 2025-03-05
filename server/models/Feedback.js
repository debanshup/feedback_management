import { request } from "express";
import mongoose from "mongoose";
// Feedback Schema Definition
const feedbackSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            // select: false,
        },
        email: {
            type: String,
            required: true,
            validate: {
                // check if formatted  or not
                validator: function (v) {
                    return /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/i.test(v);
                },
                message: "Invalid email format",
            },
        },
        serviceCategory: {
            type: String,
        },
        priorityLevel: {
            type: String,
            enum: ["high", "medium", "low"],
        },
        experience: {
            type: String,
            enum: ["excellent", "good", "average", "poor"],
        },
        message: {
            type: String,
            // select: false,
        },
        date: { type: Date, required: true, default: Date.now() },
    },
    { timestamps: true }
); // Timestamps will automatically add createdAt and updatedAt fields

// Creating Feedback Model
const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
