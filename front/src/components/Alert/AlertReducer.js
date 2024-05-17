export const AlertReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        ...state,
        text: action.text,
        messageType: action.messageType,
        visible: true
      }
    case "HIDE_ALERT":
      return {
        ...state,
        visible: false
      }
    default:
      return state
  }
}