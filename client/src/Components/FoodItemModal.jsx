const FoodItemModal = ({
  isOpen,
  onClose,
  onSave,
  foodData,
  setFoodData,
  isEditMode,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({ ...prev, [name]: value }));
  };
  return !isOpen ? null : (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Food Item" : "Create Food Item"}
        </h2>

        <input
          name="name"
          value={foodData.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="categoryName"
          value={foodData.categoryName}
          onChange={handleChange}
          placeholder="Category"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="imageUrl"
          value={foodData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="description"
          value={foodData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-4 p-2 border rounded"
        />
        {foodData.options.map((opt, index) => {
          const [label, price] = Object.entries(opt)[0];

          return (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                className="w-24"
                placeholder="Label"
                value={label}
                onChange={(e) => {
                  const updated = [...foodData.options];
                  updated[index] = { [e.target.value]: price };
                  setFoodData({ ...foodData, options: updated });
                }}
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                step="0.1"
                className="w-24"
                value={price}
                onChange={(e) => {
                  const updated = [...foodData.options];
                  updated[index] = { [label]: Number(e.target.value) };
                  setFoodData({ ...foodData, options: updated });
                }}
              />
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => {
                  const updated = foodData.options.filter(
                    (_, i) => i !== index
                  );
                  setFoodData({ ...foodData, options: updated });
                }}
              >
                Remove
              </button>
            </div>
          );
        })}

        <button
          onClick={() => {
            setFoodData({
              ...foodData,
              options: [...foodData.options, { "": 0 }],
            });
          }}
        >
          Add Option
        </button>

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
export default FoodItemModal;
