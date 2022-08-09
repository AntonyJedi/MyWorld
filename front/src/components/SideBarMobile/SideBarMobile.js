import React, {useState} from 'react';
import {Paragraph, Position, SideSheet} from "evergreen-ui";
import style from './SideBarMenu.module.scss';

const SideBarMobile = () => {
  const [isShown, setIsShown] = useState(false)
  return (
    <>
      <SideSheet position={Position.BOTTOM} isShown={isShown} onCloseComplete={() => setIsShown(false)}>
        <Paragraph margin={15}>Basic Example</Paragraph>
      </SideSheet>
      <div className={`${style.mobile_button} ${isShown ? style.hidden : style.shown}`} onClick={() => setIsShown(true)}><div><span></span><span></span><span></span></div></div>
    </>
  );
};

export default SideBarMobile;