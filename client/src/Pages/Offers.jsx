import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState/GlobalState";
import OfferModal from "../Components/OfferModal";

const Offers = () => {
  const { getOffers, createOffer, updateOffer, deleteOffer } =
    useContext(GlobalState)?.OffersAPI;
  const {restaurants} = useContext(GlobalState)?.RestaurantsAPI
  const [offers, setOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discountPercentage: 0,
    validFrom: "",
    validTo: "",
    restaurant: "",
    description: "",
  });
  // const [restaurants, setRestaurants] = useState([]);
 useEffect(() => {
    (async () => {
      try {
        const data = await getOffers();
        setOffers(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getOffers]);

  const openNew = () => {
    setFormData({
      code: "",
      discountPercentage: 0,
      validFrom: "",
      validTo: "",
      restaurant: "",
      description: "",
    });
    setIsEditMode(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleUpdate = (offer, e) => {
    e.stopPropagation();
    setFormData({
      code: offer.code,
      discountPercentage: offer.discountPercentage,
      validFrom: offer.validFrom.split("T")[0],
      validTo: offer.validTo.split("T")[0],
      restaurant: offer.restaurant._id ?? offer.restaurant,
      description: offer.description,
    });
    setEditingId(offer._id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
  try {
    // 👇 ADD THIS HERE
    console.log("Payload:", formData);

    const payload = {
      ...formData,
      discountPercentage: Number(formData.discountPercentage),
    };
    console.log("Payload Again:", payload);
    if (isEditMode) {
      const updated = await updateOffer(editingId, payload);
      setOffers((prev) =>
        prev.map((o) => (o._id === editingId ? updated : o))
      );
    } else {
      const created = await createOffer(payload);
      setOffers((prev) => [...prev, created]);
    }
    setIsModalOpen(false);
  } catch (e) {
    console.error(e);
  }
};


  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteOffer(id);
      setOffers((prev) => prev.filter((o) => o._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold">Special Offers</h1>
        <button
          onClick={openNew}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Offer
        </button>
      </div>

      <OfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEditMode={isEditMode}
        restaurants={restaurants}
      />

      <ul>
        {offers.map((o) => (
          <li
            key={o._id}
            className="border p-4 my-2 rounded hover:bg-gray-50 cursor-pointer"
          >
            <div className="grid grid-cols-3 gap-4">
              <span>{o?.code}</span>
              <span>{o.discountPercentage}%</span>
              <span>
                {new Date(o.validFrom).toLocaleDateString()} -{" "}
                {new Date(o.validTo).toLocaleDateString()}
              </span>
            </div>
            <p>{o.restaurant.name || o.restaurant}</p>
            <p>{o.description}</p>
            <button
              onClick={(e) => handleDelete(o._id, e)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={(e) => handleUpdate(o, e)}
              className=" ml-4 mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Offers;
