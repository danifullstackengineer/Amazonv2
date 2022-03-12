import React from "react";
import { useNavigate } from "react-router-dom";
import { getBasketTotal } from "../redux/slice";
import CurrencyFormat from "react-currency-format";
import "../styles/components/subtotal.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/slice";

function Subtotal() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const basket = useSelector((state: RootState) => state.user.basket);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={() => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
