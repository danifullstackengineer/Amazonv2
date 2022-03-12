import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import login__logo from "../const/img/login__logo";
import "../styles/components/login.css";
import { registerQuery, loginQuery, authJWT } from "../ajax/credential";
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/slice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const signIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    loginQuery(email, password).then((res) => {
      if (res.success) {
        localStorage.setItem("token", res.token ? res.token : "");
      }
      alert(res.message);
      if (!res.success) {
        setEmail("");
        setPassword("");
      } else {
        dispatch(setUser(email))
        navigate("/");
      }
    });
  };

  const register = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    registerQuery(email, password).then((res) => {
      if (res.success) {
        navigate("/");
      }
    });
  };

  return (
    <div className="login">
      <Link to="/">
        <img src={login__logo} alt="" className="login__logo" />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form onSubmit={signIn}>
          <h5>E-mail</h5>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <button type="submit" className="login__signInButton">
            SIgn In
          </button>
        </form>
        <p>
          By signing-in you agree to Amazon's Conditions of Use &amp; Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
