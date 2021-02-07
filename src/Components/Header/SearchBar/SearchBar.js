import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Search,
  PermIdentityOutlined,
  LocalMallOutlined,
  ExpandMore,
  AccountCircle,
  ListAlt,
  ExitToApp,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import { IconButton, Badge } from '@material-ui/core/';
import Modal from '../../UI/Modal/Modal';
import Backdrop from '../../UI//BackdropTransparent/BackdropTransparent';
import Login from '../../Auth/Login/Login';
import classes from './SearchBar.module.scss';
import Logo from '../../../Assets/Images/main-logo.png';
import { userLogout } from '../../../Store/Actions/UsersActions/UserActions';

// #############
const SearchBar = (props) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  //get cartItmes count
  const { cartItems } = useSelector((state) => state.cart);
  const cartItemsCount = cartItems.length || 0;
  console.log(cartItemsCount);

  const { userInfo } = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.stopPropagation();
    dispatch(userLogout());
  };

  const handelModalState = () => {
    open ? setOpen(false) : setOpen(true);
  };
  //Handles dropdown user menu
  let userMenu;
  const handleMenuOpen = () => {
    console.log('clicked');
    userMenu = document.getElementById('user-menu');
    if (!menuOpen) {
      userMenu.style.display = 'block';
    } else {
      userMenu.style.display = 'none';
    }
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  return (
    <div className={classes.NavBar}>
      <div className={classes.LeftContainer}>
        <Link to='/'>
          <img src={Logo} alt='GorwMart Logo' />
        </Link>

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
        {userInfo ? (
          <div className={classes.LoggedUser} onClick={(e) => handleMenuOpen()}>
            <PermIdentityOutlined />
            <p>
              {userInfo.name.split(' ')[0]}{' '}
              <span>
                <ExpandMore />
              </span>
            </p>
            <Backdrop
              show={menuOpen}
              updateBackdropState={() => handleMenuOpen()}
            />
            <div className={classes.UserMenu} id='user-menu'>
              <ul>
                <Link to='/my/account'>
                  <AccountCircle /> My Account
                </Link>
                <Link to='/my/orders'>
                  <ListAlt />
                  My Orders
                </Link>
                <Link to='/user/cart'>
                  <ShoppingCartOutlined />
                  My cart
                </Link>
                <Link to='#' onClick={(e) => logoutHandler(e)}>
                  <ExitToApp />
                  Logout
                </Link>
              </ul>
            </div>
          </div>
        ) : (
          <div className={classes.SingIn} onClick={handelModalState}>
            <PermIdentityOutlined className={classes.UserIcon} />
            <div className={classes.TextWrapper}>
              <p className={classes.CaptionText}>Welcome</p>
              <p className={classes.MainText}>Log In/ Register</p>
            </div>
            <Modal show={open} updateModalState={() => handelModalState()}>
              <Login closeModal={() => handelModalState()} />
            </Modal>
          </div>
        )}

        <Link to='/user/cart' className={classes.ShoppingCart}>
          <Badge
            color='secondary'
            className={classes.CartBadge}
            badgeContent={cartItemsCount}
            showZero
            overlap='circle'
          >
            <ShoppingCartOutlined className={classes.MenuIcons} />
          </Badge>
          <div className={classes.TextWrapper}>
            <p className={classes.MainText}>Cart</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
