import React from 'react'
import './Dialog.scss'

function DialogWindow({ isShown, catId, title, deleteAll }) {
  return (
    <div className={['dialog_container', isShown ? ' show' : ''].join('')}>
      <div>
        This action will delete all article with this {title} caregory. Are you sure?
      </div>
      <a className='delete_button' onClick={() => deleteAll(catId)}>
        <span>Delete</span>
      </a>
    </div>
  )
}

export default DialogWindow;
