import React, { useCallback, useContext, useState } from 'react';
import { AlertContext } from "../../../components/Alert/AlertContext";
import { motion } from "framer-motion";
import { Textarea, TextInput } from "evergreen-ui";
import ImageUploader from "../../../components/FileUploader/FileUploader";
import style from "./CreateMusic.module.scss";

const CreateMusic = ({ newSong, addNew, user, songs }) => {
  const alert = useContext(AlertContext)
  const [music, setMusic] = useState({})

  const [files, setFiles] = useState([])
  const [fileRejections, setFileRejections] = useState([])
  const handleChange = (file) => {
    setFiles([file[0]])
    setMusic({ ...music, image: file[0] })
  }
  const handleRejected = useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = () => {
    setFiles([])
    setFileRejections([])
    setMusic({ ...music, image: null })
  }

  const back = () => addNew(false);

  const createSong = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('song', music.song)
    formData.append('album', music.album)
    formData.append('lyrics', music.lyrics)
    formData.append('category', music.category)
    formData.append('image', music.image)
    formData.append('releaseDate', music.releaseDate)
    formData.append('userName', user.nickName)
    try {
      await newSong(formData)
      addNew(false)
      alert.show("Song has been successfully added", "success")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <motion.form
      initial={{ translateX: "-25%", opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: "50%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {songs.length > 0 && <buttom className={style.back} onClick={back}><span>Back to list -&gt;</span></buttom>}
      <h2>New Music</h2>
      <TextInput
        id='articleTitle'
        type='text'
        placeholder='Please, point the song title out'
        onChange={e => setMusic({ ...music, song: e.target.value })}
      />
      <TextInput
        id='album'
        type='text'
        placeholder='Please, point album title out'
        onChange={e => setMusic({ ...music, album: e.target.value })}
      />
      <TextInput
        id='genre'
        type='text'
        placeholder='Please, point genre title out'
        onChange={e => setMusic({ ...music, category: e.target.value })}
      />
      <TextInput
        id='tag2'
        type='date'
        placeholder='ReleaseDate'
        onChange={e => setMusic({ ...music, releaseDate: e.target.value })}
      />
      <Textarea
        id='text'
        placeholder='Lyrics'
        onChange={e => setMusic({ ...music, lyrics: e.target.value })}
      />
      <ImageUploader
        handleChange={handleChange}
        handleRejected={handleRejected}
        handleRemove={handleRemove}
        fileRejections={fileRejections}
        files={files}
      />
      <a className='form_submit' onClick={createSong}><span>Create song</span></a>
    </motion.form>
  );
};

export default CreateMusic;