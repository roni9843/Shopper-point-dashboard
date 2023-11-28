import React, { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const [products, setProducts] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState("");

  useEffect(() => {
    // Fetch the list of products from your API
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://shoppers-point-server.vercel.app/shoppersPointFindAllProduct"
        ); // Replace with your actual API endpoint
        const data = await response.json();

        console.log(data.result);
        setProducts(data.result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Update the products list after deletion
        setProducts(products.filter((product) => product._id !== productId));
        console.log("Product deleted successfully");
      } else {
        console.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    isProductOffer: true,
    price: "",
    offer: "",
    description: "",
    isSize: true,
    size: [],
  });

  const [allCategory, setAllCategory] = useState([]);

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

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${productId}`);
      const data = await response.json();

      if (data.success) {
        const productDetails = data.product;
        setProductData({
          name: productDetails.name || "",
          category: productDetails.category || "",
          isProductOffer: productDetails.isProductOffer || true,
          price: productDetails.price || "",
          offer: productDetails.offer || "",
          description: productDetails.description || "",
          isSize: productDetails.isSize || true,
          size: productDetails.size || [],
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

  const [isUpdate, setIsUpdate] = useState(false);

  const handleUpdate = async () => {
    console.log(productData);

    try {
      const response = await fetch(
        `http://localhost:5000/update/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
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
      {" "}
      <div>
        <h1>Product List</h1>
        {products.map((product) => (
          <div key={product._id}>
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            {product.imageLink && (
              <img
                src={product.imageLink[0]}
                alt={product.name}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
            {/* Add other product details as needed */}
            <button onClick={() => handleDelete(product._id)}>Delete</button>
            <button onClick={() => handleUpdate(product._id)}>Update</button>

            <div>
              <div>
                <h2>Update Product</h2>
                <label>Product ID:</label>
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />

                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={productData.name}
                    onChange={(e) =>
                      setProductData({ ...productData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Category:</label>
                  <select
                    value={productData.category}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        category: e.target.value,
                      })
                    }
                  >
                    {allCategory.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Is Product Offer:</label>
                  <input
                    type="checkbox"
                    checked={productData.isProductOffer}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        isProductOffer: e.target.checked,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Price:</label>
                  <input
                    type="text"
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Offer:</label>
                  <input
                    type="text"
                    value={productData.offer}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        offer: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Description:</label>
                  <textarea
                    value={productData.description}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Is Product Size:</label>
                  <input
                    type="checkbox"
                    checked={productData.isSize}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        isSize: e.target.checked,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Size:</label>
                  <input
                    type="text"
                    value={productData.size}
                    onChange={(e) =>
                      setProductData({ ...productData, size: e.target.value })
                    }
                  />
                </div>

                <button onClick={handleUpdate}>Update Product</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
