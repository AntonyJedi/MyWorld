import React, {useEffect, useState} from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import './ToDoList.scss'

const ToDoList = ({allNotes, newNote, removeOne}) => {
  const [value, setValue] = useState({userName: 'Anton'})
  function setNewNote (e) {
    e.preventDefault()
    newNote(value)
    setValue({...value, text: ''})
  }
  return (
    <>
      <form onSubmit={setNewNote}>
        <div className="input-group mb-3">
          <input
            value={value.text}
            type="text"
            className="form-control"
            placeholder="Enter note title"
            onChange={e => setValue({...value, text: e.target.value})}
          />
          <button className="btn btn-outline-secondary" type="submit">Add Note</button>
        </div>
      </form>
      <hr/>
      <TransitionGroup component="ul" className="list-group mt-3">
        {allNotes.map(note => (
          <CSSTransition key={note.id} classNames="note" timeout={1000}>
            <li
              className="list-group-item note">
              <strong>{note.text}</strong>
              <div>
                <small>{new Date().toLocaleDateString()}</small>
                <button onClick={() => removeOne(note.id)} type="button" className="btn btn-dark">&times;</button>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      </>
  );
};

export default ToDoList;