import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import style from "./Articles.module.scss";
import {motion} from "framer-motion";
import {AlertContext} from "../../../components/Alert/AlertContext";

const Articles = ({allArticles, deleteOne, progress, isUserAdmin, user, categoryName}) => {
  const alert = useContext(AlertContext)
  const handleDelete = id => {
    deleteOne(id)
    alert.show("Article was deleted")
  }
  return (
    <>
      {progress ? <Loader/> : allArticles.length > 0 ?
        <motion.div
          initial={{translateX: "-25%", opacity: 0}}
          animate={{translateX: 0, opacity: 1}}
          exit={{translateX: "50%", opacity: 0}}
          transition={{duration: 0.5}}
        >
          {categoryName ? <h2>{categoryName.toUpperCase()}</h2> : <h2>All articles</h2>}
          <ul className={style.articleContainer}>
            {allArticles.map((article, index) => {
              return <li
                key={index}>
                <Link className={style.link} to={`/article/${article.id}`}>
                  <div className={style.userName}>{article.userName}</div>
                  <h3 className={style.title}>{article.title}</h3>
                  <div>{article.text.substr(0, 150)}...</div>
                  {article.img && <img src={'http://localhost:5000/' + article.img} alt={article.title}/>}
                </Link>
                {(user.id === article.userId || isUserAdmin) &&
                <div className={style.adminLinks}>
                  <Link className='basic_button' to={`/update/${article.id}`}><span>Update</span></Link>
                  <div className={style.delete} onClick={() => handleDelete(article.id)}><span>Delete</span></div>
                </div>
                }
              </li>
            })}
          </ul>
        </motion.div> : <motion.div
          initial={{translateX: "-25%", opacity: 0}}
          animate={{translateX: 0, opacity: 1}}
          exit={{translateX: "50%", opacity: 0}}
          transition={{duration: 0.5}}
        >Nothing's here</motion.div>}
    </>
  );
};

export default Articles;