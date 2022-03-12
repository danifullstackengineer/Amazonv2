import User from "../models/users.js";
import Payment from "../models/Payments.js";

const getAllOrders = async (req, res) => {
  try {
    const user = req.body.user;
    await User.findOne({ email: user }).then(async (resUser) => {
      await Payment.find({ userId: resUser._id }).then((resPayment) => {
        res.send({ orders: resPayment });
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export default getAllOrders;
