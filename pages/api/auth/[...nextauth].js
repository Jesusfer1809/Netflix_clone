import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/mongodb";
import User from "models/UserModel";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
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
      const newUser = await User.findOne({ email: message.user.email });
      await newUser.save();
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.planStatus = user.planStatus; // Add role value to user object so it is passed along with session
      return session;
    },
  },
};
export default NextAuth(authOptions);
