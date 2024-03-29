import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/mongodb";
import User from "models/UserModel";
import axios from "axios";
import { dbConnect } from "utils/mongoose";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async createUser(message) {
      await dbConnect();
      const newUser = await User.findOne({ email: message.user.email });
      await newUser.save();
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      if (
        user.planPurchasedAt &&
        user.planExpiresAt &&
        user.planExpiresAt < Date.now()
      ) {
        //TODO: CHANGE THE PLAN STATUS TO "Expired-plan"
        console.log("YOUR PLAN HAS EXPIRED");
      }

      session.user.planStatus = user.planStatus; // Add role value to user object so it is passed along with session
      session.user.planExpiresAt = user.planExpiresAt;
      return session;
    },
  },
};
export default NextAuth(authOptions);
