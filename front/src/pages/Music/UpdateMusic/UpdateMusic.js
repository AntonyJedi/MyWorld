import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Textarea, TextInput} from "evergreen-ui";
import ImageUploader from "../../../components/FileUploader/FileUploader";
import {motion} from "framer-motion";
import {AlertContext} from "../../../components/Alert/AlertContext";

const UpdateMusic = ({id, song, updateSong}) => {
  const navigate = useNavigate()
  const alert = useContext(AlertContext)
  const [up, setUp] = useState({})
  const [files, setFiles] = useState([])
  const [fileRejections, setFileRejections] = useState([])
  const handleChange = (file) => {
    setFiles([file[0]])
    setUp({...up, image: file[0]})
  }
  const handleRejected = useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = () => {
    setFiles([])
    setFileRejections([])
    setUp({...up, image: null})
  }
  useEffect(() => {
    setUp(song)
  }, [song])

  async function updateHandler (e) {
    e.preventDefault()
    const formUpdate = new FormData()
    formUpdate.append('song', up.song)
    formUpdate.append('album', up.album)
    formUpdate.append('lyrics', up.lyrics)
    formUpdate.append('category', up.category)
    formUpdate.append('image', up.image)
    formUpdate.append('releaseDate', up.releaseDate)
    try {
      console.log(up)
      await updateSong(id, formUpdate)
      alert.show("Song has been successfully updated", "success")
      setTimeout(() => navigate("/music"), 200)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <motion.form
      initial={{translateX: "-25%", opacity: 0}}
      animate={{translateX: 0, opacity: 1}}
      exit={{translateX: "50%", opacity: 0}}
      transition={{duration: 0.5}}
    >
      <h2>Update Song</h2>
      <TextInput
        type="text"
        value={up.song}
        placeholder="New song value..."
        onChange={e => setUp({...up, song: e.target.value})}
      />
      <TextInput
        type="text"
        value={up.album}
        placeholder="New album value..."
        onChange={e => setUp({...up, album: e.target.value})}
      />
      <TextInput
        type="text"
        value={up.category}
        placeholder="New category value..."
        onChange={e => setUp({...up, category: e.target.value})}
      />
      <TextInput
        type="date"
        value={up.releaseDate}
        placeholder="New release date value..."
        onChange={e => setUp({...up, releaseDate: e.target.value})}
      />
      <Textarea
        id="text"
        value={up.lyrics}
        placeholder="New lyrics value..."
        onChange={e => setUp({...up, lyrics: e.target.value})}
      />
      <ImageUploader
        handleChange={handleChange}
        handleRejected={handleRejected}
        handleRemove={handleRemove}
        fileRejections={fileRejections}
        files={files}
        value={up.image}
      />
      <div>
        <a className="form_submit" onClick={updateHandler}><span>Update article</span></a>
      </div>
      {/*<input type="file" accept="image/*" multiple="false" onChange={e => console.log(e.target.files[0])}/>*/}
      {/*<button type="submit">Update</button>*/}
    </motion.form>
  );
};

// album
//   :
//   "The Book Of Souls"
// category
//   :
//   "Heavy metal"
// createdAt
//   :
//   "2022-12-16T21:40:51.745Z"
// id
//   :
//   40
// img
//   :
//   "f1d73bb5-68f8-4bfc-b7be-a077c982f6d6.png"
// lyrics
//   :
//   "Some text..."
// releaseDate
//   :
//   "2022-12-15T22:00:00.000Z"
// song
//   :
//   "The Book Of Souls"
// updatedAt
//   :
//   "2022-12-16T21:40:51.745Z"

export default UpdateMusic;