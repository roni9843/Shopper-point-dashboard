import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function AddCategoryPage() {
  const [category, setCategory] = useState("");

  const [allCategory, setAllCategory] = useState([]);

  // ? submit function
  const SubmitCate = () => {
    setCategory("");

    fetch(
      "https://shoppers-point-server.vercel.app/shoppersPointCategoryPost",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: category }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        findAllCategory();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

  return (
    <AddCategoryPageStyle>
      <div
        className="p-2 w-100 d-flex justify-content-center"
        style={{ backgroundColor: "ThreeDFace", fontWeight: "bold" }}
      >
        <h3>Add Category</h3>
      </div>

      <div className=" mt-3 px-5 mx-5">
        <div className="row">
          <div className="col-3">
            <div className="p-2">Category</div>

            <div className="input-group mb-3 ">
              <input
                type="text"
                className="form-control"
                placeholder="Add Category"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <button
                onClick={() => {
                  category !== "" && SubmitCate();
                }}
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Button
              </button>
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
              {allCategory &&
                allCategory.map((dt) => (
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "white",
                      margin: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    {dt.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AddCategoryPageStyle>
  );
}

const AddCategoryPageStyle = styled.div``;
