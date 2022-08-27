import React, {useContext} from 'react';
import {Alert, Pane, CrossIcon} from "evergreen-ui";
import {AlertContext} from "./AlertContext";
import style from "./AlertComponent.module.scss"

const AlertComponent = () => {
  const {alert, hide} = useContext(AlertContext)
  return (
    <Pane position={'relative'}>
      <Alert
        display={alert.visible ? 'flex' : 'none'}
        intent={alert.type}
        title={alert.text}
        marginBottom={32}
      />
      <CrossIcon onClick={hide} className={`${style.close} ${alert.visible ? style.show : style.hidden}`}/>
    </Pane>
  );
};

export default AlertComponent;