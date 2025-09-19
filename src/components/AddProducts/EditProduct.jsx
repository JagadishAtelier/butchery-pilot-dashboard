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
  const [productInfo, setProductInfo] = useState({ productId: "", productName: "", category: "" });
  const [productDetails, setProductDetails] = useState({ condition: "", description: "", videoUrl: "", cutType: "", shelfLife: "", storageInstructions: "", certifications: [] });
  const [variants, setVariants] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);
  const [productManagementData, setProductManagementData] = useState({ isActive: false, stock: "", sku: "", price: "" });
  const [weightShippingData, setWeightShippingData] = useState({ weight: "", weightUnit: "Gram (g)", dimensions: { width: "", height: "", length: "" }, dimensionsUnit: "inch", insurance: "optional", shippingService: "standard", preOrder: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(productId);

        setProductPhotos((data.images || []).map((url) => ({ secure_url: url })));

        setProductInfo({
          productId: data.productId || "",
          productName: data.name || "",
          category: data.category || "",
        });

        setProductDetails({
          condition: data.condition || "",
          description: data.description || "",
          videoUrl: data.productVideoUrl || "",
          cutType: data.cutType || "",
          shelfLife: data.shelfLife || "",
          storageInstructions: data.storageInstructions || "",
          certifications: data.certifications || [],
        });

        // Convert flattened variant list into structured variants for UI
        const groupedVariants = (data.variant || []).reduce((acc, v) => {
          let found = acc.find((item) => item.name === v.name);
          if (found) found.options.push({ id: Date.now() + Math.random(), value: v.value });
          else acc.push({ id: Date.now() + Math.random(), name: v.name, options: [{ id: Date.now() + Math.random(), value: v.value }] });
          return acc;
        }, []);
        setVariants(groupedVariants);

        setWeightOptions((data.weightOptions || []).map((w) => ({ id: Date.now() + Math.random(), weight: w.weight, price: w.price, stock: w.stock })));

        setProductManagementData({
          isActive: data.status === "Active",
          sku: data.SKU || "",
          stock: data.stock || 0,
          price: data.price || 0,
        });

        setWeightShippingData({
          weight: data.shipping?.weight || "",
          weightUnit: "Gram (g)",
          dimensions: {
            width: data.shipping?.size?.width || "",
            height: data.shipping?.size?.height || "",
            length: data.shipping?.size?.length || "",
          },
          dimensionsUnit: data.shipping?.size?.unit || "inch",
          insurance: "optional",
          shippingService: "standard",
          preOrder: false,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async () => {
    try {
      const uploadedPhotoUrls = await Promise.all(
        productPhotos.map((img) => (img.secure_url ? img.secure_url : uploadToCloudinary(img)))
      );

      const flattenedVariants = variants.flatMap((v) => v.options.map((opt) => ({ name: v.name, value: opt.value })));

      const payload = {
        productId: productInfo.productId,
        images: uploadedPhotoUrls,
        name: productInfo.productName,
        category: productInfo.category,
        condition: productDetails.condition,
        description: productDetails.description,
        productVideoUrl: productDetails.videoUrl,
        cutType: productDetails.cutType,
        shelfLife: productDetails.shelfLife,
        storageInstructions: productDetails.storageInstructions,
        certifications: productDetails.certifications,
        variant: flattenedVariants,
        unit: weightShippingData.unit || "kg",
        weightOptions: weightOptions.map((w) => ({ weight: Number(w.weight), price: Number(w.price), stock: Number(w.stock || 0) })),
        shipping: {
          weight: Number(weightShippingData.weight),
          size: {
            width: Number(weightShippingData.dimensions.width),
            height: Number(weightShippingData.dimensions.height),
            length: Number(weightShippingData.dimensions.length),
            unit: weightShippingData.dimensionsUnit || "inch",
          },
        },
        SKU: productManagementData.sku,
        status: productManagementData.isActive ? "Active" : "Inactive",
        stock: productManagementData.stock,
        price: productManagementData.price,
      };

      await updateProduct(productId, payload);
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  if (loading) return <div className="p-4">Loading product...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

      {/* Photos */}
      <ProductPhotoUpload initialImages={productPhotos} onImagesChange={setProductPhotos} />

      {/* Info */}
      <ProductInfoStep
        productId={productInfo.productId}
        setProductId={(val) => setProductInfo((prev) => ({ ...prev, productId: val }))}
        productName={productInfo.productName}
        setProductName={(val) => setProductInfo((prev) => ({ ...prev, productName: val }))}
        category={productInfo.category}
        setCategory={(val) => setProductInfo((prev) => ({ ...prev, category: val }))}
      />

      {/* Details */}
      <ProductDetailStep
        description={productDetails.description}
        setDescription={(val) => setProductDetails((prev) => ({ ...prev, description: val }))}
        cutType={productDetails.cutType}
        setCutType={(val) => setProductDetails((prev) => ({ ...prev, cutType: val }))}
        shelfLife={productDetails.shelfLife}
        setShelfLife={(val) => setProductDetails((prev) => ({ ...prev, shelfLife: val }))}
        storageInstructions={productDetails.storageInstructions}
        setStorageInstructions={(val) => setProductDetails((prev) => ({ ...prev, storageInstructions: val }))}
        videoUrl={productDetails.videoUrl}
        setVideoUrl={(val) => setProductDetails((prev) => ({ ...prev, videoUrl: val }))}
        certifications={productDetails.certifications}
        addCertification={(cert) => setProductDetails((prev) => ({ ...prev, certifications: [...prev.certifications, cert] }))}
        removeCertification={(cert) => setProductDetails((prev) => ({ ...prev, certifications: prev.certifications.filter((c) => c !== cert) }))}
      />

      {/* Variants */}
      <ProductVariantStep variants={variants} setVariants={setVariants} />
      {variants.map((variant) => (
        <ProductVariant
          key={variant.id}
          variantName={variant.name}
          options={variant.options}
          onNameChange={(val) => setVariants((prev) => prev.map((v) => (v.id === variant.id ? { ...v, name: val } : v)))}
          onOptionsChange={(opts) => setVariants((prev) => prev.map((v) => (v.id === variant.id ? { ...v, options: opts } : v)))}
        />
      ))}

      {/* Management */}
      <ProductManagement
        isActive={productManagementData.isActive}
        stock={productManagementData.stock}
        sku={productManagementData.sku}
        price={productManagementData.price}
        onChange={(data) => setProductManagementData(data)}
      />

      {/* Weight & Shipping */}
      <WeightShippings
        weightShippingData={weightShippingData}
        setWeightShippingData={setWeightShippingData}
        weightOptions={weightOptions}
        setWeightOptions={setWeightOptions}
      />

      <div className="mt-6 flex justify-end">
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
