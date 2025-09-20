import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { uploadToCloudinary } from "../../api/imageUpload.js";
import { createProduct } from "../../api/productApi.js";

import ProductPhotoUpload from "./ProductPhotoUpload";
import ProductInfoStep from "./ProductInfoStep";
import ProductDetailStep from "./ProductDetailStep";
import ProductManagement from "./ProductManagementStep.jsx";
import WeightShippings from "./WeightShippings.jsx";

const steps = [
  "Product Photo",
  "Product Info",
  "Product Details",
  "Product Management",
  "Weight & Shipping",
];

const ProductFormModal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // Form States
  const [productPhotos, setProductPhotos] = useState([]);
  const [productInfo, setProductInfo] = useState({
    productId:"", // auto generate
    productName: "",
    category: "",
  });
  const [productDetails, setProductDetails] = useState({
    description: "",
    videoUrl: "",
    cutType:[],
    shelfLife: "",
    storageInstructions: "",
  });
  const [weightOptions, setWeightOptions] = useState([
    { id: Date.now(), weight: "", price: "", stock: "" },
  ]);
  const [productManagementData, setProductManagementData] = useState({
    isActive: false,
    sku: "",
  });
  const [weightShippingData, setWeightShippingData] = useState({
    unit: "kg",
    dimensions: { width: "", height: "", length: "" },
    weight: "",
  });

  // Handlers
  const handleProductPhotosChange = (images) => setProductPhotos(images);
  const handleProductInfoChange = ({ target: { name, value } }) =>
    setProductInfo((prev) => ({ ...prev, [name]: value }));

  const handleProductDetailChange = ({ target: { name, value } }) =>
    setProductDetails((prev) => ({ ...prev, [name]: value }));

  const handleProductManagementChange = (data) =>
    setProductManagementData(data);

  const addWeightOption = () =>
    setWeightOptions([...weightOptions, { id: Date.now(), weight: "", price: "", stock: "" }]);

  const updateWeightOption = (id, field, value) =>
    setWeightOptions(weightOptions.map((opt) =>
      opt.id === id ? { ...opt, [field]: value } : opt
    ));

  const removeWeightOption = (id) =>
    setWeightOptions(weightOptions.filter((opt) => opt.id !== id));

  // Step Navigation
  const nextStep = () => {
    if (currentStep === 0 && !productPhotos?.length) {
      toast.error("Upload at least one product photo.");
      return;
    }
    if (currentStep === 1 && (!productInfo.productName || !productInfo.category)) {
      toast.error("Product name and category are required.");
      return;
    }
    if (currentStep === 2 && !productDetails.description) {
      toast.error("Description is required.");
      return;
    }
    if (currentStep === 3 && !productManagementData.sku) {
      toast.error("SKU is required.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // Final Submit
  const handleSubmit = async () => {
    try {
      const uploadedPhotoUrls = await Promise.all(
        productPhotos.map((file) => uploadToCloudinary(file))
      );

      const finalData = {
        productId: productInfo.productId,
        images: uploadedPhotoUrls,
        name: productInfo.productName,
        category: productInfo.category,
        productVideoUrl: productDetails.videoUrl,
        description: productDetails.description,
        cutType: Array.isArray(productDetails.cutType) ? productDetails.cutType : [], // ✅ force array
        shelfLife: productDetails.shelfLife,
        storageInstructions: productDetails.storageInstructions,
        unit: weightShippingData.unit,
        weightOptions: weightOptions.map((w) => ({
          weight: Number(w.weight),
          price: Number(w.price),
          stock: Number(w.stock || 0),
        })),
        SKU: productManagementData.sku,
        status: productManagementData.isActive ? "Active" : "Inactive",
      };

      const response = await createProduct(finalData);
      toast.success("Product created successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to submit product. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>

      <div className="mb-6 text-center font-medium text-indigo-700">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
      </div>

      {currentStep === 0 && <ProductPhotoUpload onImagesChange={handleProductPhotosChange} />}
      {currentStep === 1 && (
  <ProductInfoStep
    productId={productInfo.productId}
    setProductId={(val) =>
      setProductInfo((prev) => ({ ...prev, productId: val }))
    }
    productName={productInfo.productName}
    setProductName={(val) =>
      setProductInfo((prev) => ({ ...prev, productName: val }))
    }
    category={productInfo.category}
    setCategory={(val) =>
      setProductInfo((prev) => ({ ...prev, category: val }))
    }
  />
)}

      {currentStep === 2 && (
// Only key changes shown for cutType & submit
<ProductDetailStep
  description={productDetails.description}
  setDescription={(val) =>
    setProductDetails((prev) => ({ ...prev, description: val }))
  }
  videoUrl={productDetails.videoUrl}
  setVideoUrl={(val) =>
    setProductDetails((prev) => ({ ...prev, videoUrl: val }))
  }
  cutType={productDetails.cutType}
  setCutType={(val) =>
    setProductDetails((prev) => ({
      ...prev,
      cutType: Array.isArray(val) ? val : [],
    }))
  }
  shelfLife={productDetails.shelfLife}
  setShelfLife={(val) =>
    setProductDetails((prev) => ({ ...prev, shelfLife: val }))
  }
  storageInstructions={productDetails.storageInstructions}
  setStorageInstructions={(val) =>
    setProductDetails((prev) => ({ ...prev, storageInstructions: val }))
  }
/>

      )}
      {currentStep === 3 && (
        <ProductManagement onChange={handleProductManagementChange} />
      )}
{currentStep === 4 && (
  <WeightShippings
    weightOptions={weightOptions}
    addWeightOption={addWeightOption}
    updateWeightOption={updateWeightOption}
    removeWeightOption={removeWeightOption}
  />
)}


      <div className="flex justify-between mt-10 p-4 border-t border-gray-200">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg font-semibold ${
            currentStep === 0
              ? "bg-gray-200 text-gray-500"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          Back
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="px-6 py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700"
          >
            Submit Product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductFormModal;
