import React, {useContext, useState} from 'react';
import style from './Music.module.scss';
import {Link} from "react-router-dom";
import {AlertContext} from "../../../components/Alert/AlertContext";

const MusicCard = ({id, songTitle, album, lyrics, category, image, release, deleteSong, canDelete}) => {
  const alert = useContext(AlertContext)
  const [turn, setTurn] = useState(false)
  const handlerDelete = idSong => {
    deleteSong(idSong)
    alert.show('Song was deleted', 'danger')
  }
  return (
    <>
      <li className={[style.card, turn && style.turn].join(' ')} onClick={() => setTurn(turn => !turn)}>
        <div className={style.cardInner}>
          <div className={style.front}>
            {image && <img src={'http://localhost:5000/' + image} alt={image}/>}
            <div><strong>{songTitle}</strong></div>
            <div>{album}</div>
            <div>Genre - {category}</div>
            <div>Came out at {new Date(release).toLocaleDateString()}</div>
          </div>
          <div className={style.back}>
            <h2>Lyrics</h2>
            <div className={style.inner}>{lyrics}</div>
          </div>
        </div>
      </li>
      {canDelete && <div className={style.adminButtons}>
        <Link className='basic_button' to={`/updateSong/${id}`}><span>Update</span></Link>
        <div onClick={() => handlerDelete(id)} className='delete_button'>
          <span>Delete song</span></div>
      </div>}
    </>
  );
};

export default MusicCard;