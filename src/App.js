import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { styled } from "styled-components";
import "./App.css";
import AddCategoryPage from "./components/AddCategoryPage/AddCategoryPage";
import AddProductPage from "./components/AddProductPage/AddProductPage";
import HackerStyleApp from "./components/Crop2/CropSec";
import DeleteProductPage from "./components/DeleteProductPage/DeleteProductPage";

function App() {
  const [option, setOption] = useState("category");

  const [inputValue, setInputValue] = useState("");
  const [imageArray, setImageArray] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const convertToImageArray = () => {
    console.log("clicked ", inputValue);
    // Split the input value by line breaks or any other delimiter that you expect.
    const links = inputValue.split("\n"); // Change the delimiter if needed.

    // Create an array of objects from the image links.
    const newArray = links.map((link) => {
      return { imageUrl: link };
    });

    setImageArray(newArray);
  };

  return (
    <div className="App">
      <AppStyle>
        <div className="d-flex justify-content-center mt-5">
          <div
            className="btn-group btn-group-lg"
            role="group"
            aria-label="Large button group"
          >
            <button
              onClick={() => setOption("category")}
              type="button"
              className="btn btn-outline-primary"
            >
              Add Category
            </button>
            <button
              onClick={() => setOption("product")}
              type="button"
              className="btn btn-outline-primary"
            >
              Add Product
            </button>

            <button
              onClick={() => setOption("crop")}
              type="button"
              className="btn btn-outline-primary"
            >
              Crop
            </button>

            <button
              onClick={() => setOption("delete")}
              type="button"
              className="btn btn-outline-primary"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div>
            {option === "category" && <AddCategoryPage></AddCategoryPage>}
            {option === "crop" && <HackerStyleApp></HackerStyleApp>}
            {option === "delete" && <DeleteProductPage></DeleteProductPage>}
            {
              // option === "update" && <UpdateProduct></UpdateProduct>
            }
            {
              // option === "game" && <HackerStyleApp></HackerStyleApp>
            }
            {
              //option === "game2" && <DEMOTest></DEMOTest>
            }

            {option === "product" && (
              <AddProductPage
                inputValue={inputValue}
                imageArray={imageArray}
                setImageArray={setImageArray}
                handleInputChange={handleInputChange}
                convertToImageArray={convertToImageArray}
              ></AddProductPage>
            )}
          </div>
        </div>
      </AppStyle>
    </div>
  );
}

const AppStyle = styled.div``;

export default App;
