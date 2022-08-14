import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Textarea, TextInput} from "evergreen-ui";
import ImageUploader from "../../../components/FileUploader/FileUploader";
import {motion} from "framer-motion";

const CreateArticleComponent = ({newOne}) => {
  const [article, setArticle] = useState({})

  const [files, setFiles] = useState([])
  const [fileRejections, setFileRejections] = useState([])
  const handleChange = (file) => {
    setFiles([file[0]])
    setArticle({...article, image: file[0]})
  }
  const handleRejected = useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = () => {
    setFiles([])
    setFileRejections([])
    setArticle({...article, image: null})
  }

  useEffect(() => {
    console.log(article)
  }, [article]);

  function createArticle(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', article.title)
    formData.append('tag1', article.tag1)
    formData.append('tag2', article.tag2)
    formData.append('tag3', article.tag3)
    formData.append('text', article.text)
    formData.append('image', article.image)
    console.log(formData)
    try {
      newOne(formData)
      // await navigate("/articles")
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
      <h2>New article</h2>
      <TextInput
        id="articleTitle"
        type="text"
        placeholder="Title"
        onChange={e => setArticle({...article, title: e.target.value})}
      />
      <TextInput
        id="tag1"
        type="text"
        placeholder="Tag #1"
        onChange={e => setArticle({...article, tag1: e.target.value})}
      />
      <TextInput
        id="tag2"
        type="text"
        placeholder="Tag #2"
        onChange={e => setArticle({...article, tag2: e.target.value})}
      />
      <TextInput
        id="tag3"
        type="text"
        placeholder="Tag #3"
        onChange={e => setArticle({...article, tag3: e.target.value})}
      />
      <Textarea
        id="text"
        placeholder="Article Text"
        onChange={e => setArticle({...article, text: e.target.value})}
      />
      <ImageUploader
        handleChange={handleChange}
        handleRejected={handleRejected}
        handleRemove={handleRemove}
        fileRejections={fileRejections}
        files={files}
      />
      <div>
        <a className="form_submit" onClick={createArticle}><span>Create article</span></a>
      </div>
    </motion.form>
  );
};

export default CreateArticleComponent;