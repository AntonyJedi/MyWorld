import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.scss'
import logo from '../../static/images/logo.png'
import {allRoutes, authRoutes, userRoutes} from "../../routes/routes";

const Navbar = ({isUserAuth, makeOut, user}) => {
  console.log(user)
  let allLinks = allRoutes.filter(link => link.title !== 'Article' && link.title !== 'Specific Articles');
  return (
    <header>
      <section className='main_container'>
        <NavLink className={styles.logo} to='/'><img src={logo} alt="logo"/></NavLink>
        {user.nickName && <div className={styles.quote}><span>{"Hello, " + user.nickName}</span></div>}
        <nav>
          {isUserAuth && userRoutes.map(link => {
            return <NavLink className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink>
          })}
          {allLinks.map(link => {
            return <NavLink className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink>
          })}
          {isUserAuth && <a className={styles.logout} onClick={makeOut}><span>Logout</span></a>}
        </nav>
        {!isUserAuth && <ul className={styles.auth}>
          {authRoutes.map(link => {
            return <li><NavLink className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink></li>
          })}
        </ul>}
      </section>
    </header>
  );
};

export default Navbar;