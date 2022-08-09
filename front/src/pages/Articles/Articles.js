import React from 'react';
import {Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Articles = ({allArticles, deleteOne, progress, isUserAdmin}) => {
  const handleDelete = id => {
    deleteOne(id)
  }
  return (
    <>
      {progress ? <Loader/> : allArticles.length > 0 ?
        <ul>
          {allArticles.map((ar, index) => {
            return <li
              key={index}>
              <span>{ar.id}</span>
              <br/>
              {ar.title}
              <p>{ar.text}</p>
              <p><span>{ar.tag1}</span><span>{ar.tag2}</span><span>{ar.tag3}</span></p>
              <p>{ar.creationDate}</p>
              <img src={'http://localhost:5000/' + ar.img} alt=""/>
              {isUserAdmin && <Link to={`/update/${ar.id}`}>Update</Link>}
              {isUserAdmin && <button onClick={() => handleDelete(ar.id)}>x</button>}
            </li>
          })}
        </ul> : <div>Nothing's here</div>}
    </>
  );
};

export default Articles;