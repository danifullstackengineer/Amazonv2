import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  emptyBasket,
  getBasketTotal,
  orderMade,
  setUser,
} from "../redux/slice";
import CheckoutProduct from "./CheckoutProduct";
import IProduct from "../interfaces/products";
import CurrencyFormat from "react-currency-format";
import { getClientSecret, createPaymentDB } from "../ajax/payment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/slice";
import "../styles/components/payment.css";
import { authJWT, getUserEmail } from "../ajax/credential";
import jwt from "jwt-decode";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basket = useSelector((state: RootState) => state.user.basket);
  const user = useSelector((state: RootState) => state.user.user);

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    if (user && basket.length > 0) {
      getClientSecret(basket).then((res) => {
        setClientSecret(res);
      });
    }
  }, [basket]);

  const [email, setEmail] = useState<string>();

  useEffect(() => {
    if (email && !user) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);

    const cardElement = elements?.getElement(CardElement);

    if (cardElement) {
      await stripe
        ?.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        })
        .then(({ paymentIntent }) => {
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          createPaymentDB(paymentIntent, basket, user);
          dispatch(orderMade(true));
          navigate("/orders", { replace: true });
        });
    }
  };

  const handleChange = (e: any): void => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length}</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item: IProduct, i: number) => {
              return (
                <CheckoutProduct
                  key={i}
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
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => {
                    return <h3>Order Total: {value}</h3>;
                  }}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
            {error && <div>{error}</div>}
          </div>
        </div>
      </div>
      "
    </div>
  );
}

export default Payment;
