import React, {useReducer} from 'react'
import {AlertContext} from "./AlertContext";
import {AlertReducer} from "./AlertReducer";

export const AlertState = ({children}) => {
  const [state, dispatch] = useReducer(AlertReducer, {visible: false})
  const hide = () => dispatch({type: "HIDE_ALERT"})

  const show = (text, messageType = "warning") => {
    dispatch({
      type: "SHOW_ALERT",
      text: text,
      messageType: messageType
    })
    setTimeout(() => hide(), 5000)
  }

  return (
    <AlertContext.Provider value={{
      show, hide, alert: state
    }}>
      {children}
    </AlertContext.Provider>
  )
}