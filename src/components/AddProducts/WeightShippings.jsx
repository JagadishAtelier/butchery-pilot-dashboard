import { ChevronDown } from "lucide-react"; 
import React from "react";

const WeightShippings = ({
  weightOptions = [],
  setWeightOptions,
  addWeightOption: addOption,
  updateWeightOption: updateOption,
  removeWeightOption: removeOption,
}) => {

  const updateWeight = (id, field, value) => {
    if (updateOption) updateOption(id, field, value);
    else if (setWeightOptions) {
      setWeightOptions(prev => prev.map(opt => opt.id === id ? { ...opt, [field]: value } : opt));
    }
  };

  const removeWeight = (id) => {
    if (removeOption) removeOption(id);
    else if (setWeightOptions) {
      setWeightOptions(prev => prev.filter(opt => opt.id !== id));
    }
  };

  const addWeight = () => {
    if (addOption) addOption();
    else if (setWeightOptions) {
      setWeightOptions(prev => [...prev, { id: Date.now(), weight: "", price: "", discountPrice: "", stock: "" }]);
    }
  };

  const addWeightOption = () => {
    setWeightOptions(prev => [
      ...prev,
      { id: Date.now() + Math.random(), weight: "", price: "", stock: "" }
    ]);
  };

  return (
    <div className="p-5 mt-8 relative border rounded-xl bg-white mx-5">
      <h2 className="text-base font-medium border-b pb-5 flex items-center">
        <ChevronDown className="mr-2 size-4" />
        Weight Options
      </h2>

      <div className="mt-5">
        {weightOptions.map((opt) => (
          <div key={opt.id} className="flex gap-3 mb-3">
            <input
              type="number"
              placeholder="Weight (e.g. 500)"
              value={opt.weight}
              onChange={(e) => updateWeight(opt.id, "weight", e.target.value)}
              className="h-10 rounded-md border px-3 w-1/4"
            />
            <input
              type="number"
              placeholder="Selling Price"
              value={opt.price}
              onChange={(e) => updateWeight(opt.id, "price", e.target.value)}
              className="h-10 rounded-md border px-3 w-1/4"
            />
<input
  type="number"
  placeholder="Actual Price"
  value={opt.discountPrice || ""}
  onChange={(e) => updateWeight(opt.id, "discountPrice", e.target.value)}
  className="h-10 rounded-md border px-3 w-1/4"
/>

            <input
              type="number"
              placeholder="Stock"
              value={opt.stock}
              onChange={(e) => updateWeight(opt.id, "stock", e.target.value)}
              className="h-10 rounded-md border px-3 w-1/4"
            />
            <button
              type="button"
              onClick={() => removeWeight(opt.id)}
              className="px-3 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addWeight}
          className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          Add Weight Option
        </button>
      </div>
    </div>
  );
};

export default WeightShippings;
