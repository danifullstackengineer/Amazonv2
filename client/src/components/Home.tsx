import React, { useEffect, useState } from "react";
import IProduct from "../interfaces/products";
import Product from "../components/Product";
import { getAllProducts, insertProduct } from "../ajax/products";
import bg__img from "../const/img/bg__img";
import "../styles/components/home.css";
import { authJWT, getUserEmail } from "../ajax/credential";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice";
import jwt from "jwt-decode";
import { RootState } from "../redux/slice";
import { useSelector } from "react-redux";

function Home() {
  const [products, setProducts] = useState<IProduct[]>();
  const [productRowOne, setProductRowOne] = useState<IProduct[]>();
  const [productRowTwo, setProductRowTwo] = useState<IProduct[]>();
  const [productRowThree, setProductRowThree] = useState<IProduct[]>();

  const [email, setEmail] = useState<string>();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

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

  useEffect(() => {
    getAllProducts().then((res: IProduct[]) => {
      if (res) {
        setProducts(res);
      }
    });
  }, []);
  useEffect(() => {
    if (products) {
      setProductRowOne(products.filter((p, i) => (i < 2 ? p : "")));
      setProductRowTwo(products.filter((p, i) => (i >= 2 && i < 5 ? p : "")));
      setProductRowThree(products.filter((p, i) => (i === 5 ? p : "")));
    }
  }, [products]);

  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src={bg__img} alt="" />
        <div className="home__row">
          {productRowOne
            ? productRowOne.map((product, i) => {
                return (
                  <Product
                    key={i}
                    _id={product._id ? product._id : ""}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    rating={product.rating}
                  />
                );
              })
            : ""}
        </div>
        <div className="home__row">
          {productRowTwo
            ? productRowTwo.map((product, i) => {
                return (
                  <Product
                    key={i}
                    _id={product._id ? product._id : ""}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    rating={product.rating}
                  />
                );
              })
            : ""}
        </div>
        <div className="home__row">
          {productRowThree
            ? productRowThree.map((product, i) => {
                return (
                  <Product
                    key={i}
                    _id={product._id ? product._id : ""}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    rating={product.rating}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Home;
