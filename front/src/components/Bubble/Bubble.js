import React from 'react'
import style from './Bubble.module.scss'

function Bubble({text, entity}) {
  return (
    <div className={style.cloud} style={entity == "mood" && {}}>
      {text}
    </div>
  )
}

export default Bubble;
