import React from "react";
import {ArrowLeftIcon} from 'evergreen-ui';

  const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowLeftIcon
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

export default PrevArrow;