import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useWindowSize } from '../../../Hooks/useWindowSize/useWindowSize';
import {
  Search,
  PermIdentityOutlined,
  ExpandMore,
  AccountCircle,
  ListAlt,
  ExitToApp,
  ShoppingCartOutlined,
  Menu,
  ShoppingCart,
  Person,
} from '@material-ui/icons';
import { IconButton, Badge } from '@material-ui/core/';
import Modal from '../../UI/Modal/Modal';
import Backdrop from '../../UI//BackdropTransparent/BackdropTransparent';
import Login from '../../Auth/Login/Login';
import classes from './SearchBar.module.scss';
import Logo from '../../../Assets/Images/main-logo.png';
import { userLogout } from '../../../Store/Actions/UsersActions/UserActions';
import { LOGIN_MOBILE_OPEN } from '../../../Store/Actions/ActionTypes';
import SideMenu from '../../UI/SideMenu/SideMenu';

// #############
const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const keywordParams = urlParams.get('search');

  const [width] = useWindowSize();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const { cartItems } = useSelector((state) => state.cart);
  const cartItemsCount = cartItems.length || 0;

  const { userInfo } = useSelector((state) => state.user.login);

  useEffect(() => {
    if (keywordParams) {
      setKeyword(keywordParams);
    } else {
      setKeyword('');
    }
  }, [keywordParams]);

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

  //search handler
  const searchHandler = (e) => {
    e.preventDefault();
    if (!keyword && !urlParams.has('search')) {
      urlParams.has('search') && urlParams.delete('search');
      history.push('/');
    }

    urlParams.set('search', keyword);
    urlParams.has('sortBy') && urlParams.delete('sortBy');
    urlParams.set('sortBy', `latest`);
    urlParams.delete('price');
    if (
      urlParams.has('search') &&
      !urlParams.get('search').toString().split('=')[1]
    ) {
      history.push({
        search: urlParams.toString(),
      });
    }
  };

  return (
    <div className={classes.NavBar}>
      {width > 900 && (
        <>
          <div className={classes.LeftContainer}>
            <Link to='/'>
              <img src={Logo} alt='GorwMart Logo' />
            </Link>
            <form onSubmit={(e) => searchHandler(e)}>
              <div className={classes.Search}>
                <input
                  type='text'
                  placeholder='Search Products...'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <div className={classes.SearchIcon}>
                  <IconButton onClick={(e) => searchHandler(e)}>
                    <Search />
                  </IconButton>
                </div>
              </div>
            </form>
          </div>
          <div className={classes.RightContainer}>
            {userInfo ? (
              <div
                className={classes.LoggedUser}
                onClick={(e) => handleMenuOpen()}
              >
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
        </>
      )}
      {width <= 900 && (
        <>
          <div className={classes.TopContainer}>
            <SideMenu
              open={sideMenuOpen}
              close={() => setSideMenuOpen(false)}
              loginModal={() =>
                dispatch({
                  type: LOGIN_MOBILE_OPEN,
                })
              }
            />

            <div className={classes.LeftContainer}>
              <Menu onClick={() => setSideMenuOpen(true)} />

              <Link to='/'>GrowMart</Link>
            </div>
            <div className={classes.RightContainer}>
              {userInfo ? (
                <div
                  className={classes.LoggedUser}
                  onClick={(e) => history.push('/my/account')}
                >
                  <Person />
                </div>
              ) : (
                <div
                  className={classes.SingIn}
                  onClick={() =>
                    dispatch({
                      type: LOGIN_MOBILE_OPEN,
                    })
                  }
                >
                  <div className={classes.TextWrapper}>
                    <p className={classes.MainText}>Login</p>
                  </div>
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
                  <ShoppingCart className={classes.MenuIcons} />
                </Badge>
              </Link>
            </div>
          </div>
          <div className={classes.BottomContainer}>
            <form onSubmit={(e) => searchHandler(e)}>
              <div className={classes.MobileSearch}>
                <Search />
                <input
                  type='text'
                  placeholder='Search Products...'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
