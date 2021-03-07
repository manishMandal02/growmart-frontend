import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Rating } from '@material-ui/lab';
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
import { Snackbar, Tooltip } from '@material-ui/core';

import classes from './QuickViewModal.module.scss';
import { addItemToCart } from '../../../../../Store/Actions/CartActions/CartActions';

//######
const QuickViewModal = ({ product, closeModal }) => {
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

  //addItem to cart on click
  const handleAddItemToCart = () => {
    dispatch(addItemToCart(product.id, qty));
    setSnackbarOpen(true);
  };

  //wishlist
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
              <Tooltip
                placement='top'
                // arrow
                title={product.name}
                enterDelay={600}
              >
                <img src={product.image} alt={`${product.name} overview`} />
              </Tooltip>
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
              <span>{`${product.numReviews} ${
                product.numReviews <= 1 ? `Review` : 'Reviews'
              }`}</span>
            </div>
            <div className={classes.Price}>
              <p>$</p>
              <div>{product.price}</div>
            </div>
            <p>{product.description}</p>
            <p>
              Category:
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
                <input readOnly type='text' value={qty} />
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
              <Tooltip
                placement='top'
                title='feature underdevelopment'
                enterDelay={200}
              >
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
              <Link to='#'>
                <Twitter />
              </Link>
              <Link to='#'>
                <Facebook />
              </Link>
              <Link to='#'>
                <Instagram />
              </Link>
              <Link to='#'>
                <LinkedIn />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;
