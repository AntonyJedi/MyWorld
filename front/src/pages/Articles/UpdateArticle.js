import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const UpdateArticle = ({article, updateArticle}) => {
  const navigate = useNavigate()
  const [up, setUp] = useState({})
  useEffect(() => setUp(article), [article])

  function submitHandler (e) {
    e.preventDefault()
    updateArticle(up, article.id)
    navigate('/articles')
  }
  return (
    <form onSubmit={submitHandler}>
      <p>Up</p>
      <p>{article.id}</p>
      <div><input type="text" value={up.title} onChange={e => setUp({...up, title: e.target.value})}/></div>
      <div><input type="text" value={up.tag1} onChange={e => setUp({...up, tag1: e.target.value})}/></div>
      <div><input type="text" value={up.tag2} onChange={e => setUp({...up, tag2: e.target.value})}/></div>
      <div><input type="text" value={up.tag3} onChange={e => setUp({...up, tag3: e.target.value})}/></div>
      <textarea name="" id="" cols="30" rows="10" value={up.text} onChange={e => setUp({...up, text: e.target.value})}/>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateArticle