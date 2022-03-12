import React from "react";
import '../styles/components/product.css';
import {useDispatch} from 'react-redux';
import {addToBasket} from '../redux/slice';

function Product({
  title,
  image,
  price,
  rating,
  _id
}: {
  title: string;
  image: string;
  price: number;
  rating: number;
  _id: string;
}) {

  const dispatch = useDispatch();
    const addToBasketCall = ():void => {
      if(_id) {
        dispatch(addToBasket({
          _id: _id,
          title: title,
          image: image,
          price: price,
          rating: rating
        }))
      }
    }

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .map((_, i) => {
              return <p>🌟</p>;
            })}
        </div>
      </div>
      <img src={image} alt=""/>
      <button onClick={addToBasketCall}>Add to basket</button>
    </div>
  );
}

export default Product;
