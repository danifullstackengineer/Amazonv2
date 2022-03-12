import $ from "jquery";
import { getBasketTotal } from "../redux/slice";
import IProduct from "../interfaces/products";

const getClientSecret = async (basket: IProduct[]): Promise<string> => {
  var result = "";

  await $.ajax({
    type: "POST",
    url: `payments/create?total=${getBasketTotal(basket) * 100}`,
  }).then((res) => {
    result = res.clientSecret;
  });
  return result;
};

const createPaymentDB = async (
  paymentIntent: any,
  basket: IProduct[], user:string
): Promise<{ success: boolean }> => {
  var result = { success: false };
  await $.ajax({
    type: "POST",
    url: "/payments/createDB",
    data: {
      basket: basket,
      amount: paymentIntent.amount / 100,
      paymentId: paymentIntent.id,
      currency: paymentIntent.currency,
      email: user
    },
  }).done(() => {
    result = { success: true };
  });
  return result;
};

export { getClientSecret, createPaymentDB };
