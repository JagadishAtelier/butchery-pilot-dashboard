import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/productApi";
import { uploadToCloudinary } from "../../api/imageUpload";
import { toast } from "react-hot-toast";
import ProductPhotoUpload from "./ProductPhotoUpload";
import ProductInfoStep from "./ProductInfoStep";
import ProductDetailStep from "./ProductDetailStep";
import WeightShippings from "./WeightShippings";
import ProductManagement from "./ProductManagementStep";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // ✅ State
  const [productInfo, setProductInfo] = useState({
    productId: "",
    productName: "",
    category: "",
  });
  const [productPhotos, setProductPhotos] = useState([]);
  const [productDetails, setProductDetails] = useState({
    videoUrl: "",
    description: "",
    cutType: "",
    shelfLife: "",
    storageInstructions: "",
  });
  const [weightOptions, setWeightOptions] = useState([]);
  const [productManagementData, setProductManagementData] = useState({
    sku: "",
    status: "Inactive",
  });

  // ✅ Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);

        setProductInfo({
          productId: data.productId,
          productName: data.name,
          category: data.category,
        });

        setProductPhotos(
          (data.images || []).map((url) => ({ secure_url: url }))
        );

        setProductDetails({
          videoUrl: data.productVideoUrl,
          description: data.description,
          cutType: data.cutType,
          shelfLife: data.shelfLife,
          storageInstructions: data.storageInstructions,
        });

        setWeightOptions(
          (data.weightOptions || []).map((w) => ({
            id: Date.now() + Math.random(),
            weight: w.weight,
            price: w.price,
            stock: w.stock,
          }))
        );

        setProductManagementData({
          sku: data.SKU,
          status: data.status,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [productId]);

  // ✅ Submit
  const handleSubmit = async () => {
    try {
      // Upload only new images, keep existing URLs
      const uploadedPhotoUrls = await Promise.all(
        productPhotos.map((img) =>
          img.secure_url ? img.secure_url : uploadToCloudinary(img)
        )
      );

      const payload = {
        productId: productInfo.productId,
        images: uploadedPhotoUrls,
        name: productInfo.productName,
        category: productInfo.category,
        productVideoUrl: productDetails.videoUrl,
        description: productDetails.description,
        cutType: productDetails.cutType,
        shelfLife: productDetails.shelfLife,
        storageInstructions: productDetails.storageInstructions,
        weightOptions: weightOptions.map((w) => ({
          weight: Number(w.weight),
          price: Number(w.price),
          stock: Number(w.stock || 0),
        })),
        SKU: productManagementData.sku,
        status: productManagementData.status,
      };

      await updateProduct(productId, payload);
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="p-6">
      {/* Step 1 - Photos */}
      <ProductPhotoUpload
        photos={productPhotos}
        setPhotos={setProductPhotos}
      />

      {/* Step 2 - Basic Info */}
      <ProductInfoStep data={productInfo} setData={setProductInfo} />

      {/* Step 3 - Product Details */}
      <ProductDetailStep data={productDetails} setData={setProductDetails} />

      {/* Step 4 - Weight & Pricing */}
      <WeightShippings
        weightOptions={weightOptions}
        setWeightOptions={setWeightOptions}
      />

      {/* Step 5 - SKU & Status */}
      <ProductManagement
        data={productManagementData}
        setData={setProductManagementData}
      />

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Update Product
      </button>
    </div>
  );
};

export default EditProduct;
