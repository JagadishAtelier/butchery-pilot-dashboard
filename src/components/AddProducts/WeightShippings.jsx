import { ChevronDown } from 'lucide-react';
import React from 'react';

const WeightShippings = ({
  onChange,
  weightShippingData,
  setWeightShippingData,
  weightOptions,
  setWeightOptions,
}) => {

  const emitChange = (updated = {}) => {
    onChange?.({
      weightShippingData,
      weightOptions,
      ...updated,
    });
  };

  // Handle Weight Option Change
  const updateWeightOption = (id, field, value) => {
    const updated = weightOptions.map((opt) =>
      opt.id === id ? { ...opt, [field]: value } : opt
    );
    setWeightOptions(updated);
    emitChange({ weightOptions: updated });
  };

  const addWeightOption = () => {
    const newOption = { id: Date.now(), weight: "", price: "", stock: "" };
    const updated = [...weightOptions, newOption];
    setWeightOptions(updated);
    emitChange({ weightOptions: updated });
  };

  const removeWeightOption = (id) => {
    const updated = weightOptions.filter((opt) => opt.id !== id);
    setWeightOptions(updated);
    emitChange({ weightOptions: updated });
  };

  // Ensure dimensions object exists
  const dimensions = weightShippingData.dimensions || {
    width: "",
    height: "",
    length: "",
  };

  return (
    <div className="p-5 mt-8 relative border rounded-xl bg-white shadow-md">
      <h2 className="text-base font-medium border-b pb-5 flex items-center">
        <ChevronDown className="mr-2 size-4" />
        Weight & Shipping
      </h2>

      {/* Weight Options */}
      <div className="mt-5">
        <div className="font-medium mb-2">Weight Options</div>
        {weightOptions.map((opt) => (
          <div key={opt.id} className="flex gap-3 mb-3">
            <input
              type="number"
              placeholder="Weight"
              value={opt.weight}
              onChange={(e) => updateWeightOption(opt.id, "weight", e.target.value)}
              className="h-10 rounded-md border px-3 w-1/4"
            />
            <input
              type="number"
              placeholder="Price"
              value={opt.price}
              onChange={(e) => updateWeightOption(opt.id, "price", e.target.value)}
              className="h-10 rounded-md border px-3 w-1/4"
            />
            <input
              type="number"
              placeholder="Stock"
              value={opt.stock}
              onChange={(e) => updateWeightOption(opt.id, "stock", e.target.value)}
              className="h-10 rounded-md border px-3 w-1/4"
            />
            <button
              type="button"
              onClick={() => removeWeightOption(opt.id)}
              className="px-3 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addWeightOption}
          className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          Add Weight Option
        </button>
      </div>

      {/* Product Weight */}
      <div className="mt-5 flex flex-col xl:flex-row gap-5">
        <div className="xl:w-64">
          <div className="font-medium">Default Product Weight</div>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-5">
          <select
            className="h-10 rounded-md border px-3"
            value={weightShippingData.weightUnit || "Gram (g)"}
            onChange={(e) =>
              setWeightShippingData((prev) => ({
                ...prev,
                weightUnit: e.target.value,
              }))
            }
          >
            <option value="Gram (g)">Gram (g)</option>
            <option value="Kilogram (kg)">Kilogram (kg)</option>
          </select>
          <input
            type="number"
            placeholder="Weight"
            value={weightShippingData.weight || ""}
            onChange={(e) =>
              setWeightShippingData((prev) => ({ ...prev, weight: e.target.value }))
            }
            className="h-10 rounded-md border px-3 col-span-3"
          />
        </div>
      </div>

      {/* Product Size */}
      <div className="mt-5 flex flex-col xl:flex-row gap-5">
        <div className="xl:w-64">
          <div className="font-medium">Product Size</div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-3 gap-5">
            {['width', 'height', 'length'].map((dim) => (
              <div className="flex" key={dim}>
                <input
                  type="number"
                  placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
                  value={dimensions[dim]}
                  onChange={(e) => {
                    const updatedDimensions = {
                      ...dimensions,
                      [dim]: e.target.value,
                    };
                    setWeightShippingData((prev) => ({
                      ...prev,
                      dimensions: updatedDimensions,
                    }));
                  }}
                  className="h-10 w-full rounded-l-md border px-3"
                />
                <span className="w-16 h-10 flex items-center justify-center bg-gray-100 border border-l-0 rounded-r-md text-sm text-gray-600">
                  {weightShippingData.dimensionsUnit || "inch"}
                </span>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              className="h-10 rounded-md border px-3"
              value={weightShippingData.dimensionsUnit || "inch"}
              onChange={(e) =>
                setWeightShippingData((prev) => ({ ...prev, dimensionsUnit: e.target.value }))
              }
            >
              <option value="inch">Inch</option>
              <option value="meter">Meter</option>
              <option value="feet">Feet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipping Insurance */}
      <div className="mt-5 flex flex-col xl:flex-row gap-5">
        <div className="xl:w-64">
          <div className="font-medium">Shipping Insurance</div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          {['required', 'optional'].map((option) => (
            <label key={option} className="flex items-start space-x-2">
              <input
                type="radio"
                name="insurance"
                value={option}
                checked={weightShippingData.insurance === option}
                onChange={() =>
                  setWeightShippingData((prev) => ({ ...prev, insurance: option }))
                }
                className="mt-1"
              />
              <span className="font-medium capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Shipping Service */}
      <div className="mt-5 flex flex-col xl:flex-row gap-5">
        <div className="xl:w-64">
          <div className="font-medium">Shipping Service</div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          {['standard', 'custom'].map((service) => (
            <label key={service} className="flex items-center space-x-2">
              <input
                type="radio"
                name="shippingService"
                value={service}
                checked={weightShippingData.shippingService === service}
                onChange={() =>
                  setWeightShippingData((prev) => ({ ...prev, shippingService: service }))
                }
              />
              <span className="capitalize font-medium">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pre-order */}
      <div className="mt-5 flex flex-col xl:flex-row gap-5">
        <div className="xl:w-64">
          <div className="font-medium">Pre-order</div>
        </div>
        <div className="flex-1 flex items-center space-x-2">
          <input
            type="checkbox"
            checked={weightShippingData.preOrder || false}
            onChange={() =>
              setWeightShippingData((prev) => ({ ...prev, preOrder: !prev.preOrder }))
            }
            className="h-5 w-5"
          />
          <label className="text-xs opacity-70">
            Activate PreOrder for longer shipping process.
          </label>
        </div>
      </div>
    </div>
  );
};

export default WeightShippings;
