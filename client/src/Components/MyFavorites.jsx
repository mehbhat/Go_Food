import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState/GlobalState"; // adjust path as needed
const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const state = useContext(GlobalState);
  const { getFavorites } = state?.UserAPI || {};
  const token = state?.token || ""; 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favs = await getFavorites();
      setFavorites(favs);
      setLoading(false);
    };
    fetchFavorites();
  }, [getFavorites]);

  const deletefavorite = async(id) =>{
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(`http://localhost:8000/user/favorites/${userId}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const updatedFavorites = await getFavorites();
      setFavorites(updatedFavorites);
    } catch (err) {
      console.error("Error removing from favorites:", err.message);
      alert("Failed to remove from favorites.");
    }
  }
  if (loading) return <p>Loading...</p>;

  return (
    <div>
        <Link to ="/"
          // onClick={() => handleAddToFavorites("someFoodItemId")} // replace with actual food item ID
          className="bg-blue-500 text-white px-4 py-2 rounded mb-8"
        >
          Add Favorites
        </Link>
      <h2 className="text-xl font-bold mb-4 mt-4">My Favorites</h2>
      {Array.isArray(favorites) && favorites.length > 0 ? (
        <ul className="space-y-4 flex flex-col">
          {favorites.map((item) => (
            <li key={item._id} className="border-b py-2 flex items-center justify-between">
              <p className="font-medium">{item.name}</p>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover"
              />
              <p className="text-white-200 cursor-pointer border-2 p-4 bg-red-500" onClick={() => deletefavorite(item._id)}>delete</p>
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
