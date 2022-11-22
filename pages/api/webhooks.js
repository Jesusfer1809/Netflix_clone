import Stripe from "stripe";
import { buffer } from "micro";
import { dbConnect } from "utils/mongoose";
import User from "models/UserModel";

export default async function webhookHandler(req, res) {
  const stripe = new Stripe(process.env.NEXT_SECRET_API_KEY);

  let data;
  let eventType;

  if (req.method === "POST") {
    //MAKING SURE THE EVENT IS COMMING FROM STRIPE AND NOT FROM A HACKER
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNIN_SECRET;

    let event;

    try {
      if (!sig || !webhookSecret) return;

      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(err.message);
    }

    data = event.data.object;
    eventType = event.type;

    // console.log("DATA", data);
    //HANDLING THE EVENT

    if (eventType === "checkout.session.completed") {
      console.log("YOUR PAYMENT HAS SUCCEED");
      console.log("DATA", data);

      await dbConnect();

      const newUser = await User.findOne({ email: data.metadata.email });
      newUser.planStatus = "Plan";
      newUser.planPurchasedAt = Date.now();

      newUser.planExpiresAt = Date.now() + 1000 * 3600 * 24 * 7 * 4;
      await newUser.save();

      console.log("successful buy");
      return res.status(200).json("Plan purchased successfully!");
    }

    res.status(200).send();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
