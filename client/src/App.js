import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// import { GlobalProvider } from "./GlobalState/GlobalState";
import MyProfile from "./Pages/MyProfile";
import Cart from './Components/Cart';
import Restaurant from "./Pages/Restaurant";
import RestaurantDetails from "./Components/RestaurantDetails";
import Checkout from "./Pages/Checkout";
import ContactUs from "./Pages/ContactUs";
import AllUser from "./Pages/AllUser";
import Offers from "./Pages/Offers";

function App() {
  return (
    // <GlobalProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/restaurants" element={<Restaurant />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/all-users" element={<AllUser />} />
            <Route path="/offers" element={<Offers />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </BrowserRouter>
    // </GlobalProvider>
  );
}

export default App;
