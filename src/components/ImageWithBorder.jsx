import React from "react";

const ImageWithBorder = ({ src, color, big }) => {
  return (
    <div
      style={{
        height: big ? "60px" : "50px",
        width: big ? "60px" : "50px",
        border: `3px solid ${color ? color : "#3377ff"}`,
        overflow: "hidden",
        borderRadius: "50%",
      }}
    >
      <img
        src={src}
        alt="avatar"
        style={{
          width: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default ImageWithBorder;
