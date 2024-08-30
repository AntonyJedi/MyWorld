import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import style from "./Articles.module.scss";
import './ArticleAnimation.scss';
import { motion } from "framer-motion";
import { AlertContext } from "../../../components/Alert/AlertContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";


import { articleAuthRoutes } from "../../../routes/routes";
import ArticleViewCard from "./ArticleViewCard";

const Articles = ({ allArticles, deleteOne, progress, isUserAdmin, user, categoryName, isAuth, likeArticle, categories}) => {
  const { show } = useContext(AlertContext);

  const handleDelete = id => {
    deleteOne(id);
    show("Article was deleted", "danger");
  };

  const handleLike = (id, add) => {
    likeArticle(id, user.nickName, add)
  }
  return (
    <>
      {isAuth && <div className={style.links_container}>{articleAuthRoutes.map(route => <Link className="action_button" to={route.path}><span>{route.title}</span></Link>)}</div>}
      {progress ? <Loader /> : allArticles.length > 0 ? <motion.div
        initial={{ translateX: "-25%", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: "50%", opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categoryName ? <h2>{categoryName.toUpperCase()}</h2> : <h2>All articles</h2>}
        <TransitionGroup component='ul' className={[style.articleContainer, 'list-group'].join(' ')}>
          {allArticles.map((article, index) => (
            <CSSTransition key={article.id} classNames='article' timeout={1000} onEnter={() => console.log('Enter:', article.id)} onExit={() => console.log('Exit:', article.id)}>
              <ArticleViewCard
                index={index}
                article={article}
                user={user}
                isAuth={isAuth}
                isUserAdmin={isUserAdmin}
                handleLike={handleLike}
                handleDelete={handleDelete}
                categories={categories}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </motion.div> : <motion.div
        initial={{ translateX: "-25%", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: "50%", opacity: 0 }}
        transition={{ duration: 0.5 }}
      >Nothing&apos;s here</motion.div>}
    </>
  );
};

export default Articles;