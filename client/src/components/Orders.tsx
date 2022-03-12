import React, { useEffect, useState } from "react";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import "../styles/components/orders.css";
import { orderMade, emptyBasket, setUser } from "../redux/slice";
import { RootState } from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import getAllProductsOfUser from "../ajax/orders";
import IOrder from "../interfaces/orders";
import Order from "./Order";
import "../styles/components/orders.css";
import { authJWT, getUserEmail } from "../ajax/credential";
import jwt from "jwt-decode";

function Orders() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const [orders, setOrders] = useState<IOrder["orders"]>();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    if (state.user.orderMade) {
      dispatch(orderMade(false));
      dispatch(emptyBasket());
    }
    if (email) {
      getAllProductsOfUser(email).then((res) => {
        setOrders(res?.orders);
      });
      if (!state.user.user) {
        dispatch(setUser(email));
      }
    }
  }, [email]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authJWT().then((res) => {
        if (res.success && token) {
          const data: { id: string; iat: number; exp: number } = jwt(token);
          getUserEmail(data.id).then((resEmail) => {
            if (resEmail.success) {
              setEmail(resEmail.email);
            }
          });
        }
      });
    }
  }, []);

  return (
    <div className="orders">
      {orders?.map((order, i) => {
        return <Order order={order} key={i} />;
      })}
    </div>
  );
}

export default Orders;
