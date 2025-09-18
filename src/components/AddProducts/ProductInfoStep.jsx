import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getAllCategories } from "../../api/categoryApi";
import CreateCategoryModal from "../molecules/CreateCategoryModal";

const ProductInfoStep = ({
  productId,
  setProductId, 
  productName,
  setProductName,
  category,
  setCategory,
  subcategory,
  setSubcategory,
}) => {
  const [categories, setCategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

// When category changes → update subcategories list
useEffect(() => {
  const selected = categories.find((cat) => cat._id === category);
  setFilteredSubcategories(selected?.subcategories || []);

  // reset invalid subcategory if user changed category
  if (selected && subcategory && !selected.subcategories.some(sub => sub._id === subcategory)) {
    setSubcategory("");
  }
}, [category, categories]);

  
  useEffect(() => {
    console.log("Selected subcategory:", subcategory);
  }, [subcategory]);
  

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "add-new") {
      setShowCreateModal(true);
    } else {
      setCategory(value);
    }
  };

  const handleCreateCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
    setCategory(newCategory._id);
    setShowCreateModal(false);
  };

  return (
    <div className="relative p-5 mt-8">
      <div className="rounded-lg border p-5 relative z-10 bg-white">

        {/* Product ID */}
<div className="flex flex-col xl:flex-row items-start mb-6">
  <div className="w-full xl:w-64 xl:mr-10">
    <label htmlFor="productId" className="font-medium flex items-center">
      Product ID
      <span className="ml-3 text-xs text-red-600 border px-2 py-0.5 rounded bg-red-50 border-red-200">
        Required
      </span>
    </label>
  </div>
  <div className="flex-1 w-full">
    <input
      id="productId"
      type="text"
      placeholder="Enter unique product ID"
      value={productId}
      onChange={(e) => setProductId(e.target.value)}
      className="h-10 w-full rounded-md border px-3 py-2"
    />
  </div>
</div>

        {/* Product Name */}
        <div className="flex flex-col xl:flex-row items-start mb-6">
          <div className="w-full xl:w-64 xl:mr-10">
            <label htmlFor="productName" className="font-medium flex items-center">
              Product Name
              <span className="ml-3 text-xs text-red-600 border px-2 py-0.5 rounded bg-red-50 border-red-200">
                Required
              </span>
            </label>
          </div>
          <div className="flex-1 w-full">
            <input
              id="productName"
              type="text"
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="h-10 w-full rounded-md border px-3 py-2"
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col xl:flex-row items-start mb-6">
          <div className="w-full xl:w-64 xl:mr-10">
            <label htmlFor="category" className="font-medium flex items-center">
              Category
              <span className="ml-3 text-xs text-red-600 border px-2 py-0.5 rounded bg-red-50 border-red-200">
                Required
              </span>
            </label>
          </div>
          <div className="flex-1 w-full relative">
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="h-10 w-full rounded-md border px-3 py-2 pr-8"
            >
              <option value="">Select a Category</option>
              <option value="add-new" className="bg-green-100 font-medium">
                + Add New Category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {/* <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" /> */}
          </div>
        </div>

        {/* Subcategory */}
{/* Subcategory */}
{filteredSubcategories?.length > 0 && (
  <div className="flex flex-col xl:flex-row items-start mb-6">
    <div className="w-full xl:w-64 xl:mr-10">
      <label htmlFor="subcategory" className="font-medium">
        Subcategory
      </label>
    </div>
    <div className="flex-1 w-full relative">
    <select
  id="subcategory"
  value={subcategory || ""}   // ensure it's always a string
  onChange={(e) => setSubcategory(e.target.value)} // always string
  className="h-10 w-full rounded-md border px-3 py-2 pr-8"
>
  <option value="">Select a Subcategory</option>
  {filteredSubcategories.map((sub) => (
    <option key={sub._id} value={sub._id.toString()}>
      {sub.name}
    </option>
  ))}
</select>


    </div>
  </div>
)}

      </div>

      {/* Create Category Modal */}
      <CreateCategoryModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateCategory}
      />
    </div>
  );
};

export default ProductInfoStep;
