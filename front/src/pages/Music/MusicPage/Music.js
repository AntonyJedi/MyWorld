import React, { useState } from "react";
import MusicCard from "./MusicCard";
import CreateMusicContainer from "../CreateMusic/CreateMusicContainer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import "./SliderArrows/SlickArrows.scss";
import Loader from "../../../components/Loader/Loader";
import style from './Music.module.scss';
import SelectOne from "../../../components/SelectOne/SelectOne";

const Music = ({ songs, deleteOne, isAuth, isAdminAuth, currentUser, isMusicLoading, likeOne }) => {
  const [isAddNew, setIsAddNew] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState([currentUser.nickName]);
  const songsOwners = isAuth ? 
  [currentUser.nickName, ...[...new Set(songs.map(song => song.userName))].filter(one => one !== currentUser.nickName)]
  : [...new Set(songs.map(song => song.userName))];
  return (
    <>
      {isMusicLoading ? <Loader /> : !isAddNew && songs.length > 0 ? <motion.div
        initial={{ translateX: "-25%", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: "50%", opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className={style.music_top_container}>
          {isAuth &&
            <div onClick={() => setIsAddNew(isAddNew => !isAddNew)}
              className={`action_button ${style.add_button}`}>
              <span>Add new song</span>
            </div>
          }
          <SelectOne
            array={songsOwners}
            selectedItem={selectedOwner}
            setSelectedItem={setSelectedOwner}
            replace='My playlist'
            isDefault={isDefault}
            setIsDefault={setIsDefault}
            isAuth={isAuth}
          />
        </section>
        <ul className={style.music_grid}>
          {songs.map(one => {
            if (selectedOwner.find(o => o === one.userName)) {
              return (
                <MusicCard
                  key={one.id}
                  id={one.id}
                  songTitle={one.song}
                  album={one.album}
                  lyrics={one.lyrics}
                  category={one.category}
                  image={one.img}
                  release={one.releaseDate}
                  songOwner={one.userName}
                  deleteSong={deleteOne}
                  canDelete={isAdminAuth}
                  user={currentUser.nickName}
                  like={likeOne}
                  usersLiked={one.liked}
                  isAuth={isAuth}
                />
              );
            }
          })}
        </ul>
      </motion.div> : <CreateMusicContainer setIsAddNew={setIsAddNew} />
      }
    </>
  );
};

// <CreateMusicContainer setIsAddNew={setIsAddNew} />

export default Music;