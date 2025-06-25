import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../GlobalState/GlobalState"; // adjust the path based on your project

function Cart() {
  const state = useContext(GlobalState);
  const { cart = [], setCart, cartLoading, getCart } = state?.UserAPI || {};
  const token = state?.token || ""; // Ensure you have the token from context or props
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
  const removeItem = async (id) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.delete(
        `http://localhost:8000/user/removeFromCart/${userId}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("Item deleted from backend:", res.data);

      if (typeof getCart === "function") {
        await getCart();
        console.log("cart after deletion:", cart);
      }
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };
  const emptyCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.patch(
        `http://localhost:8000/user/emptyCart/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("Cart emptied:", res.data);
      setCart([]); // Clear the cart in state
    } catch (err) {
      console.error("Failed to empty cart:", err);
    }
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
          <button
            onClick={emptyCart}
            style={{ backgroundColor: "red", color: "white", padding: "10px 20px" }}
          >
            Empty Cart
          </button>
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
