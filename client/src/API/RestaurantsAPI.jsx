import axios from "axios";
import { useState, useEffect } from "react";

function RestaurantsAPI(token) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:8000/restaurants", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setRestaurants(res.data);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err.message);
    } finally {
      setLoading(false);
    }
  };
  const createRestaurant = async (restaurantData) => {
    if (!token) {
      console.error(
        "No token found. User must be logged in to create a restaurant."
      );
      return null;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/restaurants",
        restaurantData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("New Restaurant Created:", res.data);
      setRestaurants((prev) => ({
        ...prev,
        data: [...(prev?.data || []), res.data.data], // assuming res.data = { status, data: {...} }
      }));
      return res.data;
    } catch (err) {
      console.error("Failed to create restaurant:", err.message);
      return null;
    }
  };
  const getFoodItemsByRestaurant = async (restaurantId) => {
    try {
      if (!restaurantId) {
        console.error("Restaurant ID is required to fetch food items.");
        return [];
      }
      const res = await axios.get(
        `http://localhost:8000/fooditems/restaurant/${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return res.data.items;
    } catch (err) {
      console.error("Failed to fetch food items:", err.message);
      return [];
    }
  };
  useEffect(() => {
    if (token) {
      getRestaurants();
    }
  }, [token]);

  return {
    restaurants,
    loading,
    getFoodItemsByRestaurant,
    createRestaurant,
    getRestaurants,
  };
}
export default RestaurantsAPI;
