import $ from "jquery";
import IProduct from "../interfaces/products";

const getAllProducts = async ():Promise<IProduct[]> => {
  var products:IProduct[] = [];
  await $.ajax({
    type: "GET",
    url: "/getAllProducts",
  }).done((data) => {
    if (data.found) {
        products = data.data;
    } else {
      console.log(data.message);
    }
  });
  return products;
};

const insertProduct = async (data: IProduct) => {
  await $.ajax({
    type: "POST",
    url: "/insertProduct",
    data: data,
  }).done((res) => {
    console.log(res);
  });
};

export { getAllProducts, insertProduct };
