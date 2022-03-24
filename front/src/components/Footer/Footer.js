import React from 'react';
import styles from './Footer.module.scss'
import wave from './../../static/images/wave.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="waves">
        <div className={styles.wave + " " + styles.wave1} style={{background: `url(${wave})`}} id="wave1"/>
        <div className={styles.wave + " " + styles.wave2} style={{background: `url(${wave})`}} id="wave2"/>
        <div className={styles.wave + " " + styles.wave3} style={{background: `url(${wave})`}} id="wave3"/>
        <div className={styles.wave + " " + styles.wave4} style={{background: `url(${wave})`}} id="wave4"/>
      </div>
    </footer>
  );
};

export default Footer;