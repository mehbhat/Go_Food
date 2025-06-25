import React from "react";

const RestaurantModal = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  isEditMode,
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">
          {!isEditMode ? "Create Restaurant" : "Update Restaurant"}
        </h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Restaurant Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          placeholder="Cuisine"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          type="number"
          min="1"
          max="5"
          step="0.1"
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;
