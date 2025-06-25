// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { GlobalState } from "../GlobalState/GlobalState";
// import { renderMatches } from "react-router-dom";
import UserDetails from "../Components/UserDetails";
import MyFavorites from "../Components/MyFavorites";

const MyProfile = () => {
//   const state = useContext(GlobalState);
//   const { infor, setInfor } = state?.UserAPI;
//   const [file, setFile] = useState(null);
//   const [uploadLoading, setUploadLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!file) return;
//     setUploadLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/upload/uploadimage",
//         formData,
//         {
//           headers: {
//             "content-type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           withCredentials: true,
//         }
//       );

//       const updatedUser = res.data.user;
//       setInfor((prev) => ({
//         ...prev,
//         profilePicture: updatedUser.profilePicture,
//       }));
//       alert("Profile picture updated successfully.");
//       console.log("Upload response:", res.data);
//     } catch (err) {
//       console.error("Upload failed:", err.message);
//     } finally {
//       setUploadLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto text-center p-4">
//       <h2 className="text-xl font-bold mb-4">User Profile</h2>

//       <div className="w-24 h-24 mx-auto mb-4">
//         <img
//           src={infor.profilePic || "/default-avatar.png"}
//           alt="Profile"
//           className="w-full h-full rounded-full object-cover"
//         />
//       </div>

//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <button
//         onClick={handleUpload}
//         className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
//       >
//         Upload
//       </button>
//       <div className="mt-4">
//         <p className="text-lg font-semibold">Name: {infor.name}</p>
//         <p className="text-lg font-semibold">Email: {infor.email}</p>
//         <p className="text-lg font-semibold">Address: {infor.address}</p>
//         <p className="text-lg font-semibold">Role: {infor.role}</p>
//       </div>
//       {/* Render image */}
//       <div className="mt-4">
//         {uploadLoading ? <p>Uploading...</p> : (
//           <img
//             src={`${infor.profilePic || "/default-avatar.png"}?${Date.now()}`}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover"
//           />
//         )}
//       </div>
//     </div>
//   );
   return(
    <div>
      <button className=" mt-4 bg-blue-500 text-white px-4 py-2 rounded mb-8" onClick={() => window.history.back()}> Go Back</button>
      <h1 className="text-3xl font-bold text-center my-8">My Profile</h1>
      <UserDetails/>
      <MyFavorites/>
    </div>
   )

};

export default MyProfile;
