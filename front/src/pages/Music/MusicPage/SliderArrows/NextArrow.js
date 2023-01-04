import React from "react";
import {ArrowRightIcon} from 'evergreen-ui';

  const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowRightIcon
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default NextArrow;