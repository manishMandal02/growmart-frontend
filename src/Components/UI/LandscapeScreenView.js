import classes from './LandscapeScreenView.module.scss';
const LandscapeScreenView = () => {
  return (
    <div className={classes.Container}>
      <img
        src='https://res.cloudinary.com/vastia/image/upload/v1615461562/growmart/u_yfcEmvON3mKxkwwHspU1HR5_scnYVkj0Afhzeg3xBrSxlgziTZ6R-WsCcl-9G2kdfX3IX-DwuSTDY6BwlgEIQy4NU_frqq6z.png'
        alt='rotate-device'
      />
      <p>Please Rotate your Device</p>
      <p>
        We don't support landscape mode yet. please go back to potrait mode for
        the best experience
      </p>
    </div>
  );
};

export default LandscapeScreenView;
