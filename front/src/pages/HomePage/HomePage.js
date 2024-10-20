import React, { useEffect, useState, useContext } from "react";
import { Avatar, Button, Switch, TextInputField } from "evergreen-ui";
import { motion } from "framer-motion";
import style from "./HomePage.module.scss";
import './HomePage.scss';
import Bubble from "../../components/Bubble/Bubble";
import { AlertContext } from "../../components/Alert/AlertContext";
import MenuList from "../../components/MenuList/MenuList";

const HomePage = ({ categories, user, isAdmin, isAuth, changeUser }) => {
  const alert = useContext(AlertContext)
  const [updatedUser, setUpdatedUser] = useState(user);
  const [edited, setEdited] = useState(false);

  const completeEditing = () => {
    let updatedInterests = updatedUser.interests;
    if (!Array.isArray(updatedInterests)) {
      updatedInterests = updatedInterests.replace(/,\s+/g, ',').split(',');
      const newUser = { ...updatedUser, interests: updatedInterests };
      changeUser(newUser)
    } else {
      changeUser(updatedUser)
    }
    setEdited(false)
    alert.show("User profile has been successfully updated", "success")
  }

  const stopEditing = (edited) => {
    let updatedInterests = updatedUser.interests;
    if (!Array.isArray(updatedInterests) && edited) {
      updatedInterests = updatedInterests.replace(/,\s+/g, ',').split(',');
      const newUser = { ...updatedUser, interests: updatedInterests };
      changeUser(newUser)
    }
    setEdited(edited)
  }

  return (
    <motion.div
      initial={{ translateX: "-25%", opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: "50%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={style.editButton}>
        <span>Edit profile</span>
        <Switch checked={edited} onChange={e => stopEditing(e.target.checked)} />
      </div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{updatedUser.nickName ? updatedUser.nickName + '\'s Profile' : 'Homepage'} </h1>
      {isAuth ? <main className={style.main}>
        <aside className={style.aside}>
          <div className={[style.heading, edited ? style.edited : ''].join(' ')}>
            {
              !edited ? <motion.div
                initial={{ translateX: "-25%", opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: "50%", opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Avatar name={updatedUser.nickName} size={50} />
              </motion.div> : <TextInputField
                label="Name"
                value={updatedUser.nickName}
                onChange={(e) => setUpdatedUser({ ...updatedUser, nickName: e.target.value })}
              />
            }
            <div className={[style.mood, edited ? style.edited : ''].join(' ')}>
              {
                (updatedUser.currectMood && !edited) ?
                  <motion.div
                    initial={{ translateX: "25%", opacity: 0 }}
                    animate={{ translateX: 0, opacity: 1 }}
                    exit={{ translateX: "-50%", opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Bubble text={updatedUser.currectMood} entity="mood" />
                  </motion.div> :
                  <TextInputField
                    label="Mood"
                    value={updatedUser.currectMood}
                    onChange={e => setUpdatedUser({ ...updatedUser, currectMood: e.target.value })}
                  />
              }
            </div>
            <div className={style.job}>
              {
                !edited ? updatedUser.job : <TextInputField
                  label="Job"
                  value={updatedUser.job}
                  onChange={e => setUpdatedUser({ ...updatedUser, job: e.target.value })}
                />
              }
            </div>
          </div>
          <div className={style.about}>
            {
              !edited ? <motion.div
                initial={{ translateY: "25%", opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: "-50%", opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {updatedUser.about}
              </motion.div> : <TextInputField
                label="About"
                value={updatedUser.about}
                onChange={e => setUpdatedUser({ ...updatedUser, about: e.target.value })}
              />
            }
          </div>
          {!edited ? <MenuList className="interests" interests={updatedUser.interests} buttonText='Interests' /> : <TextInputField
            label="Interests"
            value={updatedUser.interests}
            onChange={e => setUpdatedUser({ ...updatedUser, interests: e.target.value })}
          />
          }
          {(edited && user !== updatedUser) && <Button intent="success" onClick={() => completeEditing()}>Save</Button>}
        </aside>
        <section className={style.container}>
          <div className={style.blog}>
            Posts...
          </div>
        </section>
      </main> : <div>You are unauthorized</div>}
    </motion.div>
  );
};

export default HomePage;