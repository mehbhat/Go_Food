import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../GlobalState/GlobalState"; // adjust path as needed

const UserDetails = () => {
  const state = useContext(GlobalState);
  console.log("State object:", state);
  const { infor = {}, isLogged, setInfor} = state?.UserAPI || {};
  const token = state?.token;
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (infor) {
      setFormData({
        name: infor.name,
        email: infor.email,
        mobile: infor.mobile,
        profilePic: infor.profilePic,
      });
      setLoading(false);
    }
  }, [infor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
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
  const handleUpload = async () => {
    if (!file) return;
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/upload/uploadimage",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      const updatedUser = res.data.user;
      setInfor((prev) => ({
        ...prev,
        profilePicture: updatedUser.profilePicture,
      }));
      alert("Profile picture updated successfully.");
      console.log("Upload response:", res.data);
    } catch (err) {
      console.error("Upload failed:", err.message);
    } finally {
      setUploadLoading(false);
    }
  };
  if (!isLogged) return <p>Please log in to view your profile.</p>;

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="w-24 h-24 mx-auto mb-4">
        <img
          src={infor.profilePic || "/default-avatar.png"}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
      >
        Upload
      </button>
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
            Mobile:
            <input
            type="text"
            name="mobile"
            value={formData.mobile}
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

export default UserDetails;
