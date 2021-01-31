import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Rating, AlertTitle } from '@material-ui/lab';
import {
  LocalMallOutlined,
  FavoriteBorder,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
} from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';

import classes from './ProdcutPage.module.scss';
import { getProduct } from '../../../Store/Actions/index';

const ProdcutPage = ({ match }) => {
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [match, dispatch]);

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
              <button>
                <LocalMallOutlined /> Add To Cart
              </button>
              <button>
                <FavoriteBorder /> Add To Wishlist
              </button>
            </div>
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
