import React from "react";
import { Link } from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  // const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/user/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <form className="max-w-sm w-full bg-white rounded-[40px] p-6 border-[5px] border-white shadow-lg">
        <h1 className="text-3xl font-extrabold  text-green-700 relative pl-8">
          Register
          <span className="absolute left-0 top-2 w-4 h-4 bg-green-700 rounded-full"></span>
          <span className="absolute left-0 top-2 w-4 h-4 bg-green-700 rounded-full animate-ping"></span>
        </h1>
        <div className="flex gap-2 mt-5">
          <input
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-yellow-300 p-4 rounded-2xl text-yellow-700 placeholder:text-yellow-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          {/* <input
            required
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full bg-white border border-yellow-300 p-4 rounded-2xl text-yellow-700 placeholder:text-yellow-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          /> */}
        </div>

        <input
          required
          type="email"
          placeholder="Email"
          className="w-full bg-white border border-yellow-300 p-4 rounded-2xl mt-4 text-yellow-700 placeholder:text-yellow-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white border border-yellow-300 p-4 rounded-2xl mt-4 text-yellow-700 placeholder:text-yellow-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />

        <input
          required
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full bg-white border border-yellow-300 p-4 rounded-2xl mt-4 text-yellow-700 placeholder:text-yellow-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />

        <input
          type="submit"
          value="Sign Up"
          onClick={handleSubmit}
          className="w-full font-bold bg-green-700 text-white py-4 mt-5 rounded-2xl shadow-md transition-transform hover:scale-105 hover:bg-green-800 active:scale-95"
        />

        <p className="text-center text-xs text-yellow-700 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
