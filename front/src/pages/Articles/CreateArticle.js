import React, {useState} from 'react';
import {useNavigate} from "react-router-dom"

const CreateArticle = ({newOne}) => {
  const navigate = useNavigate()
  let [form, setForm] = useState({
    title: "",
    tag1: "",
    tag2: "",
    tag3: "",
    formText: ""
  })
   function createArticle(e) {
    e.preventDefault()
    console.log(form)
    try {
      newOne(form)
    } catch (e) {
      console.log(e)
    } finally {
      navigate("/articles")
    }
  }
  return (
    <div>
      <h2>New article</h2>
      <form onSubmit={createArticle}>
        <div>
          <label htmlFor="articleTitle">Title</label>
          <p><input id="articleTitle" type="text" onChange={e => setForm({...form, title: e.target.value})}/></p>
        </div>
        <div>
          <label htmlFor="tag1">Tag1</label>
          <p><input id="tag1" type="text" onChange={e => setForm({...form, tag1: e.target.value})}/></p>
        </div>
        <div>
          <label htmlFor="tag2">Tag2</label>
          <p><input id="tag2" type="text" onChange={e => setForm({...form, tag2: e.target.value})}/></p>
        </div>
        <div>
          <label htmlFor="tag3">Tag3</label>
          <p><input id="tag3" type="text" onChange={e => setForm({...form, tag3: e.target.value})}/></p>
        </div>
        <div>
          <label htmlFor="text">Article Text</label>
          <p><textarea id="text" onChange={e => setForm({...form, formText: e.target.value})}/></p>
        </div>
        <div><button type="submit">Create article</button></div>
      </form>
    </div>
  );
};

export default CreateArticle;