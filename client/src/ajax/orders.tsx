import $ from "jquery";
import IProduct from "../interfaces/products";
import IOrder from "../interfaces/orders";

const getAllProductsOfUser = async (
  user: string
): Promise<IOrder | undefined> => {
  var result = undefined;
  await $.ajax({
    url: "/getAllOrders",
    type: "POST",
    data: { user: user },
  }).done((res) => {
    result = res;
  });
  return result;
};

export default getAllProductsOfUser;
