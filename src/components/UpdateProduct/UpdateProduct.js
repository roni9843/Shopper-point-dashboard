import React, { useEffect, useState } from "react";

export default function UpdateProduct() {
  const [productId, setProductId] = useState(""); // Assume you have a way to get the product ID
  const [updateData, setUpdateData] = useState({
    name: "",
    category: "",
    isProductOffer: true,
    price: "",
    offer: "",
    description: "",
    isSize: true,
    size: [],
    imageLink: [],
  });

  const [allCategory, setAllCategory] = useState([]);

  // Fetch all categories
  const fetchAllCategory = async () => {
    try {
      const response = await fetch(
        "https://shoppers-point-server.vercel.app/shoppersPointCategoryFindAll"
      );
      const data = await response.json();

      if (data.result) {
        setAllCategory(data.result);
      } else {
        console.error("Error fetching categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch product details by ID
  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://your-backend-url/get-product/${productId}`
      );
      const data = await response.json();

      if (data.success) {
        const productDetails = data.product;
        setUpdateData({
          name: productDetails.name || "",
          category: productDetails.category || "",
          isProductOffer: productDetails.isProductOffer || true,
          price: productDetails.price || "",
          offer: productDetails.offer || "",
          description: productDetails.description || "",
          isSize: productDetails.isSize || true,
          size: productDetails.size || [],
          imageLink: productDetails.imageLink || [],
        });
      } else {
        console.error("Error fetching product details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchAllCategory();
    // Assuming productId is available in the component's state or props
    fetchProductDetails();
  }, [productId]); // Fetch details whenever productId changes

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://your-backend-url/update-product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Product updated successfully:", data.product);
        // Handle success (e.g., show a success message, redirect, etc.)
      } else {
        console.error("Error updating product:", data.message);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <div>
        <label>Name :</label>
        <input
          type="text"
          value={updateData.name}
          onChange={(e) =>
            setUpdateData({ ...updateData, name: e.target.value })
          }
        />
      </div>

      <div>
        <label>Category : </label>
        <select
          value={updateData.category}
          onChange={(e) =>
            setUpdateData({ ...updateData, category: e.target.value })
          }
        >
          {allCategory.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
