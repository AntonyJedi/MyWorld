import React from "react";

const Square = ({id, value, click }) => {
  return <button style={{ width: "20px", height: "20px" }} onClick={() => click(id)} className='square'>
    {value}
  </button>;
};

export default Square;