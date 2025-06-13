import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState/GlobalState"; // adjust the path based on your project

function Cart() {
  const state = useContext(GlobalState);
  const { cart = [], setCart, cartLoading, getCart } = state?.UserAPI || {};
  // const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
  if (typeof getCart === "function") {
    getCart();
  } else {
    console.error("getCart is not a function!", getCart);
  }
}, []);

  // Calculate total price — if each item has a variant-based price, you may need to look it up
  const getTotal = () => {
    return cart.reduce((prev, item) => {
      const price = parseFloat(
        item.options?.find((opt) => Object.keys(opt)[0] === item.variant)?.[
          item.variant
        ] || 0
      );
      return prev + price * item.quantity;
    }, 0);
  };

  // Update quantity
  const handleQuantity = (id, delta) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: Math.max(1, item.quantity + delta),
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Remove item
  const removeItem = (id) => {
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
  };

  if (cartLoading) {
    return <div style={{ padding: "20px" }}>Loading cart...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => {
            const price = parseFloat(
              item.options?.find(
                (opt) => Object.keys(opt)[0] === item.variant
              )?.[item.variant] || 0
            );
            return (
              <div
                key={item._id}
                style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}
              >
                <h4>{item.name}</h4>
                <p>Variant: {item.variant}</p>
                <p>Price: ₹{price}</p>
                <div>
                  Quantity:
                  <button onClick={() => handleQuantity(item._id, -1)}>
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => handleQuantity(item._id, 1)}>+</button>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  style={{ color: "red", marginTop: "10px" }}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <h3>Total: ₹{getTotal()}</h3>
          <Link to="/checkout">
            <button style={{ marginTop: "20px", padding: "10px 20px" }}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
      <br />
      <Link to="/">← Continue Shopping</Link>
    </div>
  );
}

export default Cart;
