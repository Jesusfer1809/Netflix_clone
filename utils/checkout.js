import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export const checkout = async ({ lineItems, user }) => {
  let stripePromise = null;

  try {
    const getStripe = () => {
      if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
      }
      return stripePromise;
    };

    const stripe = await getStripe();

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: lineItems,
      email: user.email,
    });

    try {
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
    } catch (err) {
      alert(err.message);
    }
  } catch (err) {
    console.log("ERROR", err);
  }
};
