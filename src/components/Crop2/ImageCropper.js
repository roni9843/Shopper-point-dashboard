import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropUtils"; // Create this utility function (explained below)

const ImageCropper = ({ image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  }, []);

  const handleCropComplete = useCallback(
    async (_, croppedAreaPixels) => {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    },
    [image, onCropComplete]
  );

  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={1 / 1} // Adjust this to your desired aspect ratio
      onCropChange={onCropChange}
      onZoomChange={onZoomChange}
      onCropComplete={handleCropComplete}
    />
  );
};

export default ImageCropper;
