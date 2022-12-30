import React, {useEffect, useState} from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import './ToDoList.scss'
import {Button, Checkbox, IconButton, TextInput, TrashIcon} from "evergreen-ui";

const ToDoList = ({allNotes, newNote, removeOne, change}) => {
  const [value, setValue] = useState({userName: 'Anton'})
  function setNewNote (e) {
    e.preventDefault()
    newNote(value)
    setValue({...value, text: ''})
  }

  return (
    <>
      <form onSubmit={setNewNote}>
        <div className="input-group">
          <TextInput
            value={value.text}
            type="text"
            className="form-control"
            placeholder="Enter note..."
            onChange={e => setValue({...value, text: e.target.value})}
          />
          <Button intent="success" type="submit">Add Note</Button>
        </div>
      </form>

      <hr/>

      <TransitionGroup component="ul" className="list-group">
        {allNotes.map(note => (
          <CSSTransition key={note.id} classNames="note" timeout={1000}>
            <li className={["list-group-item note", note.checked ? 'checked' : 'open'].join(' ')}>
              <div className='text-item'>
                <Checkbox
                  checked={note.checked}
                  onChange={() => change(note.id)}
                />
                <strong>{note.text}</strong>
              </div>
              <div>
                <small>{new Date().toLocaleDateString()}</small>
                <div className='userName'>{note.userName}</div>
                <IconButton icon={TrashIcon} intent={!note.checked ? 'danger' : 'grey'} marginLeft={16} onClick={() => removeOne(note.id)} type="button" />
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      </>
  );
};

export default ToDoList;