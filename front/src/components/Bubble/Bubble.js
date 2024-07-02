import React from 'react'
import style from './Bubble.module.scss'

function Bubble({text, entity}) {
  return (
    <div className={style.cloud} style={entity == "mood" && {position: 'absolute', top: 0, transform: "translate(55px, -20px)"}}>
      {text}
    </div>
  )
}

export default Bubble;
