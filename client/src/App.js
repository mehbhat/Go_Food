import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// import { GlobalProvider } from "./GlobalState/GlobalState";
import MyProfile from "./Pages/MyProfile";
import Cart from './Components/Cart';

function App() {
  return (
    // <GlobalProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path ="/cart" element={<Cart />} />
            <Route path = "/profile" element = {<MyProfile/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    // </GlobalProvider>
  );
}

export default App;
