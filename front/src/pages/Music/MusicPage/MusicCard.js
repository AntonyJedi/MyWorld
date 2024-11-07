import React, { useContext, useState } from 'react';
import style from './Music.module.scss';
import { Link } from "react-router-dom";
import { AlertContext } from "../../../components/Alert/AlertContext";
import { Badge, Pill } from "evergreen-ui";
import "./MusicOverride.scss";
import { IconButton, EditIcon, TrashIcon } from "evergreen-ui";

const MusicCard = ({
  id,
  songTitle,
  album,
  lyrics,
  category,
  image,
  release,
  deleteSong,
  canDelete,
  user,
  songOwner,
  like,
  usersLiked,
  isAuth
}) => {
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
    <li className={[style.card, turn && style.turn].join(' ')}>
      <div className={style.lyrics}>
        <div>{songOwner}</div>
        <Badge className={style.lyrics_button} color='orange' onClick={() => setTurn(turn => !turn)}>{!turn ? 'Lyrics' : 'Back'}</Badge>
      </div>
      <div className={style.cardInner}>
        <div className={style.front}>
          {image && <img src={'http://localhost:5010/' + image} alt={image} />}
          <div><strong>{songTitle}</strong></div>
          <div>{album}</div>
          <div>Genre - {category}</div>
          <div>Came out at {new Date(release).toLocaleDateString()}</div>

        </div>
        <div className={style.back}>
          <h3>Lyrics</h3>
          <div className={style.inner}>{lyrics}</div>
        </div>
      </div>
      {(user === songOwner || canDelete) &&
        <div className={style.edit_links}>
          <IconButton icon={TrashIcon} intent='danger' onClick={() => handlerDelete(id)} />
          <Link to={`/updateSong/${id}`}>
            <IconButton icon={EditIcon} />
          </Link>
          <section className={style.like_container}>
            {usersLiked.length > 0 && <Pill className={style.count} color='red'>{usersLiked.length}</Pill>}
            {isAuth && <Badge color='teal' className={[style.like, usersLiked.includes(user) && style.clicked].join(' ')} onClick={() => likeSong(id)}>Like</Badge>}
            <ul className={style.likedList}>{usersLiked.map((like, i) => <li key={i}>{like}</li>)}</ul>
          </section>
        </div>
      }
    </li>
  );
};

export default MusicCard;