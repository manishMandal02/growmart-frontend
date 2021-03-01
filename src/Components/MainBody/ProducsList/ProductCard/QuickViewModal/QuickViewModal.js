import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Rating, AlertTitle } from '@material-ui/lab';
import {
  LocalMallOutlined,
  FavoriteBorder,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  Add,
  Remove,
  Close,
} from '@material-ui/icons';
import { CircularProgress, Snackbar, Tooltip } from '@material-ui/core';

import classes from './QuickViewModal.module.scss';
import Modal from '../../../../UI/Modal/Modal';
import { getProduct } from '../../../../..//Store/Actions/ProductsActions/ProductActions';
import { addItemToCart } from '../../../../../Store/Actions/CartActions/CartActions';

//######
const QuickViewModal = ({ product, show, closeModal }) => {
  //state
  const [qty, setQty] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpen2, setSnackbarOpen2] = useState(false);

  // Handle snackbar state
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarClose2 = () => {
    setSnackbarOpen2(false);
  };

  const dispatch = useDispatch();

  //   const { loading, error, product } = useSelector(
  //     (state) => state.product.productDetails
  //   );

  //   useEffect(() => {
  //     dispatch(getProduct(id));
  //   }, [id, dispatch]);

  //addItme to cart on click
  const handleAddItemToCart = () => {
    dispatch(addItemToCart(product.id, qty));
    setSnackbarOpen(true);
  };

  //addItme to cart on click
  const handleAddToWishlish = () => {
    setSnackbarOpen2(true);
  };
  return (
    <>
      <div className={classes.QuickVIewModal}>
        <Tooltip placement='left' arrow title='Close' enterDelay={600}>
          <button onClick={() => closeModal()} className={classes.CloseButton}>
            <Close />
          </button>
        </Tooltip>
        <div className={classes.Container}>
          <div className={classes.ImageWrapper}>
            <img src={product.image} alt={`${product.name}`} />
            <span>
              <img src={product.image} alt={`${product.name} overview`} />
            </span>
          </div>

          <div className={classes.ProdcutInfo}>
            <Link onClick={() => closeModal()} to={`/product/${product.id}`}>
              {product.name}
            </Link>
            <p>
              Brand:<Link to={`/brand/${product.brand}`}>{product.brand}</Link>
            </p>
            <div className={classes.Rating}>
              <Rating
                name='read-only'
                size='medium'
                value={product.rating}
                readOnly
              />
              <span>{`${product.numReviews} Reviews`}</span>
            </div>
            <div className={classes.Price}>
              <p>$</p>
              <div>{product.price}</div>
            </div>
            <p>{product.description}</p>
            <p>
              Categories:
              <span>
                <Link
                  to={`/category/${product.category}`}
                >{`#${product.category}`}</Link>
              </span>
            </p>
            <div className={classes.ButtonWrapper}>
              <div className={classes.Quantity}>
                <span
                  onClick={() => {
                    if (qty !== 0) {
                      setQty(qty - 1);
                    }
                  }}
                >
                  <Remove />
                </span>
                <input type='text' value={qty} />
                <span
                  onClick={() => {
                    setQty(qty + 1);
                  }}
                >
                  <Add />
                </span>
              </div>
              <Tooltip placement='top' title='Add to cart' enterDelay={500}>
                <button onClick={handleAddItemToCart}>
                  <LocalMallOutlined /> Add To Cart
                </button>
              </Tooltip>
              <Tooltip placement='top' title='Wishlist' enterDelay={500}>
                <button onClick={handleAddToWishlish}>
                  <FavoriteBorder />
                  Wishlist
                </button>
              </Tooltip>
            </div>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={handleSnackbarClose}
            >
              <Alert severity='success' variant='filled'>
                <strong>
                  Item Added to{' '}
                  <Link
                    style={{
                      color: 'white',
                      // textDecoration: 'none',
                    }}
                    to='/user/cart'
                  >
                    Cart
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
                <strong>Item Added to WishList</strong>
              </Alert>
            </Snackbar>
            <div className={classes.SocialIconContainer}>
              <span>
                Share:
                {/* <Share /> */}
              </span>
              <a href='/#'>
                <Twitter />
              </a>
              <a href='/#'>
                <Facebook />
              </a>
              <a href='/#'>
                <Instagram />
              </a>
              <a href='/#'>
                <LinkedIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;
