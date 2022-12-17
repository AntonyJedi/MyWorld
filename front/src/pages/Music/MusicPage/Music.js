import React, {useState} from 'react';
import MusicCard from "./MusicCard";
import Loader from "../../../components/Loader/Loader";
import CreateMusicContainer from "../CreateMusic/CreateMusicContainer";
import {Autoplay, EffectCoverflow} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import {motion} from "framer-motion";

const Music = ({songs, isLoading, deleteOne, isAdminAuth}) => {
  const [isAddNew, setIsAddNew] = useState(false)
  return (
    <>
      {(!isAddNew && songs.length > 0) ? (
        <>
          <motion.ul
            initial={{translateX: "-25%", opacity: 0}}
            animate={{translateX: 0, opacity: 1}}
            exit={{translateX: "50%", opacity: 0}}
            transition={{duration: 0.5}}
          >
            <Swiper
              className='mySwiper'
              modules={[EffectCoverflow, Autoplay]}
              spaceBetween={50}
              autoplay={{delay: 3000}}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1
              }}
              breakpoints={{
                650: {
                  slidesPerView: 2
                },
                1100: {
                  slidesPerView: 3
                }
              }}
            >
              {songs.map(one =>
                <SwiperSlide>
                  <MusicCard
                    id={one.id}
                    songTitle={one.song}
                    album={one.album}
                    lyrics={one.lyrics}
                    category={one.category}
                    image={one.img}
                    release={one.releaseDate}
                    deleteSong={deleteOne}
                    canDelete={isAdminAuth}
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </motion.ul>
          <button onClick={() => setIsAddNew(isAddNew => !isAddNew)}style={{margin: '0 auto'}} className='basic_button'><span>Add new song</span></button>
        </>
      ) : <CreateMusicContainer setIsAddNew={setIsAddNew} />
      }
    </>
  );
};

export default Music;