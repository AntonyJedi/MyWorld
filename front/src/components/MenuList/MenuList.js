import React from 'react'
import { Button, Popover, Menu, Position } from "evergreen-ui";

const MenuList = ({ interests, buttonText, className }) => {
  return (
    <div className={className}>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <ul className='menuList'>
              {interests.map((one, index) => <li key={index}>{one}</li>)}
            </ul>
          </Menu>
        }
      >
        <Button>{buttonText}</Button>
      </Popover>
    </div>
  )
}

export default MenuList;
