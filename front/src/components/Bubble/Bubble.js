import React from 'react'
import style from './Bubble.module.scss'

const Bubble = ({text, entity}) => {
  return (
    <div className={style.cloud} style={entity === "mood" && {}}>
      {text}
    </div>
  )
}

export default Bubble;
