import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function AddProductPage({
  imageArray,
  setImageArray,
  handleInputChange,
  convertToImageArray,
  inputValue,
}) {
  const [allCategory, setAllCategory] = useState([]);

  // ? find all category
  const findAllCategory = () => {
    fetch(
      "https://shoppers-point-server.vercel.app/shoppersPointCategoryFindAll"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("this is replay -> ", json);
        setAllCategory(json.result);
      });
  };

  useEffect(() => {
    findAllCategory();
  }, []);

  // ? state for user input
  const [productName, setProductName] = useState("");
  // ? state for user input
  const [productCategory, setProductCategory] = useState("");
  // ? state for user input
  const [isProductOffer, setIsProductOffer] = useState(true);
  // ? state for user input
  const [productPrice, setProductPrice] = useState("");
  // ? state for user input
  const [productOffer, setProductOffer] = useState("");
  // ? state for user input
  const [isProductSize, setIsProductSize] = useState(true);
  // ? state for user input
  const [productSize, setProductSize] = useState("");
  // ? state for user input
  const [productSizeList, setProductSizeList] = useState("");
  // ? state for user input
  const [description, setDescription] = useState("");
  // ? state for user input
  const [productImage, setProductImage] = useState("");
  // ? state for user input
  const [productImageList, setProductImageList] = useState([]);

  const postSize = () => {
    setProductSize("");
    setProductSizeList([...productSizeList, productSize]);
  };
  const postImage = () => {
    setProductImage("");

    setProductImageList([...productImageList, productImage]);
  };

  const postProduct = () => {
    const postData = {
      name: productName,
      category: productCategory,
      isProductOffer: isProductOffer,
      price: productPrice,
      offer: productOffer,
      isSize: isProductSize,
      size: productSizeList,
      imageLink: productImageList,
      description: description,
    };

    console.log(postData);

    fetch("https://shoppers-point-server.vercel.app/shoppersPointPostProduct", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        findAllCategory();
        clearAllInput();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // ? re start
  const clearAllInput = () => {
    setProductName("");
    setProductCategory("");
    setIsProductOffer(true);
    setProductPrice("");
    setProductOffer("");
    setIsProductSize(true);
    setProductSize("");
    setProductSizeList("");
    setDescription("");

    setProductImage("");
    setProductImageList([]);
  };

  return (
    <div>
      <AddProductPageStyle>
        <div
          className="p-2 w-100 d-flex justify-content-center"
          style={{ backgroundColor: "ThreeDFace", fontWeight: "bold" }}
        >
          <h3>Add Product</h3>
        </div>

        <div>
          <div className=" mt-3 px-5 mx-5">
            <div className="row">
              <div className="col-4">
                <div className="p-2">Product Name : </div>

                <div className="input-group  ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="p-2">Product Category : </div>

                <div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    {allCategory &&
                      allCategory.map((dt) => (
                        <option value={dt.name}>{dt.name}</option>
                      ))}
                  </select>
                </div>

                <div className="p-2">Is Product's Offer : </div>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="OfferRadioBtn"
                      id="OfferRadioBtnYes"
                      checked
                      onClick={(e) => setIsProductOffer(true)}
                    />
                    <label
                      onClick={(e) => setIsProductOffer(true)}
                      name={true}
                      className="form-check-label"
                      for="OfferRadioBtnYes"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="OfferRadioBtn"
                      id="OfferRadioBtnNoo"
                      onClick={(e) => setIsProductOffer(false)}
                    />
                    <label
                      onClick={(e) => setIsProductOffer(false)}
                      name={false}
                      className="form-check-label"
                      for="OfferRadioBtnNoo"
                    >
                      No
                    </label>
                  </div>
                </div>

                <div className="p-2">Product Price : </div>

                <div className="input-group  ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="$65.00"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>

                {isProductOffer === true && (
                  <div>
                    <div className="p-2">Product Offer : </div>
                    <div className="input-group  ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="$50.00"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={productOffer}
                        onChange={(e) => setProductOffer(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="p-2">Is Product's Size : </div>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="productSize"
                      id="productSize1"
                      value={isProductSize}
                      onClick={(e) => setIsProductSize(true)}
                    />
                    <label
                      onClick={(e) => setIsProductSize(true)}
                      className="form-check-label"
                      for="productSize1"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="productSize"
                      id="productSize2"
                      value={isProductSize}
                      onClick={(e) => setIsProductSize(false)}
                    />
                    <label
                      onClick={(e) => setIsProductSize(false)}
                      className="form-check-label"
                      for="productSize2"
                    >
                      No
                    </label>
                  </div>
                </div>

                {isProductSize === true && (
                  <div>
                    <div className="p-2">Product's Size : </div>

                    <div className="input-group mb-3 ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Size"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={productSize}
                        onChange={(e) => setProductSize(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={() => postSize()}
                      >
                        Button
                      </button>
                    </div>

                    <div
                      className="w-100 p-2"
                      style={{
                        borderRadius: "10px",
                        border: " 2px solid blue",
                        backgroundColor: "#e3fbff",
                      }}
                    >
                      <div className="row">
                        {productSizeList &&
                          productSizeList.map((dt) => (
                            <div
                              className="col-2 p-1 m-2"
                              style={{
                                backgroundColor: "white",
                                textAlign: "center",
                              }}
                            >
                              {dt}
                              <button
                                type="button"
                                className="btn btn-danger w-100 mt-1"
                                onClick={() => {
                                  const removeSize = productSizeList.filter(
                                    (dts) => dts !== dt
                                  );

                                  setProductSizeList(removeSize);
                                }}
                              >
                                Dlt
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <div className="form-floating mt-2 pb-5">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: "100px" }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <label for="floatingTextarea2">Description</label>
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div
                  className="w-100 p-2"
                  style={{
                    borderRadius: "10px",
                    border: " 2px solid blue",
                    backgroundColor: "#e3fbff",
                  }}
                >
                  <div className="row">
                    {productImageList &&
                      productImageList.map((img) => (
                        <div className="col-4 p-2">
                          <img
                            style={{ width: "100%", borderRadius: "10px" }}
                            src={img}
                            alt="lorem pic"
                          />
                          <button
                            type="button"
                            className="btn btn-danger w-100 mt-1"
                            onClick={() => {
                              const removeImage = productImageList.filter(
                                (dt) => dt !== img
                              );

                              setProductImageList(removeImage);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="p-2">Product's Image Link : </div>

                <div className="input-group mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Link"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                  />
                  <button
                    onClick={() => postImage()}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Button
                  </button>
                </div>
              </div>
              <div className="col-3">
                <div
                  style={{
                    height: "100vh",
                    overflowY: "auto",
                    border: "none",
                    scrollbarColor: "red",
                  }}
                  className="p-3"
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => postProduct()}
                  >
                    Post Product
                  </button>
                  <div>
                    <div className="mt-2">
                      <textarea
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Paste image links here (one link per line)"
                        rows="5"
                        cols="30"
                        style={{
                          width: "100%",
                          padding: "10px",
                          boxSizing: "border-box",
                          marginBottom: "10px",
                        }}
                      />
                      <button
                        onClick={convertToImageArray}
                        style={{
                          backgroundColor: "#007bff",
                          color: "#fff",
                          padding: "10px 20px",
                          cursor: "pointer",
                          border: "none",
                          borderRadius: "5px",
                          fontSize: "16px",
                        }}
                      >
                        Convert to Array
                      </button>

                      <div className="row">
                        {imageArray &&
                          imageArray.map((image, index) => (
                            <div className="col-4 p-2">
                              <img
                                style={{ width: "100%", borderRadius: "10px" }}
                                src={image.imageUrl}
                                alt={`tt`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AddProductPageStyle>
    </div>
  );
}

const AddProductPageStyle = styled.div``;
