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

// userSchema.pre("save", function (next) {
//   this.planExpiresAt = this.planPurchasedAt + 1000 * 3600 * 24 * 7 * 4;
//   next();
// });

export default models.User || model("User", userSchema);
