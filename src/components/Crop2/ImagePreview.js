import React, { useEffect, useRef, useState } from "react";
import ImageCropper from "./ImageCropper";

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

  const handleDownloadButtonClick = () => {
    const croppedImage = croppedImages[currentImageIndex];

    if (croppedImage) {
      // Create a link element
      const downloadLink = document.createElement("a");

      // Set the href attribute with the data URL of the cropped image
      downloadLink.href = croppedImage;

      // Set the download attribute with the desired file name
      downloadLink.download = `cropped_image_${currentImageIndex}.jpg`;

      // Append the link to the body
      document.body.appendChild(downloadLink);

      // Trigger a click event on the link to initiate the download
      downloadLink.click();

      // Remove the link from the body
      document.body.removeChild(downloadLink);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      handleNextButtonClick();
    }
  };

  useEffect(() => {
    // Automatically trigger the cropping process when the current image changes
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
      <button onClick={handleNextButtonClick}>Next Image</button>
      <button>Next Image</button>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        onKeyDown={handleKeyDown}
      />
      {images.map((image, index) => (
        <div
          key={image.id}
          style={{ display: index === currentImageIndex ? "block" : "none" }}
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

      <button onClick={handleDownloadButtonClick}>
        Download Cropped Image
      </button>
    </div>
  );
};

export default CropSec;
