import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { LocalMallOutlined, FavoriteBorderOutlined } from '@material-ui/icons';
import { Snackbar, Tooltip } from '@material-ui/core';
import { Alert, Rating } from '@material-ui/lab';

import { useWindowSize } from '../../../../Hooks/useWindowSize/useWindowSize';
import classes from './ProductCard.module.scss';
import { addItemToCart } from '../../../../Store/Actions/CartActions/CartActions';
import QuickViewModal from './QuickViewModal/QuickViewModal';
import Modal from '../../../UI/Modal/Modal';

//#############
const ProductCard = (props) => {
  //state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpen2, setSnackbarOpen2] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [quickViewModalShow, setQuickViewModalShow] = useState(false);

  const [width] = useWindowSize();

  // Handle snackbar state
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarClose2 = () => {
    setSnackbarOpen2(false);
  };
  const dispatch = useDispatch();

  const handelModalState = () => {
    quickViewModalShow
      ? setQuickViewModalShow(false)
      : setQuickViewModalShow(true);
  };

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
            <Tooltip placement='bottom' title='Add to cart' enterDelay={500}>
              {/* <div className={classes.OffTagIcon}></div> */}
              <div
                className={classes.AddToCardIcon}
                onClick={(e) => handleAddToCart(e)}
              >
                <LocalMallOutlined />
              </div>
            </Tooltip>
          </div>
          {width > 770 && (
            <div className={classes.QuickView}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct({
                    id: props.id,
                    image: props.img,
                    name: props.title,
                    category: props.category,
                    price: props.price,
                    rating: props.rating,
                    description: props.description,
                    brand: props.brand,
                    numReviews: props.numReviews,
                  });
                  setQuickViewModalShow(true);
                }}
              >
                Quick View
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={classes.CardBottom}>
        <div className={classes.Top}>
          <div className={classes.Categories}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/category/${props.category}`);
              }}
            >{`#${props.category}`}</button>
          </div>
          <Tooltip placement='bottom' title='Wishlist' enterDelay={500}>
            <div
              className={classes.LikeIcon}
              onClick={(e) => handleAddToLikes(e)}
            >
              <FavoriteBorderOutlined />
            </div>
          </Tooltip>
        </div>
        <div>
          <div className={classes.Info}>
            <Tooltip
              title={props.title.length > 20 ? props.title : ''}
              placement='top'
            >
              {width > 770 ? (
                <p className={classes.Title}>
                  {props.title.length > 20
                    ? `${props.title.substring(0, 20)}...`
                    : props.title}
                </p>
              ) : (
                <p className={classes.Title}>
                  {props.title.length > 25
                    ? `${props.title.substring(0, 27)}...`
                    : props.title}
                </p>
              )}
            </Tooltip>
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
        onClick={(e) => e.stopPropagation()}
      >
        <Alert severity='success' variant='filled'>
          {props.title}{' '}
          <strong>
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
              to='/user/cart'
            >
              Added to Cart
            </Link>
          </strong>
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
      <Modal show={quickViewModalShow} updateModalState={handelModalState}>
        <QuickViewModal
          show={quickViewModalShow}
          product={selectedProduct}
          closeModal={handelModalState}
        />
      </Modal>
    </div>
  );
};

export default ProductCard;
