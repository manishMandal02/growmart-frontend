import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';

import {
  Search,
  PermIdentityOutlined,
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
  const dispatch = useDispatch();
  const history = useHistory();
  // const params = useParams();
  const location = useLocation();
  const searchKeywordIndex =
    location.pathname.split('/').length >= 1
      ? location.pathname.split('/').indexOf('search')
      : '';
  const keywordParams = searchKeywordIndex
    ? location.pathname.split('/')[Number(searchKeywordIndex) + 1]
    : '';

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState(keywordParams ? keywordParams : '');

  const { cartItems } = useSelector((state) => state.cart);
  const cartItemsCount = cartItems.length || 0;

  const { userInfo } = useSelector((state) => state.user.login);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            !keyword ? history.push('/') : history.push(`/search/${keyword}`);
          }}
        >
          <div className={classes.Search}>
            <input
              type='text'
              placeholder='Search Products...'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className={classes.SearchIcon}>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  !keyword
                    ? history.push('/')
                    : history.push(`/search/${keyword}`);
                }}
              >
                <Search />
              </IconButton>
            </div>
          </div>
        </form>
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
