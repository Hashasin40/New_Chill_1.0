import React from "react";
import PropTypes from "prop-types";
import "../css/scrollbutton.css"; // optional styling

const ScrollButton = ({ direction, onClick, size = 40 }) => {
  const isLeft = direction === "left";
  const icon = isLeft 
  ? <i className="bi bi-arrow-left"></i> 
  : <i className="bi bi-arrow-right"></i>;

  return (
    <button
      onClick={onClick}
      className={`btn btn-${direction} btn-dark rounded-circle`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label={`Scroll ${direction}`}
    >
      {icon}
    </button>
  );
};

ScrollButton.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.number,
};

export default ScrollButton;
