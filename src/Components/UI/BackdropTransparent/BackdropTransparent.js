import { React } from 'react';

import classes from './BackdropTransparent.module.scss';

const BackdropTransparent = (props) => {
  // const [open, setOpen] = useState(false)

  return props.show ? (
    <div
      className={classes.Backdrop}
      onClick={(e) => {
        e.stopPropagation();
        props.updateBackdropState();
      }}
    >
      {props.children}
    </div>
  ) : null;
};

export default BackdropTransparent;
