import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.scss'
import logo from '../../static/images/logo.png'
import {adminRoutes, authRoutes, userRoutes} from "../../routes/routes";
import {Button} from 'evergreen-ui'

const Navbar = ({quotes}) => {
  console.log(quotes)
  const isAuth = false
  let adminLink = adminRoutes.filter(link => link.title !== 'Update Article');
  return (
    <header>
      <section>
        <div className={styles.navbar}>
          <NavLink className={styles.logo} to='/'><img src={logo} alt="logo"/></NavLink>
          <div className={styles.quote}>Some text</div>
          <nav>
            {isAuth && adminLink.map(link => {
              return <NavLink className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink>
            })}
            {userRoutes.map(link => {
              return <NavLink className={({isActive}) => isActive ? styles.active : ''} to={link.path}><span>{link.title}</span></NavLink>
            })}
          </nav>
          {!isAuth && <ul className={styles.auth}>
            {authRoutes.map(link => {
              return <li><NavLink to={link.path}><Button marginRight={16} appearance='minimal'>{link.title}</Button></NavLink></li>
            })}
          </ul>}
        </div>
      </section>
    </header>
  );
};

export default Navbar;