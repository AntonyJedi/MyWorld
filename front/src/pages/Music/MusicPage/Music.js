import React, {useState} from 'react';
import MusicCard from "./MusicCard";
import CreateMusicContainer from "../CreateMusic/CreateMusicContainer";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {motion} from "framer-motion";
import NextArrow from "./SliderArrows/NextArrow";
import PrevArrow from "./SliderArrows/PrevArrow";
import './SliderArrows/SlickArrows.scss'

const Music = ({songs, deleteOne, isAuth, isAdminAuth, users, currentUser}) => {
  const [isAddNew, setIsAddNew] = useState(false)

  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: 'cubic-bezier(0.600, -0.580, 0.535, 0.15)',
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  };

  return (
    <motion.ul
      initial={{translateX: "-25%", opacity: 0}}
      animate={{translateX: 0, opacity: 1}}
      exit={{translateX: "50%", opacity: 0}}
      transition={{duration: 0.5}}
    >
      {(!isAddNew && songs.length > 0) ? (
        <>
          {users.map(user => {
            return (
              <>
                {currentUser.nickName === user ? <h3>My playlist</h3> : <h3>{user}'s playlist</h3>}
                <Slider {...settings}>
                  {songs.map(one => {
                    if (one.userName === user)
                      return (
                        <MusicCard
                          id={one.id}
                          songTitle={one.song}
                          album={one.album}
                          lyrics={one.lyrics}
                          category={one.category}
                          image={one.img}
                          release={one.releaseDate}
                          userName={one.userName}
                          deleteSong={deleteOne}
                          canDelete={isAdminAuth}
                          user={currentUser.nickName}
                        />
                      )
                  })}
                </Slider>
              </>
            )
          })}
          {isAuth &&
          <div onClick={() => setIsAddNew(isAddNew => !isAddNew)} style={{margin: '20px auto'}} className='basic_button'>
            <span>Add new song</span></div>}
        </>
      ) : <CreateMusicContainer setIsAddNew={setIsAddNew}/>
      }
    </motion.ul>
  );
};

export default Music;