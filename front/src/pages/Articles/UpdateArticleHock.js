import React from "react";
import {useParams} from 'react-router-dom'

const withRouter = WrappedComponent => props => {
  let {id} = useParams()
  return <WrappedComponent {...props} param={id} />
}
export default withRouter