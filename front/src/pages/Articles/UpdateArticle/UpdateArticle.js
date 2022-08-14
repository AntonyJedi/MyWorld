import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Textarea, TextInput} from "evergreen-ui";
import ImageUploader from "../../../components/FileUploader/FileUploader";
import {motion} from "framer-motion";
import {AlertContext} from "../../../components/Alert/AlertContext";

const UpdateArticle = ({article, updateArticle}) => {
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
    setUp(article)
    console.log(up)
  }, [article])

  useEffect(() => {
    console.log(up)
  }, [up])

  async function updateHandler (e) {
    e.preventDefault()
    const formUpdate = new FormData()
    formUpdate.append('title', up.title)
    formUpdate.append('tag1', up.tag1)
    formUpdate.append('tag2', up.tag2)
    formUpdate.append('tag3', up.tag3)
    formUpdate.append('text', up.text)
    formUpdate.append('image', up.image)
    try {
      await updateArticle(formUpdate, article.id)
      alert.show("Article has been successfully updated", "success")
      setTimeout(() => navigate("/articles"), 200)
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
      <h2>Update Article</h2>
      <TextInput
        id="articleTitle"
        type="text"
        value={up.title}
        placeholder="New title value..."
        onChange={e => setUp({...up, title: e.target.value})}
      />
      <TextInput
        id="tag1"
        type="text"
        value={up.tag1}
        placeholder="New tag #1 value..."
        onChange={e => setUp({...up, tag1: e.target.value})}
      />
      <TextInput
        id="tag2"
        type="text"
        value={up.tag2}
        placeholder="New tag #2 value..."
        onChange={e => setUp({...up, tag2: e.target.value})}
      />
      <TextInput
        id="tag3"
        type="text"
        value={up.tag3}
        placeholder="New tag #3 value..."
        onChange={e => setUp({...up, tag3: e.target.value})}
      />
      <Textarea
        id="text"
        value={up.text}
        placeholder="New text value..."
        onChange={e => setUp({...up, text: e.target.value})}
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

export default UpdateArticle