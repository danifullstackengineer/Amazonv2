import React, { useState, useEffect } from "react";
import checkout__ad from "../const/img/checkout__ad";
import CheckoutProduct from "./CheckoutProduct";
import IProduct from "../interfaces/products";
import Subtotal from "./Subtotal";
import "../styles/components/checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setUser } from "../redux/slice";
import { authJWT, getUserEmail } from "../ajax/credential";
import jwt from "jwt-decode";

function Checkout() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    if (email && !state.user.user) {
      dispatch(setUser(email));
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
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src={checkout__ad} alt="" />
        <div>{state.user.user ? <h2>Hello, {state.user.user}</h2> : null}</div>
        <h2 className="checkout__title">Your shopping basket</h2>
        {state.user.basket.map((item: IProduct, i: number) => {
          return (
            <CheckoutProduct
              key={item._id + i.toString()}
              _id={item._id ? item._id : ""}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hideButton={false}
            />
          );
        })}
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
