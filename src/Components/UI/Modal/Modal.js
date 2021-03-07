import ReactDOM from 'react-dom';

import classes from './Modal.module.scss';

// const Modal = (props) => {
//   useEffect(() => {
//     const modal = document.getElementById('modal');
//     // const root = document.getElementById('root');
//     // if (props.show) {
//     //   root.appendChild(modal);
//     // }
//   }, []);

//   return props.show ? (

//   ) : null;
// };

const Modal = ({ show, updateModalState, children }) => {
  if (!show) return null;
  return ReactDOM.createPortal(
    <div id='modal'>
      <div
        className={classes.Backdrop}
        onClick={(e) => {
          e.stopPropagation();
          updateModalState(e);
        }}
      ></div>
      <div onClick={(e) => e.stopPropagation()} className={classes.Modal}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
