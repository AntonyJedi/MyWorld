import React, {useReducer} from 'react'
import {AlertContext} from "./AlertContext";
import {AlertReducer} from "./AlertReducer";

export const AlertState = ({children}) => {
  const [state, dispatch] = useReducer(AlertReducer, {visible: false})
  const show = (text, type = "warning") => {
    dispatch({
      type: "SHOW_ALERT",
      text: text,
      messageType: type
    })
    setTimeout(() => dispatch({type: "HIDE_ALERT"}), 5000)
  }
  const hide = () => dispatch({type: "HIDE_ALERT"})
  return (
    <AlertContext.Provider value={{
      show, hide, alert: state
    }}>
      {children}
    </AlertContext.Provider>
  )
}