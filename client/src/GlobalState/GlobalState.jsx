import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import UserApi from "../API/UserAPI";

export const GlobalState = createContext();
export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const refreshToken = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/user/refresh-token",
            {
              withCredentials: true,
            }
          );
          console.log("REFRESHING THE REFRESH TOKEN...");
          if (response?.data?.accesstoken) {
            setToken(response.data.accesstoken);
            localStorage.setItem("token", response.data.accesstoken); 
            console.log("Token refreshed successfully:", response.data.accesstoken);
          } else {
            console.error("Access token not found in response:", response.data);
          }
        } catch (err) {
          console.error("Error refreshing token: ", err);
        }
      };
      refreshToken();
    }
  }, []);
  const SaidData = {
    token,
    setToken: setToken,
    UserAPI: UserApi(token),
  };
  return (
    <GlobalState.Provider value={SaidData}>
      {children}
    </GlobalState.Provider>
  );
};
