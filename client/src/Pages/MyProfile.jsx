import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../GlobalState/GlobalState"; // adjust path as needed

const MyProfile = () => {
  const state = useContext(GlobalState);
  console.log("State object:", state);
  const { infor = {}, isLogged } = state?.UserAPI || {};
  const token = state?.token;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (infor) {
      setFormData({
        name: infor.name,
        email: infor.email,
        address: infor.address,
      });
      setLoading(false);
    }
  }, [infor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const id = localStorage.getItem("userId");
    try {
      await axios.put(`http://localhost:8000/user/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      alert("Profile updated successfully.");
    } catch (err) {
      console.error("Update error:", err.message);
      alert("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirm) return;

    const id = localStorage.getItem("userId");
    try {
      await axios.delete(`http://localhost:8000/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      localStorage.clear();
      window.location.href = "/"; // redirect to home or login
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("Failed to delete account.");
    }
  };

  if (!isLogged) return <p>Please log in to view your profile.</p>;

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>

      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>

      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>

      <label className="block mb-4">
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
      >
        Update
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete Account
      </button>
    </div>
  );
};

export default MyProfile;
