import axios from "axios";
function OffersAPI(token) {

 const createOffer = async (offerData) => {
  try {
    const response = await axios.post("http://localhost:8000/offers", offerData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data; 
  } catch (err) {
    console.error("Error creating offer:", err);
    throw err;
  }
};

const updateOffer = async (id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:8000/offers/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.offers;
  } catch (err) {
    console.error("Error updating offer:", err);
    throw err;
  }
};

const deleteOffer = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/offers/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (err) {
    console.error("Error deleting offer:", err);
    throw err;
  }
};

  const getOffers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/offers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.offers;
    } catch (error) {
      console.error("Error fetching offers:", error);
      throw error;
    }
  };

  return {
    getOffers,
    createOffer,
    deleteOffer,
    updateOffer,
  };
}
export default OffersAPI;
