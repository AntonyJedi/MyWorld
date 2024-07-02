import React from "react";
import { Avatar } from "evergreen-ui";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import style from "./HomePage.module.scss";
import Bubble from "../../components/Bubble/Bubble";

const HomePage = ({ categories, user, isAdmin, isAuth }) => {
  return (
    <motion.div
      initial={{ translateX: "-25%", opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: "50%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{user.nickName ? user.nickName + '\'s Profile' : 'Homepage'} </h1>
      {isAuth ? <main className={style.main}>
        <aside>
          <div className={style.heading}>
            {user.currectMood && <Bubble text={user.currectMood} entity="mood" />}
            <Avatar name={user.nickName} size={50} />
            <div>{user.job}</div>
          </div>
          <div>{user.about}</div>
          <ul>{user.interests.map(one => <li>{one}</li>)}</ul>
        </aside>
        <section className={style.container}>
          <div className={style.blog}>
            Posts...
          </div>
        </section>
        {/* <div className={style.category}>
            <h2>Category</h2>
            <ul>
              {categories.map(one => <li key={one.title} className={style.category_item}><NavLink
                to={`/articles/${one.title.toLowerCase()}`}><span>{one.title}</span></NavLink></li>)}
            </ul>
          </div> */}
      </main> : <div>You are unauthorized</div>}
    </motion.div>
  );
};

export default HomePage;