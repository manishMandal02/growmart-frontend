import React from 'react';
import { Link } from 'react-router-dom';

import {
  Menu,
  LocalOfferOutlined,
  LibraryBooksOutlined,
} from '@material-ui/icons';
import classes from './NavBar.module.scss';
import { Tooltip } from '@material-ui/core';

const NavBar = () => {
  return (
    <div className={classes.NavBar}>
      <div className={classes.LeftMenu}>
        <Tooltip title=' feature under development' arrow placement='right'>
          <div className={classes.AllDepartments}>
            <Menu />
            <p>All Departments</p>
          </div>
        </Tooltip>

        <ul className={classes.MainMenu}>
          <Link to={`/category/vegetables`}>Vegetables</Link>
          <Link to={`/category/fruits`}>Fruits</Link>
          <Link to={`/category/freshprepared`}>Fresh Prepared</Link>
          <Tooltip title='page under development' placement='bottom' arrow>
            <Link to='#'>Best Seller</Link>
          </Tooltip>
          <Tooltip title='page under development' placement='bottom' arrow>
            <Link to='#'>Trending Products</Link>
          </Tooltip>
        </ul>
      </div>

      <ul className={classes.RightMenu}>
        <Tooltip title='page under development' placement='bottom' arrow>
          <Link href='#'>
            <div className={classes.OffersMenu}>
              <LocalOfferOutlined />
              Offers
            </div>
          </Link>
        </Tooltip>

        <Tooltip title='page under development' placement='bottom' arrow>
          <Link href='#'>
            <div className={classes.OffersMenu}>
              <LibraryBooksOutlined />
              Recipes
            </div>
          </Link>
        </Tooltip>
      </ul>
    </div>
  );
};

export default NavBar;
