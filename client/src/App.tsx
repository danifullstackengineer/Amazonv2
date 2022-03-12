import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Orders from "./components/Orders";

import "./styles/index.css";

const promise = loadStripe(
  "pk_test_51KXAUxDelfvIQhggA3tpu3fek1HqAwqYU7SAxvQJtBhcD2ULDWuzvd0KouPGX7HrgJ8xKZbqk49L1HTL5Vwh01nj00LQLjwQQf"
);

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
function jwt(token: string): { id: string; iat: number; exp: number; } {
  throw new Error("Function not implemented.");
}

