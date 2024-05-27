import React, {useContext} from "react";
import style from "./OneArticle.module.scss";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AlertContext } from "../../../components/Alert/AlertContext";


const OneArticle = ({ oneArticle, isAdmin, user, deleteOne }) => {
  const {show} = useContext(AlertContext)
  const navigate = useNavigate();
  const handleDelete = id => {
    deleteOne(id)
    show("Article was deleted", "danger")
    setTimeout(() => navigate("/articles"), 100)
  }

  return (
    <motion.article
      className={style.article}
      initial={{ translateX: "-25%", opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: "50%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{oneArticle.title}</h2>
      {(user.id === oneArticle.userId || isAdmin) &&
      <div className={style.adminLinks}>
        <Link className='basic_button' to={`/update/${oneArticle.id}`}><span>Update</span></Link>
        <div className={style.delete} onClick={() => handleDelete(oneArticle.id)}><span>Delete</span></div>
      </div>
      }
      {oneArticle.img &&
      <div className={style.image}><img src={`http://localhost:5000/${oneArticle.img}`} alt={oneArticle.title} /></div>}
      <div className={style.text}>{oneArticle.text}</div>
      <div className={style.bottom}>
        <div className={style.tags}>
          <span>#{oneArticle.tag1}</span>
          <span>#{oneArticle.tag2}</span>
          <span>#{oneArticle.tag3}</span>
        </div>
        <div>{new Date(oneArticle.creationDate).toLocaleDateString()}</div>
      </div>
    </motion.article>
  );
};

export default OneArticle;