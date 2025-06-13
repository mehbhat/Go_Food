import React, { useEffect, useState, useContext } from "react";
import { GlobalState } from "../GlobalState/GlobalState";

function Card() {
  const [fooditems, setFooditems] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const state = useContext(GlobalState);
  const { cart = [], addToCart, isLogged } = state?.UserAPI || {};

  console.log("addToCart exists?", typeof addToCart);
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/fooditems");
        const data = await response.json();
        setFooditems(data.Items);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
    fetchFoodItems();
  }, []);

  const handleSelectChange = (itemId, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const isInCart = (itemId, variant) => {
    return cart?.some(
      (cartItem) => cartItem._id === itemId && cartItem.variant === variant
    );
  };

  return (
    <div className="pt-20 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Our Delicious Menu
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {fooditems.map((item) => {
          const selected =
            selectedOptions[item._id] ||
            (() => {
              const [label, price] = Object.entries(
                item.options?.[0] || {}
              )[0] || ["Full", 0];
              return `${label}-${price}`;
            })();

          const [variant, price] = selected.split("-");

          return (
            <div
              key={item._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg border dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <img
                className="w-full h-48 object-cover"
                src={item.image || "/images/burger.jpg"}
                alt={item.name || "Food"}
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                  {item.name || "Food Name"}
                </h5>
                <div className="flex justify-between items-center mt-2">
                  <select
                    className="block rounded border p-2 text-sm text-gray-700 shadow"
                    onChange={(e) =>
                      handleSelectChange(item._id, e.target.value)
                    }
                    value={selected}
                  >
                    {item.options?.map((opt, idx) => {
                      const [label, price] = Object.entries(opt)[0];
                      return (
                        <option key={idx} value={`${label}-${price}`}>
                          {label} - ₹{price}
                        </option>
                      );
                    })}
                  </select>

                  <button
                    onClick={() => {
                      if (!isLogged) {
                        alert("Please login to continue");
                        return;
                      }

                      if (!isInCart(item._id, variant)) {
                        addToCart(
                          { ...item, variant, _id: item._id }, // Ensure _id is present
                          1
                        );
                      }
                    }}
                    className={`${
                      isInCart(item._id, variant)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white text-sm px-4 py-2 rounded-md transition`}
                    disabled={isInCart(item._id, variant)}
                  >
                    {isInCart(item._id, variant) ? "Added" : "Add +"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
