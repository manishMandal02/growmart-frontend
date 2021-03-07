import React from 'react';
import { Link } from 'react-router-dom';

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
          <p>FREE Express Shipping on Orders Above $10</p>
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
          <Link to='#'>
            <LocationOnOutlined className={classes.MapIcon} />
            <p>Our Stores</p>
          </Link>
          <Link to='#'>
            <LocalShippingOutlined />
            <p>Track Your Order</p>
          </Link>
          <Link to='#'>
            <LiveHelpOutlined />
            <p>FAQ</p>
          </Link>
        </div>
        <div className={classes.Divider}></div>
        <div className={classes.SocialIconContainer}>
          <Link to='#'>
            <LinkedIn />
          </Link>
          <Link to='#'>
            <Twitter />
          </Link>
          <Link to='#'>
            <Facebook />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeaderMenu;
