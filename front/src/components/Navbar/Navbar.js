import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.scss'
import logo from '../../static/images/logo.png'
import {adminRoutes, authRoutes, userRoutes} from "../../routes/routes";

const Navbar = ({quotes, isUserAuth, makeOut}) => {
  console.log(quotes)
  // const isAuth = false
  let adminLink = adminRoutes.filter(link => link.title !== 'Update Article');
  return (
    <header>
      <section className='main_container'>
        <NavLink className={styles.logo} to='/'><img src={logo} alt="logo"/></NavLink>
        <div className={styles.quote}>Some text</div>
        <nav>
          {isUserAuth && adminLink.map(link => {
            return <NavLink className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink>
          })}
          {userRoutes.map(link => {
            return <NavLink className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink>
          })}
          {isUserAuth && <button onClick={makeOut}><span>Logout</span></button>}
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