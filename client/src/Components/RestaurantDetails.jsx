// pages/RestaurantDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../GlobalState/GlobalState";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import FoodItemModal from "../Components/FoodItemModal"; // Assuming you have a modal component for adding food items
const RestaurantDetails = () => {
  const { id } = useParams(); // restaurant ID from URL
  const state = useContext(GlobalState);
  const { getFoodItemsByRestaurant } = state?.RestaurantsAPI || {};
  const {
    cart = [],
    addToCart,
    isLogged,
    addToFavorites,
    getFavorites,
  } = state?.UserAPI || {};
  const { isAdmin } = state?.UserAPI || {};
  const token = state?.token || "";
  const [foodData, setFoodData] = useState({
    name: "",
    categoryName: "",
    image: "",
    options: [],
    description: "",
  });
  const [foodItems, setFoodItems] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingFoodItemId, setEditingFoodItemId] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      setLoading(true);
      const items = await getFoodItemsByRestaurant(id);
      console.log("Fetched food items:", items);
      setFoodItems(items || []);
      setLoading(false);
    };

    if (id) fetchFoodItems();
    else {
      console.error("Restaurant ID is required to fetch food items.");
      setLoading(false);
    }
  }, [id, getFoodItemsByRestaurant]);

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
  const handleSaveFoodItem = async () => {
    const payload = {
      name: foodData.name,
      categoryName: foodData.categoryName,
      imageUrl: foodData.imageUrl,
      options: foodData.options,
      description: foodData.description,
      restaurant: id,
    };

    try {
      if (isEditMode && editingFoodItemId) {
        // ✏️ Update
        await axios.put(
          `http://localhost:8000/fooditems/${editingFoodItemId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Food item updated successfully!");
      } else {
        // 🆕 Create
        await axios.post("http://localhost:8000/fooditems", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Food item added successfully!");
      }

      // ✅ Refresh
      await getFoodItemsByRestaurant(id);
      setIsModalOpen(false);
      setFoodData({
        name: "",
        categoryName: "",
        imageUrl: "",
        options: [],
        description: "",
      });
      setIsEditMode(false);
      setEditingFoodItemId(null);
    } catch (err) {
      console.error(
        "Error saving food item:",
        err?.response?.data || err.message
      );
      alert("Failed to save food item.");
    }
  };

  const handleDeleteFoodItem = async (foodItemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/fooditems/${foodItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Food item deleted:", response.data);
      setFoodItems((prev) => prev.filter((item) => item._id !== foodItemId));
      alert("Food item deleted successfully!");
    } catch (err) {
      console.error("Error deleting food item:", err.message);
      alert("Failed to delete food item.");
    }
  };
  const handleEditFoodItem = (foodItemId) => {
    const itemToEdit = foodItems.find((item) => item._id === foodItemId);
    if (itemToEdit) {
      setFoodData({
        name: itemToEdit.name,
        categoryName: itemToEdit.categoryName,
        imageUrl: itemToEdit.imageUrl, // ✅ rename to `imageUrl`
        options: itemToEdit.options || [],
        description: itemToEdit.description,
      });
      setEditingFoodItemId(foodItemId);
      setIsEditMode(true);
      setIsModalOpen(true);
    } else {
      console.error("Food item not found for editing:", foodItemId);
    }
  };
  const handleAddToFavorites = async (foodItemId) => {
    try {
      await addToFavorites(foodItemId);
      setLikedItems((prev) => [...prev, foodItemId]);
      await getFavorites();
    } catch (err) {
      console.error("Error adding to favorites:", err.message);
      alert("Failed to add to favorites.");
    }
  };

  return (
    <div className="pt-20 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => window.history.back()}
        >
          Back
        </button>

        {isAdmin && (
          <div>
            <button
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              Add Food Item
            </button>
            <FoodItemModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setIsEditMode(false);
                setEditingFoodItemId(null);
                setFoodData({
                  name: "",
                  categoryName: "",
                  imageUrl: "",
                  options: [],
                  description: "",
                });
              }}
              onSave={handleSaveFoodItem}
              foodData={foodData}
              setFoodData={setFoodData}
              isEditMode={isEditMode}
            />
          </div>
        )}
      </div>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Food Items from this Restaurant
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {foodItems.map((item) => {
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
                className="relative bg-white rounded-xl overflow-hidden shadow-lg border dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all"
              >
                <button
                  className="absolute top-2 right-2 z-10 text-gray-500 hover:text-red-500"
                  onClick={() => handleAddToFavorites(item._id)}
                >
                  {likedItems.includes(item._id) ? <FaHeart /> : <FaRegHeart />}
                </button>

                <img
                  className="w-full h-48 object-cover"
                  src={item.image || "/images/burger.jpg"} // change this back to imageURl when you want to view image from post
                  alt={item.name || "Food"}
                />
                <div className="p-4">
                  <div className="flex">
                    <div>
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                        {item.name || "Food Name"}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                        {item.categoryName || "Category"}
                      </p>
                    </div>
                    {isAdmin && (
                      <button className=" flex space-x-4 absolute right-2">
                        <MdDelete
                          onClick={() => handleDeleteFoodItem(item._id)}
                        />
                        <MdEdit onClick={() => handleEditFoodItem(item._id)} />
                      </button>
                    )}
                  </div>

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
                          addToCart({ ...item, variant, _id: item._id }, 1);
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
      )}
    </div>
  );
};

export default RestaurantDetails;
