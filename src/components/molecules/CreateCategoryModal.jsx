import { useState, useRef } from "react";
import { uploadToCloudinary } from "../../api/imageUpload";

export default function CreateCategoryModal({ open, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    subcategories: [],
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Subcategory states
  const [subForm, setSubForm] = useState({
    name: "",
    description: "",
    file: null,
    image: "",
  });
  const [subPreview, setSubPreview] = useState(null);
  const subFileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  // handle main category form
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle subcategory form
  const handleSubChange = (e) => {
    setSubForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // File Handling (category + subcategory)
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0], "category");
  };

  const handleFileSelect = (e) => {
    handleFile(e.target.files[0], "category");
  };

  const handleSubFileSelect = (e) => {
    handleFile(e.target.files[0], "subcategory");
  };

  const handleFile = (file, type) => {
    if (file && file.type.startsWith("image/")) {
      if (type === "category") {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      } else {
        setSubForm((prev) => ({ ...prev, file }));
        setSubPreview(URL.createObjectURL(file));
      }
    }
  };

  // Add subcategory to list
  const handleAddSubcategory = async () => {
    if (!subForm.name.trim()) {
      alert("Subcategory name is required");
      return;
    }

    let subImageUrl = subForm.image;
    if (subForm.file) {
      subImageUrl = await uploadToCloudinary(subForm.file);
    }

    const newSub = {
      name: subForm.name,
      description: subForm.description,
      image: subImageUrl,
    };

    // ✅ Always use functional update
    setFormData((prev) => ({
      ...prev,
      subcategories: [...prev.subcategories, newSub],
    }));

    // reset sub form
    setSubForm({ name: "", description: "", file: null, image: "" });
    setSubPreview(null);
  };

  // Submit full category with subcategories
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.image;

      if (selectedFile) {
        imageUrl = await uploadToCloudinary(selectedFile);
      }

      await onCreate({
        ...formData,
        image: imageUrl,
      });

      // reset form
      setFormData({ name: "", description: "", image: "", subcategories: [] });
      setSelectedFile(null);
      setPreview(null);
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

        {/* Category Fields */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full p-2 mb-3 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-3 border rounded"
        />

        {/* Category Image */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current.click()}
          className="w-full h-40 border-2 border-dashed rounded flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 cursor-pointer mb-4"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="h-full object-contain" />
          ) : (
            <p>Drag & drop category image, or click to upload</p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Subcategory Section */}
        <h3 className="text-lg font-medium mb-2">Add Subcategories</h3>
        <input
          type="text"
          name="name"
          value={subForm.name}
          onChange={handleSubChange}
          placeholder="Subcategory Name"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="description"
          value={subForm.description}
          onChange={handleSubChange}
          placeholder="Subcategory Description"
          className="w-full p-2 mb-2 border rounded"
        />
        <div
          onClick={() => subFileInputRef.current.click()}
          className="w-full h-32 border-2 border-dashed rounded flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 cursor-pointer mb-2"
        >
          {subPreview ? (
            <img src={subPreview} alt="Sub Preview" className="h-full object-contain" />
          ) : (
            <p>Click to upload subcategory image</p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={subFileInputRef}
            onChange={handleSubFileSelect}
            className="hidden"
          />
        </div>
        <button
          onClick={handleAddSubcategory}
          className="px-3 py-2 bg-blue-600 text-white rounded mb-4 hover:bg-blue-700"
        >
          Add Subcategory
        </button>

        {/* Preview Added Subcategories */}
        {formData.subcategories.length > 0 && (
          <ul className="mb-4">
            {formData.subcategories.map((sub, i) => (
              <li
                key={i}
                className="flex items-center gap-2 border p-2 mb-2 rounded"
              >
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-sm text-gray-600">{sub.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
