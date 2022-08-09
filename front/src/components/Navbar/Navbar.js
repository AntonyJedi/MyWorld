import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.scss'
import logo from '../../static/images/logo.png'
import {adminRoutes, allRoutes, authRoutes, userRoutes} from "../../routes/routes";

const Navbar = ({quotes, isUserAuth, makeOut, isUserAdmin}) => {
  console.log(quotes)
  // const isAuth = false
  // let adminLink = adminRoutes.filter(link => link.title !== 'Update Article');
  return (
    <header>
      <section className='main_container'>
        <NavLink className={styles.logo} to='/'><img src={logo} alt="logo"/></NavLink>
        <div className={styles.quote}>Some text</div>
        <nav>
          {isUserAuth && userRoutes.map(link => {
            return <NavLink className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink>
          })}
          {allRoutes.map(link => {
            return <NavLink className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink>
          })}
          {isUserAuth && <a onClick={makeOut}><span>Logout</span></a>}
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