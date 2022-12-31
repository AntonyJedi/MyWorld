import React from 'react';
import {motion} from "framer-motion";
import {NavLink} from "react-router-dom";
import style from './HomePage.module.scss'

const HomePage = ({categories}) => {
  return (
    <motion.div
      initial={{translateX: "-25%", opacity: 0}}
      animate={{translateX: 0, opacity: 1}}
      exit={{translateX: "50%", opacity: 0}}
      transition={{duration: 0.5}}
      >
      <h1 style={{textAlign: 'center'}}>HomePage</h1>
      {categories.map(one => <div className={style.category}><NavLink to={`/articles/${one.title.toLowerCase()}`}><span>{one.title}</span></NavLink></div>)}
    </motion.div>
  );
};

export default HomePage;