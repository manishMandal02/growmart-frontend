import { React, useState } from 'react';

import {
  Search,
  PermIdentityOutlined,
  LocalMallOutlined,
} from '@material-ui/icons';
import { IconButton, Badge } from '@material-ui/core/';

import Modal from '../../UI/Modal/Modal';
import Login from '../../Auth/Login/Login';
import classes from './SearchBar.module.scss';
import Logo from '../../../Assets/Images/main-logo.png';

const SearchBar = (props) => {
  const [open, setOpen] = useState(false);

  const handelModalState = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div className={classes.NavBar}>
      <div className={classes.LeftContainer}>
        <a href='/'>
          <img src={Logo} alt='GorwMart Logo' />
        </a>

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
        <div className={classes.SingIn} onClick={handelModalState}>
          <PermIdentityOutlined className={classes.MenuIcons} />
          <div className={classes.TextWrapper}>
            <p className={classes.CaptionText}>Welcome</p>
            <p className={classes.MainText}>Log In/ Register</p>
          </div>
          <Modal show={open} updateModalState={() => handelModalState()}>
            <Login />
          </Modal>
        </div>

        <div className={classes.ShoppingCart}>
          <Badge
            color='secondary'
            className={classes.CartBadge}
            badgeContent={6}
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
