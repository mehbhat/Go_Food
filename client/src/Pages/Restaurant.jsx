import React, { useContext } from "react";
import { GlobalState } from "../GlobalState/GlobalState";
import { useNavigate } from "react-router-dom";
import RestaurantModal from "../Components/RestaurantModal";
import axios from "axios";
import { useState } from "react";
const Restaurant = () => {
  const state = useContext(GlobalState);
  const { restaurants, loading } = state?.RestaurantsAPI || {};
  const { getFoodItemsByRestaurant, getRestaurants } =
    state?.RestaurantsAPI || {};
  const token = state?.token || "";
  const { createRestaurant } = state?.RestaurantsAPI || {};
  const isAdmin = state?.UserAPI?.isAdmin || false;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRestaurantId, setEditingRestaurantId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    address: "",
    rating: "",
  });
  const navigate = useNavigate();
  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        rating: parseFloat(formData.rating),
      };

      if (isEditMode) {
        await axios.put(
          `http://localhost:8000/restaurants/${editingRestaurantId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      } else {
        await createRestaurant(payload);
      }

      await getRestaurants();
      setIsModalOpen(false);
      setFormData({ name: "", cuisine: "", address: "", rating: "" });
      setIsEditMode(false);
      setEditingRestaurantId(null);
    } catch (error) {
      console.error("Error saving restaurant:", error.message);
    }
  };

  const handleRestaurantClick = async (restaurantId) => {
    const foodItems = await getFoodItemsByRestaurant(restaurantId);
    console.log("Food items for restaurant:", foodItems);
    navigate(`/restaurant/${restaurantId}`);
  };
  const handleUpdate = (restaurantId,e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the list item
    const restaurant = restaurants.data.find((r) => r._id === restaurantId);
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        address: restaurant.address,
        rating: restaurant.rating.toString(),
      });
      setEditingRestaurantId(restaurantId);
      setIsEditMode(true);
      setIsModalOpen(true);
    }
  };
  const handleDelete = async (restaurantId, e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the list item
    try {
      if (!token) {
        console.error(
          "No token found. User must be logged in to delete a restaurant."
        );
      }
      const response = await axios.delete(
        `http://localhost:8000/restaurants/${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("Restaurant deleted:", response.data);
      const data = await response.json();
      console.log(data);
      // Optionally, you can refresh the restaurant list or remove the deleted restaurant from the state
    } catch (err) {
      console.error("Failed to delete restaurant:", err.message);
    }
  };
  return (
    <div>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => window.history.back()}
      >
        Back
      </button>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Restaurants</h1>

        {isAdmin && (
          <div className="p-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Restaurant
            </button>

          <RestaurantModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setIsEditMode(false);
              setFormData({ name: "", cuisine: "", address: "", rating: "" });
            }}
            onSave={handleSave}
            formData={formData}
            setFormData={setFormData}
          />
        </div>)}
      </div>
      <h1>Restaurant Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="">
          {restaurants.data.map((restaurant) => (
            <li
              className="mx-4 flex justify-between border-2  p-8 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
              key={restaurant._id}
              onClick={() => handleRestaurantClick(restaurant._id)}
            >
              {restaurant.name}
              <p>{restaurant.cuisine}</p>
              <p>{restaurant.rating}</p>
              <p>{restaurant.isActive ? "Active" : "Inactive"}</p>
              {isAdmin && (
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={(e) => handleUpdate(restaurant._id, e)} // Pass the event to prevent propagation
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={(e) => handleDelete(restaurant._id, e)} // Pass the event to prevent propagation
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Restaurant;
