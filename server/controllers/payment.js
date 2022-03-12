import { stripe } from "../index.js";
import Payment from "../models/Payments.js";
import User from "../models/users.js";
const createPayment = async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.floor(total),
    currency: "usd",
  });

  res.status(201).send({ clientSecret: paymentIntent.client_secret });
};

const createPaymentDB = async (req, res) => {
  try {
    const basket = req.body.basket;
    const amount = req.body.amount;
    const paymentId = req.body.paymentId;
    const currency = req.body.curreny;
    const email = req.body.email;

    await User.findOne({ email: email }).then((resUser) => {
      const payment = new Payment({
        basket: basket,
        amount: amount,
        paymentId: paymentId,
        currency: currency,
        userId: resUser._id,
      });
      payment.save();
    });
  } catch (err) {
    console.log(err);
    res.status(409).send("Payment creation failed in the catch part!");
  }
};

export { createPayment, createPaymentDB };
