import React, { useEffect, useState, useContext } from "react";
import { Avatar, Button, Switch, TextInputField, Textarea, Label, IconButton, TrashIcon, TickIcon } from "evergreen-ui";
import { motion } from "framer-motion";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import style from "./HomePage.module.scss";
import './HomePage.scss';
import Bubble from "../../components/Bubble/Bubble";
import { AlertContext } from "../../components/Alert/AlertContext";
import MenuList from "../../components/MenuList/MenuList";

const HomePage = ({ categories, user, isAdmin, isAuth, changeUser, posts, createPost, deletePost, allUsers }) => {
  const alert = useContext(AlertContext)
  const [updatedUser, setUpdatedUser] = useState(user);
  const [edited, setEdited] = useState(false);

  const [post, setPostText] = useState({ userName: user.nickName, text: '' })

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

  const stopEditing = edited => {
    let updatedInterests = updatedUser.interests;
    if (!Array.isArray(updatedInterests) && edited) {
      updatedInterests = updatedInterests.replace(/,\s+/g, ',').split(',');
      const newUser = { ...updatedUser, interests: updatedInterests };
      changeUser(newUser)
    }
    setEdited(edited)
  }

  const createNewPost = post => {
    if (post.text.length < 1) {
      alert.show("Please, type something to save the post")
      return
    }
    createPost(post);
    setPostText({ ...post, text: '' });
    alert.show("New post has been created", "success")
  }

  const deleteOnePost = id => {
    deletePost(id)
    alert.show("Post has been deleted", "danger")
  }

  const addFriend = friend => {
    const addedNewFriend = { ...updatedUser, friends: [...updatedUser.friends, friend] }
    changeUser(addedNewFriend)
    alert.show(`You have added ${friend} to your friends list. Now you can see ${friend}'s posts`, "success")
  }

  return (
    <motion.div
      initial={{ translateX: "-25%", opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: "50%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isAuth && <div className={style.editButton}>
        <span>Edit profile</span>
        <Switch checked={edited} onChange={e => stopEditing(e.target.checked)} />
      </div>}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{(updatedUser.nickName && isAuth) ? updatedUser.nickName + '\'s Profile' : 'Homepage'} </h1>
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
          <section className={style.usersBlock}>
            {allUsers.length > 1 ? (
              <>
                <h3>All Users</h3>
                <ul className={style.usersList}>
                  {[...allUsers.filter(userOne => userOne.nickName !== user.nickName)].map(one => {
                    return <li key={one.id} className={style.userItem}>
                      <div className={style.userItemName}>{one.nickName}</div>
                      <div className={style.userItemJob}>{one.job}</div>
                      <Button
                        icon={TickIcon}
                        appearance="primary"
                        intent="success"
                        disabled={user?.friends?.includes(one.nickName)}
                        onClick={() => addFriend(one.nickName)}
                      >
                        {user?.friends?.includes(one.nickName) ? "You're friends" : "Add friend"}
                      </Button>
                    </li>
                  })}
                </ul>
              </>
            ) : 'You are only one user here :('}
          </section>
        </aside>
        <section className={style.container}>
          <div className={style.blog}>
            <div className={style.blog_control}>
              <Label htmlFor="postText" marginBottom={4} display="block">
                New post
              </Label>
              <Textarea id="postText" value={post.text} onChange={e => setPostText({ ...post, text: e.target.value })} />
              <Button intent="success" onClick={() => createNewPost(post)}>Create post</Button>
            </div>
            <TransitionGroup component='ul' className='post-list-group'>
              {posts.map((post, index) => {
                if (user?.friends?.includes(post.userName) || post.userName == user.nickName) {
                  return (
                    <CSSTransition key={index} classNames='post' timeout={1000}>
                      <li key={index} className='post'>
                        <div className='postText'>{post.text}</div>
                        <div className="postInfoContainer">
                          <div className='userName'>{post.userName == user.nickName ? 'My post' : post.userName}</div>
                          <div className='postDate'>{new Date(post.createdAt).toLocaleDateString("en-GB")}</div>
                        </div>
                        <IconButton className='iconDelete' icon={TrashIcon} intent="danger" onClick={() => deleteOnePost(post.id)} />
                      </li>
                    </CSSTransition>
                  )
                }
              })}
            </TransitionGroup>
            {posts.length < 1 && <div className={style.empty}>Nothing</div>}
          </div>
        </section>
      </main> : <div>You are unauthorized</div>}
    </motion.div>
  );
};

export default HomePage;