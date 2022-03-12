import React from "react";
import "../styles/components/checkoutProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, RootState } from "../redux/slice";

function CheckoutProduct({
  _id,
  title,
  image,
  price,
  rating,
  hideButton,
}: {
  _id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  hideButton: boolean;
}) {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.user.basket);

  const removeFromBasketCall = () => {
    dispatch(removeFromBasket({ _id: _id }));
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__img" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating).map((_, i) => {
            return <p>🌟</p>;
          })}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasketCall}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
