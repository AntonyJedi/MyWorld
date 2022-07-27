import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom"

const CreateArticle = ({newOne}) => {
  const uploadedImage = useRef(null)
  const navigate = useNavigate()
  let [article, setArticle] = useState({})

  function handleImage(e) {
    const [file] = e.target.files
    if (file) {
      const reader = new FileReader()
      const {current} = uploadedImage
      current.file = file
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
    setArticle({...article, image: e.target.files[0]})
  }
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
      navigate("/articles")
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <h2>New article</h2>
      <form onSubmit={createArticle}>
        <div>
          <label htmlFor="articleTitle">Title</label>
          <p><input id="articleTitle" type="text" onChange={e => setArticle({...article, title: e.target.value})}/></p>
        </div>
        <div>
          <label htmlFor="tag1">Tag1</label>
          <p><input id="tag1" type="text" onChange={e => setArticle({...article, tag1: e.target.value})}/></p>
        </div>
        <div>
          <label htmlFor="tag2">Tag2</label>
          <p><input id="tag2" type="text" onChange={e => setArticle({...article, tag2: e.target.value})}/></p>
        </div>
        <div>
          <label htmlFor="tag3">Tag3</label>
          <p><input id="tag3" type="text" onChange={e => setArticle({...article, tag3: e.target.value})}/></p>
        </div>
        <div>
          <label htmlFor="text">Article Text</label>
          <p><textarea id="text" onChange={e => setArticle({...article, text: e.target.value})}/></p>
        </div>
        <div>
          <p>
          <label htmlFor="image">Article Image</label>
            <input
            type="file"
            accept="image/*"
            multiple="false"
            onChange={handleImage}
          />
          </p>
          <div
            style={{
              height: "60px",
              width: "60px",
              border: "1px dashed black"
            }}>
            <img
              alt="uploaded"
              ref={uploadedImage}
            style={{width:"100%",height:"100%"}}
          /></div>
        </div>
        <div><button type="submit">Create article</button></div>
      </form>
    </div>
  );
};

export default CreateArticle;