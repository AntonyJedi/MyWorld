import React from "react";
import {useParams} from 'react-router-dom'

const withRouter = WrappedComponent => props => {
  let param = useParams()
  return <WrappedComponent {...props} param={param} />
}
export default withRouter