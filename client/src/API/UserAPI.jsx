import { useEffect, useState } from "react";
import axios from "axios";

function UserApi(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [infor, setInfor] = useState({});

  const getCart = async () => {
    setCartLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/user/getCart", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log("Cart fetched:", cart);
      const cartData = Array.isArray(res.data?.data)
        ? res.data.data.map((item) => ({
            ...item.foodItem,
            quantity: item.quantity,
            variant: item.selectedOption,
          }))
        : [];

      setCart(cartData);
    } catch (err) {
      console.error("Failed to fetch cart:", err.message);
      setCart([]);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        const id = localStorage.getItem("userId");
        if (!id) return;

        try {
          const res = await axios.get(`http://localhost:8000/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });

          setIsLogged(true);
          setIsAdmin(res.data.role === "admin");
          setInfor({
            name: res.data.data.name,
            email: res.data.data.email,
            address: res.data.data.address,
          });
          console.log("User info:", res.data);
          await getCart(); 
        } catch (err) {
          console.log(
            "User fetch error:",
            err?.response?.data?.msg || err.message
          );
          setIsLogged(false);
        }
      };

      getUser();
    }
  }, [token]);

  const addToCart = async (product, quantity) => {
    if (!isLogged) {
      alert("Please login to be able to shop");
      return;
    }

    const check = cart.every((item) => item._id !== product._id);

    if (check) {
      const newCart = [...cart, { ...product, quantity }];
      setCart(newCart);

      const id = localStorage.getItem("userId");

      try {
        await axios.patch(
          `http://localhost:8000/user/addToCart/${id}`,
          {
            foodItem: product._id,
            quantity,
            selectedOption: product.variant,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        await getCart(); // ✅ Refresh cart after add
        // setCart(newCart);
        alert("Product added to your cart.");
      } catch (err) {
        console.error("Error updating cart:", err.message);
        alert("Failed to update cart.");
      }
    }
  };

  return {
    isLogged,
    isAdmin,
    cart,
    setCart,
    cartLoading,
    infor,
    getCart,
    addToCart,
    getCart, // optional if needed elsewhere
  };
}

export default UserApi;
