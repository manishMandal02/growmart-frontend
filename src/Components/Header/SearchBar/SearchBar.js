import React from 'react';

import {
  Search,
  PermIdentityOutlined,
  LocalMallOutlined,
} from '@material-ui/icons';
import { IconButton, Badge } from '@material-ui/core/';

import classes from './SearchBar.module.scss';
import Logo from '../../../Assets/Images/main-logo.png';

const SearchBar = () => {
  return (
    <div className={classes.NavBar}>
      <div className={classes.LeftContainer}>
        <div>
          <img src={Logo} alt='GorwMart Logo' />
        </div>

        <div className={classes.Search}>
          <input type='text' placeholder='search...' />
          <div className={classes.SearchIcon}>
            <IconButton>
              <Search />
            </IconButton>
          </div>
        </div>
      </div>

      <div className={classes.RightContainer}>
        <div className={classes.SingIn}>
          <PermIdentityOutlined className={classes.MenuIcons} />
          <div className={classes.TextWrapper}>
            <p className={classes.CaptionText}>Welcome</p>
            <p className={classes.MainText}>Log In/ Register</p>
          </div>
        </div>
        <div className={classes.ShoppingCart}>
          <Badge
            color='secondary'
            className={classes.CartBadge}
            badgeContent={0}
            showZero
            overlap='circle'
          >
            <LocalMallOutlined className={classes.MenuIcons} />
          </Badge>
          <div className={classes.TextWrapper}>
            <p className={classes.CaptionText}>Cart</p>
            <p className={classes.MainText}>$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
