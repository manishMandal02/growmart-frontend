import React from 'react';

import { FaShippingFast } from 'react-icons/fa';
import {
  LocationOnOutlined,
  LiveHelpOutlined,
  LocalShippingOutlined,
  Facebook,
  Twitter,
  LinkedIn,
} from '@material-ui/icons';

import classes from './TopHeaderMenu.module.scss';

const TopHeaderMenu = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Leftwrapper}>
        <div className={classes.LeftInfo}>
          <FaShippingFast className={classes.FastShippingIcon} />
          <p>FREE Express Shipping On Orders $99+</p>
        </div>
      </div>

      <div className={classes.RightWrapper}>
        {/* <div className={classes.ChangeMenu}>
          <div>
            USD
            <ExpandMoreOutlined />
          </div>
          <div>
            ENG
            <ExpandMoreOutlined />
          </div>
        </div> */}
        {/* <Divider
          className={classes.Divider}
          component='hr'
          flexItem='true'
          orientation='vertical'
          variant='fullWidth'
        /> */}
        <div className={classes.TopMenuItemContainer}>
          <a href='/'>
            <LocationOnOutlined className={classes.MapIcon} />
            <p>Our Stores</p>
          </a>
          <a href='/'>
            <LocalShippingOutlined />
            <p>Track Your Order</p>
          </a>
          <a href='/'>
            <LiveHelpOutlined />
            <p>FAQ</p>
          </a>
        </div>
        <div className={classes.Divider}></div>
        <div className={classes.SocialIconContainer}>
          <a href='/'>
            <LinkedIn />
          </a>
          <a href='/'>
            <Twitter />
          </a>
          <a href='/'>
            <Facebook />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeaderMenu;
