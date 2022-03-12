import mongoose from "mongoose";

const paymentTable = mongoose.Schema({
  basket: [{
    _id: String,
    title: String,
    image: String,
    price: Number,
    rating: Number,
  }],
  amount: Number,
  paymentId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  currency: String,
  userId: String,
});

export default mongoose.model("Payment", paymentTable);
