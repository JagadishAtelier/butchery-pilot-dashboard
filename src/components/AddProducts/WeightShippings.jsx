import { ChevronDown } from "lucide-react";
import React from "react";

const WeightShippings = ({
  weightOptions = [],
  addWeightOption,
  updateWeightOption,
  removeWeightOption,
}) => {
  return (
    <div className="p-5 mt-8 relative border rounded-xl bg-white shadow-md">
      <h2 className="text-base font-medium border-b pb-5 flex items-center">
        <ChevronDown className="mr-2 size-4" />
        Weight Options
      </h2>

      {/* Weight Options */}
      <div className="mt-5">
        {weightOptions.map((opt) => (
          <div key={opt.id} className="flex gap-3 mb-3">
            <input
              type="number"
              placeholder="Weight (e.g. 500)"
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
    </div>
  );
};

export default WeightShippings;
