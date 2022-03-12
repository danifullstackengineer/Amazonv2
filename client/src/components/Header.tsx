import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { header__logo } from "../const/img/header__logo";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "../styles/components/header.css";
import jwt from "jwt-decode";
import { authJWT, getUserEmail } from "../ajax/credential";
import { useSelector, useDispatch } from "react-redux";
import { RootState, removeUser } from "../redux/slice";

function Header() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleAuthentication = () => {
    if (email) {
      localStorage.removeItem("token");
      setEmail(undefined);
      dispatch(removeUser());
    }
  };

  const [email, setEmail] = useState<string>();

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
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={header__logo} />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={email ? "/" : "/login"} onClick={handleAuthentication}>
          <div className="header__option">
            <span className="header__optionLineOne">
              {email ? email : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {email ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">&amp; Orders</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {state.user.basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
