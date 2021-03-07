import React from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../../Hooks/useWindowSize/useWindowSize';

import {
  Menu,
  LocalOfferOutlined,
  LibraryBooksOutlined,
} from '@material-ui/icons';
import classes from './NavBar.module.scss';
import { Tooltip } from '@material-ui/core';

const NavBar = () => {
  const [width] = useWindowSize();

  return (
    <div className={classes.NavBar}>
      {width > 770 && (
        <>
          <div className={classes.LeftMenu}>
            <Tooltip title='Feature Underdevelopment' arrow placement='right'>
              <div className={classes.AllDepartments}>
                <Menu />
                <p>All Departments</p>
              </div>
            </Tooltip>

            <ul className={classes.MainMenu}>
              <Link to={`/category/vegetables`}>Vegetables</Link>
              <Link to={`/category/fruits`}>Fruits</Link>
              <Link to={`/category/freshprepared`}>Fresh Prepared</Link>
              <Tooltip title='Page Underdevelopment' placement='bottom' arrow>
                <Link to='#'>Best Seller</Link>
              </Tooltip>
              <Tooltip title='Page Underdevelopment' placement='bottom' arrow>
                <Link to='#'>Trending Products</Link>
              </Tooltip>
            </ul>
          </div>

          <ul className={classes.RightMenu}>
            <Tooltip title='Page Underdevelopment' placement='bottom' arrow>
              <Link to='#'>
                <div className={classes.OffersMenu}>
                  <LocalOfferOutlined />
                  Offers
                </div>
              </Link>
            </Tooltip>

            <Tooltip title='Page Underdevelopment' placement='bottom' arrow>
              <Link to='#'>
                <div className={classes.OffersMenu}>
                  <LibraryBooksOutlined />
                  Recipes
                </div>
              </Link>
            </Tooltip>
          </ul>
        </>
      )}
      {width <= 770 && (
        <ul className={classes.MainMenu}>
          <Link to={`/category/vegetables`}>#vegetables</Link>
          <Link to={`/category/fruits`}>#fruits</Link>
          <Link to={`/category/freshprepared`}>#freshPrepared</Link>
          <Link to={`/category/leavyvegetables`}>#leavyVegetables</Link>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
