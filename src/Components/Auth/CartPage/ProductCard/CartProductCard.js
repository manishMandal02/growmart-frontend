import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Add,
  Cancel,
  FavoriteBorderOutlined,
  Remove,
} from '@material-ui/icons';

import classes from './CartProductCard.module.scss';
import {
  updateCartQty,
  removeItemFromCart,
} from '../../../../Store/Actions/CartActions/CartActions';

//######
const CartProductCard = ({
  name,
  image,
  brand,
  price,
  quantity,
  id,
  removeItem,
}) => {
  //State
  const [qty, setQty] = useState(quantity);

  const dispatch = useDispatch();
  // const [snackbarOpen, setSnackbarOpen] = useState(false);

  // // Handle snackbar state
  // const handleSnackbar = () => {
  //   setSnackbarOpen(false);
  // };

  //item remove handler
  // const itemRemoveHandler = (e) => {
  //   e.stopPropagation();
  //   dispatch(removeItemFromCart(id));
  //   snackbar();
  // };

  return (
    <div className={classes.Container}>
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} />
      </Link>
      <span>
        <Link to={`/product/${id}`}>{name}</Link>
        <p>
          Brand: <Link to='#'>{brand}</Link>
        </p>
      </span>
      <div className={classes.Price}>
        <p>$</p>
        <div>{price}</div>
      </div>
      <div className={classes.Quantity}>
        <span
          onClick={() => {
            if (qty !== 0) {
              setQty(qty - 1);
              dispatch(updateCartQty(id, qty - 1));
            }
          }}
        >
          <Remove />
        </span>
        <input
          type='text'
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
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
        <button
          onClick={() => {
            removeItem(id);
          }}
        >
          <Cancel /> Remove
        </button>
        <button>
          <FavoriteBorderOutlined /> WishList
        </button>
      </span>
    </div>
  );
};

export default CartProductCard;
