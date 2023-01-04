import React from "react";
import {useParams} from 'react-router-dom'

// eslint-disable-next-line react/display-name
const withRouter = WrappedComponent => props => {
  const param = useParams()
  return <WrappedComponent {...props} param={param} />
}
export default withRouter