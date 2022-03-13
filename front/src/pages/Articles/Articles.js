import React from 'react';
import {Link} from "react-router-dom";

const Articles = ({allArticles, deleteOne}) => {
  const handleDelete = id => {
    deleteOne(id)
  }
  return (
    <div>
      {allArticles.length > 0 ?
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
              <Link to={`/update/${ar.id}`}>Update</Link>
              <button onClick={() => handleDelete(ar.id)}>x</button>
            </li>
          })}
        </ul> : <div>Nothing's here</div>}
    </div>
  );
};

export default Articles;