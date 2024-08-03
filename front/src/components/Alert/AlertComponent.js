import React, { useContext } from 'react';
import { Alert, Pane, CrossIcon } from "evergreen-ui";
import { AlertContext } from "./AlertContext";
import style from "./AlertComponent.module.scss"

const AlertComponent = () => {
  const { alert, hide } = useContext(AlertContext)
  return (
    <div className={`${style.alertContainer} ${alert.visible ? style.show : style.hidden}`}>
      <Pane>
        <Alert
          intent={alert.messageType}
          title={alert.text}
        />
        <CrossIcon onClick={hide} className={`${style.close} ${alert.visible ? style.show : style.hidden}`} />
      </Pane>
    </div>
  );
};

export default AlertComponent;