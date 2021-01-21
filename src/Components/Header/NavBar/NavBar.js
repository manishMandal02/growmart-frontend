import React from 'react';

import {
  Menu,
  LocalOfferOutlined,
  LibraryBooksOutlined,
} from '@material-ui/icons';
import classes from './NavBar.module.scss';

const NavBar = () => {
  return (
    <div className={classes.NavBar}>
      <div className={classes.LeftMenu}>
        <div className={classes.AllDepartments}>
          <Menu />
          <p>All Departments</p>
        </div>

        <ul className={classes.MainMenu}>
          <a href='/'>Vegetables</a>
          <a href='/'>Fruits</a>
          <a href='/'>Fresh Foods</a>
          <a href='/'>Best Seller</a>
          <a href='/'>Trending Products</a>
        </ul>
      </div>

      <ul className={classes.RightMenu}>
        <a href='/'>
          <div className={classes.OffersMenu}>
            <LocalOfferOutlined />
            Offers
          </div>
        </a>
        <a href='/'>
          <div className={classes.OffersMenu}>
            <LibraryBooksOutlined />
            Recipes
          </div>
        </a>
      </ul>
    </div>
  );
};

export default NavBar;
