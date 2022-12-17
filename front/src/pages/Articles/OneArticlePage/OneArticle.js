import React from 'react';
import style from "./OneArticle.module.scss";
import {motion} from "framer-motion";

const OneArticle = ({oneArticle}) => {
  return (
    <motion.article
      className={style.article}
      initial={{translateX: "-25%", opacity: 0}}
      animate={{translateX: 0, opacity: 1}}
      exit={{translateX: "50%", opacity: 0}}
      transition={{duration: 0.5}}
    >
      <h2>{oneArticle.title}</h2>
      {oneArticle.img && <div className={style.image}><img src={`http://localhost:5000/${oneArticle.img}`} alt={oneArticle.title}/></div>}
      <div className={style.text}>{oneArticle.text}</div>
      <div className={style.bottom}>
        <div className={style.tags}>
          <span>#{oneArticle.tag1}</span>
          <span>#{oneArticle.tag2}</span>
          <span>#{oneArticle.tag3}</span>
        </div>
        <div>{oneArticle.creationDate}</div>
      </div>
    </motion.article>
  );
};

export default OneArticle;