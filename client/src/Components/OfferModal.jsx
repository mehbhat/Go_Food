import React from "react";

const OfferModal = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  isEditMode,
  restaurants
}) => {
  console.log("rest dta",restaurants);
  
  if (!isOpen) return null;
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Offer" : "Create Offer"}
        </h2>
        {/* {["code","discountPercentage","validFrom","validTo","restaurant","description"].map((field) => (
          <input
            key={field}
            name={field}
            type={field.includes("Percentage") ? "number" : field.includes("From") || field.includes("To") ? "date" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
        ))} */}
        <input
          name="code"
          type="text"
          placeholder="code"
          value={formData.code}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="discountPercentage"
          type="number"
          placeholder="discountPercentage"
          value={formData.discountPercentage}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="validFrom"
          type="date"
          placeholder="validFrom"
          value={formData.validFrom}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="validTo"
          type="date"
          placeholder="validTo"
          value={formData.validTo}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="description"
          type="text"
          placeholder="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <select
          name="restaurant"
          value={formData.restaurant}
          onChange={(e) =>
            setFormData({ ...formData, restaurant: e.target.value })
          }
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="">Select a restaurant</option>
          {restaurants?.data?.map((r) => (
            <option key={r._id} value={r._id}>
                 {r.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
