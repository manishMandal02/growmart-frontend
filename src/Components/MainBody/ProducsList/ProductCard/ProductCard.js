import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { LocalMallOutlined, FavoriteBorderOutlined } from '@material-ui/icons';
import { Snackbar } from '@material-ui/core';
import { Alert, Rating } from '@material-ui/lab';

import classes from './ProductCard.module.scss';
import { addItemToCart } from '../../../../Store/Actions/CartActions/CartActions';

//#############
const ProductCard = (props) => {
  //state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpen2, setSnackbarOpen2] = useState(false);

  // Handle snackbar state
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarClose2 = () => {
    setSnackbarOpen(false);
  };
  const dispatch = useDispatch();

  //Handler add to cart click
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addItemToCart(props.id));
    setSnackbarOpen(true);
  };
  //Handler add to Likes click
  const handleAddToLikes = (e) => {
    e.stopPropagation();
    setSnackbarOpen2(true);
  };
  const history = useHistory();

  const productClickHandler = (e) => {
    e.stopPropagation();
    history.push(`/product/${props.id}`);
  };
  return (
    <div onClick={productClickHandler} className={classes.ProductCard}>
      <div
        className={classes.CardTopContainer}
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      >
        <div className={classes.CardTopWrapper}>
          <div className={classes.CardTop}>
            {/* <div className={classes.OffTagIcon}></div> */}
            <div
              className={classes.AddToCardIcon}
              onClick={(e) => handleAddToCart(e)}
            >
              <LocalMallOutlined />
            </div>
          </div>
          <div className={classes.QuickView}>
            <button>Quick View</button>
          </div>
        </div>
      </div>

      <div className={classes.CardBottom}>
        <div className={classes.Top}>
          <div className={classes.Categories}>
            <p>{'#Fruits'}</p>
            <p>{'#Cooking'}</p>
            <p>{'#Vegetable'}</p>
          </div>
          <div
            className={classes.LikeIcon}
            onClick={(e) => handleAddToLikes(e)}
          >
            <FavoriteBorderOutlined />
          </div>
        </div>
        <div>
          <div className={classes.Info}>
            <p className={classes.Title}>{props.title}</p>
            <div>
              <Rating
                name='read-only'
                size='small'
                value={props.rating}
                readOnly
              />
            </div>
            <p className={classes.Price}>{`$${props.price}`}</p>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert severity='success' variant='filled'>
          {props.title} <strong>Added to Cart</strong>
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbarOpen2}
        autoHideDuration={2000}
        onClose={handleSnackbarClose2}
      >
        <Alert severity='success' variant='filled'>
          {props.title} <strong>Added to Whishlist</strong>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductCard;
