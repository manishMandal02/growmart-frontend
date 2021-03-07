import {
  ArrowRight,
  ExitToApp,
  GetApp,
  ListAlt,
  LockOpen,
  Person,
  ShoppingCart,
} from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './SideMenu.module.scss';
import { userLogout } from '../../../Store/Actions/UsersActions/UserActions';

const SideMenu = ({ open, close, loginModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  //handel close
  const closeMenuHandler = () => {
    const sideMenu = document.getElementById('sideMenu');
    const backdrop = document.getElementById('sideMenuBackdrop');
    if (sideMenu && backdrop) {
      sideMenu.style.width = '0';
      backdrop.style.display = 'none';
      document.body.style.overflowY = 'scroll';
    }
  };

  if (open) {
    const sideMenu = document.getElementById('sideMenu');
    const backdrop = document.getElementById('sideMenuBackdrop');
    if (sideMenu && backdrop) {
      sideMenu.style.width = '75%';
      backdrop.style.display = 'block';
      document.body.style.overflowY = 'hidden';
    }
  }
  if (!open) {
    closeMenuHandler();
  }
  //
  const closeMenu = () => {
    close();
  };
  //userInfo login status
  const { userInfo } = useSelector((state) => state.user.login);

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        id='sideMenuBackdrop'
        className={classes.Backdrop}
      ></div>
      <div id='sideMenu' className={classes.Container}>
        <div className={classes.User}>
          {userInfo ? (
            <div
              onClick={() => {
                closeMenu();
                history.push('/my/account');
              }}
            >
              <Person /> <p>{userInfo.name}</p>
            </div>
          ) : (
            <div
              onClick={() => {
                closeMenu();
                loginModal();
              }}
            >
              <Person /> <p>Login & Signup</p>
            </div>
          )}
          <span>
            <GetApp />
          </span>
        </div>
        <ul className={classes.Menu}>
          {userInfo ? (
            <>
              {' '}
              <Link onClick={closeMenu} to='/my/account'>
                <Person />
                My Account
              </Link>
              <Link onClick={closeMenu} to='/my/orders'>
                <ListAlt /> My Orders
              </Link>{' '}
            </>
          ) : null}
          <Link onClick={closeMenu} to='/user/cart'>
            <ShoppingCart />
            My Cart
          </Link>
        </ul>
        <ul className={classes.Menu}>
          <p>Category</p>
          <Link onClick={closeMenu} to='/category/vegetables'>
            <ArrowRight />
            Vegetables
          </Link>
          <Link onClick={closeMenu} to='/category/fruits'>
            <ArrowRight />
            Fruits
          </Link>
          <Link onClick={closeMenu} to='/category/leafyvegetables'>
            <ArrowRight />
            Leafy Vegetables
          </Link>
          <Link onClick={closeMenu} to='/category/freshprepared'>
            <ArrowRight />
            Fresh Prepared
          </Link>
        </ul>
        <ul className={classes.Menu}>
          <p>Brand</p>
          <Link onClick={closeMenu} to='/brand/growmart'>
            <ArrowRight />
            GrowMart
          </Link>
          <Link onClick={closeMenu} to='/brand/marketside'>
            <ArrowRight />
            MarketSide
          </Link>
          <Link onClick={closeMenu} to='/brand/nestle'>
            <ArrowRight />
            Nestle
          </Link>
        </ul>
        <ul>
          {!userInfo ? (
            <Link
              onClick={() => {
                closeMenu();
                loginModal();
              }}
              to='#'
            >
              <LockOpen /> Login
            </Link>
          ) : (
            <Link
              onClick={() => {
                dispatch(userLogout());
                closeMenu();
                history.push('/');
              }}
              to='#'
            >
              <ExitToApp /> Logout
            </Link>
          )}
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
