import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  Add,
  Cancel,
  FavoriteBorderOutlined,
  Remove,
} from '@material-ui/icons';

import { useWindowSize } from '../../../../Hooks/useWindowSize/useWindowSize';
import classes from './CartProductCard.module.scss';
import {
  updateCartQty,
  removeItemFromCart,
} from '../../../../Store/Actions/CartActions/CartActions';
import { Tooltip } from '@material-ui/core';

//######
const CartProductCard = ({
  name,
  image,
  brand,
  price,
  quantity,
  id,
  openSnackbar,
}) => {
  //State
  const [qty, setQty] = useState('');

  const [width] = useWindowSize();

  const location = useLocation();
  const dispatch = useDispatch();
  const [itemRemoveSuccess, setItemRemoveSuccess] = useState(false);

  useEffect(() => {
    setQty(quantity);
  }, [itemRemoveSuccess, quantity]);
  // item remove handler
  const itemRemoveHandler = () => {
    openSnackbar();
    dispatch(removeItemFromCart(id));
    setItemRemoveSuccess(itemRemoveSuccess ? false : true);
  };

  return width <= 770 ? (
    <div className={classes.MobileContainer}>
      <div className={classes.LeftContainer}>
        <Link
          to={
            location.pathname === '/user/cart'
              ? `/product/${id}`
              : '/user/create-order?step=order-summary'
          }
        >
          {/* {name.length > 25 ? name : `${name.substring(0, 25)}...`} */}
          {name}
        </Link>
        <p className={classes.Brand}>
          Brand:{' '}
          <Link
            to={
              location.pathname === '/user/cart'
                ? `/brand/${brand}`
                : '/user/create-order?step=order-summary'
            }
          >
            {brand}
          </Link>
        </p>
        <div className={classes.Price}>
          <p>$</p>
          <div>{price}</div>
        </div>
      </div>
      <div className={classes.RightContainer}>
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} />
        </Link>
        {location.pathname === '/user/cart' && (
          <div className={classes.Quantity}>
            <span
              onClick={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                  dispatch(updateCartQty(id, qty - 1));
                }
              }}
            >
              <Remove />
            </span>
            <input readOnly type='text' value={qty} />
            <span
              onClick={() => {
                setQty(qty + 1);
                dispatch(updateCartQty(id, qty + 1));
              }}
            >
              <Add />
            </span>
          </div>
        )}
      </div>

      {location.pathname === '/user/cart' && (
        <div className={classes.ButtonWrapper}>
          <Tooltip title='feature underdevelopment' placement='top'>
            <button>
              <FavoriteBorderOutlined /> WishList
            </button>
          </Tooltip>
          <button
            onClick={() => {
              itemRemoveHandler();
            }}
          >
            <Cancel /> Remove
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className={classes.Container}>
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} />
      </Link>
      <span>
        <Tooltip enterDelay={500} title={name} placement='top' arrow>
          <Link to={`/product/${id}`}>
            {name.length < 30 ? name : `${name.substring(0, 23)}...`}
          </Link>
        </Tooltip>
        <p>
          Brand: <Link to={`/brand/${brand}`}>{brand}</Link>
        </p>
      </span>
      <div className={classes.Price}>
        <p>$</p>
        <div>{price}</div>
      </div>
      <div className={classes.Quantity}>
        <span
          onClick={() => {
            if (qty > 1) {
              setQty(qty - 1);
              dispatch(updateCartQty(id, qty - 1));
            }
          }}
        >
          <Remove />
        </span>
        <input readOnly type='text' value={qty} />
        <span
          onClick={() => {
            setQty(qty + 1);
            dispatch(updateCartQty(id, qty + 1));
          }}
        >
          <Add />
        </span>
      </div>
      <span className={classes.ButtonWrapper}>
        <Tooltip enterDelay={500} title='Remove item' placement='top'>
          <button
            onClick={() => {
              itemRemoveHandler();
            }}
          >
            <Cancel /> Remove
          </button>
        </Tooltip>
        <Tooltip title='feature underdevelopment' placement='top'>
          <button>
            <FavoriteBorderOutlined /> WishList
          </button>
        </Tooltip>
      </span>
    </div>
  );
};

export default CartProductCard;
