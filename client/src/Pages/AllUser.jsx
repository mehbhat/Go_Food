import React, { useContext, useEffect } from "react";
import { GlobalState } from "../GlobalState/GlobalState";
import axios from "axios";
const AllUser = () => {
  const state = useContext(GlobalState);
  const { users, loading } = state?.UserAPI || {};
  const { getUsers } = state?.UserAPI || {};
  const token = state?.token || "";
  const isAdmin = state?.UserAPI?.isAdmin || false;
  console.log("Users:", users);
  useEffect(() => {
    if (token) {
      getUsers();
    }
  }, [token]);
  const handleDeleteUser = async (userId) => {
    if (!isAdmin) {
      console.error("You are not authorized to delete users.");
      return;
    }
    try {
      await axios.delete(`http://localhost:8000/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      getUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error.message);
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
      {loading && <p>Loading...</p>}
      {isAdmin ? (
        <ul className="">
          <li className="font-bold text-lg mb-4">User List</li>
          {users.map((user) => (
            <li key={user._id} className="mx-4 flex justify-between border-2  p-8 cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.role}</p>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not authorized to view this content.</p>
      )}
    </div>
  );
};

export default AllUser;
