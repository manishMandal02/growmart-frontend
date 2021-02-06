import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@material-ui/icons';
import { CircularProgress, Snackbar } from '@material-ui/core';

import classes from './ProdcutPage.module.scss';
import { getProduct } from '../../../Store/Actions/ProductsActions/ProductActions';
import { addItemToCart } from '../../../Store/Actions/CartActions/CartActions';

//######
const ProdcutPage = ({ match }) => {
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

  const { loading, error, product } = useSelector(
    (state) => state.product.productDetails
  );
  let id = match.params.id;

  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [match, dispatch]);

  //addItme to cart on click
  const handleAddItemToCart = () => {
    dispatch(addItemToCart(id, qty));
    setSnackbarOpen(true);
  };

  //addItme to cart on click
  const handleAddToWishlish = () => {
    setSnackbarOpen2(true);
  };
  return (
    <div className={classes.ProdcutPage}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      ) : (
        <div className={classes.Container}>
          <div className={classes.ImageWrapper}>
            <img src={product.image} alt={`${product.name}`} />
            <span>
              <img src={product.image} alt={`${product.name} overview`} />
            </span>
          </div>

          <div className={classes.ProdcutInfo}>
            <p>{product.name}</p>
            <p>
              Brand:<a href={'/#'}>{product.brand}</a>
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
                <a href={'/#'}>{`#${product.category}`}</a>
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
              <button onClick={handleAddItemToCart}>
                <LocalMallOutlined /> Add To Cart
              </button>
              <button onClick={handleAddToWishlish}>
                <FavoriteBorder /> Add To Wishlist
              </button>
            </div>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={handleSnackbarClose}
            >
              <Alert severity='success' variant='filled'>
                <strong>Item Added to Cart</strong>
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
      )}
    </div>
  );
};

export default ProdcutPage;
