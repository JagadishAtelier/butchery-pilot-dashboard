import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/productApi";
import { uploadToCloudinary } from "../../api/imageUpload";
import { toast } from "react-hot-toast";
import ProductPhotoUpload from "./ProductPhotoUpload";
import ProductInfoStep from "./ProductInfoStep";
import ProductDetailStep from "./ProductDetailStep";
import ProductVariantStep from "./ProductVariantStep";
import ProductVariant from "./ProductVariantDetails";
import ProductManagement from "./ProductManagementStep";
import WeightShippings from "./WeightShippings";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productPhotos, setProductPhotos] = useState([]);
  const [productInfo, setProductInfo] = useState({
    productId: "",
    productName: "",
    category: "",
    subcategory: "",
  });
  const [productDetails, setProductDetails] = useState({
    condition: "",
    description: "",
    videoUrl: "",
  });
  const [weightOptions, setWeightOptions] = useState([]);
  const [variants, setVariants] = useState([]);
  const [productManagementData, setProductManagementData] = useState({
    isActive: false,
    stock: "",
    sku: "",
    price: "",
  });
  const [weightShippingData, setWeightShippingData] = useState({
    weight: "",
    weightUnit: "Gram (g)",
    dimensions: { width: "", height: "", length: "" },
    dimensionsUnit: "inch",
    insurance: "optional",
    shippingService: "standard",
    preOrder: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(productId);
        console.log("Fetched Product:", data);

        setProductPhotos((data.images || []).map((url) => ({ secure_url: url })));

        setProductInfo({
          productId: data.productId || "",
          productName: data.name || "",
          category: data.category || "",
          subcategory: data.subcategory || "",
        });

        setProductDetails({
          condition: data.condition || "",
          description: data.description || "",
          videoUrl: data.productVideoUrl || "",
        });

        setVariants(data.variants || data.variant || []);
        setWeightOptions(data.weightOptions || []);

        setProductManagementData({
          isActive: data.status === "Active",
          stock: data.stock || 0,
          sku: data.SKU || "",
          price: data.price || "",
        });

        setWeightShippingData(data.shipping || weightShippingData);

        setLoading(false);
      } catch (err) {
        console.error("Error loading product:", err);
        toast.error("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async () => {
    try {
      const imageUrls = await Promise.all(
        productPhotos.map(async (img) =>
          img.secure_url ? img : await uploadToCloudinary(img)
        )
      );

      const payload = {
        images: imageUrls.map((img) => img.secure_url || img),
        productId: productInfo.productId,
        name: productInfo.productName,
        category: productInfo.category,
        subcategory: productInfo.subcategory,
        condition: productDetails.condition,
        description: productDetails.description,
        productVideoUrl: productDetails.videoUrl,
        variants,
        weightOptions,
        status: productManagementData.isActive ? "Active" : "Inactive",
        stock: productManagementData.stock,
        SKU: productManagementData.sku,
        price: productManagementData.price,
        shipping: weightShippingData,
      };

      await updateProduct(productId, payload);
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Error updating product");
    }
  };

  if (loading) {
    return <div className="p-4">Loading product...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

      {/* Step 1: Photos */}
      <ProductPhotoUpload
        initialImages={productPhotos}
        onImagesChange={setProductPhotos}
      />

      {/* Step 2: Info */}
      <ProductInfoStep
              productId={productInfo.productId}
              setProductId={(val) =>
                handleProductInfoChange({
                  target: { name: "productId", value: val },
                })
              }
        productName={productInfo.productName}
        setProductName={(val) =>
          setProductInfo((prev) => ({ ...prev, productName: val }))
        }
        category={productInfo.category}
        setCategory={(val) =>
          setProductInfo((prev) => ({ ...prev, category: val }))
        }
        subcategory={productInfo.subcategory}
        setSubcategory={(val) =>
          setProductInfo((prev) => ({ ...prev, subcategory: val }))
        }
      />

      {/* Step 3: Details */}
      <ProductDetailStep
        description={productDetails.description}
        setDescription={(val) =>
          setProductDetails((prev) => ({ ...prev, description: val }))
        }
        onAddVideoClick={() => {
          const urlInput = document.querySelector("input[type='url']");
          if (urlInput) {
            setProductDetails((prev) => ({
              ...prev,
              videoUrl: urlInput.value,
            }));
          }
        }}
      />

      {/* Step 4: Variants */}
      <ProductVariantStep variants={variants} setVariants={setVariants} />
      <ProductVariant variantName={variants[0]?.name || ""} />

      {/* Step 5: Management */}
      <ProductManagement
        isActive={productManagementData.isActive}
        stock={productManagementData.stock}
        sku={productManagementData.sku}
        price={productManagementData.price}
      />

      {/* Step 6: Weight & Shipping */}
      <WeightShippings
        weightShippingData={weightShippingData}
        setWeightShippingData={setWeightShippingData}
        weightOptions={weightOptions}
        setWeightOptions={setWeightOptions}
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
