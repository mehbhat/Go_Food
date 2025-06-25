import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [loggedin, setLoggedin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await axios.post(
        "http://localhost:8000/user/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      console.log("Response from server: ", token.data);
      localStorage.setItem("token", token.data.user.accesstoken);
      localStorage.setItem("userId", token.data.user._id);
      localStorage.setItem("role", token.data.user.role);
      if (!token.data.user.accesstoken) throw new Error("Invalid token");
      // localStorage.setItem("user", JSON.stringify(token.data.user));
      setLoggedin(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="max-w-[350px] bg-white rounded-[40px] p-6 border-[5px] border-white shadow-lg">
        <div className="text-center font-extrabold text-3xl text-green-700">
          Sign In
        </div>
        <form className="mt-5">
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-yellow-300 p-4 rounded-2xl mt-4 shadow-sm placeholder:text-yellow-700 text-yellow-700 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-yellow-300 p-4 rounded-2xl mt-4 shadow-sm placeholder:text-yellow-700 text-yellow-700 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <span className="block mt-2 ml-2 text-xs text-green-700">
            <Link to="#">Forgot Password?</Link>
          </span>
          <input
            type="submit"
            value="Sign In"
            onClick={handleSubmit}
            className="w-full font-bold bg-green-700 text-white py-4 mt-5 rounded-2xl shadow-md transition-transform hover:scale-105 hover:bg-green-800 active:scale-95"
          />
        </form>

        <div className="mt-6">
          <span className="block text-center text-xs text-yellow-700">
            Or Sign in with
          </span>
          <div className="w-full flex justify-center gap-4 mt-3">
            {/* Social buttons use red to stand out */}
            {[...Array(3)].map((_, i) => (
              <button
                key={i}
                className="bg-red-700 border-[5px] border-white p-2 rounded-full w-10 aspect-square grid place-content-center shadow-md transition-transform hover:scale-110 active:scale-90"
              >
                <svg
                  className="fill-white w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <span className="block text-center mt-4 text-green-700 text-[9px]">
          <Link to="#">Learn user licence agreement</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
