import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Carousel from "../Components/Carousel";

function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="flex justify-around mr-8">
        <Card />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
