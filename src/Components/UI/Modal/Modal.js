import { React, useEffect } from 'react';

import classes from './Modal.module.scss';

const Modal = (props) => {
  useEffect(() => {
    const modal = document.getElementById('modal');
    if (modal && !props.show) {
      document.body.appendChild(modal);
    }
    console.log(modal);
  }, [props.show]);

  return props.show ? (
    <>
      <div
        className={classes.Backdrop}
        onClick={(e) => props.updateModalState()}
      ></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={classes.Modal}
        id='modal'
      >
        {props.children}
      </div>
    </>
  ) : null;
};

export default Modal;
