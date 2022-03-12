import React from "react";
import CurrencyFormat from "react-currency-format";
import IOrder from "../interfaces/orders";
import IProduct from "../interfaces/products";
import CheckoutProduct from "./CheckoutProduct";
import '../styles/components/order.css';

function Order({ order }: { order: IOrder["orders"][0] }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{order.createdAt}</p>
      <p className="order__id">
        <small>{order._id}</small>
      </p>
      {order.basket.map((item: IProduct, i) => {
        return (
          <CheckoutProduct
            _id={item._id ? item._id : ""}
            key={i}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton={true}
          />
        );
      })}
      <CurrencyFormat
        renderText={(value) => <h3>Order Total: {value}</h3>}
        decimalScale={2}
        value={order.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      ></CurrencyFormat>
    </div>
  );
}

export default Order;
