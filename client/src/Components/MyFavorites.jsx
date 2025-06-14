import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { GlobalState } from "../GlobalState/GlobalState"; // adjust path as needed
const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const state = useContext(GlobalState);
  const { getFavorites , addToFavorites } = state?.UserAPI || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favs = await getFavorites();
      setFavorites(favs);
      setLoading(false);
    };
    fetchFavorites();
  }, [getFavorites]);

  const handleAddToFavorites = async (foodItemId) => {
    try {
      await addToFavorites(foodItemId);
      const updatedFavorites = await getFavorites();
      setFavorites(updatedFavorites);
    } catch (err) {
      console.error("Error adding to favorites:", err.message);
      alert("Failed to add to favorites.");
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div>
        <button
          onClick={() => handleAddToFavorites("someFoodItemId")} // replace with actual food item ID
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add to Favorites
        </button>
      <h2 className="text-xl font-bold mb-4">My Favorites</h2>
      {Array.isArray(favorites) && favorites.length > 0 ? (
        <ul>
          {favorites.map((item) => (
            <li key={item._id} className="border-b py-2">
              <p className="font-medium">{item.name}</p>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
};

export default MyFavorites;
