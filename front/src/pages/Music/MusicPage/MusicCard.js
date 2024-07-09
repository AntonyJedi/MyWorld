import React, { useContext, useState } from 'react';
import style from './Music.module.scss';
import { Link } from "react-router-dom";
import { AlertContext } from "../../../components/Alert/AlertContext";
import { Badge, Pill } from "evergreen-ui";
import "./MusicOverride.scss";

const MusicCard = ({ id, songTitle, album, lyrics, category, image, release, deleteSong, canDelete, user, songOwner, like, usersLiked, isAuth }) => {
  const alert = useContext(AlertContext)
  const [turn, setTurn] = useState(false)
  const handlerDelete = idSong => {
    deleteSong(idSong)
    alert.show('Song was deleted', 'danger')
  }
  const likeSong = id => {
    like(id, user, !usersLiked.includes(user));
  }
  return (
    <>
      <li className={[style.card, turn && style.turn].join(' ')}>
        <div className={style.cardInner}>
          <div className={style.front}>
            <Badge color="orange" className={style.lyrics} onClick={() => setTurn(turn => !turn)}>Lyrics</Badge>
            {image && <img src={'http://localhost:5010/' + image} alt={image} />}
            <div><strong>{songTitle}</strong></div>
            <div>{album}</div>
            <div>Genre - {category}</div>
            <div>Came out at {new Date(release).toLocaleDateString()}</div>
            <section className={style.like_container}>
              {usersLiked.length > 0 && <Pill className={style.count} color="red">{usersLiked.length}</Pill>}
              {isAuth && <Badge color="teal" className={[style.like, usersLiked.includes(user) && style.clicked].join(' ')} onClick={() => likeSong(id)}>Like</Badge>}
              <ul className={style.likedList}>{usersLiked.map(like => <li>{like}</li>)}</ul>
            </section>
          </div>
          <div className={style.back}>
            <Badge color="orange" className={style.lyrics} onClick={() => setTurn(turn => !turn)}>Back</Badge>
            <h2>Lyrics</h2>
            <div className={style.inner}>{lyrics}</div>
          </div>
        </div>
      </li>
      {(user === songOwner || canDelete) && <div className={style.adminButtons}>
        <Link className='basic_button' to={`/updateSong/${id}`}><span>Update</span></Link>
        <div onClick={() => handlerDelete(id)} className='delete_button'>
          <span>Delete song</span></div>
      </div>}
    </>
  );
};

export default MusicCard;