import React, {useState} from 'react';
import {Paragraph, Position, SideSheet} from "evergreen-ui";
import {adminRoutes, allRoutes, authRoutes, userRoutes} from "../../routes/routes";
import style from './SideBarMenu.module.scss';
import {NavLink} from "react-router-dom";

const SideBarMobile = ({isAuth}) => {
  const [isShown, setIsShown] = useState(false)
  let allLinks = allRoutes.filter(link => link.title !== 'Article');
  return (
    <>
      <SideSheet position={Position.BOTTOM} isShown={isShown} onCloseComplete={() => setIsShown(false)}>
        <Paragraph margin={15}>
          <nav className={style.navigation}>
            {isAuth && userRoutes.map(link => {
              return <NavLink onClick={() => setIsShown(false)} className={({isActive}) => isActive ? style.buttons : ''} to={link.path}><span>{link.title}</span></NavLink>
            })}
            {allLinks.map(link => {
              return <NavLink onClick={() => setIsShown(false)} className={({isActive}) => isActive ? style.buttons : ''} to={link.path}><span>{link.title}</span></NavLink>
            })}
          </nav>
        </Paragraph>
      </SideSheet>
      <div className={`${style.mobile_button} ${isShown ? style.hidden : style.shown}`} onClick={() => setIsShown(true)}><div><span></span><span></span><span></span></div></div>
    </>
  );
};

export default SideBarMobile;