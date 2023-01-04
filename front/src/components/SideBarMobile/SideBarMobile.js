import React, {useState} from 'react';
import {Paragraph, Position, SideSheet} from "evergreen-ui";
import {allRoutes, authRoutes, userRoutes} from "../../routes/routes";
import style from './SideBarMenu.module.scss';
import {NavLink} from "react-router-dom";
import styles from "../Navbar/Navbar.module.scss";

const SideBarMobile = ({isAuth, makeOut}) => {
  const [isShown, setIsShown] = useState(false)
  const allLinks = allRoutes.filter(link => link.title !== 'Article' && link.title !== 'Specific Articles')
  const allUserLinks = userRoutes.filter(link => link.title !== 'Update Article' && link.title !== 'Update Music' && link.title !== 'To Do List')
  return (
    <>
      <SideSheet position={Position.BOTTOM} isShown={isShown} onCloseComplete={() => setIsShown(false)}>
        <Paragraph margin={15}>
          <nav className={style.navigation}>
            {isAuth && allUserLinks.map(link => {
              return <NavLink key={link.title} onClick={() => setIsShown(false)} className={({isActive}) => isActive ? style.buttons : ''} to={link.path}><span>{link.title}</span></NavLink>
            })}
            {allLinks.map(link => {
              return <NavLink key={link.title} onClick={() => setIsShown(false)} className={({isActive}) => isActive ? style.buttons : ''} to={link.path}><span>{link.title}</span></NavLink>
            })}
            {isAuth && <a className={styles.logout} onClick={makeOut}><span>Logout</span></a>}
          </nav>
          {!isAuth && <ul className={styles.auth}>
            {authRoutes.map(link => {
              return <li key={link.title} ><NavLink onClick={() => setIsShown(false)} className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink></li>
            })}
          </ul>}
        </Paragraph>
      </SideSheet>
      <div className={`${style.mobile_button} ${isShown ? style.hidden : style.shown}`} onClick={() => setIsShown(true)}><div><span></span><span></span><span></span></div></div>
    </>
  );
};

export default SideBarMobile;