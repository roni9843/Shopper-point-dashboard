import JSZip from "jszip";
import React, { useEffect, useRef, useState } from "react";
import ImageCropper from "./ImageCropper";

import "./FileInput.css"; // Import the CSS file for styling

const CropSec = () => {
  const [images, setImages] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCropperRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        id: Date.now(),
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prevImages) => [...prevImages, ...newImages]);
      setCroppedImages((prevCroppedImages) => [
        ...prevCroppedImages,
        ...newImages.map(() => null),
      ]);
    }
  };

  const handleCropComplete = (croppedImage, imageId) => {
    setCroppedImages((prevCroppedImages) =>
      prevCroppedImages.map((prevCroppedImage, index) =>
        index === imageId ? croppedImage : prevCroppedImage
      )
    );
  };

  const handleNextButtonClick = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      handleNextButtonClick();
    } else if (event.key === "ArrowLeft") {
      // Navigate to the previous image
      handlePrevButtonClick();
    } else if (event.key === "d" || event.key === "D") {
      handleDownloadAllButtonClick();
    }
  };

  const handlePrevButtonClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleDownloadAllButtonClick = () => {
    const zip = new JSZip();

    // Create an array to store promises for each image
    const promises = [];

    // Iterate through croppedImages
    croppedImages.forEach((croppedImage, index) => {
      if (croppedImage) {
        // Fetch the image as a blob and add it to the zip file
        const promise = fetch(croppedImage)
          .then((response) => response.blob())
          .then((blob) => {
            zip.file(`cropped_image_${index}.jpg`, blob, { binary: true });
          });

        promises.push(promise);
      }
    });

    // Wait for all promises to resolve before generating the zip file
    Promise.all(promises).then(() => {
      // Generate the zip file
      zip.generateAsync({ type: "blob" }).then((content) => {
        // Create a download link for the zip file
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(content);
        downloadLink.download = "cropped_images_for_shoppy_point.zip";

        // Append the link to the document and trigger a click event
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove the link from the document
        document.body.removeChild(downloadLink);
      });
    });
  };

  useEffect(() => {
    const cropImage = async () => {
      if (imageCropperRef.current) {
        const croppedImage = await imageCropperRef.current.getCroppedImage();
        handleCropComplete(croppedImage, currentImageIndex);
      }
    };

    cropImage();
  }, [currentImageIndex]);

  return (
    <div>
      <div className="file-input-container">
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          multiple
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="row">
        {images.map((image, index) => (
          <div
            key={image.id}
            style={{
              display: index === currentImageIndex ? "block" : "none",
            }}
          >
            <ImageCropper
              ref={imageCropperRef}
              image={image.preview}
              onCropComplete={(croppedImage) =>
                handleCropComplete(croppedImage, index)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropSec;
