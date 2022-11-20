const stripe = require("stripe")(process.env.NEXT_SECRET_API_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: `${process.env.HOST}`,
    cancel_url: `${process.env.HOST}`,

    metadata: {
      email,
    },
  });

  res.status(200).json({ id: session.id }); //uwu
};
