import Stripe from "stripe";
import { buffer } from "micro";

export default async function webhookHandler(req, res) {
  const stripe = new Stripe(process.env.NEXT_SECRET_API_KEY);

  if (req.method === "POST") {
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

    console.log("event", event);

    res.status(200).send();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
