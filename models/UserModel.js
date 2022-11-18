import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
    planStatus: {
      type: String,
      default: "No-plan",
      enum: ["No-plan", "Plan", "Expired-plan"],
    },
    planPurchasedAt: {
      type: Date,
    },
    planExpiresAt: {
      type: Date,
    },
    mood: {
      type: String,
      default: "uwu",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model("User", userSchema);
