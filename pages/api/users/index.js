import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/UserModel";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

dbConnect();

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log("SESSION", session);
  try {
    switch (req.method) {
      case "PATCH":
        if (session) {
          console.log("HELLO", session);
          const newUser = await User.findOne({ email: session.user.email });

          newUser.image = "https://i.imgur.com/X4Bx9Jd.jpg";
          await newUser.save();

          return res.status(200).json({
            status: "success",
            data: {
              user: newUser,
            },
          });
        }

        return res.status(200).json({
          status: "success",
          data: {
            uwu: "uwu",
            session: session,
          },
        });

      default:
        return res.status(400).json({ msg: "this method is not suported" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
