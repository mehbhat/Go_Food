import React, { useContext, useEffect } from "react";
import { GlobalState } from "../GlobalState/GlobalState";
function Checkout() {
  const state = useContext(GlobalState);
  const { infor = {}, isLogged, setInfor } = state?.UserAPI || {};
  const token = state?.token;
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    country: "",
    state: "",
    city: "",
  });
  const [addresses, setAddresses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    if (isLogged) {
      setFormData({
        name: infor.name || "",
        email: infor.email || "",
        address: infor.address || "",
        phone: infor.mobile || "",
        country: infor.country || "",
        state: infor.state || "",
        city: infor.city || "",
      });
      setLoading(false);
    }
  }, [isLogged, infor]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <button className="bg-blue-500 rounded text-white p-2" onClick={() => window.history.back()}>Back</button>
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">
          Checkout
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Please provide your delivery details
        </p>

        {/* Add New Address Button */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            + Add New Address
          </button>
        </div>

        <form className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="country"
                className="mb-1 block font-medium text-gray-700"
              >
                Country
              </label>
              <select
                name="country"
                id="country"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              >
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="state"
                className="mb-1 block font-medium text-gray-700"
              >
                State
              </label>
              <select
                name="state"
                id="state"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              >
                <option value="maharashtra">Maharashtra</option>
                <option value="california">California</option>
                <option value="bengaluru">Bengaluru</option>
                <option value="london">London</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="city"
                className="mb-1 block font-medium text-gray-700"
              >
                City
              </label>
              <select
                name="city"
                id="city"
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="mumbai">Mumbai</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="london-city">London City</option>
              </select>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              id="email"
              name="email"
              required
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
            >
              Confirm Order
            </button>
          </div>
        </form>
        <div className="mt-8">
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Enter a gift card, voucher or promotional code{" "}
          </label>
          <div className="flex max-w-md items-center gap-4">
            <input
              type="text"
              id="voucher"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder=""
              required
            />
            <button
              type="button"
              className="flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
