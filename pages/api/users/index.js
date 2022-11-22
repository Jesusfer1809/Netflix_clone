import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/UserModel";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

dbConnect();

export default async function handler(req, res) {
  // const session = await unstable_getServerSession(req, res, authOptions);
  // console.log("SESSION", session);
  try {
    switch (req.method) {
      case "PATCH":
        const newUser = await User.findOne({ email: req.body.email });

        newUser.image = "https://i.imgur.com/PC2sunS.jpg";
        await newUser.save();

        return res.status(200).json({
          status: "success",
          data: {
            user: newUser,
          },
        });

      default:
        return res.status(400).json({ msg: "this method is not suported" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
