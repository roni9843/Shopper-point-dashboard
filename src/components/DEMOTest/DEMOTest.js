import React from "react";
import CanvasDraw from "react-canvas-draw";

export default function DEMOTest() {
  const handleOnChange = (event) => {
    console.log("Canvas changed:", event);
  };

  return (
    <div>
      <div>
        <h1>React Canvas Draw Example</h1>
        <CanvasDraw
          onChange={handleOnChange}
          brushColor="#000000"
          brushRadius={3}
          canvasWidth={5000}
          canvasHeight={5000}
        />
      </div>
    </div>
  );
}
